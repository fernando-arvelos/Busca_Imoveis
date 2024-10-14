package pt.buscaimoveis.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.buscaimoveis.models.entities.Property;
import pt.buscaimoveis.models.repositories.PropertyRepository;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
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

    public List<Property> searchProperties(String distrito, String concelho,
                                           Double minV, Double maxV,
                                           Double minL, Double maxL,
                                           Integer minA, Integer maxA) {
        List<Property> properties = propertyRepository.findAll();

        return properties.stream()
                .filter(property -> isNullOrEmpty(distrito) ||
                        isNullOrMatches(distrito, property.getDistrito()))
                .filter(property -> isNullOrEmpty(concelho) ||
                        isNullOrMatches(concelho, property.getConcelho()))
                .filter(property -> minV == null ||
                        (property.getpreçoVenda() != null &&
                                property.getpreçoVenda() >= minV))
                .filter(property -> maxV == null ||
                        (property.getpreçoVenda() != null &&
                                property.getpreçoVenda() <= maxV))
                .filter(property -> minL == null ||
                        (property.getpreçoAluguel() != null &&
                                property.getpreçoAluguel() >= minL))
                .filter(property -> maxL == null ||
                        (property.getpreçoAluguel() != null &&
                                property.getpreçoAluguel() <= maxL))
                .filter(property -> minA == null ||
                        (property.getArea() != null &&
                                property.getArea() >= minA))
                .filter(property -> maxA == null ||
                        (property.getArea() != null &&
                                property.getArea() <= maxA))
                .toList();
    }

    private boolean isNullOrEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }

    private boolean isNullOrMatches(String filterValue, String propertyValue) {
        if (isNullOrEmpty(filterValue)) return true;
        if (propertyValue == null) return false;
        return normalizeString(filterValue).equals(normalizeString(propertyValue));
    }

    private String normalizeString(String value) {
        return Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT);
    }
}
