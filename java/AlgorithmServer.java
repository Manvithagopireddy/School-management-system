import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class AlgorithmServer {

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/predict", new PredictHandler());
        server.setExecutor(null);
        System.out.println("Java Algorithm Server started on port 8080...");
        server.start();
    }

    static class PredictHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Support CORS for the React frontend
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
                exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            // Execute Linear Regression mathematical algorithm native to Java
            String response = generatePredictedDataJSON();
            
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }

    private static String generatePredictedDataJSON() {
        String[] subjects = {"Mathematics", "Physics", "Chemistry", "English", "Computer Sci", "Biology"};
        String[] colors = {"#f5c842", "#2dd4bf", "#a78bfa", "#fb7185", "#4ade80", "#f59e0b"};
        
        int[][] mockScores = {
            {85, 88, 91}, // Math
            {82, 86, 88}, // Phys
            {88, 85, 82}, // Chem
            {92, 93, 94}, // Eng
            {80, 89, 96}, // CS
            {85, 81, 78}  // Bio
        };

        StringBuilder json = new StringBuilder("[");
        
        for (int i = 0; i < subjects.length; i++) {
            int[] scores = mockScores[i];
            int currentScore = scores[scores.length - 1];
            
            // Linear regression prediction
            double sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
            int n = scores.length;
            
            for (int t = 0; t < n; t++) {
                int x = t + 1;
                int y = scores[t];
                sumX += x;
                sumY += y;
                sumXY += x * y;
                sumXX += x * x;
            }
            
            double slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
            double intercept = (sumY - slope * sumX) / n;
            
            int predicted = (int) Math.round(slope * (n + 1) + intercept);
            predicted = Math.min(100, Math.max(0, predicted));
            
            String trend = "stable";
            if (slope > 1.5) trend = "up";
            else if (slope < -1.5) trend = "down";

            json.append("{")
                .append("\"subject\":\"").append(subjects[i]).append("\",")
                .append("\"currentScore\":").append(currentScore).append(",")
                .append("\"predictedNextTerm\":").append(predicted).append(",")
                .append("\"trend\":\"").append(trend).append("\",")
                .append("\"color\":\"").append(colors[i % colors.length]).append("\",")
                .append("\"slope\":").append(slope)
                .append("}");

            if (i < subjects.length - 1) {
                json.append(",");
            }
        }
        
        json.append("]");
        return json.toString();
    }
}
