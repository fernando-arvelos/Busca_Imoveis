from selenium.webdriver.common.by import By

bank_data = {
    "millenium": {
        "url": "https://ind.millenniumbcp.pt/pt/Particulares/viver/Imoveis/Pages/imoveis.aspx#/Search.aspx",
        "iframe_selector": "iframe",
        "element_selector": None,
        "selectors": {
            # Paginação
            "property_list_selector": (By.CLASS_NAME, "searchResultProperty"),
            "property_link_selector": (By.CSS_SELECTOR, "a[id^='MC_realestateList_repRealestates_aContent']"),
            "next_page_selector": (By.ID, "MC_paginator_LinkNextActive"),
            # Extrator de dados
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
    "santander": {
        "url": "https://imoveis.santander.pt/imoveis",
        "iframe_selector": None,
        "element_selector": "list",
        "selectors": {
            # Paginação
            "property_list_selector": (By.CLASS_NAME, "list"),
            "property_link_selector": (By.CLASS_NAME, "info-link"),
            "next_page_selector": (By.CSS_SELECTOR, "a.pager-arrow.pager-arrow--right.fa.fa-arrow-right"),
            # Extrator de dados
            "natureza": (By.CLASS_NAME, "propHeader-price"),
            "referencia": (By.CLASS_NAME, "propHeader-price"),
            "precoVenda": (By.CLASS_NAME, "propHeader-titleBig"),
            "precoAluguel": (By.CLASS_NAME, "naoExiste"),
            "distrito_concelho": (By.CLASS_NAME, "u-stickLeft"),
            "freguesia": (By.CSS_SELECTOR, "span.u-stickLeft.u-stickRight"),
            "tipologia": (By.CSS_SELECTOR, "div.propLayout-col--left div.row p:nth-child(5)"),
            "area": (By.CSS_SELECTOR, "div.propLayout-col--left div.row div:nth-child(3) ul.specs.specs--secondColumn li:nth-child(1) div"),
            "ano": (By.CSS_SELECTOR, "div.propLayout-col--left div.row div:nth-child(3) ul:nth-child(1) li:nth-child(2) div"),
            "contacto": (By.XPATH, ".//p[label='Comercial:']"),
            "email": (By.XPATH, ".//p[label='Email:']"),
            "telefone": (By.XPATH, ".//p[label='Telefone:']"),

            "imagens": (By.CLASS_NAME, "gallery-img"),
        }
    },
}