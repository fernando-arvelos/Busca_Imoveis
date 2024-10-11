package pt.buscaimoveis.docsapi;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ForwardedHeaderFilter;


@SuppressWarnings("ALL")
@Configuration
public class Swagger implements OpenApiCustomizer {

  public final String schemeName = "Bearer Auth";

  @Override
  public void customise(OpenAPI openApi) {
    Info info = new Info()
        .title("Busca Imóveis API")
        .description("""
            Busca de imóveis em Portugal.
            """)
        .version("1.0.0");

    openApi.info(info);

    openApi.getComponents().addSecuritySchemes(schemeName,
        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT"));
    openApi.addSecurityItem(new SecurityRequirement().addList(schemeName));
  }

  
  @Bean
  ForwardedHeaderFilter forwardedHeaderFilter() {
    return new ForwardedHeaderFilter();
  }
}