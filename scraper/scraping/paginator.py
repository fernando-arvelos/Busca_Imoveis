import re
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException, ElementClickInterceptedException

def paginate_by_url(driver, base_url, page_param_name, selectors):
    """Realiza paginação modificando diretamente a URL."""
    links = []
    current_page = 1
    
    while True:
        # Montar a URL da página atual
        page_url = f"{base_url}?{page_param_name}={current_page}"
        driver.get(page_url)
        print(f"Acessando página {current_page} através da URL: {page_url}")
        
        # Esperar até que os itens do imóvel sejam carregados
        try:
            WebDriverWait(driver, 15).until(
                EC.presence_of_all_elements_located(selectors["property_list_selector"])
            )
        except TimeoutException:
            print(f"Não foi possível carregar a página {current_page}. Finalizando.")
            break
        
        # Coletar os links da página atual
        properties = driver.find_elements(*selectors["property_link_selector"])
        if not properties:
            print("Nenhum imóvel encontrado. Finalizando paginação.")
            break
        
        for property_item in properties:
            link = property_item.get_attribute("href")
            if link and link not in links:
                links.append(link)
        
        # Avançar para a próxima página
        current_page += 1
        print(f"Indo para a página {current_page}.")
    
    return links

def collect_property_links(driver, bank_name, bank_data):
    """Coleta os links dos imóveis na página principal."""
    links = []

    # Obter os seletores específicos para o banco
    selectors = bank_data[bank_name]["selectors"]

    if bank_name == "credito_agricola":
        base_url = bank_data[bank_name]["url"]
        page_param_name = "pn"

        links = paginate_by_url(driver, base_url, page_param_name, selectors)

    else:
    
        while True:
            try:
                # Esperar até que os itens do imóvel sejam carregados
                WebDriverWait(driver, 15).until(
                    EC.presence_of_all_elements_located(selectors["property_list_selector"])
                )
        
                # Coletar todos os elementos de imóvel
                properties = driver.find_elements(*selectors["property_link_selector"])
                print(f"Encontrados {len(properties)} imóveis na página do banco {bank_name}.")
        
                # Coletar os links para cada imóvel
                for property_item in properties:
                    try:
                        link = property_item.get_attribute("href")
                        if link and link not in links:
                            links.append(link)
                        else:
                            print(f"Link duplicado ou não encontrado para um imóvel no banco {bank_name}.")
                    except NoSuchElementException:
                        print(f"Link não encontrado para um imóvel no banco {bank_name}.")
                        continue

                # Se o banco for "santander", aplicar a lógica de paginação personalizada
                if bank_name == "santander":
                    try:
                        # Encontrar a paginação atual e o total de páginas
                        pagination_info = driver.find_element(By.CLASS_NAME, "pager-counter").text
                        print(f"Paginação: {pagination_info}")

                        # Usar regex para extrair números da string
                        match = re.search(r'Página (\d+) de (\d+)', pagination_info)
                        if match:
                            current_page = int(match.group(1))
                            total_pages = int(match.group(2))
                            print(f"Página atual: {current_page} de {total_pages}")
                        else:
                            print("Formato de paginação não reconhecido.")
                            break

                        # Verificar se já estamos na última página
                        if current_page >= total_pages:
                            print("Última página alcançada, encerrando paginação.")
                            break

                    except NoSuchElementException:
                        print(f"Erro ao encontrar informação de paginação no banco {bank_name}.")
                        break

                # Clicar no botão de próxima página
                try:
                    time.sleep(2)
                    driver.execute_script("arguments[0].scrollIntoView();", properties[-1])
                    time.sleep(2)
                    next_button = WebDriverWait(driver, 30).until(
                        EC.element_to_be_clickable(selectors["next_page_selector"])
                    )
                    print("Botão de próxima página encontrado e clicável.")

                    if bank_name == "santander":
                        driver.execute_script("arguments[0].click();", next_button)
                        print("Botão de próxima página clicado com sucesso.")
                        time.sleep(2)
                    else:
                        next_button.click()
                        print("Botão de próxima página clicado com sucesso.")

                    WebDriverWait(driver, 30).until(EC.staleness_of(properties[0]))
                    time.sleep(3)
                except NoSuchElementException:
                    print(f"Elemento não encontrado no banco {bank_name}.")
                    break
                except TimeoutException:
                    print(f"O tempo para encontrar o botão de próxima página excedeu no banco {bank_name}.")
                    break
                except ElementClickInterceptedException:
                    print(f"Erro ao clicar no botão de próxima página no banco {bank_name}.")
                    break

            except Exception as e:
                print(f"Botão de próxima página não encontrado ou não clicável. Finalizando paginação para o banco {bank_name}.")
                break
    
    return links
