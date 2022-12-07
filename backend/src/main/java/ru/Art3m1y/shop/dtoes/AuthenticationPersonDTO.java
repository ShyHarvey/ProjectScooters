package ru.Art3m1y.shop.dtoes;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;

public class AuthenticationPersonDTO {
    @NotEmpty(message = "Имя пользователя не может быть пустым.")
    private String username;
    @NotEmpty(message = "Почта не может быть пустой.")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
