@echo off
echo =======================================================
echo   Starting School Management Spring Boot Backend
echo =======================================================
cd backend
if not exist "mvnw" (
    echo [ERROR] Maven Wrapper not found. Please ensure you are in the project root.
    echo If you have Maven installed, you can run: mvn spring-boot:run
) else (
    ./mvnw spring-boot:run
)
pause
