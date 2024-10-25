package pt.buscaimoveis.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.buscaimoveis.models.entities.District;
import pt.buscaimoveis.models.entities.Property;
import pt.buscaimoveis.models.repositories.DistrictRepository;
import pt.buscaimoveis.models.repositories.PropertyRepository;

import java.text.Normalizer;
import java.util.*;
import java.util.function.Consumer;
import java.util.function.Supplier;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final DistrictRepository districtRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository, pt.buscaimoveis.models.repositories.DistrictRepository districtRepository) {
        this.propertyRepository = propertyRepository;
        this.districtRepository = districtRepository;
    }

    public void insertOrUpdateOrDeleteProperties(List<Property> properties) {
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
        isUpdated |= updateField(existing::getTipologia, existing::setTipologia, newProperty.getTipologia());
        isUpdated |= updateField(existing::getArea, existing::setArea, newProperty.getArea());
        isUpdated |= updateField(existing::getAno, existing::setAno, newProperty.getAno());
        isUpdated |= updateField(existing::getBanco, existing::setBanco, newProperty.getBanco());
        isUpdated |= updateField(existing::getContacto, existing::setContacto, newProperty.getContacto());
        isUpdated |= updateField(existing::getEmail, existing::setEmail, newProperty.getEmail());
        isUpdated |= updateField(existing::getTelefone, existing::setTelefone, newProperty.getTelefone());
        isUpdated |= updateField(existing::getDescricao, existing::setDescricao, newProperty.getDescricao());
        isUpdated |= updateField(existing::getImagens, existing::setImagens, newProperty.getImagens());

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
        List<District> districts_concelhos = districtRepository.findAll();
        newProperties
            .forEach(property -> {
                if (property.getDistrito() == null) {
                    String concelho = property.getConcelho();
                        districts_concelhos.forEach(district -> {
                            if (district.getConcelhos().stream().anyMatch(concelho1 -> concelho1.getNameConcelho().equals(concelho))) {
                                property.setDistrito(district.getNameDistrict());
                            }
                        });
                }
            });
        propertyRepository.saveAll(newProperties);
        propertyRepository.saveAll(updatedProperties);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();

    }

    public List<Property> searchProperties(String natureza, String referencia, String distrito, String concelho,
                                           String freguesia, String tipologia,
                                           String banco, Double minV, Double maxV,
                                           Double minL, Double maxL,
                                           Integer minA, Integer maxA) {
        List<Property> properties = propertyRepository.findAll();

        return properties.stream()
                .filter(property -> isNullOrEmpty(natureza) ||
                        isNullOrMatches(natureza, property.getNatureza(), false))
                .filter(property -> isNullOrEmpty(referencia) ||
                        isNullOrMatches(referencia, property.getReferência(), true))
                .filter(property -> isNullOrEmpty(distrito) ||
                        isNullOrMatches(distrito, property.getDistrito(), true))
                .filter(property -> isNullOrEmpty(concelho) ||
                        isNullOrMatches(concelho, property.getConcelho(), true))
                .filter(property -> isNullOrEmpty(freguesia) ||
                        isNullOrMatches(freguesia, property.getFreguesia(), false))
                .filter(property -> isNullOrEmpty(tipologia) ||
                        isNullOrMatches(tipologia, property.getTipologia(), false))
                .filter(property -> isNullOrEmpty(banco) ||
                        isNullOrMatches(banco, property.getBanco(), false))
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

    private boolean isNullOrMatches(String filterValue, String propertyValue, boolean exactMatch) {
        if (isNullOrEmpty(filterValue)) return true;
        if (propertyValue == null) return false;

        String[] filterWords = normalizeString(filterValue).split("\\s+");
        String normalizedPropertyValue = normalizeString(propertyValue);

        if (exactMatch) {
            return Arrays.asList(filterWords).contains(normalizedPropertyValue);
        } else {
            return Arrays.stream(filterWords).anyMatch(normalizedPropertyValue::contains);
        }
    }


    private String normalizeString(String value) {
        return Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT);
    }
}
