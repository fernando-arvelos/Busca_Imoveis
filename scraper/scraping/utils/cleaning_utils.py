import re

def clean_text(text, keywords=None, line_break=None):
    """Remove palavras-chave e espaços extras de um texto, e captura linha específica antes ou após quebras de linha."""
    if not text:
        return None

    # Remover palavras-chave se forem fornecidas
    if keywords:
        pattern = "|".join(map(re.escape, keywords))
        text = re.sub(pattern, "", text)

    # Dividir o texto em linhas se for solicitado
    if line_break is not None:
        lines = text.split("\n")
        if 0 <= line_break < len(lines):
            text = lines[line_break].strip()
        else:
            return None

    # Limpar espaços em branco extras
    return " ".join(text.split()).strip()

# Funções utilitárias baseadas no `clean_text`
def clean_first_line(text, keywords=None):
    return clean_text(text, keywords, line_break=0)

def clean_second_line(text, keywords=None):
    return clean_text(text, keywords, line_break=1)

def remove_keywords(text, keywords):
    return clean_text(text, keywords)

def remove_number_keywords(text):
    # Aqui é uma função de limpeza de números com palavras-chave específicas
    keywords = ["Área:", "€", "Área Bruta Coberta:", "Ano construção:", "Ano:", "m²", " ", " --"]
    return clean_text(text, keywords)



# # Função para capturar a primeira linha antes da quebra de linha
# def first_line_break(text):
#     if text:
#         # Regex para capturar a primeira linha
#         match = re.search(r"^[^\n]+", text)  # Pega tudo antes da primeira quebra de linha
#         if match:
#             return match.group(0).strip()  # Retorna o valor limpo
#     return text.strip() if text else None  # Retorna None se o texto for None


# # Função para capturar a segunda linha antes da quebra de linha
# def second_line_break(text):
#     if not text:
#         return text
    
#     # Dividir a string em linhas
#     lines = text.split("\n")

#     # Retorna a segunda linha se existir
#     return lines[1].strip() if len(lines) > 1 else text.strip()


# # Função para remover palavras-chave de um texto
# def remove_text_keywords(text):
#     if not text:
#         return text
    
#     # Lista de palavras-chave a serem removidas
#     keywords = ["Ref:", "Localização:", "Freguesia:", "Tipologia:", "Para:", "Referência:", "Tipo de imóvel:", "Ano:", "Contacto:", "Email:", "Telefone:"]

#     # Criar padrão regex com as palavras-chave
#     pattern = "|".join(map(re.escape, keywords))

#     # Remover as palavras-chave do texto e espaços em branco extras
#     cleaned_text = re.sub(pattern, "", text)

#     # Remover espaços em branco extras e espaços no início e no final
#     return " ".join(cleaned_text.split())  

# # Função para retirar espaço em branco dos valores
# def remove_number_keywords(text):
#     if not text:
#         return text
    
#     # Lista de palavras-chave a serem removidas
#     keywords = ["Área:", "€", "Área Bruta Coberta:", "Ano construção:", "Ano:", "m²", " ", " --"]

#     # Criar padrão regex com as palavras-chave
#     pattern = "|".join(map(re.escape, keywords))

#     # Remover as palavras-chave do texto e espaços em branco extras
#     cleaned_text = re.sub(pattern, "", text)

#     # Remover espaços em branco extras e espaços no início e no final
#     return " ".join(cleaned_text.split())  

