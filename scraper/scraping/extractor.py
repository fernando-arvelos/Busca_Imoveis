from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from scraping.utils.cleaning_utils import clean_first_line, clean_second_line, remove_keywords, remove_number_keywords
from scraping.utils.element_utils import get_element_text_or_none


def extract_property_details(driver, bank_name, bank_data):
    """Extrai detalhes da propriedade de acordo com as configurações específicas do banco."""
    
    # Se o banco usar um iframe, aguardamos que o iframe esteja disponível
    iframe_selector = bank_data[bank_name].get("iframe_selector")
    if iframe_selector:
        WebDriverWait(driver, 30).until(EC.frame_to_be_available_and_switch_to_it((By.CSS_SELECTOR, iframe_selector)))

    selectors = bank_data[bank_name].get("selectors")
    
    # Se o banco for Santander, o campo "natureza" e "referência" estão juntos
    if bank_name == "santander":
        natureza_referencia = remove_keywords(get_element_text_or_none(driver, *selectors["natureza"]), keywords=["Referência:"]).split(" | ")
        natureza = natureza_referencia[0].strip()
        referencia = natureza_referencia[1].strip()
    else:
        natureza = clean_first_line(get_element_text_or_none(driver, *selectors["natureza"]))
        referencia = clean_second_line(get_element_text_or_none(driver, *selectors["referencia"]), keywords=["Ref:"])
    
    precoVenda = clean_first_line(get_element_text_or_none(driver, *selectors["precoVenda"]))
    precoAluguel = get_element_text_or_none(driver, *selectors["precoAluguel"])
    
    distrito_concelho_text = get_element_text_or_none(driver, *selectors["distrito_concelho"])
    if bank_name == "millenium":
        if distrito_concelho_text:
            distrito_concelho = remove_keywords(distrito_concelho_text, keywords=["Localização:"]).split(" /")
            distrito = distrito_concelho[0].strip() if len(distrito_concelho) > 0 else None
            concelho = distrito_concelho[1].strip() if len(distrito_concelho) > 1 else None
        else:
            distrito = None
            concelho = None
    else:
        distrito = None
        concelho = distrito_concelho_text if distrito_concelho_text else None
    
    freguesia = remove_keywords(get_element_text_or_none(driver, *selectors["freguesia"]), keywords=["Freguesia:"])
    tipologia = remove_keywords(get_element_text_or_none(driver, *selectors["tipologia"]), keywords=["Tipologia:", "Tipo de imóvel:"])
    area = get_element_text_or_none(driver, *selectors["area"])
    ano = get_element_text_or_none(driver, *selectors["ano"])
    contacto = remove_keywords(get_element_text_or_none(driver, *selectors["contacto"]), keywords=["Contacto:", "Comercial:"])
    email = remove_keywords(get_element_text_or_none(driver, *selectors["email"]), keywords=["Email:"])
    telefone = remove_keywords(get_element_text_or_none(driver, *selectors["telefone"]), keywords=["Telefone:"])

    """Extrai os dados de uma única propriedade."""
    property_data = {}
    try:
        property_data = {
            'natureza': natureza,
            'referência': referencia,
            'preçoVenda': remove_number_keywords(precoVenda),
            'preçoAluguel': remove_number_keywords(precoAluguel),
            "distrito": distrito,
            "concelho": concelho,
            "freguesia": freguesia,
            "tipologia": tipologia,
            "area": remove_number_keywords(area),
            "ano": remove_number_keywords(ano),
            "banco": bank_name.capitalize(),
            "contacto": contacto,
            "email": email,
            "telefone": telefone,
        }

        # Extrair todas as imagens da galeria de fotos
        imagens_selector = selectors.get("imagens")
        if imagens_selector:
            images = [
                img.get_attribute('src')
                for img in driver.find_elements(*imagens_selector)
            ]
            property_data['imagens'] = images if images else None

    except NoSuchElementException as e:
        print(f"Erro ao extrair detalhes da propriedade: {e}")

    return property_data
