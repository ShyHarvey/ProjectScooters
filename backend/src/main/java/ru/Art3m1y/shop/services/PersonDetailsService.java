package ru.Art3m1y.shop.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.Art3m1y.shop.models.Person;
import ru.Art3m1y.shop.repositories.PersonRepository;
import ru.Art3m1y.shop.security.PersonDetails;

import java.util.Optional;
@Service
public class PersonDetailsService implements UserDetailsService {
    private final PersonRepository personRepository;

    public PersonDetailsService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Person> person = personRepository.findByUsername(username);

        if (person.isEmpty()) {
            throw new UsernameNotFoundException("Incorrect username or password");
        }

        return new PersonDetails(person.get());
    }
}
