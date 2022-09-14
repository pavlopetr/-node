const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(result);
    return contactsList;
  } catch (err) {
    return console.error(err);
  }
}
async function getContactById(contactId) {
  const contactsAll = await listContacts();
  const contact = contactsAll.find(({ id }) => id === contactId);
  if (!contact) {
    throw new Error("Not found for contact!!!");
  }
  return contact;
}

async function removeContact(contactId) {
  try {
    const contactsAll = await listContacts();
    const contactsRemove = contactsAll.find(
      (contact) => contact.id === contactId.toString()
    );
    const newContactsList = JSON.stringify(
      contactsAll.filter((contact) => contact.id !== contactId.toString())
    );
    fs.writeFile(contactsPath, newContactsList);
    return contactsRemove;
  } catch (err) {
    return console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsAll = await listContacts();
    const newContacts = { id: uuidv4(), name, email, phone };
    const newContactsList = JSON.stringify([...contactsAll, newContacts]);
    fs.writeFile(contactsPath, newContactsList);
    return newContacts;
  } catch (err) {
    return console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
