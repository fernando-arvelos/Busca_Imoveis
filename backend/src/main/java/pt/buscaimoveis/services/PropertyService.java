package pt.buscaimoveis.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.buscaimoveis.models.entities.Property;
import pt.buscaimoveis.models.repositories.PropertyRepository;

import java.util.List;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<Property> insertProperty(List<Property> properties) {
        return propertyRepository.saveAll(properties);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public List<Property> searchProperties(String distrito, String concelho) {
        if (distrito != null && concelho != null) {
            return propertyRepository.findByDistritoAndConcelho(distrito, concelho);
        } else if (distrito != null) {
            return propertyRepository.findByDistrito(distrito);
        } else if (concelho != null) {
            return propertyRepository.findByConcelho(concelho);
        } else {
            return getAllProperties();
        }
    }

}
