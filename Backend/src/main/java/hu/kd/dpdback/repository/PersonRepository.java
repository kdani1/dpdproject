package hu.kd.dpdback.repository;

import java.util.List;

import hu.kd.dpdback.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PersonRepository extends JpaRepository<Person, Long> {
  @Override
  List<Person> findAll();

  @Override
  Person save(Person entity);

  @Override
  void deleteById(Long id);
}
