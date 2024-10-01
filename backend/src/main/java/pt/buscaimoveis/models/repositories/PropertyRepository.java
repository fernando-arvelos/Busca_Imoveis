package pt.buscaimoveis.models.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.buscaimoveis.models.entities.Property;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByDistrito(String distrito);

    List<Property> findByConcelho(String concelho);

    List<Property> findByDistritoAndConcelho(String distrito, String concelho);
}
