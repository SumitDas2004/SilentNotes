package com.silentNotes.Main.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.silentNotes.Main.Exceptions.EmailNotVerifiedException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@Component
public class JWTFilter extends OncePerRequestFilter {
    JWTService jwtService;
    UserDetailsService userDetailsService;

    @Value("${client.domain}")
    String clientDomain;

    public JWTFilter(JWTService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            if (SecurityContextHolder.getContext().getAuthentication() != null || request.getRequestURI().startsWith("/user/login") || request.getRequestURI().startsWith("/user/register") || request.getRequestURI().startsWith("/user/isAvailable") ||  request.getRequestURI().startsWith("/post/feed") || request.getRequestURI().startsWith("/post/view/") || request.getRequestURI().startsWith("/comment/getAll") || request.getRequestURI().startsWith("/colleges") || request.getRequestURI().startsWith("/comment/reply/get") || request.getRequestURI().startsWith("/post/details")) {
                filterChain.doFilter(request, response);
                return;
            }
            String receivedToken = (String) Arrays.stream(request.getCookies()).filter(cookie -> cookie.getName().equals("authToken")).map(Cookie::getValue).toArray()[0];
            if (receivedToken != null) {
                String username = jwtService.getUsername(receivedToken);
                Date expiresAt = jwtService.getExpiration(receivedToken);
                if (username != null && expiresAt != null && expiresAt.after(new Date(System.currentTimeMillis()))) {
                    UserDetails user = userDetailsService.loadUserByUsername(username);
                    if (user != null) {
                        if(request.getRequestURI().startsWith("/user/details") || request.getRequestURI().startsWith("/user/logout") || request.getRequestURI().startsWith("/otp/") || user.isEnabled()) {
                            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user.getUsername(), null, user.getAuthorities());
                            usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                            filterChain.doFilter(request, response);
                        }else throw new EmailNotVerifiedException();
                    }else throw new Exception("User not found");
                }else throw new Exception("Invalid token.");
            }else throw new Exception("Token not present.");
        }
        catch (EmailNotVerifiedException e){
            log.error(e.getMessage());
            response.setStatus(401);
            response.setContentType("application/json");
            Map<String, String> map = new LinkedHashMap<>();
            map.put("error", e.getMessage());
            ObjectMapper om= new ObjectMapper();
            response.getWriter().write(om.writeValueAsString(map));
        }
        catch (Exception e){
            log.error(e.getMessage());
            response.setStatus(401);
            response.setContentType("application/json");
            Map<String, String> map = new LinkedHashMap<>();
            map.put("error", "Unauthorized, please login.");
            ObjectMapper om= new ObjectMapper();
            response.getWriter().write(om.writeValueAsString(map));
        }
    }
}
