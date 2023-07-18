package hu.kd.dpdback.model;

import javax.persistence.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "persons")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "birthplace")
    private String birthplace;

    @Column(name = "birthdate")
    private Date birthdate;

    @Column(name = "mothersname")
    private String mothersName;

    @Column(name = "ssn")
    private String ssn; //TAJ szám

    @Column(name = "tax")
    private String tax; //Adóazonosító jel

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy="person", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();

    @OneToMany(mappedBy="person", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Phone> phones = new ArrayList<>();

    public Person() {

    }

    public Person(String name, String birthplace, Date birthdate, String mothersName, String ssn, String tax, String email, List<Address> addresses, List<Phone> phones) {
        this.name = name;
        this.birthplace = birthplace;
        this.birthdate = birthdate;
        this.mothersName = mothersName;
        this.ssn = ssn;
        this.tax = tax;
        this.email = email;
        this.addresses = addresses;
        this.phones = phones;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirthplace() {
        return birthplace;
    }

    public void setBirthplace(String birthplace) {
        this.birthplace = birthplace;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public String getMothersName() {
        return mothersName;
    }

    public void setMothersName(String mothersName) {
        this.mothersName = mothersName;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public String getTax() {
        return tax;
    }

    public void setTax(String tax) {
        this.tax = tax;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }

    public List<Phone> getPhones() {
        return phones;
    }

    public void setPhones(List<Phone> phones) {
        this.phones = phones;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", birthplace='" + birthplace + '\'' +
                ", birthdate=" + birthdate +
                ", mothersName='" + mothersName + '\'' +
                ", ssn='" + ssn + '\'' +
                ", tax='" + tax + '\'' +
                ", email='" + email + '\'' +
                ", addresses=" + addresses +
                ", phones=" + phones +
                '}';
    }
}
