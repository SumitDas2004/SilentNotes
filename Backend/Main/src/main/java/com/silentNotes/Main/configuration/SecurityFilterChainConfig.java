package com.silentNotes.Main.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityFilterChainConfig {
    JWTFilter filter;

    UserDetailsService userDetailsService;

    AuthenticationManager authenticationManager;

    AuthenticationProvider provider;

    public SecurityFilterChainConfig(JWTFilter filter, UserDetailsService userDetailsService, AuthenticationManager authenticationManager, AuthenticationProvider provider) {
        this.filter = filter;
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
        this.provider = provider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req-> req.requestMatchers("/user/login", "/user/register", "/user/isAvailable/**", "/post/feed", "/post/view/**", "/comment/getAll/**", "/colleges/**", "/comment/reply/get", "/post/details/**").permitAll().anyRequest().authenticated())
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .userDetailsService(userDetailsService)
                .authenticationManager(authenticationManager)
                .authenticationProvider(provider)
                .build();
    }
}
