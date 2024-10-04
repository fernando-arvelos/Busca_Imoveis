from selenium.webdriver.common.by import By

bank_data = {
    "millenium": {
        "url": "https://ind.millenniumbcp.pt/pt/Particulares/viver/Imoveis/Pages/imoveis.aspx#/Search.aspx",
        "iframe_selector": "iframe",
        "element_selector": None,
        "selectors": {
            "natureza": (By.CLASS_NAME, "propertyDetailNature"),
            "referencia": (By.CLASS_NAME, "propertyDetailNature"),
            "precoVenda": (By.CLASS_NAME, "propertyDetailPrice"),
            "precoAluguel": (By.CLASS_NAME, "naoExiste"),
            "distrito_concelho": (By.XPATH, ".//span[strong='Localização']"),
            "freguesia": (By.XPATH, ".//span[strong='Freguesia']"),
            "tipologia": (By.XPATH, ".//span[strong='Tipologia']"),
            "area": (By.XPATH, ".//span[strong='Área']"),
            "ano": (By.XPATH, ".//span[strong='Ano']"),
            "contacto": (By.XPATH, ".//div[strong='Contacto']"),
            "email": (By.XPATH, ".//div[strong='Email']"),
            "telefone": (By.XPATH, ".//div[strong='Telefone']"),
            "imagens": (By.CLASS_NAME, "fotorama__img"),
        }
    },
}