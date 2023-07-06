const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

//Повертає масив контактів.
async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data);
  
      console.log('List of contacts:');
      console.table(contacts);

      return contacts;
    } catch (error) {
      console.log('Error: ', error.message);
    }
}
  
//Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const contact = contacts.find(contact => {
      if (contact.id === contactId) {
        console.log(`Contact by id ${contactId}:`);
        console.table(contact);

        return contact;
      }
  });

  if (contact == null) {
    console.log(`Contact with id "${contactId}" not found!`);
  }

  } catch (error) {
    console.log('Error: ', error.message);
  }
}
  
//Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const updatedContacts = contacts.filter(contact => contact.id !== contactId);

    if (updatedContacts.length === contacts.length) {
      console.log(`Contact with id "${contactId}" not found!`);
      return;
    }

    console.log(`Contact with id "${contactId}" deleted successfully! New list of contacts:`);
    console.table(updatedContacts);

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));    
  } catch (error) {
    console.log('Error: ', error.message);
  }
}

  
//Повертає об'єкт доданого контакту. 
async function addContact(name, email, phone) {
    try {
      const contacts = await listContacts();

      const newContact = { id: Date.now().toString(), name, email, phone };
      contacts.push(newContact);

      await fs.writeFile(contactsPath, JSON.stringify(contacts));

      console.log('New contact added successfully!');
      console.table(newContact);

    } catch (error) {
      console.log('Error: ', error.message);
    }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};