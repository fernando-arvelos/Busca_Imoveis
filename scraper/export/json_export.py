import json

def save_to_json(data, filename='imoveis.json'):
    """Salva os dados em um arquivo JSON."""
    with open(filename, mode='w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)
    print(f"Dados exportados com sucesso para {filename}")
