package ru.Art3m1y.shop.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.Art3m1y.shop.models.Person;
import ru.Art3m1y.shop.repositories.PersonRepository;

import java.util.Date;

@Service
public class RegistrationService {
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;

    public RegistrationService(PersonRepository personRepository, PasswordEncoder passwordEncoder) {
        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean findByName(String username) {
        return personRepository.findByUsername(username).isPresent() ? true : false;
    }

    public void save(Person person) {
        person.setPassword(passwordEncoder.encode(person.getPassword()));
        person.setRole("ROLE_USER");
        person.setCreatedAt(new Date());
        personRepository.save(person);
    }
}
