package com.socialNetwork.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;
//clase para impolemnentar el componente jwt para login de sesioón

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    
  private final SecretKey secretKey = Keys.hmacShaKeyFor("claveSecretaSuperSeguraParaJWT123456789".getBytes());
    private final long expirationMs = 86400000; // 24h

    public String generateToken(String alias) {
        return Jwts.builder()
                .setSubject(alias)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractAlias(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
