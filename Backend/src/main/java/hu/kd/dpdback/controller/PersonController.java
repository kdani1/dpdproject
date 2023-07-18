package hu.kd.dpdback.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import hu.kd.dpdback.model.Address;
import hu.kd.dpdback.model.Person;
import hu.kd.dpdback.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

@RestController
@RequestMapping("/api")
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    @GetMapping("/persons")
    //public ResponseEntity<List<Person>> getAllPersons(@RequestParam(required = false) String title) {
    public ResponseEntity<List<Person>> getAllPersons() {
        try {
            List<Person> persons = personRepository.findAll();
            if (persons.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(persons, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/persons")
    public ResponseEntity<Person> createPerson(@RequestBody Person person) {
        try {
            person.setAddresses(person.getAddresses().stream().map(a -> {a.setPerson(person); return a;}).collect(Collectors.toList()));
            person.setPhones(person.getPhones().stream().map(p -> {p.setPerson(person); return p;}).collect(Collectors.toList()));
            Person savedPerson = personRepository.save(person);
            return new ResponseEntity<>(savedPerson, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/persons/{id}")
    public ResponseEntity<HttpStatus> deletePerson(@PathVariable("id") long id) {
        try {
            personRepository.deleteById(Long.valueOf(id));
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/persons/{id}")
    public ResponseEntity<Person> updatePersonBecauseOfGDPR(@PathVariable("id") long id) {
        Optional<Person> personData = personRepository.findById(id);
        if (((Optional<?>) personData).isPresent()) {
            Person person = personData.get();
            person.setBirthdate(null);
            person.setBirthplace(null);
            person.setMothersName(null);
            person.setSsn(null);
            person.setTax(null);
            return new ResponseEntity<>(personRepository.save(person), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
