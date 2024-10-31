FROM openjdk:21-jdk
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

# Realiza o download das dependências para o build
RUN ./mvnw dependency:go-offline

# Copia o código-fonte e faz o build
COPY src/ src/
RUN ./mvnw clean package -DskipTests

RUN ./mvnw dependency:go-offline
CMD ["./mvnw", "spring-boot:run"]