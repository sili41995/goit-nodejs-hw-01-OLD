const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const normalizedId = String(contactId);
  return contacts.find(({ id }) => id === normalizedId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const normalizedId = String(contactId);
  const targetId = contacts.findIndex(({ id }) => id === normalizedId);
  if (!!~targetId) {
    return null;
  }
  return contacts.splice(targetId, 1);
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  return [...contacts, { name, email, phone }];
}

module.exports = { listContacts, getContactById, removeContact, addContact };
