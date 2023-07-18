import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";
import validateEmail from "./utils";

export default function App() {
  const [name, setName] = useState({
    value: "",
    isTouched: false,
    isValid: false
  });

  const [birthDate, setBirthDate] = useState({
    value: "",
    isTouched: false,
    isValid: false
  });

  const [birthPlace, setBirthPlace] = useState({
    value: "",
    isTouched: false,
    isValid: false
  });

  const [tajNumber, setTajNumber] = useState({
    value: "",
    isTouched: false,
    isValid: false
  });

  const [taxID, settaxID] = useState({
    value: "",
    isTouched: false,
    isValid: false
  });

  const [email, setEmail] = useState({
    value: "",
    isTouched: false,
    isValid: false
  });

  const [addresses, setAddresses] = useState([
    {
      zip: "",
      city: "",
      addressLine: "",
      isTouched: false,
      isValid: false
    }
  ]);

  const [phoneNumbers, setPhoneNumbers] = useState([
    {
      value: "",
      isTouched: false,
      isValid: false
    }
  ]);

  const [motherName, setMotherName] = useState({
    value: "",
    isTouched: false,
    isValid: false
  });

  const [selectedPage, setSelectedPage] = useState("addNew");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/persons");
        setPeople(response.data);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    fetchPeople();
  }, [selectedPage]);

  const handleNameInput = (e) => {
    setName({
      isTouched: true,
      value: e.target.value,
      isValid: e.target.value.length > 0 && /^[a-zA-ZéÉáÁíÍóÓöÖőŐúÚüÜűŰ\s]+$/.test(e.target.value)
    });
  };

  const handleBirthDateInput = (e) => {
    const inputDate = e.target.value;
    const datePattern = /^\d{4}\-\d{2}\-\d{2}$/;

    setBirthDate({
      isTouched: true,
      value: inputDate,
      isValid: datePattern.test(inputDate)
    });
  };

  const handleBirthPlaceInput = (e) => {
    setBirthPlace({
      isTouched: true,
      value: e.target.value,
      isValid: e.target.value.length > 0
    });
  };

  const handleMotherNameInput = (e) => {
    setMotherName({
      isTouched: true,
      value: e.target.value,
      isValid: e.target.value.length > 0 && /^[a-zA-ZéÉáÁíÍóÓöÖőŐúÚüÜűŰ\s]+$/.test(e.target.value)
    });
  };

  const handleTajNumberInput = (e) => {
    setTajNumber({
      isTouched: true,
      value: e.target.value,
      isValid: e.target.value.length === 9 && /^\d+$/.test(e.target.value)
    });
  };

  const handletaxIDInput = (e) => {
    settaxID({
      isTouched: true,
      value: e.target.value,
      isValid: e.target.value.length === 10 && /^\d+$/.test(e.target.value)
    });
  };

  const handleEmailInput = (e) => {
    setEmail({
      isTouched: true,
      value: e.target.value,
      isValid: validateEmail(e.target.value)
    });
  };

  const handleAddressChange = (index, field, value) => {
    setAddresses((prevAddresses) => {
      const updatedAddresses = [...prevAddresses];
      const address = updatedAddresses[index];

      address[field] = value;
      address.isTouched = true;
      address.isValid = validateAddressField(field, value, updatedAddresses);

      return updatedAddresses;
    });
  };

  const validateAddressField = (field, value, addresses) => {
    if (!addresses || addresses.length < 1) {
      return false; // Return false when addresses array is empty
    }
    if (field === "zip") {
      return addresses.every((address) => address[field].length > 0 && /^\d+$/.test(address[field]));
    } else {
      return addresses.every((address) => address[field].length > 0);
    }
  };

  const handleAddAddress = () => {
    setAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        zip: "",
        city: "",
        addressLine: "",
        isTouched: false,
        isValid: false
      }
    ]);
  };

  const handleRemoveAddress = (index) => {
    setAddresses((prevAddresses) => {
      const updatedAddresses = [...prevAddresses];
      updatedAddresses.splice(index, 1);
      return updatedAddresses;
    });
  };

  const handlePhoneNumberInput = (index, e) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = {
      value: e.target.value,
      isTouched: true,
      isValid: e.target.value.length > 0 && /^[\d+]+$/.test(e.target.value)
    };
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers((prevPhoneNumbers) => [
      ...prevPhoneNumbers,
      { value: "", isTouched: false, isValid: false }
    ]);
  };

  const handleRemovePhoneNumber = (index) => {
    setPhoneNumbers((prevPhoneNumbers) => {
      const updatedPhoneNumbers = [...prevPhoneNumbers];
      updatedPhoneNumbers.splice(index, 1);
      return updatedPhoneNumbers;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addressList = addresses.map((address) => ({
      postCode: address.zip,
      city: address.city,
      address: address.addressLine,
    }));

    const phoneList = phoneNumbers.map((phoneNumber) => phoneNumber.value);

    const Person = {
      name: name.value,
      birthplace: birthPlace.value,
      birthdate: birthDate.value,
      mothersName: motherName.value,
      ssn: tajNumber.value,
      tax: taxID.value,
      email: email.value,
      addresses: addressList,
      phones: phoneList,
    };

    try {
      await axios.post("http://localhost:8080/api/persons", Person, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setName({ value: "", isTouched: false, isValid: false });
      setBirthDate({ value: "", isTouched: false, isValid: false });
      setBirthPlace({ value: "", isTouched: false, isValid: false });
      setMotherName({ value: "", isTouched: false, isValid: false });
      setTajNumber({ value: "", isTouched: false, isValid: false });
      settaxID({ value: "", isTouched: false, isValid: false });
      setEmail({ value: "", isTouched: false, isValid: false });
      setAddresses([
        {
          zip: "",
          city: "",
          addressLine: "",
          isTouched: false,
          isValid: false,
        },
      ]);
      setPhoneNumbers([{ value: "", isTouched: false, isValid: false }]);

      // Display success alert
      alert("Sikeres bevitel!");

      // Display sent data in an alert
      const sentData = JSON.stringify(Person, null, 2);
      alert("Küldött adatok:\n\n" + sentData);
    } catch (error) {
      const sentData = JSON.stringify(Person, null, 2);
      alert("Sikertelen küldés, adatok: "+sentData);
      console.error(error);
    }
  };

  const formIsValid =
    email.isValid &&
    name.isValid &&
    birthDate.isValid &&
    birthPlace.isValid &&
    tajNumber.isValid &&
    taxID.isValid &&
    addresses.every((address) => address.isValid) &&
    phoneNumbers.every((phoneNumber) => phoneNumber.isValid) &&
    motherName.isValid;

  const handleMenuClick = (page) => {
    setSelectedPage(page);
  };

  const renderAddresses = () => {
    return addresses.map((address, index) => (
      <div key={index}>
        <div className="address-group">
          <Input
            label="Irányítószám"
            placeholder="Irányítószám..."
            value={address.zip}
            onChange={(e) => handleAddressChange(index, "zip", e.target.value)}
            isValid={address.isValid && address.isTouched}
            isTouched={address.isTouched}
            errorMsg="Csak számok."
          />
          <Input
            label="Város"
            placeholder="Város..."
            value={address.city}
            onChange={(e) => handleAddressChange(index, "city", e.target.value)}
            isValid={address.isValid && address.isTouched}
            isTouched={address.isTouched}
            errorMsg="Csak betűk."
          />
        </div>
        <Input
          label="Cím"
          placeholder="Cím..."
          value={address.addressLine}
          onChange={(e) => handleAddressChange(index, "addressLine", e.target.value)}
          isValid={address.isValid && address.isTouched}
          isTouched={address.isTouched}
          errorMsg="A mező nem maradhat üresen."
        />
        {addresses.length > 1 && (
          <Button onClick={() => handleRemoveAddress(index)} text="Cím eltávolítása" />
        )}
      </div>
    ));
  };

  const handleEditClick = (personId) => {
    setPeople((prevPeople) => {
      const updatedPeople = prevPeople.map((person) => {
        if (person.id === personId) {
          return {
            ...person,
            isEditing: true
          };
        } else {
          return person;
        }
      });
      return updatedPeople;
    });
  };

  const handleEditCancel = (personId) => {
    setPeople((prevPeople) => {
      const updatedPeople = prevPeople.map((person) => {
        if (person.id === personId) {
          return {
            ...person,
            isEditing: false
          };
        } else {
          return person;
        }
      });
      return updatedPeople;
    });
  };

const handleEditSave = async (personId) => {
  const updatedPerson = people.find((person) => person.id === personId);

  try {
    const response = await axios.put(`http://localhost:8080/api/persons/${personId}`, updatedPerson);

    if (response.status === 200) {
      setPeople((prevPeople) => {
        return prevPeople.map((person) => {
          if (person.id === personId) {
            return {
              ...person,
              isEditing: false
            };
          } else {
            return person;
          }
        });
      });

      alert("Sikeres frissítés!");
    } else {
      throw new Error("Nem sikerült frissíteni.");
    }
  } catch (error) {
    console.error(error);
    alert("Hiba történt az adatok frissítése közben. Hiba: " + error);
  }
};


const handleGdprDelete = async (personId) => {
    const confirmed = window.confirm(`Biztosan törölni akarod?`);

    if (confirmed) {
      const updatedPerson = {
        ...people.find((person) => person.id === personId),
        mothersName: "",
        ssn: "",
        tax: ""
      };

      try {
        const response = await axios.put(`http://localhost:8080/api/persons/${personId}`, updatedPerson);

        if (response.status === 200) {
          setPeople((prevPeople) => {
            return prevPeople.map((person) => {
              if (person.id === personId) {
                return {
                  ...person,
                  mothersName: "",
                  ssn: "",
                  tax: ""
                };
              } else {
                return person;
              }
            });
          });

          alert("GDPR adatok (anyja neve, taj, adószám) sikeresen eltávolítva!");
        } else {
          throw new Error("Sikertelen frissítés");
        }
      } catch (error) {
        console.error(error);
        alert("Hiba történt a GDPR adatok frissítése közben.");
      }
    }
  };

const handleDeleteClick = async (personId, personName) => {
  const confirmed = window.confirm(`Biztosan törölni akarod ${personName}-t?`);

  if (confirmed) {
    try {
      const response = await axios.delete(`http://localhost:8080/api/persons/${personId}`);
      if (response.status === 200) {
        // Remove the deleted person from the list
        setPeople((prevPeople) => prevPeople.filter((person) => person.id !== personId));
        alert("Személy sikeresen törölve!");
      } else {
        throw new Error("Személy törlése sikertelen");
      }
    } catch (error) {
      console.error(error);
      alert("Frisítsd az oldalt!");
    }
  }
};

const renderPeople = () => {
  if (people.length === 0) {
    return <p>Nincs megjeleníthető adat.</p>;
  }
  return people.map((person) => (
    <li key={person.id}>
      <div>
        <p>
          Név:{" "}
          {person.isEditing ? (
            <Input
              value={person.name}
              onChange={(e) => handleEditInputChange(person.id, "name", e.target.value)}
            />
          ) : (
            person.name
          )}
          {" | "}Születési idő:{" "}
          {person.isEditing ? (
            <Input
              value={person.birthdate}
              onChange={(e) => handleEditInputChange(person.id, "birthdate", e.target.value)}
            />
          ) : (
            person.birthdate
          )}
          {" | "}Születési hely:{" "}
          {person.isEditing ? (
            <Input
              value={person.birthplace}
              onChange={(e) => handleEditInputChange(person.id, "birthplace", e.target.value)}
            />
          ) : (
            person.birthplace
          )}
          {" | "}Taj szám:{" "}
          {person.isEditing ? (
            <Input
              value={person.ssn}
              onChange={(e) => handleEditInputChange(person.id, "ssn", e.target.value)}
            />
          ) : (
            person.ssn
          )}
          {" | "}Adóazonosító:{" "}
          {person.isEditing ? (
            <Input
              value={person.tax}
              onChange={(e) => handleEditInputChange(person.id, "tax", e.target.value)}
            />
          ) : (
            person.tax
          )}
          {" | "}Email:{" "}
          {person.isEditing ? (
            <Input
              value={person.email}
              onChange={(e) => handleEditInputChange(person.id, "email", e.target.value)}
            />
          ) : (
            person.email
          )}
          {" | "}Anyja neve:{" "}
          {person.isEditing ? (
            <Input
              value={person.mothersName}
              onChange={(e) => handleEditInputChange(person.id, "mothersName", e.target.value)}
            />
          ) : (
            person.mothersName
          )}
          {" | "}Cím(ek):{" "}
          {person.isEditing ? (
            person.addresses.map((address, index) => (
              <div key={index}>
                <label>Irányítószám:</label>
                <Input
                  value={address.postCode}
                  onChange={(e) =>
                    handleEditAddressChange(person.id, index, "postCode", e.target.value)
                  }
                />
                <label>Város:</label>
                <Input
                  value={address.city}
                  onChange={(e) =>
                    handleEditAddressChange(person.id, index, "city", e.target.value)
                  }
                />
                <label>Cím:</label>
                <Input
                  value={address.address}
                  onChange={(e) =>
                    handleEditAddressChange(person.id, index, "address", e.target.value)
                  }
                />
              </div>
            ))
          ) : (
            person.addresses.map((address, index) => (
              <span key={index}>
                <strong>Irányítószám:</strong> {address.postCode}, <strong>Város:</strong> {address.city},{" "}
                <strong>Cím:</strong> {address.address}
              </span>
            ))
          )}
          {" | "}Telefonszám(ok):{" "}
          {person.isEditing ? (
            person.phones.map((phone, index) => (
              <div key={index}>
                <label>Telefonszám:</label>
                <Input
                  value={phone.phone}
                  onChange={(e) =>
                    handleEditPhoneChange(person.id, index, "phone", e.target.value)
                  }
                />
              </div>
            ))
          ) : (
            person.phones.map((phone, index) => (
              <span key={index}>
                <strong>Telefonszám:</strong> {phone.phone}
              </span>
            ))
          )}
        </p>
        {person.isEditing ? (
          <div>
            <Button onClick={() => handleEditSave(person.id)} text="Mentés" />
            <Button onClick={() => handleEditCancel(person.id)} text="Mégse" />
          </div>
        ) : (
          <div>
                        <Button onClick={() => handleEditClick(person.id)} text="Szerkesztés" />
                        <Button onClick={() => handleDeleteClick(person.id, person.name)} text="Törlés" />
                        <Button onClick={() => handleGdprDelete(person.id)} text="GDPR Törlés" />
                      </div>
        )}
      </div>
    </li>
  ));
};




  const handleEditInputChange = (personId, field, value) => {
    setPeople((prevPeople) => {
      const updatedPeople = prevPeople.map((person) => {
        if (person.id === personId) {
          return {
            ...person,
            [field]: value
          };
        } else {
          return person;
        }
      });
      return updatedPeople;
    });
  };

 const handleEditAddressChange = (personId, addressIndex, field, value) => {
   setPeople((prevPeople) => {
     const updatedPeople = prevPeople.map((person) => {
       if (person.id === personId) {
         const updatedAddresses = person.addresses.map((address, index) => {
           if (index === addressIndex) {
             return {
               ...address,
               [field]: value
             };
           } else {
             return address;
           }
         });

         return {
           ...person,
           addresses: updatedAddresses
         };
       } else {
         return person;
       }
     });
     return updatedPeople;
   });
 };

 const handleEditPhoneChange = (personId, phoneIndex, field, value) => {
   setPeople((prevPeople) => {
     const updatedPeople = prevPeople.map((person) => {
       if (person.id === personId) {
         const updatedPhones = person.phones.map((phone, index) => {
           if (index === phoneIndex) {
             return {
               ...phone,
               [field]: value
             };
           } else {
             return phone;
           }
         });

         return {
           ...person,
           phones: updatedPhones
         };
       } else {
         return person;
       }
     });
     return updatedPeople;
   });
 };


  return (
    <div className="App">
      <div className="menu-container">
        <Button
          className={selectedPage === "addNew" ? "selected" : ""}
          onClick={() => handleMenuClick("addNew")}
          text="Új"
        />
        <Button
          className={selectedPage === "listPeople" ? "selected" : ""}
          onClick={() => handleMenuClick("listPeople")}
          text="Lista"
        />
      </div>
      {selectedPage === "addNew" && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-left">
            <Input
              label="Név"
              placeholder="Teljes név..."
              value={name.value}
              onChange={handleNameInput}
              isValid={name.isValid}
              isTouched={name.isTouched}
              errorMsg="A mező nem lehet üres és csak betűket tartalmazhat."
            />

            <Input
              label="Születési Dátum"
              placeholder="Születési dátum (yyyy-mm-dd)"
              value={birthDate.value}
              onChange={handleBirthDateInput}
              isValid={birthDate.isValid}
              isTouched={birthDate.isTouched}
              errorMsg="A mezőnek a yyyy-mm-dd formátumú dátumnak kell lennie."
            />

            <Input
              label="Születési hely"
              placeholder="Születési hely..."
              value={birthPlace.value}
              onChange={handleBirthPlaceInput}
              isValid={birthPlace.isValid}
              isTouched={birthPlace.isTouched}
              errorMsg="A mező nem maradhat üresen."
            />

            <Input
              label="Anyja születési neve"
              placeholder="Anyja születési neve..."
              value={motherName.value}
              onChange={handleMotherNameInput}
              isValid={motherName.isValid}
              isTouched={motherName.isTouched}
              errorMsg="A mező nem lehet üres és csak betűket tartalmazhat."
            />

            <Input
              label="TAJ szám"
              placeholder="TAJ szám..."
              value={tajNumber.value}
              onChange={handleTajNumberInput}
              isValid={tajNumber.isValid}
              isTouched={tajNumber.isTouched}
              errorMsg="Összesen 9 számjegyet adj meg."
            />

            <Input
              label="Adóazonosító jel"
              placeholder="Adóazonosító jel..."
              value={taxID.value}
              onChange={handletaxIDInput}
              isValid={taxID.isValid}
              isTouched={taxID.isTouched}
              errorMsg="Összesen 10 számjegyet adj meg."
            />

            <Input
              label="Email"
              placeholder="Email..."
              value={email.value}
              onChange={handleEmailInput}
              isValid={email.isValid}
              isTouched={email.isTouched}
              errorMsg="Írj be érvényes emailcímet!"
            />

            <Button
              text="Személy Hozzáadása"
              type="submit"
              disabled={!formIsValid}
            />
          </form>

          <div className="form-right">
            <h2>Címek</h2>
            {renderAddresses()}
            <Button onClick={handleAddAddress} text="Cím hozzáadása" />

            <h2>Telefonszámok</h2>
            {phoneNumbers.map((phoneNumber, index) => (
              <div key={index}>
                <Input
                  label={`Telefonszám ${index + 1}`}
                  placeholder="Telefonszám..."
                  value={phoneNumber.value}
                  onChange={(e) => handlePhoneNumberInput(index, e)}
                  isValid={phoneNumber.isValid && phoneNumber.isTouched}
                  isTouched={phoneNumber.isTouched}
                  errorMsg="Csak számokat adj meg."
                />
                {phoneNumbers.length > 1 && (
                  <Button
                    onClick={() => handleRemovePhoneNumber(index)}
                    text="Telefonszám eltávolítása"
                  />
                )}
              </div>
            ))}
            <Button onClick={handleAddPhoneNumber} text="Telefonszám hozzáadása" />
          </div>
        </div>
      )}

      {selectedPage === "listPeople" && (
        <div className="list-container">
          <h1>Személyek listája</h1>
          <ul>{renderPeople()}</ul>
        </div>
      )}
    </div>
  );
}
