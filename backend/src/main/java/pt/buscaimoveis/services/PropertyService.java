package pt.buscaimoveis.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.buscaimoveis.controllers.dto.PropertyDto;
import pt.buscaimoveis.models.entities.Property;
import pt.buscaimoveis.models.repositories.PropertyRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public String insertOrUpdateProperties(List<Property> properties) {
        List<Property> allProperties = propertyRepository.findAll();

        List<Property> updatedProperties = new ArrayList<>();

        List<Property> newProperties = new ArrayList<>();

        properties.forEach(property -> {
            Optional<Property> existingPropertyOpt = allProperties.stream()
                    .filter(p -> p.getReferência().equals(property.getReferência()))
                    .findFirst();

            if (existingPropertyOpt.isPresent()) {
                Property existingProperty = existingPropertyOpt.get();
                boolean isUpdated = false;

                if ((existingProperty.getpreçoVenda() == null && property.getpreçoVenda() != null) ||
                        (existingProperty.getpreçoVenda() != null && !existingProperty.getpreçoVenda().equals(property.getpreçoVenda()))) {
                    existingProperty.setpreçoVenda(property.getpreçoVenda());
                    isUpdated = true;
                }

                if ((existingProperty.getpreçoAluguel() == null && property.getpreçoAluguel() != null) ||
                        (existingProperty.getpreçoAluguel() != null && !existingProperty.getpreçoAluguel().equals(property.getpreçoAluguel()))) {
                    existingProperty.setpreçoAluguel(property.getpreçoAluguel());
                    isUpdated = true;
                }

                if (isUpdated) {
                    updatedProperties.add(existingProperty);
                }

            } else {
                newProperties.add(property);
            }
        });

        List<Property> savedNewProperties = propertyRepository.saveAll(newProperties);
        List<Property> savedUpdatedProperties = propertyRepository.saveAll(updatedProperties);

        return String.format("Foram cadastradas %d novas propriedades e atualizadas %d propriedades.",
                savedNewProperties.size(), savedUpdatedProperties.size());
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
