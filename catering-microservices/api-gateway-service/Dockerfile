# ==============================
# Stage 1: Build the application
# ==============================
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy Maven configuration
COPY pom.xml .

# Copy source code
COPY src ./src

# Install Maven and build the Spring Boot application
RUN apt-get update \
    && apt-get install -y maven \
    && mvn clean package -DskipTests \
    && JAR=$(find target -maxdepth 1 -type f -name "*.jar" ! -name "*-plain.jar" ! -name "*.original" | head -n 1) \
    && cp "$JAR" app.jar


# ==============================
# Stage 2: Run the application
# ==============================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built JAR
COPY --from=build /app/app.jar app.jar

# API Gateway port
EXPOSE 8080

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]