FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN apt-get update \
    && apt-get install -y maven \
    && mvn clean package -DskipTests \
    && JAR=$(find target -maxdepth 1 -type f -name "*.jar" ! -name "*-plain.jar" ! -name "*.original" | head -n 1) \
    && cp "$JAR" app.jar

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/app.jar app.jar

EXPOSE 8086

ENTRYPOINT ["java", "-jar", "app.jar"]