package pt.buscaimoveis.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pt.buscaimoveis.controllers.dto.PropertyDto;
import pt.buscaimoveis.models.entities.Property;
import pt.buscaimoveis.services.PropertyService;

import java.util.List;

@RestController
@RequestMapping("/properties")
public class PropertyController {

    private final PropertyService propertyService;

    @Autowired
    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public void createProperty(@RequestBody List<Property> properties) {
        propertyService.insertOrUpdateProperties(properties);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/distrito-concelho/search")
    @ResponseStatus(HttpStatus.OK)
    public List<Property> searchDistritoConcelhoProperties(
            @RequestParam(required = false) String distrito,
            @RequestParam(required = false) String concelho) {
        return propertyService.searchDistritoConcelhoProperties(distrito, concelho);
    }

    @GetMapping("/preco-venda/search")
    @ResponseStatus(HttpStatus.OK)
    public List<Property> searchPrecoVendaProperties(
            @RequestParam(required = false) Double min,
            @RequestParam(required = false) Double max) {
        return propertyService.searchPrecoVendaProperties(min, max);
    }

    @GetMapping("/preco-aluguel/search")
    @ResponseStatus(HttpStatus.OK)
    public List<Property> searchPrecoAluguelProperties(
            @RequestParam(required = false) Double min,
            @RequestParam(required = false) Double max) {
        return propertyService.searchPrecoAluguelProperties(min, max);
    }

    @GetMapping("/area/search")
    @ResponseStatus(HttpStatus.OK)
    public List<Property> searchAreaProperties(
            @RequestParam(required = false) Integer min,
            @RequestParam(required = false) Integer max) {
        return propertyService.searchAreaProperties(min, max);
    }
}
