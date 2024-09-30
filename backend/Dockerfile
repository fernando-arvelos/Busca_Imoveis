FROM openjdk:21-jdk
WORKDIR /app
COPY src/ src/
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

RUN ./mvnw dependency:go-offline
CMD ["./mvnw", "spring-boot:run"]