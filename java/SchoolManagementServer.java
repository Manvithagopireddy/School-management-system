import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.*;
import java.net.InetSocketAddress;
import java.sql.*;
import java.util.concurrent.Executors;

public class SchoolManagementServer {

    public static void main(String[] args) throws IOException {
        // Initialize DB
        DatabaseManager.initialize();

        // Thread-pooled HTTP server — 50 threads handles ~500 concurrent users
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.setExecutor(Executors.newFixedThreadPool(50));

        server.createContext("/api/stats",           ex -> handle(ex, SchoolManagementServer::handleStats));
        server.createContext("/api/students",        ex -> handle(ex, SchoolManagementServer::handleStudents));
        server.createContext("/api/schedule",        ex -> handle(ex, SchoolManagementServer::handleSchedule));
        server.createContext("/api/grades/predict",  ex -> handle(ex, SchoolManagementServer::handleGradesPredict));

        server.start();
        System.out.println("=======================================================");
        System.out.println("  School Management Server  |  http://localhost:8080   ");
        System.out.println("  Thread Pool: 50 workers   |  DB: SQLite              ");
        System.out.println("  Capacity: ~500 concurrent users                       ");
        System.out.println("=======================================================");
    }

    // ── CORS + Dispatch helper ───────────────────────────────────────────────
    @FunctionalInterface interface Handler { String handle(HttpExchange ex) throws Exception; }

    private static void handle(HttpExchange ex, Handler h) {
        try {
            ex.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            ex.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            ex.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            if ("OPTIONS".equals(ex.getRequestMethod())) {
                ex.sendResponseHeaders(204, -1); return;
            }
            String body = h.handle(ex);
            byte[] bytes = body.getBytes("UTF-8");
            ex.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
            ex.sendResponseHeaders(200, bytes.length);
            ex.getResponseBody().write(bytes);
            ex.getResponseBody().close();
        } catch (Exception e) {
            System.err.println("[ERROR] " + ex.getRequestURI() + " → " + e.getMessage());
            try {
                String err = "{\"error\":\"" + e.getMessage() + "\"}";
                ex.getResponseHeaders().set("Content-Type","application/json");
                ex.sendResponseHeaders(500, err.length());
                ex.getResponseBody().write(err.getBytes());
                ex.getResponseBody().close();
            } catch (Exception ignored) {}
        }
    }

    // ── GET /api/stats ───────────────────────────────────────────────────────
    private static String handleStats(HttpExchange ex) throws Exception {
        try (Connection conn = DatabaseManager.getConnection()) {
            int students = queryInt(conn, "SELECT COUNT(*) FROM students");
            int teachers = queryInt(conn, "SELECT COUNT(*) FROM teachers");
            int lessons  = queryInt(conn, "SELECT COUNT(*) FROM lessons");
            double avgAtt = queryDouble(conn, "SELECT AVG(att) FROM students");

            return String.format(
                "{\"students\":%d,\"teachers\":%d,\"lessons\":%d,\"avgAttendance\":%.1f}",
                students, teachers, lessons, avgAtt
            );
        }
    }

    // ── GET /api/students ─────────────────────────────────────────────────────
    private static String handleStudents(HttpExchange ex) throws Exception {
        String query = ex.getRequestURI().getQuery();
        int limit  = 50;
        int offset = 0;
        String search = "";

        if (query != null) {
            for (String param : query.split("&")) {
                String[] kv = param.split("=");
                if (kv.length == 2) {
                    if ("limit".equals(kv[0]))  limit  = Integer.parseInt(kv[1]);
                    if ("offset".equals(kv[0])) offset = Integer.parseInt(kv[1]);
                    if ("search".equals(kv[0])) search = kv[1].toLowerCase().replace("+", " ");
                }
            }
        }

        try (Connection conn = DatabaseManager.getConnection()) {
            String sql = "SELECT * FROM students WHERE LOWER(name) LIKE ? OR LOWER(id) LIKE ? OR LOWER(grade) LIKE ? LIMIT ? OFFSET ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            String q = "%" + search + "%";
            ps.setString(1, q); ps.setString(2, q); ps.setString(3, q);
            ps.setInt(4, limit); ps.setInt(5, offset);
            ResultSet rs = ps.executeQuery();

            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            while (rs.next()) {
                if (!first) sb.append(",");
                first = false;
                sb.append(String.format(
                    "{\"id\":\"%s\",\"name\":\"%s\",\"grade\":\"%s\",\"roll\":\"%s\",\"gpa\":\"%.2f\",\"att\":\"%d%%\",\"status\":\"%s\",\"color\":\"%s\"}",
                    rs.getString("id"), rs.getString("name"), rs.getString("grade"),
                    rs.getString("roll"), rs.getDouble("gpa"), rs.getInt("att"),
                    rs.getString("status"), rs.getString("color")
                ));
            }
            sb.append("]");
            return sb.toString();
        }
    }

    // ── GET /api/schedule ─────────────────────────────────────────────────────
    private static String handleSchedule(HttpExchange ex) throws Exception {
        if ("POST".equals(ex.getRequestMethod())) {
            return handleSchedulePost(ex);
        }
        try (Connection conn = DatabaseManager.getConnection()) {
            ResultSet rs = conn.createStatement().executeQuery("SELECT * FROM lessons ORDER BY day, time");
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            while (rs.next()) {
                if (!first) sb.append(",");
                first = false;
                sb.append(String.format(
                    "{\"id\":\"%s\",\"day\":\"%s\",\"time\":\"%s\",\"subject\":\"%s\",\"teacher\":\"%s\",\"room\":\"%s\",\"color\":\"%s\"}",
                    rs.getString("id"), rs.getString("day"), rs.getString("time"),
                    rs.getString("subject"), rs.getString("teacher"),
                    rs.getString("room"), rs.getString("color")
                ));
            }
            return sb.append("]").toString();
        }
    }

    private static String handleSchedulePost(HttpExchange ex) throws Exception {
        String body = new String(ex.getRequestBody().readAllBytes(), "UTF-8");
        // Simple JSON field extraction (no extra library needed)
        String id      = extractJson(body, "id");
        String day     = extractJson(body, "day");
        String time    = extractJson(body, "time");
        String subject = extractJson(body, "subject");
        String teacher = extractJson(body, "teacher");
        String room    = extractJson(body, "room");
        String color   = extractJson(body, "color");

        try (Connection conn = DatabaseManager.getConnection()) {
            PreparedStatement ps = conn.prepareStatement(
                "INSERT OR REPLACE INTO lessons(id,day,time,subject,teacher,room,color) VALUES(?,?,?,?,?,?,?)"
            );
            ps.setString(1, id); ps.setString(2, day); ps.setString(3, time);
            ps.setString(4, subject); ps.setString(5, teacher);
            ps.setString(6, room); ps.setString(7, color);
            ps.executeUpdate();
        }
        return "{\"status\":\"saved\"}";
    }

    // ── GET /api/grades/predict ───────────────────────────────────────────────
    private static String handleGradesPredict(HttpExchange ex) throws Exception {
        // Aggregate average scores per subject across all students, then predict
        String[] subjects = {"Mathematics","Physics","Chemistry","English","Computer Science","Biology"};
        String[] colors   = {"#f5c842","#2dd4bf","#a78bfa","#fb7185","#4ade80","#f59e0b"};

        StringBuilder sb = new StringBuilder("[");
        try (Connection conn = DatabaseManager.getConnection()) {
            for (int i = 0; i < subjects.length; i++) {
                String subject = subjects[i];
                PreparedStatement ps = conn.prepareStatement(
                    "SELECT term, AVG(score) as avg_score FROM grades WHERE subject=? GROUP BY term ORDER BY term"
                );
                ps.setString(1, subject);
                ResultSet rs = ps.executeQuery();

                double sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
                int n = 0;
                double lastScore = 0;

                while (rs.next()) {
                    int    x = rs.getInt("term");
                    double y = rs.getDouble("avg_score");
                    sumX += x; sumY += y; sumXY += (x * y); sumXX += (x * x);
                    lastScore = y;
                    n++;
                }

                int predicted = (int) Math.round(lastScore);
                String trend  = "stable";
                double slope  = 0;

                if (n > 1) {
                    slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
                    double intercept = (sumY - slope * sumX) / n;
                    predicted = Math.min(100, Math.max(0, (int) Math.round(slope * (n + 1) + intercept)));
                    if (slope >  1.5) trend = "up";
                    else if (slope < -1.5) trend = "down";
                }

                if (i > 0) sb.append(",");
                sb.append(String.format(
                    "{\"subject\":\"%s\",\"currentScore\":%d,\"predictedNextTerm\":%d,\"trend\":\"%s\",\"color\":\"%s\",\"slope\":%.2f}",
                    subject, (int) Math.round(lastScore), predicted, trend, colors[i], slope
                ));
            }
        }
        return sb.append("]").toString();
    }

    // ── Utilities ─────────────────────────────────────────────────────────────
    private static int queryInt(Connection conn, String sql) throws SQLException {
        ResultSet rs = conn.createStatement().executeQuery(sql);
        return rs.next() ? rs.getInt(1) : 0;
    }

    private static double queryDouble(Connection conn, String sql) throws SQLException {
        ResultSet rs = conn.createStatement().executeQuery(sql);
        return rs.next() ? rs.getDouble(1) : 0;
    }

    private static String extractJson(String json, String key) {
        String pattern = "\"" + key + "\"";
        int k = json.indexOf(pattern);
        if (k < 0) return "";
        int colon = json.indexOf(":", k);
        int start = json.indexOf("\"", colon) + 1;
        int end   = json.indexOf("\"", start);
        return (start > 0 && end > start) ? json.substring(start, end) : "";
    }
}
