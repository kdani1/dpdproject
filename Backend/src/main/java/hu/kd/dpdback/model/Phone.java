package hu.kd.dpdback.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "phones")
public class Phone {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="person_id", nullable=false)
    private Person person;

    @Column(name = "phone")
    private String phone;

    public Phone() {
    }

    public Phone(Person person, String phone) {
        this.person = person;
        this.phone = phone;
    }

    // Add a String-argument constructor
    public Phone(String phone) {
        this.phone = phone;
    }

    public long getId() {
        return id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "Phone{" +
                "id=" + id +
                ", person=" + person +
                ", phone='" + phone + '\'' +
                '}';
    }
}