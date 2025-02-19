import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FormGroup, Label, Input, Button } from "reactstrap";

const EditTable = ({ contact }) => {
  const { contactId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  //Added this useEffect as workaround to useState not syncing at beginning
  useEffect(() => {
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setCity(contact.city);
    setPostcode(contact.postcode);
    setAddress(contact.address);
    setEmail(contact.email);
  }, [contact]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") {
      setFirstName(value);
      console.log(" New First Name = " + value);
    }
    if (name === "lastName") {
      console.log("New Last Name " + value);
      setLastName(value);
      console.log("New Last Name Value = " + lastName);
    }
    if (name === "city") {
      setCity(value);
      console.log(" New City = " + value);
    }
    if (name === "postcode") {
      setPostcode(value);
      console.log(" New Postcode = " + value);
    }
    if (name === "address") {
      setAddress(value);
      console.log(" New Address = " + value);
    }
    if (name === "email") {
      setEmail(value);
      console.log(" New Email = " + value);
    }
  };
  const handleSubmit = () => {
    const newData = {};

    //Added to prevent submission of incorrectemail format
    const emailInput = document.getElementById("email");
    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }
    if (firstName !== contact.firstName) {
      console.log("First Name does not equal");
      newData.firstName = firstName ? firstName : contact.firstName; // second part to account for when someone inputs something then deletes completely
    }
    if (lastName !== contact.lastName) {
      console.log("Last Name does not equal");
      newData.lastName = lastName ? lastName : contact.lastName;
    }
    if (email !== contact.email) {
      newData.email = email ? email : contact.email;
    }
    if (address !== contact.address) {
      newData.address = address ? address : contact.address;
    }
    if (city !== contact.city) {
      newData.city = city ? city : contact.city;
    }
    if (postcode !== contact.postcode) {
      newData.postcode = postcode ? postcode : contact.postcode;
    }
    console.log(Object(newData));

    if (Object.keys(newData).length > 0) {
      console.log("Run a patch method");
      console.log(`http://localhost:8080/contacts/${contactId}`);
      axios
        .patch(`http://localhost:8080/contacts/${contactId}`, Object(newData))
        .then((response) => {
          console.log("Updated successfully", response.data, response.status);
          setIsUpdated(true);
          navigate("/");
        })
        .catch((err) => {
          console.error("Error", err);
        });
    } else {
      console.log("Nothing to do");
      navigate("/");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm">
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder={contact.firstName}
              type="string"
              onChange={handleChange}
            />
          </FormGroup>
        </div>

        <div className="col-sm">
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder={contact.lastName}
              type="string"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
      </div>
      <div class="row">
        <div className="col-sm">
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder={contact.address}
              type="string"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className="col-sm">
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder={contact.city}
              type="string"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className="col-sm">
          <FormGroup>
            <Label for="postcode">Postcode</Label>
            <Input
              id="postcode"
              name="postcode"
              placeholder={contact.postcode}
              type="string"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
      </div>
      <div className="=" row>
        <div className="col-sm">
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder={contact.email}
              type="email"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
      </div>
      <div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>

      {isUpdated && (
        <p className="text-success">Contact updated successfully!</p>
      )}
    </div>
  );
};

export default EditTable;
