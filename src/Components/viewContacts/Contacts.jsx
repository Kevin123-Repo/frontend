const Contact = ({contact}) =>{
    return(
        <tr>
            <td>{contact._id}</td>
            <td>{contact.firstName}</td>
            <td>{contact.lastName}</td>
            <td>{contact.email}</td>
            <td>{contact.address}</td>
            <td>{contact.city}</td>
            <td>{contact.postcode}</td>
        </tr>
    );
}

export default Contact;
