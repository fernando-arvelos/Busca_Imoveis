from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from scraping.utils.cleaning_utils import first_line_break, remove_text_keywords, second_line_break, remove_number_keywords
from scraping.utils.element_utils import get_element_text_or_none


def extract_property_details(driver):
    # Espera para que o iframe seja carregado e o driver possa interagir
    WebDriverWait(driver, 30).until(EC.frame_to_be_available_and_switch_to_it((By.CSS_SELECTOR, "iframe")))
    
    natureza = first_line_break(get_element_text_or_none(driver, By.CLASS_NAME, "propertyDetailNature"))
    referencia = second_line_break(get_element_text_or_none(driver, By.CLASS_NAME, "propertyDetailNature"))
    precoVenda = first_line_break(get_element_text_or_none(driver, By.CLASS_NAME, "propertyDetailPrice"))
    precoAluguel = (get_element_text_or_none(driver, By.CLASS_NAME, "naoExiste"))
    distrito_concelho = get_element_text_or_none(driver, By.XPATH, ".//span[strong='Localização']").split(" /")
    distrito = distrito_concelho[0].strip()
    concelho = distrito_concelho[1].strip()
    freguesia = get_element_text_or_none(driver, By.XPATH, ".//span[strong='Freguesia']")
    tipologia = get_element_text_or_none(driver, By.XPATH, ".//span[strong='Tipologia']")
    area = get_element_text_or_none(driver, By.XPATH, ".//span[strong='Área']")
    #venda = get_element_text_or_none(driver, By.XPATH, ".//span[strong='Para']")
    ano = get_element_text_or_none(driver, By.XPATH, ".//span[strong='Ano']")
    banco = "Millennium bcp"
    contacto = get_element_text_or_none(driver, By.XPATH, ".//div[strong='Contacto']")
    email = get_element_text_or_none(driver, By.XPATH, ".//div[strong='Email']")
    telefone = get_element_text_or_none(driver, By.XPATH, ".//div[strong='Telefone']")

    """Extrai os dados de uma única propriedade."""
    property_data = {}
    try:
        property_data = {
            'natureza': remove_text_keywords(natureza),
            'referência': remove_text_keywords(referencia),
            'preçoVenda': float((remove_number_keywords(precoVenda))),
            'preçoAluguel': ((remove_number_keywords(precoAluguel))),
            "distrito": remove_text_keywords(distrito),
            "concelho": remove_text_keywords(concelho),
            "freguesia": remove_text_keywords(freguesia),
            "tipologia": remove_text_keywords(tipologia),
            "area": (remove_number_keywords(area)),
            #"venda": remove_text_keywords(venda),
            "ano": (remove_number_keywords(ano)),
            "banco": (banco),
            "contacto": remove_text_keywords(contacto),
            "email": remove_text_keywords(email),
            "telefone": remove_text_keywords(telefone),
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
