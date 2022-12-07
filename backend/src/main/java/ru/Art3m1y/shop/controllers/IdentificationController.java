package ru.Art3m1y.shop.controllers;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.Art3m1y.shop.dtoes.RegistrationPersonDTO;
import ru.Art3m1y.shop.modelMappers.PersonModelMapper;
import ru.Art3m1y.shop.models.Person;
import ru.Art3m1y.shop.services.RegistrationService;
import ru.Art3m1y.shop.utils.exceptions.ErrorResponse;
import ru.Art3m1y.shop.utils.exceptions.RegistrationPersonException;
import ru.Art3m1y.shop.utils.jwt.JWTUtil;
import ru.Art3m1y.shop.utils.validators.RegistrationValidator;

import java.util.Map;

@RestController
public class IdentificationController {
    private final PersonModelMapper personModelMapper;
    private final RegistrationValidator registrationValidator;
    private final RegistrationService registrationService;
    private final JWTUtil jwtUtil;

    public IdentificationController(PersonModelMapper personModelMapper, RegistrationValidator registrationValidator, RegistrationService registrationService, JWTUtil jwtUtil) {
        this.personModelMapper = personModelMapper;
        this.registrationValidator = registrationValidator;
        this.registrationService = registrationService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/auth/registration")
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

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handlerException(RegistrationPersonException e) {
        ErrorResponse response = new ErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
