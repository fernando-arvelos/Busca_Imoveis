package pt.buscaimoveis.models.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "districts")
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_district")
    private String nameDistrict;

    @OneToMany(mappedBy = "district", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Concelho> concelhos;

    public District() {
    }

    public District(Long id, String nameDistrict, List<Concelho> concelhos) {
        this.id = id;
        this.nameDistrict = nameDistrict;
        this.concelhos = concelhos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameDistrict() {
        return nameDistrict;
    }

    public void setNameDistrict(String nameDistrict) {
        this.nameDistrict = nameDistrict;
    }

    public List<Concelho> getConcelhos() {
        return concelhos;
    }

    public void setConcelhos(List<Concelho> concelhos) {
        this.concelhos = concelhos;
        for (Concelho concelho : concelhos) {
            concelho.setDistrict(this); // Relacionar o concelho ao distrito
        }
    }
}
