package ru.Art3m1y.shop.controllers;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.Art3m1y.shop.dtoes.AuthenticationPersonDTO;
import ru.Art3m1y.shop.dtoes.RegistrationPersonDTO;
import ru.Art3m1y.shop.dtoes.ResponseWithTokensDTO;
import ru.Art3m1y.shop.modelMappers.PersonModelMapper;
import ru.Art3m1y.shop.models.Person;
import ru.Art3m1y.shop.models.RefreshToken;
import ru.Art3m1y.shop.security.PersonDetails;
import ru.Art3m1y.shop.services.AuthenticationService;
import ru.Art3m1y.shop.services.RefreshTokenService;
import ru.Art3m1y.shop.services.RegistrationService;
import ru.Art3m1y.shop.utils.exceptions.AuthenticationPersonException;
import ru.Art3m1y.shop.utils.exceptions.ErrorResponse;
import ru.Art3m1y.shop.utils.exceptions.LogoutPersonException;
import ru.Art3m1y.shop.utils.exceptions.RegistrationPersonException;
import ru.Art3m1y.shop.utils.jwt.JWTUtil;
import ru.Art3m1y.shop.utils.validators.RegistrationValidator;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class IdentificationController {
    private final PersonModelMapper personModelMapper;
    private final RegistrationValidator registrationValidator;
    private final RegistrationService registrationService;
    private final JWTUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final AuthenticationService authenticationService;
    private final RefreshTokenService refreshTokenService;

    public IdentificationController(PersonModelMapper personModelMapper, RegistrationValidator registrationValidator, RegistrationService registrationService, JWTUtil jwtUtil, AuthenticationManager authenticationManager, AuthenticationService authenticationService, RefreshTokenService refreshTokenService) {
        this.personModelMapper = personModelMapper;
        this.registrationValidator = registrationValidator;
        this.registrationService = registrationService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.authenticationService = authenticationService;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/registration")
    public ResponseEntity<ResponseWithTokensDTO> registration(@RequestBody @Valid RegistrationPersonDTO registrationPersonDTO, BindingResult bindingResult) {
        Person person = personModelMapper.MapToPerson(registrationPersonDTO);

        registrationValidator.validate(person, bindingResult);

        if (bindingResult.hasErrors()) {
            StringBuilder errorsMessage = new StringBuilder();
            bindingResult.getFieldErrors().forEach(error -> errorsMessage.append(error.getDefaultMessage()).append(";"));
            throw new RegistrationPersonException(errorsMessage.toString());
        }

        registrationService.save(person);

        RefreshToken refreshToken = new RefreshToken(person);

        refreshTokenService.save(refreshToken);

        return new ResponseEntity<>(new ResponseWithTokensDTO(jwtUtil.generateAccessToken(person.getUsername(), "ROLE_USER"), jwtUtil.generateRefreshToken(person.getUsername(), "ROLE_USER", refreshToken.getId())), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationPersonDTO authenticationPersonDTO, BindingResult bindingResult) {
        Person person = personModelMapper.MapToPerson(authenticationPersonDTO);

        if (bindingResult.hasErrors()) {
            StringBuilder errorsMessage = new StringBuilder();
            bindingResult.getFieldErrors().forEach(error -> errorsMessage.append(error.getDefaultMessage()).append(";"));
            throw new AuthenticationPersonException(errorsMessage.toString());
        }

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(person.getUsername(), person.getPassword());

        Authentication auth = authenticationManager.authenticate(token);

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        Person personAuthenticated = ((PersonDetails) auth.getPrincipal()).getPerson();

        RefreshToken refreshToken = new RefreshToken(personAuthenticated);

        refreshTokenService.updateRefreshToken(personAuthenticated, refreshToken);

        return new ResponseEntity<>(new ResponseWithTokensDTO(jwtUtil.generateAccessToken(personAuthenticated.getUsername(), personAuthenticated.getRole()), jwtUtil.generateRefreshToken(personAuthenticated.getUsername(), personAuthenticated.getRole(), refreshToken.getId())), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody ResponseWithTokensDTO refreshToken) {
        if (jwtUtil.verifyRefreshToken(refreshToken.getRefreshToken()) && refreshTokenService.existsById(jwtUtil.getIdFromRefreshToken(refreshToken.getRefreshToken()))) {
            refreshTokenService.deleteById(jwtUtil.getIdFromRefreshToken(refreshToken.getRefreshToken()));
            return ResponseEntity.ok().build();
        }

        throw new LogoutPersonException();
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handlerException(RegistrationPersonException e) {
        ErrorResponse response = new ErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handlerException(AuthenticationPersonException e) {
        ErrorResponse response = new ErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handlerException(AuthenticationException e) {
        ErrorResponse response = new ErrorResponse("Неверное имя пользователя или пароль", System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handlerException(LogoutPersonException e) {
        ErrorResponse response = new ErrorResponse("Токен обновления не смог пройти валидацию, либо он уже является не актуальным.", System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

}
