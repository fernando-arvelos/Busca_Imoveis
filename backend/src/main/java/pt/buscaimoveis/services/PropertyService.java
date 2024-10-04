package pt.buscaimoveis.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.buscaimoveis.controllers.dto.PropertyDto;
import pt.buscaimoveis.models.entities.Property;
import pt.buscaimoveis.models.repositories.PropertyRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<PropertyDto> insertProperty(List<Property> properties) {
        List<Property> savedProperties = propertyRepository.saveAll(properties);

        return savedProperties.stream()
                .map(PropertyDto::toPropertyDto).toList();
    }

    public List<PropertyDto> getAllProperties() {
        List<Property> getAll = propertyRepository.findAll();
        return getAll.stream()
                .map(PropertyDto::toPropertyDto).toList();
    }

    public List<PropertyDto> searchProperties(String distrito, String concelho) {
        if (distrito != null && concelho != null) {
            List<Property> getDistritoConcelho = propertyRepository.findByDistritoAndConcelho(distrito, concelho);
            return getDistritoConcelho.stream()
                    .map(PropertyDto::toPropertyDto).toList();
        } else if (distrito != null) {
            List<Property> getDistrito = propertyRepository.findByDistrito(distrito);
            return getDistrito.stream()
                    .map(PropertyDto::toPropertyDto).toList();
        } else if (concelho != null) {
            List<Property> getConcelho = propertyRepository.findByConcelho(concelho);
            return getConcelho.stream()
                    .map(PropertyDto::toPropertyDto).toList();
        } else {
            return getAllProperties();
        }
    }

}
