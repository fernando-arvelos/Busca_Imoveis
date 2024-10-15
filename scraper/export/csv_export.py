import csv

def save_to_csv(data, filename='imoveis.csv'):
    """Salva os dados em um arquivo CSV com quebra de linha entre os registros."""
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=['natureza', 'referência', 'preçoVenda', 'preçoAluguel', 'distrito', 'concelho', 'freguesia', 'tipologia', 'area', 'ano', 'imagens', 'banco', 'contacto', 'email', 'telefone', 'descricao'])
        writer.writeheader()
        for row in data:
            writer.writerow(row)
            file.write('\n')
    print(f"Dados exportados com sucesso para {filename}")

