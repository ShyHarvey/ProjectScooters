package ru.Art3m1y.shop.utils.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class JWTUtil {
    @Value("${jwt.secret.key}")
    private String jwtSecretKey;

    public String generateToken(String username, String role) {
        Date expirationDate = Date.from(ZonedDateTime.now().plusDays(7).toInstant());

        return JWT.create()
                .withSubject("Authentication details")
                .withExpiresAt(expirationDate)
                .withIssuedAt(new Date())
                .withIssuer("Art3m1y")
                .withClaim("username", username)
                .withClaim("role", role)
                .sign(Algorithm.HMAC256(jwtSecretKey));
    }

    public String validateTokenAndGetClaims(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(jwtSecretKey))
                .withSubject("Authentication details")
                .withIssuer("Art3m1y")
                .build();
        DecodedJWT jwtToken = verifier.verify(token);
        return jwtToken.getClaim("username").asString();
    }

}
