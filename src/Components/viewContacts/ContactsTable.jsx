import { Button } from "reactstrap";
const ContactsTable = ({ data, handleDelete, handleNavigate }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>City</th>
          <th>postcode</th>
        </tr>
      </thead>
      <tbody>
        {data.map((contact) => (
          <tr key={contact._id}>
            <td>{contact.firstName}</td>
            <td>{contact.lastName}</td>
            <td>{contact.email}</td>
            <td>{contact.address}</td>
            <td>{contact.city}</td>
            <td>{contact.postcode}</td>
            <td>
              <Button
                color="danger"
                size="sm"
                onClick={() => handleDelete(contact._id)}
              >
                Delete
              </Button>
              <Button
                color="warning"
                size="sm"
                onClick={() => {
                  handleNavigate(contact._id);
                }}
              >
                Edit
              </Button>
            </td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactsTable;
