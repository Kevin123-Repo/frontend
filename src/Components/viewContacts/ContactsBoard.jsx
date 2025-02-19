import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Spinner, Alert, Input } from "reactstrap";
import ContactsTable from "./ContactsTable";

import "./contactsTable.css";

const ContactsBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("firstName");

  // Get All contacts in DB
  useEffect(() => {
    axios
      .get("http://localhost:8080/contacts")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoaded(true);
      });
  }, [location.pathname]);

  // Handle search and filter feature
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((contact) => {
        const fieldValue = contact[selectedFilter];
        // console.log("field " + fieldValue);
        if (fieldValue !== undefined && fieldValue !== null) {
          return fieldValue
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return false;
      });
      setFilteredData(filtered);
    }
  }, [searchQuery, selectedFilter, data]);

  // Handle the change in search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle the change in the selected filter field
  const handleFilterChange = (event) => {
    //console.log("handleFilterChange " + event.target.value)
    setSelectedFilter(event.target.value);
  };

  const handleDelete = (contactId) => {
    axios
      .delete(`http://localhost:8080/contacts/${contactId}`)
      .then(() => {
        setData(data.filter((contact) => contact._id !== contactId));
        setFilteredData(
          filteredData.filter((contact) => contact._id !== contactId)
        );
      })
      .catch((err) => {
        setError("Failed to delete contact.");
      });
  };

  const handleNavigate = (contactId) => {
    navigate(`/edit/${contactId}`); // Navigate to the edit page with contactId
  };

  if (!isLoaded) {
    return (
      <Container className="text-center mt-4">
        <Spinner color="primary" />
        <p>Loading contacts...</p>
      </Container>
    );
  }

  if (err) {
    return (
      <Container className="text-center mt-4">
        <Alert color="danger">
          <h4>Unable to Load Contacts</h4>
          <p>{err}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="board-div">
      <h1>All Contacts</h1>

      <div className="filter-container">
        <Input
          type="text"
          placeholder={`Search by ${selectedFilter}...`}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="firstName"> First Name</option>
          <option value="lastName">Surname</option>
          <option value="city">City</option>
          <option value="email">Email</option>
        </select>
      </div>

      <div className="items-container">
        <ContactsTable
          data={filteredData}
          handleDelete={handleDelete}
          handleNavigate={handleNavigate}
        />{" "}
        {/* passing data and functions to contactsTable */}
      </div>
    </Container>
  );
};

export default ContactsBoard;
