import time
from scraping.driver_setup import setup_driver
from scraping.paginator import collect_property_links
from scraping.extractor import extract_property_details
from export.csv_export import save_to_csv
from export.json_export import save_to_json

def main():
    driver = setup_driver()
    
    try:
        # Coletar os links de todos os imóveis
        property_links = collect_property_links(driver)

        extracted_data = []

        # Visitar cada link de imóvel e extrair os dados
        for idx, link in enumerate(property_links):
            print(f"Extraindo dados do imóvel {idx + 1}...")
            driver.get(link)
            
            # Extrair os detalhes da propriedade
            time.sleep(2)
            property_data = extract_property_details(driver)
            time.sleep(2)
            extracted_data.append(property_data)

            save_to_csv(extracted_data)
            save_to_json(extracted_data)


        # Exibe os resultados no console
        for data in extracted_data:
            print(data)

    finally:
        driver.quit()

if __name__ == "__main__":
    main()
