package pt.buscaimoveis.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class ApiKeyAuthFilter extends OncePerRequestFilter {

    @Value("${API_KEY}")
    private String apiKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestApiKey = request.getHeader("x-api-key");
        String requestURI = request.getRequestURI();
        System.out.println(requestApiKey);
        System.out.println(apiKey);

        if (requestURI.startsWith("/swagger-ui") || requestURI.startsWith("/v3/api-docs") ||
                requestURI.startsWith("/swagger-resources") || requestURI.startsWith("/webjars")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (apiKey.equals(requestApiKey)) {
            // API Key válida; continue para o próximo filtro
            filterChain.doFilter(request, response);
        } else {
            // API Key inválida; envie resposta de erro
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"API Key missing or invalid\"}");
        }
    }
}
