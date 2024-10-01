package pt.buscaimoveis.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
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
    public List<Property> createProperty(@RequestBody List<Property> properties) {
        return propertyService.insertProperty(properties);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public List<Property> searchProperties(
            @RequestParam(required = false) String distrito,
            @RequestParam(required = false) String concelho) {
        return propertyService.searchProperties(distrito, concelho);
    }


}
