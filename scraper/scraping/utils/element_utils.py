from selenium.common.exceptions import NoSuchElementException

def get_element_text_or_none(driver, by, value):
    """Obtém o texto de um elemento ou retorna None."""
    try:
        element = driver.find_element(by, value)
        return element.text
    except NoSuchElementException:
        return None
    