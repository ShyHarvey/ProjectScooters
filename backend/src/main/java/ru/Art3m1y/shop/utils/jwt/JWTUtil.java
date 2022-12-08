package ru.Art3m1y.shop.utils.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.persistence.Version;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class JWTUtil {
    private String secretKeyForAccess = "ASLJHD123IAD8123I";
    private String secretKeyForRefresh = "ASLJHD123IAMSDK";
    private String subject = "Identification details";
    private String issuer = "Art3m1y";
    private Algorithm signAccessToken = Algorithm.HMAC256(secretKeyForAccess);
    private Algorithm signRefreshToken = Algorithm.HMAC256(secretKeyForRefresh);
    private JWTVerifier verifierForAccessToken = JWT.require(signAccessToken)
            .withIssuer(issuer)
            .withSubject(subject)
            .build();
    private JWTVerifier verifierForRefreshToken = JWT.require(signRefreshToken)
            .withIssuer(issuer)
            .withSubject(subject)
            .build();
    private Date expirationAccessDate = Date.from(ZonedDateTime.now().plusMinutes(30).toInstant());
    private Date expirationRefreshDate = Date.from(ZonedDateTime.now().plusDays(3).toInstant());



    public String generateAccessToken(String username, String role) {
        return JWT.create()
                .withSubject(subject)
                .withExpiresAt(expirationAccessDate)
                .withIssuedAt(new Date())
                .withIssuer(issuer)
                .withClaim("username", username)
                .withClaim("role", role)
                .sign(signAccessToken);
    }

    public String generateRefreshToken(String username, String role, long id) {
        return JWT.create()
                .withSubject(subject)
                .withExpiresAt(expirationRefreshDate)
                .withIssuedAt(new Date())
                .withIssuer(issuer)
                .withClaim("username", username)
                .withClaim("role", role)
                .withClaim("id", id)
                .sign(signRefreshToken);
    }

    public boolean verifyAccessToken(String token) {
        try {
            verifierForAccessToken.verify(token);
            return true;
        } catch (JWTVerificationException e) {
            System.out.println("Invalid access JWT token");
            return false;
        }
    }

    public boolean verifyRefreshToken(String token) {
        try {
            verifierForRefreshToken.verify(token);
            return true;
        } catch (JWTVerificationException e) {
            System.out.println("Invalid refresh JWT token");
            return false;
        }
    }

    public String getUsernameFromAccessToken(String token) {
        return verifierForAccessToken.verify(token).getClaim("username").asString();
    }

    public String getUsernameFromRefreshToken(String token) {
        return verifierForRefreshToken.verify(token).getClaim("username").asString();
    }

    public long getIdFromRefreshToken(String token) {
        return verifierForRefreshToken.verify(token).getClaim("id").asLong();
    }

    public String getRoleFromRefreshToken(String token) {
        return verifierForRefreshToken.verify(token).getClaim("role").asString();
    }

}
