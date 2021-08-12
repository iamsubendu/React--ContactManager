import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
//useState is a react hook to use states
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { uuid } from "uuidv4";
import ContactDetail from "./ContactDetail";

//useEffect is used to store the data locally or using local Storage

//when value changes this useeffect helps us to render the component again

// Note: if we want to pass anything from parent to child we use props
// but
// if we want to pass from child to parent than we use prop

//this is called jsx as combination of html and js

//props pass data from parent to child

function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  // const contacts = [
  //   {
  //     id: "1",
  //     name: "Chotu",
  //     email: "chotu@gmail.com",
  //   },
  //   {
  //     id: "2",
  //     name: "Tutu",
  //     email: "tutu@gmail.com",
  //   },
  // ];

  //for functional component we have to use react hooks

  const [contacts, setContacts] = useState([]);
  //for initial we have to set it as null
  const addContactHandler = (contact) => {
    //we can't directly update the contacts...we have to use setContacts
    //  => setContacts([...contacts, contact]);
    //to use all previous value we use rest i.e, ...contacts
    //and than we want to add new contact so => contact
    setContacts([...contacts, { id: uuid(), ...contact }]);
    //creating an object and using rest operator to get email and name
  };
  const removeContactHandler = (id) => {
    //only that contact will be returned which won't matched with the id
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(
    //to display the data as soon as we enter the required field, on more useEffect is used
    () => {
      const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (data) setContacts(data);
    },
    []
  );
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    //for using setItem we need a key
  }, [contacts]);
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

//render is one another prop
//component will create every time a new element as we add any contact
//this will create performance issue
//thus we use render
//thats correct way to pass props
