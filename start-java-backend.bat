@echo off
setlocal
cd /d "%~dp0"

echo =======================================================
echo   School Management System - Java Backend Setup
echo =======================================================

set JDBC_JAR=java\sqlite-jdbc.jar
set JDBC_URL=https://repo1.maven.org/maven2/org/xerial/sqlite-jdbc/3.36.0.3/sqlite-jdbc-3.36.0.3.jar

REM Download SQLite JDBC driver if not present
if not exist "%JDBC_JAR%" (
    echo [1/3] Downloading SQLite JDBC driver...
    powershell -Command "Invoke-WebRequest -Uri '%JDBC_URL%' -OutFile '%JDBC_JAR%'"
    if %errorlevel% neq 0 (
        echo ERROR: Failed to download SQLite JDBC. Check internet connection.
        pause & exit /b 1
    )
    echo     Done.
) else (
    echo [1/3] SQLite JDBC driver found.
)

REM Create output directory
if not exist "java\out" mkdir java\out

REM Compile all Java files
echo [2/3] Compiling Java source files...
javac -cp "%JDBC_JAR%" java\DatabaseManager.java java\SchoolManagementServer.java -d java\out
if %errorlevel% neq 0 (
    echo ERROR: Compilation failed.
    pause & exit /b 1
)
echo     Compiled successfully.

REM Kill any old instance on 8080
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8080"') do (
    taskkill /F /PID %%a >nul 2>&1
)

REM Start server
echo [3/3] Starting Java School Management Server on http://localhost:8080 ...
echo       Thread pool: 50 workers - handles 500 concurrent users
echo.
java -cp "java\out;%JDBC_JAR%" SchoolManagementServer

pause
