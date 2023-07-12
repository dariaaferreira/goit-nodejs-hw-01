const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function errorHandling(asyncFunction) {
  try {
    return await asyncFunction();
  } catch (error) {
    console.log('Error:', error.message);
  }
}

//Повертає масив контактів.
async function listContacts() {
  return errorHandling(async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    console.log('List of contacts:');
    console.table(contacts);

    return contacts;
  });
}

//Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
async function getContactById(contactId) {
  return errorHandling(async () => {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      console.log(`Contact by id ${contactId}:`);
      console.table(contact);

      return contact;
    } else {
      console.log(`Contact with id "${contactId}" not found!`);

      return null;
    }
  });
}

//Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
async function removeContact(contactId) {
  return errorHandling(async () => {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);

    if (updatedContacts.length === contacts.length) {
      console.log(`Contact with id "${contactId}" not found!`);

      return;
    }

    console.log(`Contact with id "${contactId}" deleted successfully! New list of contacts:`);
    console.table(updatedContacts);

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  });
}

//Повертає об'єкт доданого контакту. 
async function addContact(name, email, phone) {
  return errorHandling(async () => {
    const contacts = await listContacts();

    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log('New contact added successfully!');

    console.table(newContact);
    return newContact;

  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
