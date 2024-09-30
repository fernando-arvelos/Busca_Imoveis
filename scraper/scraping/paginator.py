import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException, ElementClickInterceptedException

def collect_property_links(driver):
    """Coleta os links dos imóveis na página principal."""
    links = []
    
    while True:
        # Esperar até que os itens de imóvel sejam carregados
        WebDriverWait(driver, 15).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "searchResultProperty"))
        )
        
        # Coletar todos os elementos de imóvel
        properties = driver.find_elements(By.CLASS_NAME, "searchResultProperty")
        print(f"Encontrados {len(properties)} imóveis na página inicial.")
        
        # Coletar os links para cada imóvel
        for property_item in properties:
            try:
                link_element = property_item.find_element(By.CSS_SELECTOR, "a[id^='MC_realestateList_repRealestates_aContent']")
                link = link_element.get_attribute("href")
                links.append(link)
            except NoSuchElementException:
                print("Link não encontrado para um imóvel.")
                continue

        try:
            driver.execute_script("arguments[0].scrollIntoView();", properties[-1])
            time.sleep(2)
            next_button = WebDriverWait(driver, 15).until(
                EC.element_to_be_clickable((By.ID, "MC_paginator_LinkNextActive"))
            )
            next_button.click()
            WebDriverWait(driver, 15).until(EC.staleness_of(properties[0]))
            time.sleep(3)
        except (NoSuchElementException, TimeoutException, ElementClickInterceptedException):
            print("Não há mais páginas ou o botão não pôde ser clicado.")
            break
        except Exception as e:
            print("Botão de próxima página não encontrado ou não clicável. Finalizando paginação.")
            break
    
    return links
