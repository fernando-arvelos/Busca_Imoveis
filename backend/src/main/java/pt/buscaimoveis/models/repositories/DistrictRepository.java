package pt.buscaimoveis.models.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.buscaimoveis.models.entities.District;

@Repository
public interface DistrictRepository extends JpaRepository<District, Long> {

    boolean existsByNameDistrict(String nameDistrict);
}
