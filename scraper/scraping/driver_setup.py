from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

def setup_driver(bank_name, bank_data):

    """Configura o WebDriver para um banco específico."""
    # Configurações do banco
    bank_config = bank_data.get(bank_name)
    if not bank_config:
        raise ValueError(f"Configurações do banco '{bank_name}' não encontradas.")
    
    url = bank_config["url"]
    iframe_selector = bank_config["iframe_selector"]
    element_selector = bank_config["element_selector"]

    """Configura o WebDriver no modo headless."""
    # Definir as opções do Chrome para headless mode
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Executa o Chrome em modo headless
    chrome_options.add_argument("--no-sandbox")  # Necessário para rodar em alguns ambientes, como servidores
    chrome_options.add_argument("--disable-dev-shm-usage")  # Evita problemas de memória compartilhada
    chrome_options.add_argument("--disable-gpu")  # Opcional, desativa GPU (necessário para certos drivers)
    chrome_options.add_argument("--window-size=1920x1080")  # Define o tamanho da janela para evitar problemas de layout
    chrome_options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    )  # Define o user-agent para evitar detecção de bots

    # Desabilita a detecção de automação do Selenium
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)

    # Inicializar o WebDriver com as opções definidas
    driver = webdriver.Chrome(options=chrome_options)

    # Acessar a página inicial
    driver.get(url)
    
    # Se o seletor de iframe for fornecido, espera até que o iframe esteja disponível
    if iframe_selector:
        WebDriverWait(driver, 30).until(EC.frame_to_be_available_and_switch_to_it((By.CSS_SELECTOR, iframe_selector)))

    # Se o seletor de um elemento for fornecido, espera até que ele apareça na página
    if element_selector:
        WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.CSS_SELECTOR, element_selector)))
    
    return driver
