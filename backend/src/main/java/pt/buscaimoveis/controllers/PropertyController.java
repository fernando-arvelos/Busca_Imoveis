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
    public void createProperty(@RequestBody List<Property> properties) {
        propertyService.insertOrUpdateProperties(properties);
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
            @RequestParam(required = false) String concelho,
            @RequestParam(required = false) Double minV,
            @RequestParam(required = false) Double maxV,
            @RequestParam(required = false) Double minL,
            @RequestParam(required = false) Double maxL,
            @RequestParam(required = false) Integer minA,
            @RequestParam(required = false) Integer maxA) {
        return propertyService.searchProperties(distrito, concelho, minV, maxV, minL, maxL, minA, maxA);
    }
}
