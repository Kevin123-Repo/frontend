import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditTable from "./editTables";

const EditForm = () => {
    const [contact, setContact] = useState({})
    const { contactId } = useParams(); // Get the contactId from URL

    useEffect(() => {
        axios
            .get(`http://localhost:8080/contacts/${contactId}`)
            .then((response) => {
                setContact(response.data)
            }).catch((err) => console.error(err.message))
        }, [contactId]
    
    )

    return (
    
    <div>
        <h1>Editing Contact: {contact.firstName} {contact.lastName}</h1>
        <EditTable contact ={contact}/>
    </div>
    );
}

export default EditForm