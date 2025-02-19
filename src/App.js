import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import AddContactsForm from "./Components/addContacts/addContactsForm";
import HomePage from "./Components/Homepage";
import EditForm from "./Components/editContacts/editForm";
import "./App.css";

function App() {
  return (
    <>
    <Router> 
      <NavBar />
      <div className="container-fluid main-content">
        <Routes> 
          
        <Route path="/" element={<HomePage/>} /> 
          <Route path="/create" element={<AddContactsForm />} /> 
          <Route path="/edit/:contactId" element={<EditForm />} /> 
          
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
