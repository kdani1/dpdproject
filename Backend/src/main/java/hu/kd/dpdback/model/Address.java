package hu.kd.dpdback.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="person_id", nullable=false)
    private Person person;

    @Column(name = "postcode")
    private String postCode;

    @Column(name = "city")
    private String city;

    @Column(name = "address")
    private String address; //Utca + házszám

    public Address() {
    }

    public Address(Person person, String postCode, String city, String address) {
        this.person = person;
        this.postCode = postCode;
        this.city = city;
        this.address = address;
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

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", person=" + person +
                ", postCode='" + postCode + '\'' +
                ", city='" + city + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
