# ==============================
# Stage 1: Build the application
# ==============================
FROM maven:3.9.16-eclipse-temurin-21 AS build

WORKDIR /app

# Copy Maven configuration
COPY pom.xml .

# Copy source code
COPY src ./src

# Build Spring Boot application
RUN mvn clean package -DskipTests \
    && JAR=$(find target -maxdepth 1 -type f -name "*.jar" \
    ! -name "*-plain.jar" \
    ! -name "*.original" | head -n 1) \
    && cp "$JAR" app.jar


# ==============================
# Stage 2: Run the application
# ==============================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy built JAR
COPY --from=build /app/app.jar app.jar

# Eureka Server port
EXPOSE 8761

# Start Eureka Server
ENTRYPOINT ["java", "-jar", "app.jar"]