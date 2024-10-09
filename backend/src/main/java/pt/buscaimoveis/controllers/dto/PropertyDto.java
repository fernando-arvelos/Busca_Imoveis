package pt.buscaimoveis.controllers.dto;

import pt.buscaimoveis.models.entities.Property;

import java.util.List;

public record PropertyDto(Long id, String natureza, String referência, String preçoVenda, String preçoAluguel,
                          String distrito, String concelho, String freguesia, String tipologia, String area,
                          String ano, String banco, String contacto, String email, String telefone,
                          List<String> imagens) {

    public Property toEntity() {
        Property property = new Property();
        property.setNatureza(this.natureza);
        property.setReferência(this.referência);
        property.setpreçoVenda(parseDouble(this.preçoVenda));
        property.setpreçoAluguel(parseDouble(this.preçoAluguel));
        property.setDistrito(this.distrito);
        property.setConcelho(this.concelho);
        property.setFreguesia(this.freguesia);
        property.setTipologia(this.tipologia);
        property.setArea(parseInteger(this.area));
        property.setAno(parseInteger(this.ano));
        property.setBanco(this.banco);
        property.setContacto(this.contacto);
        property.setEmail(this.email);
        property.setTelefone(this.telefone);
        property.setImagens(this.imagens);
        return property;
    }

    // Métodos auxiliares para conversão
    private Double parseDouble(String value) {
        try {
            return value != null ? Double.parseDouble(value) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private Integer parseInteger(String value) {
        try {
            return value != null ? Integer.parseInt(value) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
