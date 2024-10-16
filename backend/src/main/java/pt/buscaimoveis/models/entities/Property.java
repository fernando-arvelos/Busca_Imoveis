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
    private String referência;

    @Column(name = "sale_price")
    private Double preçoVenda;

    @Column(name = "rental_price")
    private Double preçoAluguel;

    @Column(name = "district")
    private String distrito;

    @Column(name = "municipality")
    private String concelho;

    @Column(name = "parish")
    private String freguesia;

    @Column(name = "typology")
    private String tipologia;

    @Column(name = "area")
    private Integer area;

    @Column(name = "year")
    private Integer ano;

    @Column(name = "bank")
    private String banco;

    @Column(name = "contact")
    private String contacto;

    @Column(name = "email")
    private String email;

    @Column(name = "telephone")
    private String telefone;

    @Column(name = "descricao", columnDefinition = "TEXT")
    private String descricao;

    @ElementCollection
    @CollectionTable(name = "images", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "imagem_url")
    private List<String> imagens;

    public Property() {
    }

    public Property(Long id, String natureza, String referência, Double preçoVenda, Double preçoAluguel,
                    String distrito, String concelho, String freguesia, String tipologia, Integer area,
                    Integer ano, String banco, String contacto, String email, String telefone, String descricao, List<String> imagens) {
        this.id = id;
        this.natureza = natureza;
        this.referência = referência;
        this.preçoVenda = preçoVenda;
        this.preçoAluguel = preçoAluguel;
        this.distrito = distrito;
        this.concelho = concelho;
        this.freguesia = freguesia;
        this.tipologia = tipologia;
        this.area = area;
        this.ano = ano;
        this.banco = banco;
        this.contacto = contacto;
        this.email = email;
        this.telefone = telefone;
        this.descricao = descricao;
        this.imagens = imagens;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getNatureza() { return natureza; }

    public void setNatureza(String natureza) { this.natureza = natureza; }

    public String getReferência() { return referência; }

    public void setReferência(String referência) { this.referência = referência; }

    public Double getpreçoVenda() { return preçoVenda; }

    public void setpreçoVenda(Double preçoVenda) { this.preçoVenda = preçoVenda; }

    public Double getpreçoAluguel() { return preçoAluguel; }

    public void setpreçoAluguel(Double preçoAluguel) { this.preçoAluguel = preçoAluguel; }

    public String getDistrito() { return distrito; }

    public void setDistrito(String distrito) { this.distrito = distrito; }

    public String getConcelho() { return concelho; }

    public void setConcelho(String concelho) { this.concelho = concelho; }

    public String getFreguesia() { return freguesia; }

    public void setFreguesia(String freguesia) { this.freguesia = freguesia; }

    public String getTipologia() {  return tipologia; }

    public void setTipologia(String tipologia) { this.tipologia = tipologia; }

    public Integer getArea() { return area; }

    public void setArea(Integer area) { this.area = area; }

    public Integer getAno() { return ano; }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getBanco() {
        return banco;
    }

    public void setBanco(String banco) {
        this.banco = banco;
    }

    public String getContacto() {
        return contacto;
    }

    public void setContacto(String contacto) {
        this.contacto = contacto;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getDescricao() { return descricao; }

    public void setDescricao(String descricao) { this.descricao = descricao; }

    public List<String> getImagens() {
        return imagens;
    }

    public void setImagens(List<String> imagens) {
        this.imagens = imagens;
    }
}
