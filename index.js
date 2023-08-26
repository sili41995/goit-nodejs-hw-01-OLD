const contacts = require('./contacts');
const { program } = require('commander');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactsList = await contacts.listContacts();
      return console.log(contactsList);

    case 'get':
      const contact = await contacts.getContactById(id);
      return console.log(contact);

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      return console.log(newContact);

    case 'remove':
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

program
  .option('--action <type>')
  .option('--id <type>')
  .option('--name <type>')
  .option('--email <type>')
  .option('--phone <type>');

program.parse();

const options = program.opts();
invokeAction(options);
