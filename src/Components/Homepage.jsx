import React from "react";
import ContactsBoard from "./viewContacts/ContactsBoard"


const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to your Contacts Manager</h1>
      <p className="text-lg text-gray-600 mb-6">
        Easily manage your contacts, add new addresses, and keep your address book organised.
      </p>
      <ContactsBoard />
    </div>

  );
};

export default HomePage;
