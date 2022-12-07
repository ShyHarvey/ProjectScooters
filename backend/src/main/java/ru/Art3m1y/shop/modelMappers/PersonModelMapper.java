package ru.Art3m1y.shop.modelMappers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import ru.Art3m1y.shop.dtoes.AuthenticationPersonDTO;
import ru.Art3m1y.shop.dtoes.RegistrationPersonDTO;
import ru.Art3m1y.shop.models.Person;

@Component
public class PersonModelMapper {
    private final ModelMapper modelMapper;

    public PersonModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    // From AuthenticationPersonDTO to Person
    public Person MapToPerson(AuthenticationPersonDTO authenticationPersonDTO) {
        return modelMapper.map(authenticationPersonDTO, Person.class);
    }

    //From RegistrationPersonDTO to Person
    public Person MapToPerson(RegistrationPersonDTO registrationPersonDTO) {
        return modelMapper.map(registrationPersonDTO, Person.class);
    }

    // From Person to AuthenticationPersonDTO
    public AuthenticationPersonDTO MapToAuthenticationPersonDTO(Person person) {
        return modelMapper.map(person, AuthenticationPersonDTO.class);
    }

    // From Person to RegistrationPersonDTO
    public RegistrationPersonDTO MapToRegistrationPersonDTO(Person person) {
        return modelMapper.map(person, RegistrationPersonDTO.class);
    }
}
