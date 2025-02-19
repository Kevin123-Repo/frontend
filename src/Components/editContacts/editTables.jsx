import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  FormText,
  Button,
} from "reactstrap";

const EditTable = ({ contact, updateContactsList }) => {
  const { contactId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
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
    if (firstName !== contact.firstName) {
      newData.firstName = firstName ? firstName : contact.firstName; // second part to account for when someone inputs something then deletes completely
    }
    if (lastName !== contact.lastName) {
      newData.lastName = lastName ? lastName : contact.lastName;
    }
    console.log(Object(newData));

    if (Object.keys(newData).length > 0) {
      console.log("Run a patch method");
      console.log(`http://localhost:8080/contacts/${contactId}`);
      axios
        .patch(`http://localhost:8080/contacts/${contactId}`, Object(newData))
        .then((response) => {
          console.log("Updated successfully", response.data, response.status);
          updateContactsList(response.data);
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
            <Label for="exampleEmail">First Name</Label>
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
            <Label for="exampleEmail">Last Name</Label>
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
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default EditTable;
