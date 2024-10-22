package pt.buscaimoveis.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pt.buscaimoveis.models.entities.District;
import pt.buscaimoveis.models.entities.Concelho;
import pt.buscaimoveis.models.repositories.DistrictRepository;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class DataLoader implements CommandLineRunner {

    private final DistrictRepository districtRepository;
    private final ObjectMapper objectMapper;

    public DataLoader(DistrictRepository districtRepository, ObjectMapper objectMapper) {
        this.districtRepository = districtRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {

        // Carregar o arquivo JSON
        InputStream inputStream = getClass().getResourceAsStream("/Lista_distrito_concelho.json");
        if (inputStream == null) {
            return;
        }

        // Fazer o parsing do JSON para uma lista de Map (List of District with their Concelhos)
        List<Map<String, Object>> districtsList = objectMapper.readValue(inputStream, new TypeReference<List<Map<String, Object>>>() {});

        // Converter o Map para objetos District e Concelho
        for (Map<String, Object> districtMap : districtsList) {
            String nameDistrict = (String) districtMap.get("name_district");

            // Verificar se o distrito já existe no banco de dados
            if (!districtRepository.existsByNameDistrict(nameDistrict)) {
                if (districtMap.get("concelhos") instanceof List<?> concelhosRawList) {
                    List<Concelho> concelhos = new ArrayList<>();
                    District district = new District(null, nameDistrict, concelhos);

                    for (Object concelhoRaw : concelhosRawList) {
                        if (concelhoRaw instanceof Map<?, ?> concelhoMap) {
                            if (concelhoMap.get("name_concelho") instanceof String nameConcelho) {
                                Concelho concelho = new Concelho(nameConcelho, district);
                                concelhos.add(concelho);
                            }
                        }
                    }
                    // Salvar o distrito (e seus concelhos) no banco de dados
                    districtRepository.save(district);
                }
            }
        }
    }
}


