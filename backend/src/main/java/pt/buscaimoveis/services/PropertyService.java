package pt.buscaimoveis.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.buscaimoveis.models.entities.Property;
import pt.buscaimoveis.models.repositories.PropertyRepository;

import java.text.Normalizer;
import java.util.*;
import java.util.function.Consumer;
import java.util.function.Supplier;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public void insertOrUpdateProperties(List<Property> properties) {
        List<Property> allProperties = propertyRepository.findAll();
        String banco = properties.getFirst().getBanco();

        List<Property> allBankProperties = filterPropertiesByBank(allProperties, banco);
        List<Property> updatedProperties = new ArrayList<>();
        List<Property> newProperties = new ArrayList<>();

        properties.forEach(property -> {
            Optional<Property> existingPropertyOpt = findPropertyByReference(allProperties, property.getReferência());

            if (existingPropertyOpt.isPresent()) {
                Property existingProperty = existingPropertyOpt.get();
                if (updateProperty(existingProperty, property)) {
                    updatedProperties.add(existingProperty);
                }
            } else {
                newProperties.add(property);
            }
        });

        List<Property> propertiesToDelete = findPropertiesToDelete(allBankProperties, properties);

        deleteProperties(propertiesToDelete);
        saveProperties(newProperties, updatedProperties);
    }

    private List<Property> filterPropertiesByBank(List<Property> properties, String banco) {
        return properties.stream()
                .filter(property -> property.getBanco().equals(banco))
                .toList();
    }

    private Optional<Property> findPropertyByReference(List<Property> properties, String referência) {
        return properties.stream()
                .filter(p -> p.getReferência().equals(referência))
                .findFirst();
    }

    private boolean updateProperty(Property existing, Property newProperty) {
        boolean isUpdated = false;

        isUpdated |= updateField(existing::getpreçoVenda, existing::setpreçoVenda, newProperty.getpreçoVenda());
        isUpdated |= updateField(existing::getpreçoAluguel, existing::setpreçoAluguel, newProperty.getpreçoAluguel());
        isUpdated |= updateField(existing::getArea, existing::setArea, newProperty.getArea());
        isUpdated |= updateField(existing::getAno, existing::setAno, newProperty.getAno());

        return isUpdated;
    }

    private <T> boolean updateField(Supplier<T> getter, Consumer<T> setter, T newValue) {
        T currentValue = getter.get();
        if (!Objects.equals(currentValue, newValue)) {
            setter.accept(newValue);
            return true;
        }
        return false;
    }

    private List<Property> findPropertiesToDelete(List<Property> allBankProperties, List<Property> newProperties) {
        return allBankProperties.stream()
                .filter(property -> newProperties.stream()
                        .noneMatch(p -> p.getReferência().equals(property.getReferência())))
                .toList();
    }

    private void deleteProperties(List<Property> propertiesToDelete) {
        if (!propertiesToDelete.isEmpty()) {
            propertyRepository.deleteAll(propertiesToDelete);
        }
    }

    private void saveProperties(List<Property> newProperties, List<Property> updatedProperties) {
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
