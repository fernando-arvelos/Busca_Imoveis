FROM openjdk:21-jdk
WORKDIR /app
COPY src/ src/
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

RUN ./mvnw dependency:go-offline
EXPOSE 8080
CMD ["./mvnw", "spring-boot:run"]