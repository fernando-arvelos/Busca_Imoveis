package pt.buscaimoveis.docsapi;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Swagger {

  @Bean
  public OpenAPI customOpenAPI() {
    return new OpenAPI()
            .info(new Info().title("Busca Imóveis API").version("1.0"))
            .addSecurityItem(new SecurityRequirement().addList("ApiKeyAuth"))
            .components(new io.swagger.v3.oas.models.Components()
                    .addSecuritySchemes("ApiKeyAuth", new SecurityScheme()
                            .type(SecurityScheme.Type.APIKEY)
                            .in(SecurityScheme.In.HEADER)
                            .name("x-api-key"))); // Define o nome do header como "x-api-key"
  }
}
