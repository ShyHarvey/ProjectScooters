package ru.Art3m1y.shop.controllers;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.Art3m1y.shop.dtoes.AuthenticationPersonDTO;
import ru.Art3m1y.shop.dtoes.RegistrationPersonDTO;
import ru.Art3m1y.shop.modelMappers.PersonModelMapper;
import ru.Art3m1y.shop.models.Person;
import ru.Art3m1y.shop.services.AuthenticationService;
import ru.Art3m1y.shop.services.RegistrationService;
import ru.Art3m1y.shop.utils.exceptions.AuthenticationPersonException;
import ru.Art3m1y.shop.utils.exceptions.ErrorResponse;
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

    public IdentificationController(PersonModelMapper personModelMapper, RegistrationValidator registrationValidator, RegistrationService registrationService, JWTUtil jwtUtil, AuthenticationManager authenticationManager, AuthenticationService authenticationService) {
        this.personModelMapper = personModelMapper;
        this.registrationValidator = registrationValidator;
        this.registrationService = registrationService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/registration")
    public Map<String, String> registration(@RequestBody @Valid RegistrationPersonDTO registrationPersonDTO, BindingResult bindingResult) {
        Person person = personModelMapper.MapToPerson(registrationPersonDTO);

        registrationValidator.validate(person, bindingResult);

        if (bindingResult.hasErrors()) {
            StringBuilder errorsMessage = new StringBuilder();
            bindingResult.getFieldErrors().forEach(error -> errorsMessage.append(error.getDefaultMessage()).append(";"));
            throw new RegistrationPersonException(errorsMessage.toString());
        }

        registrationService.save(person);

        return Map.of("jwtToken", jwtUtil.generateToken(person.getUsername(), "ROLE_USER"));
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody @Valid AuthenticationPersonDTO authenticationPersonDTO, BindingResult bindingResult) throws BadCredentialsException {
        Person person = personModelMapper.MapToPerson(authenticationPersonDTO);

        if (bindingResult.hasErrors()) {
            StringBuilder errorsMessage = new StringBuilder();
            bindingResult.getFieldErrors().forEach(error -> errorsMessage.append(error.getDefaultMessage()).append(";"));
            throw new AuthenticationPersonException(errorsMessage.toString());
        }

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(person.getUsername(), person.getPassword());

        authenticationManager.authenticate(token); // When password or login is incorrect, throws AuthenticationException

        return Map.of("jwtToken", jwtUtil.generateToken(person.getUsername(), authenticationService.findByUsername(person.getUsername()).getRole()));
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
}
