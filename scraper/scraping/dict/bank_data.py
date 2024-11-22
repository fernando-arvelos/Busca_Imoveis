from selenium.webdriver.common.by import By

bank_data = {
    # # "millenium": {
    # #     "url": "https://ind.millenniumbcp.pt/pt/Particulares/viver/Imoveis/Pages/imoveis.aspx#/Search.aspx",
    # #     "iframe_selector": "iframe",
    # #     "element_selector": None,
    # #     "selectors": {
    # #         Paginação
    # #         "property_list_selector": (By.CLASS_NAME, "searchResultProperty"),
    # #         "property_link_selector": (By.CSS_SELECTOR, "a[id^='MC_realestateList_repRealestates_aContent']"),
    # #         "next_page_selector": (By.ID, "MC_paginator_LinkNextActive"),
    # #         Extrator de dados
    # #         "natureza": (By.CLASS_NAME, "propertyDetailNature"),
    # #         "referencia": (By.CLASS_NAME, "propertyDetailNature"),
    # #         "precoVenda": (By.CLASS_NAME, "propertyDetailPrice"),
    # #         "precoAluguel": (By.CLASS_NAME, "naoExiste"),
    # #         "distrito_concelho": (By.XPATH, ".//span[strong='Localização']"),
    # #         "freguesia": (By.XPATH, ".//span[strong='Freguesia']"),
    # #         "tipologia": (By.XPATH, ".//span[strong='Tipologia']"),
    # #         "area": (By.XPATH, ".//span[strong='Área']"),
    # #         "ano": (By.XPATH, ".//span[strong='Ano']"),
    # #         "contacto": (By.XPATH, ".//div[strong='Contacto']"),
    # #         "email": (By.XPATH, ".//div[strong='Email']"),
    # #         "telefone": (By.XPATH, ".//div[strong='Telefone']"),
    # #         "imagens": (By.CLASS_NAME, "fotorama__img"),
    # #         "descricao": (By.CSS_SELECTOR, "div.propertyDescription > p"),
    # #     }
    # # },
    # # "santander": {
    # #     "url": "https://imoveis.santander.pt/imoveis",
    # #     "iframe_selector": None,
    # #     "element_selector": "list",
    # #     "selectors": {
    # #         Paginação
    # #         "property_list_selector": (By.CLASS_NAME, "list"),
    # #         "property_link_selector": (By.CLASS_NAME, "info-link"),
    # #         "next_page_selector": (By.CSS_SELECTOR, "a.pager-arrow.pager-arrow--right.fa.fa-arrow-right"),
    # #         Extrator de dados
    # #         "natureza": (By.CLASS_NAME, "propHeader-price"),
    # #         "referencia": (By.CLASS_NAME, "propHeader-price"),
    # #         "precoVenda": (By.CLASS_NAME, "propHeader-titleBig"),
    # #         "precoAluguel": (By.CLASS_NAME, "naoExiste"),
    # #         "distrito_concelho": (By.CLASS_NAME, "u-stickLeft"),
    # #         "freguesia": (By.CSS_SELECTOR, "span.u-stickLeft.u-stickRight"),
    # #         "tipologia": (By.CSS_SELECTOR, "div.propLayout-col--left div.row p:nth-child(5)"),
    # #         "area": (By.CSS_SELECTOR, "div.propLayout-col--left div.row div:nth-child(3) ul.specs.specs--secondColumn li:nth-child(1) div"),
    # #         "ano": (By.CSS_SELECTOR, "div.propLayout-col--left div.row div:nth-child(3) ul:nth-child(1) li:nth-child(2) div"),
    # #         "contacto": (By.XPATH, ".//p[label='Comercial:']"),
    # #         "email": (By.XPATH, ".//p[label='Email:']"),
    # #         "telefone": (By.XPATH, ".//p[label='Telefone:']"),
    # #         "imagens": (By.CLASS_NAME, "gallery-img"),
    # #         "descricao": (By.CSS_SELECTOR, "body > div.layout > div.layout-fullRow > div.propLayout.clearfix > div > div.propLayout-col.propLayout-col--left > div.row > div:nth-child(1) p"),
    # #     }
    # # },
    # # "credito_agricola": {
    # #     "url": "https://www.caimoveis.pt/Pesquisar/",
    # #     "iframe_selector": None,
    # #     "element_selector": "properties-results",
    # #     "selectors": {
    # #         Paginação
    # #         "property_list_selector": (By.CLASS_NAME, "properties-results"),
    # #         "property_link_selector": (By.CSS_SELECTOR, ".property-item a"),
    # #         "next_page_selector": (By.ID, "MC_paginator_LinkNextActive"),
    # #         Extrator de dados
    # #         "natureza": (By.XPATH, ".//span[text()='Natureza:']/following-sibling::h3"),
    # #         "referencia": (By.XPATH, ".//span[text()='Referência:']/following-sibling::span"),
    # #         "precoVenda": (By.CLASS_NAME, "price"),
    # #         "precoAluguel": (By.CLASS_NAME, "price"),
    # #         "distrito_concelho": (By.XPATH, ".//span[strong='Localização']"),
    # #         "distrito": (By.XPATH, ".//span[text()='Distrito:']/following-sibling::h3"),
    # #         "concelho": (By.XPATH, ".//span[text()='Concelho:']/following-sibling::h3"),
    # #         "freguesia": (By.XPATH, ".//span[text()='Freguesia:']/following-sibling::span"),
    # #         "tipologia": (By.XPATH, ".//span[text()='Tipologia:']/following-sibling::h3"),
    # #         "area": (By.XPATH, ".//span[text()='Área:']/following-sibling::span"),
    # #         "ano": (By.XPATH, ".//span[text()='Ano de construção:']/following-sibling::span"),
    # #         "contacto": (By.XPATH, "/html/body/div[2]/div/div[5]/div[2]/div[2]/span"),
    # #         "email": (By.XPATH, ".//div[strong='Email']"),
    # #         "telefone": (By.XPATH, "/html/body/div[2]/div/div[5]/div[2]/div[3]/span"),
    # #         "imagens": (By.CLASS_NAME, "fotorama__img"),
    # #         "descricao": (By.CSS_SELECTOR, "div.property-description > h3"),
    # #     }
    # # },
    # # "montepio": {
    # #     "url": "https://imoveismontepio.pt/Comprar/",
    # #     "iframe_selector": None,
    # #     "element_selector": "content",
    # #     "selectors": {
    # #         Paginação
    # #         "property_list_selector": (By.CLASS_NAME, "content "),
    # #         "property_link_selector": (By.CSS_SELECTOR, ".searchProperties > .property > a"),
    # #         "next_page_selector": (By.CSS_SELECTOR, "a.pager-arrow.pager-arrow--right.fa.fa-arrow-right"),
    # #         Extrator de dados
    # #         "natureza": (By.CLASS_NAME, "detailTitle"),
    # #         "referencia": (By.CSS_SELECTOR, ".detailFeaturesList > li:nth-child(1)"),
    # #         "precoVenda": (By.CLASS_NAME, "detailPrice"),
    # #         "precoAluguel": (By.CLASS_NAME, "naoExiste"),
    # #         "distrito_concelho": (By.CLASS_NAME, "detailLocation"),
    # #         "freguesia": (By.CLASS_NAME, "detailLocation"),
    # #         "tipologia": (By.CLASS_NAME, "detailTitle"),
    # #         "area": (By.XPATH, "//li[contains(text(), 'Área:')]"),
    # #         "ano": (By.XPATH, ".//span[strong='Ano']"),
    # #         "contacto": (By.CLASS_NAME, "naoExiste"),
    # #         "email": (By.CLASS_NAME, "naoExiste"),
    # #         "telefone": (By.CLASS_NAME, "naoExiste"),
    # #         "imagens": (By.CLASS_NAME, "fotorama__img"),
    # #         "descricao": (By.CSS_SELECTOR, "div.detailDescriptionText > p"),
    # #     }
    # # },
    "cgd": {
        "url": "https://www.caixaimobiliario.pt/comprar/imoveis-venda.jsp?op=comprar&pgnr=1&ofs=&rsnr=&pgsz=&listing=&ordby=&dc=0&tptpl=0&pcmax=0&pcmin=-1&f=0&armin=0",
        "iframe_selector": None,
        "element_selector": "mod_imovel",
        "selectors": {
            # Paginação
            # # "property_list_selector": (By.ID, "mod_imovel"),
            "property_list_selector": (By.ID, "central"),
            "property_link_selector": (By.CSS_SELECTOR, "div#central > div > div.mod_imovel > a"),
            "next_page_selector": (By.CLASS_NAME, "clic_front"),
            # Extrator de dados
            "natureza": (By.CSS_SELECTOR, "div.tab_id_descricao > h1 > div"),
            "referencia": (By.CSS_SELECTOR, ".tab_id_ref-social > p"),
            "precoVenda": (By.CLASS_NAME, "propertyDetailPrice"),
            "precoAluguel": (By.CLASS_NAME, "naoExiste"),
            "distrito_concelho": (By.XPATH, ".//span[strong='Localização']"),
            "freguesia": (By.CSS_SELECTOR, "div.tab_id_descricao > p"),
            "tipologia": (By.CSS_SELECTOR, "div.tab_id_descricao > h1 > div"),
            "area": (By.XPATH, "//div[contains(@class, 'config_linha1')][contains(text(), 'Área')]"),
            "ano": (By.XPATH, ".//span[strong='Ano']"),
            "contacto": (By.XPATH, ".//div[strong='Contacto']"),
            "email": (By.CSS_SELECTOR, "div.mod_footer > p > a"),
            "telefone": (By.CSS_SELECTOR, "div.mod_footer > p > span"),
            "imagens": (By.CSS_SELECTOR, "#imovel_imagens a img"),
            "descricao": (By.CSS_SELECTOR, "div.mod_caract > p"),
        }
    },
    # # este banco não estou conseguindo encontrar os itens e links iniciais
    # # "bankinter": {
    # #     "url": "https://www.bankinter.pt/www/pt-pt/cgi/ebk+pt+inmuebles+listado?",
    # #     "iframe_selector": None,
    # #     "element_selector": "center",
    # #     "selectors": {
    # #         # Paginação
    # #         "property_list_selector": (By.CLASS_NAME, "center"),
    # #         "property_link_selector": (By.CSS_SELECTOR, "tbody > tr > td > a"),
    # #         "next_page_selector": (By.ID, "MC_paginator_LinkNextActive"),
    # #         # Extrator de dados
    # #         "natureza": (By.CLASS_NAME, "propertyDetailNature"),
    # #         "referencia": (By.CLASS_NAME, "propertyDetailNature"),
    # #         "precoVenda": (By.CLASS_NAME, "propertyDetailPrice"),
    # #         "precoAluguel": (By.CLASS_NAME, "naoExiste"),
    # #         "distrito_concelho": (By.XPATH, ".//span[strong='Localização']"),
    # #         "freguesia": (By.XPATH, ".//span[strong='Freguesia']"),
    # #         "tipologia": (By.XPATH, ".//span[strong='Tipologia']"),
    # #         "area": (By.XPATH, ".//span[strong='Área']"),
    # #         "ano": (By.XPATH, ".//span[strong='Ano']"),
    # #         "contacto": (By.XPATH, ".//div[strong='Contacto']"),
    # #         "email": (By.XPATH, ".//div[strong='Email']"),
    # #         "telefone": (By.XPATH, ".//div[strong='Telefone']"),
    # #         "imagens": (By.CLASS_NAME, "fotorama__img"),
    # #         "descricao": (By.CSS_SELECTOR, "div.propertyDescription > p"),
    # #     }
    # # },
}