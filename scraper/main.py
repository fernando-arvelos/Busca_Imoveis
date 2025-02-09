import time
import random
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from scraping.dict.bank_data import bank_data
from scraping.driver_setup import setup_driver
from scraping.paginator import collect_property_links
from scraping.extractor import extract_property_details
from export.csv_export import save_to_csv
from export.json_export import save_to_json
import json
from selenium.webdriver.chrome.options import Options

logging.basicConfig(level=logging.INFO, filename='errors.log', filemode='a', format='%(asctime)s - %(levelname)s - %(message)s')

# Função para capturar o status HTTP
def get_http_status_from_logs(driver):
    logs = driver.get_log("performance")
    for log in logs:
        try:
            message = json.loads(log["message"])["message"]
            if message["method"] == "Network.responseReceived":
                response = message["params"]["response"]
                status = response.get("status", None)
                url = response.get("url", None)
                headers = response.get("headers", None)
                return status, url, headers
        except Exception as e:
            logging.error(f"Erro ao processar logs de rede: {e}")
    return None, None, None

def process_bank(bank_name, bank_data):
    # Processa e coleta os links e extrai os 
    print(f"Processando dados para o banco: {bank_name}")

    # Configuração para habilitar logs de rede no Chrome
    capabilities = DesiredCapabilities.CHROME
    capabilities["goog:loggingPrefs"] = {"performance": "ALL"}

    # Inicializa o driver para cada banco
    driver = setup_driver(bank_name, bank_data, capabilities)

    try:
        # Coletar os links de todos os imóveis
        property_links = collect_property_links(driver, bank_name, bank_data)
        print(f"Encontrados {len(property_links)} links de imóveis para o banco {bank_name}.")

        extracted_data = []

        # Implementação da mudança de User-Agent
        user_agents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
        ]
        current_user_agent_index = 0

        # Visitar cada link de imóvel e extrair os dados
        for idx, link in enumerate(property_links):
            print(f"Extraindo dados do imóvel {idx + 1} ({bank_name})...")
            driver.get(link)

            # # Obter o código de status HTTP
            # status_code, request_url, headers = get_http_status_from_logs(driver)
            # if status_code != 200:
            #     logging.error(f"Erro HTTP {status_code} para o link: {link}")
            #     logging.error(f"Headers de resposta: {headers}")
            #     print(f"Erro HTTP {status_code} para o imóvel {idx + 1}. Detalhes registrados no log.")
            #     continue
            
            if bank_name == "cgd":
                time.sleep(random.uniform(1, 5))
                property_data = extract_property_details(driver, bank_name, bank_data)
                time.sleep(random.uniform(1, 5))
                extracted_data.append(property_data)

                # Mudar o User-Agent a cada 100 requisições
                if (idx + 1) % 100 == 0:
                    current_user_agent_index = (current_user_agent_index + 1) % len(user_agents)
                    options = Options()
                    options.add_argument(
                        f"user-agent={user_agents[current_user_agent_index]}"
                    )
                    driver.quit()
                    driver = webdriver.Chrome(options=options)
                    print(f"Alterando User-Agent para: {user_agents[current_user_agent_index]}")
            
            else:
                # Extrair os detalhes da propriedade
                time.sleep(3)
                property_data = extract_property_details(driver, bank_name, bank_data)
                time.sleep(3)
                extracted_data.append(property_data)

        # Salvar os dados extraídos em um arquivo CSV e JSON
        # save_to_csv(extracted_data, filename=f"{bank_name}_properties.csv")
        save_to_json(extracted_data, filename=f"{bank_name}_properties.json")

        # Exibe os resultados no console
        for data in extracted_data:
            print(data)

    finally:
        driver.quit()

def main():
    # Iterar sobre cada banco configurado no 'bank_data'
    for bank_name in bank_data.keys():
        process_bank(bank_name, bank_data)

if __name__ == "__main__":
    main()
