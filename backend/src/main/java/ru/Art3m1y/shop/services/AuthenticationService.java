package ru.Art3m1y.shop.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.Art3m1y.shop.models.Person;
import ru.Art3m1y.shop.repositories.PersonRepository;

@Service
public class AuthenticationService {
    private final PersonRepository personRepository;

    public AuthenticationService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Transactional(readOnly = true)
    public Person findByUsername(String username) {
        return personRepository.findByUsername(username).orElse(null);
    }

}
