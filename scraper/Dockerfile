# Usando uma imagem base do Python
FROM python:3.10.12-slim

# Definindo variáveis de ambiente
ENV DEBIAN_FRONTEND=noninteractive

# Instalando dependências necessárias
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    libnss3 \
    libgconf-2-4 \
    libxss1 \
    libappindicator3-1 \
    fonts-liberation \
    libasound2 \
    xdg-utils \
    libgbm1 \
    libu2f-udev \
    && apt-get clean

# Baixar o Chrome for Testing
RUN wget -q https://storage.googleapis.com/chrome-for-testing-public/129.0.6668.89/linux64/chrome-headless-shell-linux64.zip -O /tmp/chrome-headless.zip \
    && unzip /tmp/chrome-headless.zip -d /opt/ \
    && rm /tmp/chrome-headless.zip

# Adicionar o Chrome ao PATH
ENV PATH="/opt/chrome-headless-shell-linux64:${PATH}"

# Baixar o Chromedriver
RUN wget -q https://storage.googleapis.com/chrome-for-testing-public/129.0.6668.89/linux64/chromedriver-linux64.zip -O /tmp/chromedriver.zip \
    && unzip /tmp/chromedriver.zip -d /opt/ \
    && rm /tmp/chromedriver.zip

# Adicionar o Chromedriver ao PATH
ENV PATH="/opt/chromedriver-linux64:${PATH}"

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de requisitos
COPY requirements.txt .

# Instalar as dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o código do scraping
COPY . .

# Comando padrão ao iniciar o container
CMD ["python", "main.py"]
