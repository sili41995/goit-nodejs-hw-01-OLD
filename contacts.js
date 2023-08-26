const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const targetId = contacts.findIndex(({ id }) => id === contactId);
  if (!~targetId) {
    return null;
  }
  const [removeContact] = contacts.splice(targetId, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = nanoid();
  console.log(id);
  const newContact = { id, name, email, phone };
  const updateContacts = [...contacts, newContact];
  fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
