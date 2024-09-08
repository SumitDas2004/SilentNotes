package com.silentNotes.Main.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
public class JWTService {

    @Value("${jwt.key}")
    private String secretKey;

    @Value("${jwt.duration}")
    private long duration;

    public Date getExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    public String getUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    private <R> R extractClaim(String token, Function<Claims, R> function){
        Claims claims = extractAllClaims(token);
        return function.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser()
                .verifyWith(generateKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(String id){
        return Jwts.builder()
                .subject(id)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+duration))
                .signWith(generateKey())
                .compact();
    }

    private SecretKey generateKey(){
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(decodedKey);
    }
}
