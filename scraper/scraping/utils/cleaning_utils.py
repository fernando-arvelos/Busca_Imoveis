import re

# Função para capturar a primeira linha antes da quebra de linha
def first_line_break(text):
    if text:
        # Regex para capturar a primeira linha
        match = re.search(r"^[^\n]+", text)  # Pega tudo antes da primeira quebra de linha
        if match:
            return match.group(0).strip()  # Retorna o valor limpo
    return text.strip() if text else None  # Retorna None se o texto for None


# Função para capturar a segunda linha antes da quebra de linha
def second_line_break(text):
    if not text:
        return text
    
    # Dividir a string em linhas
    lines = text.split("\n")

    # Retorna a segunda linha se existir
    return lines[1].strip() if len(lines) > 1 else text.strip()


# Função para remover palavras-chave de um texto
def remove_property_keywords(text):
    if not text:
        return text
    
    # Lista de palavras-chave a serem removidas
    keywords = ["Ref:", "Localização:", "Freguesia:", "Tipologia:", "Área:", "Para:", "Ano:", "€", "Referência:", "Tipo de imóvel:", "Área Bruta Coberta:", "Ano construção:"]

    # Criar padrão regex com as palavras-chave
    pattern = "|".join(map(re.escape, keywords))

    # Remover as palavras-chave do texto e espaços em branco extras
    cleaned_text = re.sub(pattern, "", text)

    # Remover espaços em branco extras e espaços no início e no final
    return " ".join(cleaned_text.split())  
