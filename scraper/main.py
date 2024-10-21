import time
import random
from scraping.dict.bank_data import bank_data
from scraping.driver_setup import setup_driver
from scraping.paginator import collect_property_links
from scraping.extractor import extract_property_details
from export.csv_export import save_to_csv
from export.json_export import save_to_json

def process_bank(bank_name, bank_data):
    # Processa e coleta os links e extrai os 
    print(f"Processando dados para o banco: {bank_name}")

    # Inicializa o driver para cada banco
    driver = setup_driver(bank_name, bank_data)

    try:
        # Coletar os links de todos os imóveis
        property_links = collect_property_links(driver, bank_name, bank_data)
        print(f"Encontrados {len(property_links)} links de imóveis para o banco {bank_name}.")

        extracted_data = []

        # Visitar cada link de imóvel e extrair os dados
        for idx, link in enumerate(property_links):
            print(f"Extraindo dados do imóvel {idx + 1} ({bank_name})...")
            driver.get(link)
            
            # Extrair os detalhes da propriedade
            time.sleep(random.uniform(3, 5))
            property_data = extract_property_details(driver, bank_name, bank_data)
            time.sleep(random.uniform(3, 5))
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
