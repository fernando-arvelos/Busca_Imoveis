package pt.buscaimoveis.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.buscaimoveis.models.entities.Property;
import pt.buscaimoveis.models.repositories.PropertyRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public void insertOrUpdateProperties(List<Property> properties) {
        List<Property> allProperties = propertyRepository.findAll();
        List<Property> allBankProperties = allProperties.stream()
                .filter(property -> property.getBanco().equals(properties.getFirst().getBanco()))
                .toList();

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

                if ((existingProperty.getArea() == null && property.getArea() != null) ||
                        (existingProperty.getArea() != null && !existingProperty.getArea().equals(property.getArea()))) {
                    existingProperty.setArea(property.getArea());
                    isUpdated = true;
                }

                if ((existingProperty.getAno() == null && property.getAno() != null) ||
                        (existingProperty.getAno() != null && !existingProperty.getAno().equals(property.getAno()))) {
                    existingProperty.setAno(property.getAno());
                    isUpdated = true;
                }

                if (isUpdated) {
                    updatedProperties.add(existingProperty);
                }

            } else {
                newProperties.add(property);
            }
        });

        List<Property> propertiesToDelete = allBankProperties.stream()
                .filter(property -> properties.stream()
                        .noneMatch(p -> p.getReferência().equals(property.getReferência())))
                .toList();

        if (!propertiesToDelete.isEmpty()) {
            propertyRepository.deleteAll(propertiesToDelete);
        }

        propertyRepository.saveAll(newProperties);
        propertyRepository.saveAll(updatedProperties);
    }


    public List<Property> getAllProperties() {
        return propertyRepository.findAll();

    }

    public List<Property> searchDistritoConcelhoProperties(String distrito, String concelho) {
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

    public List<Property> searchPrecoVendaProperties(Double min, Double max) {
        if (min == null) {
            min = 0.0;
        } else if (max == null) {
            max = Double.MAX_VALUE;
        }
        return propertyRepository.findByPreçoVendaBetween(min, max);
    }

    public List<Property> searchPrecoAluguelProperties(Double min, Double max) {
        if (min == null) {
            min = 0.0;
        } else if (max == null) {
            max = Double.MAX_VALUE;
        }
        return propertyRepository.findByPreçoAluguelBetween(min, max);
    }

    public List<Property> searchAreaProperties(Integer min, Integer max) {
        if (min == null) {
            min = 0;
        } else if (max == null) {
            max = Integer.MAX_VALUE;
        }
        return propertyRepository.findByAreaBetween(min, max);
    }
}
