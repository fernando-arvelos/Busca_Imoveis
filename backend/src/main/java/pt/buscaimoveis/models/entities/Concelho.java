package pt.buscaimoveis.models.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "concelhos")
public class Concelho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_concelho")
    private String nameConcelho;

    @ManyToOne
    @JoinColumn(name = "district_id", nullable = false)
    private District district;

    public Concelho() {
    }

    public Concelho(String nameConcelho, District district) {
        this.nameConcelho = nameConcelho;
        this.district = district;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameConcelho() {
        return nameConcelho;
    }

    public void setNameConcelho(String nameConcelho) {
        this.nameConcelho = nameConcelho;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }
}
