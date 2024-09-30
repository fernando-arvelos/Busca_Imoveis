package pt.buscaimoveis.models.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.buscaimoveis.models.entities.Property;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
}
