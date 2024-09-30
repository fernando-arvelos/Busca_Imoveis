package pt.buscaimoveis.models.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "property_type")
    private String natureza;

    @Column(name = "reference")
    private String referencia;

    @Column(name = "sale_price")
    private String preco_venda;

    @Column(name = "rental_price")
    private String preco_aluguel;

    @Column(name = "district")
    private String distrito;

    @Column(name = "municipality")
    private String concelho;

    @Column(name = "parish")
    private String freguesia;

    @Column(name = "typology")
    private String tipologia;

    @Column(name = "area")
    private String area;

    @Column(name = "year")
    private String ano;

    @ElementCollection
    @CollectionTable(name = "images", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "imagem_url")
    private List<String> imagens;

    public Property(Long id, String natureza, String referencia, String preco_venda, String preco_aluguel,
                    String distrito, String concelho, String freguesia, String tipologia, String area, String ano,
                    List<String> imagens) {
        this.id = id;
        this.natureza = natureza;
        this.referencia = referencia;
        this.preco_venda = preco_venda;
        this.preco_aluguel = preco_aluguel;
        this.distrito = distrito;
        this.concelho = concelho;
        this.freguesia = freguesia;
        this.tipologia = tipologia;
        this.area = area;
        this.ano = ano;
        this.imagens = imagens;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNatureza() {
        return natureza;
    }

    public void setNatureza(String natureza) {
        this.natureza = natureza;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public String getPreco_venda() {
        return preco_venda;
    }

    public void setPreco_venda(String preco_venda) {
        this.preco_venda = preco_venda;
    }

    public String getPreco_aluguel() {
        return preco_aluguel;
    }

    public void setPreco_aluguel(String preco_aluguel) {
        this.preco_aluguel = preco_aluguel;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getConcelho() {
        return concelho;
    }

    public void setConcelho(String concelho) {
        this.concelho = concelho;
    }

    public String getFreguesia() {
        return freguesia;
    }

    public void setFreguesia(String freguesia) {
        this.freguesia = freguesia;
    }

    public String getTipologia() {
        return tipologia;
    }

    public void setTipologia(String tipologia) {
        this.tipologia = tipologia;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public List<String> getImagens() {
        return imagens;
    }

    public void setImagens(List<String> imagens) {
        this.imagens = imagens;
    }
}
