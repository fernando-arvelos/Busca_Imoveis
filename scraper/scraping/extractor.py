from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from scraper.scraping.utils.cleaning_utils import first_line_break, remove_property_keywords, second_line_break
from scraper.scraping.utils.element_utils import get_element_text_or_none


def extract_property_details(driver):
    # Espera para que o iframe seja carregado e o driver possa interagir
    WebDriverWait(driver, 30).until(EC.frame_to_be_available_and_switch_to_it((By.CSS_SELECTOR, "iframe")))
    
    natureza = first_line_break(get_element_text_or_none(driver, By.CLASS_NAME, "propertyDetailNature"))
    referencia = second_line_break(get_element_text_or_none(driver, By.CLASS_NAME, "propertyDetailNature"))
    preco = first_line_break(get_element_text_or_none(driver, By.CLASS_NAME, "propertyDetailPrice"))
    distrito_concelho = get_element_text_or_none(driver, By.XPATH, ".//span[strong='Localização']").split(" /")
    distrito = distrito_concelho[0].strip()
    concelho = distrito_concelho[1].strip()
    freguesia = get_element_text_or_none(driver, By.XPATH, ".//span[strong='Freguesia']")
    tipologia = get_element_text_or_none(driver, By.XPATH, ".//span[strong='Tipologia']")
    area = get_element_text_or_none(driver, By.XPATH, ".//span[strong='Área']")
    venda = get_element_text_or_none(driver, By.XPATH, ".//span[strong='Para']")
    ano = get_element_text_or_none(driver, By.XPATH, ".//span[strong='Ano']")

    """Extrai os dados de uma única propriedade."""
    property_data = {}
    try:
        property_data = {
            'natureza': remove_property_keywords(natureza),
            'referência': remove_property_keywords(referencia),
            'preço': remove_property_keywords(preco),
            "distrito": remove_property_keywords(distrito),
            "concelho": remove_property_keywords(concelho),
            "freguesia": remove_property_keywords(freguesia),
            "tipologia": remove_property_keywords(tipologia),
            "area": remove_property_keywords(area),
            "venda": remove_property_keywords(venda),
            "ano": remove_property_keywords(ano)
        }

        # Extrair todas as imagens da galeria de fotos
        images = [
            img.get_attribute('src')
            for img in driver.find_elements(By.CLASS_NAME, "fotorama__img")
        ]
        property_data['imagens'] = images if images else None

    except NoSuchElementException as e:
        print(f"Erro ao extrair detalhes da propriedade: {e}")

    return property_data
