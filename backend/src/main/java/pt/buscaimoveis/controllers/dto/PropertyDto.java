package pt.buscaimoveis.controllers.dto;

import pt.buscaimoveis.models.entities.Property;

import java.util.List;

public record PropertyDto(Long id, String natureza, String referência, Double preço_venda, Double preço_aluguel,
                          String distrito, String concelho, String freguesia, String tipologia, Integer area,
                          Integer ano, String banco, String contacto, String email, String telefone,
                          List<String> imagens) {

    public static PropertyDto toPropertyDto(Property property) {
        return new PropertyDto(
                property.getId(),
                property.getNatureza(),
                property.getReferência(),
                safeParseDouble(property.getpreçoVenda()),
                safeParseDouble(property.getpreçoAluguel()),
                property.getDistrito(),
                property.getConcelho(),
                property.getFreguesia(),
                property.getTipologia(),
                safeParseInt(property.getArea()),
                safeParseInt(property.getAno()),
                property.getBanco(),
                property.getContacto(),
                property.getEmail(),
                property.getTelefone(),
                property.getImagens()
        );
    }

    private static Integer safeParseInt(String value) {
        try {
            return (value != null && !value.isEmpty()) ? Integer.valueOf(value) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private static Double safeParseDouble(String value) {
        try {
            return (value != null && !value.isEmpty()) ? Double.valueOf(value) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
