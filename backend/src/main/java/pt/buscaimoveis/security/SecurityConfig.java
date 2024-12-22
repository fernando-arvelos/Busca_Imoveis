package pt.buscaimoveis.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Collections;

@Configuration
public class SimpleCorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Permitir tudo (origens, métodos, cabeçalhos)
        configuration.setAllowedOrigins(Collections.singletonList("*")); // Permite todas as origens
        configuration.setAllowedMethods(Collections.singletonList("*")); // Permite todos os métodos HTTP
        configuration.setAllowedHeaders(Collections.singletonList("*")); // Permite todos os cabeçalhos
        configuration.setAllowCredentials(false); // Credenciais desabilitadas por segurança (ajuste conforme necessário)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplica a todas as rotas
        return source;
    }
}