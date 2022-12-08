package ru.Art3m1y.shop.dtoes;

public class ResponseWithTokensDTO {
    private String accessToken;
    private String refreshToken;

    public ResponseWithTokensDTO(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }
}
