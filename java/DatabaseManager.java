import java.sql.*;
import java.nio.file.Paths;

public class DatabaseManager {

    private static final String DB_PATH = Paths.get("java", "school_management.db").toAbsolutePath().toString();
    private static final String DB_URL  = "jdbc:sqlite:" + DB_PATH;

    public static Connection getConnection() throws SQLException {
        try { Class.forName("org.sqlite.JDBC"); } catch (ClassNotFoundException e) {
            throw new SQLException("SQLite JDBC driver not found on classpath", e);
        }
        return DriverManager.getConnection(DB_URL);
    }

    public static void initialize() {
        try (Connection conn = getConnection(); Statement stmt = conn.createStatement()) {

            // Enable WAL mode for better concurrent reads
            stmt.execute("PRAGMA journal_mode=WAL;");
            stmt.execute("PRAGMA cache_size=10000;");

            // ── Students table ──────────────────────────────────────
            stmt.execute("""
                CREATE TABLE IF NOT EXISTS students (
                    id       TEXT PRIMARY KEY,
                    name     TEXT NOT NULL,
                    grade    TEXT NOT NULL,
                    roll     TEXT NOT NULL,
                    gpa      REAL DEFAULT 0.0,
                    att      INTEGER DEFAULT 0,
                    status   TEXT DEFAULT 'Active',
                    color    TEXT DEFAULT '#2dd4bf'
                )
            """);

            // ── Teachers table ──────────────────────────────────────
            stmt.execute("""
                CREATE TABLE IF NOT EXISTS teachers (
                    id      TEXT PRIMARY KEY,
                    name    TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    room    TEXT NOT NULL,
                    exp     INTEGER DEFAULT 1
                )
            """);

            // ── Lessons / Schedule table ────────────────────────────
            stmt.execute("""
                CREATE TABLE IF NOT EXISTS lessons (
                    id      TEXT PRIMARY KEY,
                    day     TEXT NOT NULL,
                    time    TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    teacher TEXT NOT NULL,
                    room    TEXT NOT NULL,
                    color   TEXT NOT NULL
                )
            """);

            // ── Grades table ────────────────────────────────────────
            stmt.execute("""
                CREATE TABLE IF NOT EXISTS grades (
                    id         INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_id TEXT NOT NULL,
                    subject    TEXT NOT NULL,
                    term       INTEGER NOT NULL,
                    score      INTEGER NOT NULL,
                    FOREIGN KEY(student_id) REFERENCES students(id)
                )
            """);

            // Seed data only if tables are empty
            ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM students");
            int count = rs.getInt(1);
            if (count == 0) {
                seedStudents(conn);
                seedTeachers(conn);
                seedLessons(conn);
                seedGrades(conn);
                System.out.println("[DB] Database seeded with 500 students!");
            } else {
                System.out.println("[DB] Database already contains " + count + " students.");
            }

        } catch (SQLException e) {
            System.err.println("[DB] Init error: " + e.getMessage());
        }
    }

    private static void seedStudents(Connection conn) throws SQLException {
        String[] firstNames = {
            "Arjun","Priya","Rohan","Ananya","Kiran","Zoya","Vikram","Sneha",
            "Aditya","Kavya","Rahul","Meera","Sanjay","Divya","Riya","Akash",
            "Neha","Vishal","Pooja","Manish","Sonal","Harish","Isha","Gaurav",
            "Anjali","Vinay","Deepa","Nikhil","Shreya","Amit"
        };
        String[] lastNames = {
            "Sharma","Menon","Gupta","Singh","Patel","Khan","Seth","Nair",
            "Joshi","Reddy","Kumar","Mehta","Shah","Mathur","Rao","Das",
            "Verma","Kapoor","Pandey","Bose","Pillai","Iyer","Desai","Mishra",
            "Trivedi","Bhatt","Chatterjee","Saxena","Agarwal","Tiwari"
        };
        String[] grades  = {"09-A","09-B","09-C","10-A","10-B","10-C","11-A","11-B","12-A","12-B"};
        String[] colors  = {"#f5c842","#2dd4bf","#a78bfa","#fb7185","#4ade80","#f59e0b","#0ea5e9"};
        String[] statuses = {"Active","Active","Active","Active","Active","Active","On Leave","Active","Active","Active"};

        conn.setAutoCommit(false);
        PreparedStatement ps = conn.prepareStatement(
            "INSERT OR IGNORE INTO students(id,name,grade,roll,gpa,att,status,color) VALUES(?,?,?,?,?,?,?,?)"
        );

        for (int i = 1; i <= 500; i++) {
            String firstName = firstNames[(i * 7) % firstNames.length];
            String lastName  = lastNames[(i * 13) % lastNames.length];
            String grade     = grades[i % grades.length];
            String color     = colors[i % colors.length];
            String status    = statuses[i % statuses.length];
            double gpa       = Math.round((6.5 + (i % 35) * 0.1) * 100.0) / 100.0;
            int att          = 70 + (i % 31);

            ps.setString(1, String.format("S%03d", i));
            ps.setString(2, firstName + " " + lastName);
            ps.setString(3, grade);
            ps.setString(4, String.format("%02d", i % 45 + 1));
            ps.setDouble(5, Math.min(gpa, 10.0));
            ps.setInt(6, Math.min(att, 100));
            ps.setString(7, status);
            ps.setString(8, color);
            ps.addBatch();
        }
        ps.executeBatch();
        conn.commit();
        conn.setAutoCommit(true);
    }

    private static void seedTeachers(Connection conn) throws SQLException {
        String[][] teachers = {
            {"T001","Dr. Sarah Smith","Mathematics","201","12"},
            {"T002","James Wilson","Physics","Lab 3","8"},
            {"T003","Emily Brown","Chemistry","Lab 1","6"},
            {"T004","Arun Menon","Computer Science","204","5"},
            {"T005","Emma Watson","English","104","10"},
            {"T006","Robert Langdon","History","106","15"},
            {"T007","Dev Singh","Physical Education","Ground","7"},
            {"T008","Frida Kahlo","Fine Arts","Studio","9"},
        };
        PreparedStatement ps = conn.prepareStatement(
            "INSERT OR IGNORE INTO teachers(id,name,subject,room,exp) VALUES(?,?,?,?,?)"
        );
        for (String[] t : teachers) {
            ps.setString(1, t[0]); ps.setString(2, t[1]);
            ps.setString(3, t[2]); ps.setString(4, t[3]);
            ps.setInt(5, Integer.parseInt(t[4]));
            ps.executeUpdate();
        }
    }

    private static void seedLessons(Connection conn) throws SQLException {
        String[][] lessons = {
            {"L001","Mon","08:00","Mathematics","Dr. Sarah Smith","201","#f5c842"},
            {"L002","Mon","09:30","Physics","James Wilson","Lab 3","#2dd4bf"},
            {"L003","Tue","11:00","Chemistry","Emily Brown","Lab 1","#a78bfa"},
            {"L004","Wed","08:00","Computer Science","Arun Menon","204","#fb7185"},
            {"L005","Thu","12:00","English","Emma Watson","104","#4ade80"},
            {"L006","Fri","09:30","History","Robert Langdon","106","#f59e0b"},
            {"L007","Sat","11:00","Physical Education","Dev Singh","Ground","#0ea5e9"},
            {"L008","Tue","08:00","Mathematics","Dr. Sarah Smith","201","#f5c842"},
            {"L009","Wed","14:00","English","Emma Watson","104","#4ade80"},
            {"L010","Thu","09:30","Physics","James Wilson","Lab 3","#2dd4bf"},
        };
        PreparedStatement ps = conn.prepareStatement(
            "INSERT OR IGNORE INTO lessons(id,day,time,subject,teacher,room,color) VALUES(?,?,?,?,?,?,?)"
        );
        for (String[] l : lessons) {
            for (int i = 0; i < l.length; i++) ps.setString(i + 1, l[i]);
            ps.executeUpdate();
        }
    }

    private static void seedGrades(Connection conn) throws SQLException {
        String[] subjects = {"Mathematics","Physics","Chemistry","English","Computer Science","Biology"};
        conn.setAutoCommit(false);
        PreparedStatement ps = conn.prepareStatement(
            "INSERT OR IGNORE INTO grades(student_id,subject,term,score) VALUES(?,?,?,?)"
        );
        for (int s = 1; s <= 500; s++) {
            for (String subject : subjects) {
                int base = 55 + (s % 40);
                ps.setString(1, String.format("S%03d", s));
                ps.setString(2, subject);
                ps.setInt(3, 1); ps.setInt(4, base); ps.addBatch();
                ps.setString(1, String.format("S%03d", s));
                ps.setString(2, subject);
                ps.setInt(3, 2); ps.setInt(4, Math.min(base + 3, 100)); ps.addBatch();
                ps.setString(1, String.format("S%03d", s));
                ps.setString(2, subject);
                ps.setInt(3, 3); ps.setInt(4, Math.min(base + 6, 100)); ps.addBatch();
            }
        }
        ps.executeBatch();
        conn.commit();
        conn.setAutoCommit(true);
    }
}
