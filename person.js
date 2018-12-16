var fs = require('fs');
var uuid = require('uuid/v4');
const path = "Persons.json";
const utf8 = "UTF-8";

module.exports = {
  listPersons: async () => {
    return await jsonToPersonList();
  },

  getPerson: async ({id}) => {
    let foundPerson = await findPerson(id);
    if (foundPerson[0] === undefined)
      throw new Error(`Couldn't find user with id: ${id}`);
    return foundPerson[0];
  },

  addPerson: async (input) => {
    let personsList = await jsonToPersonList();
    let count = personsList.length;
    input.id = uuid();
    personsList[count] = input
    writeToJson(personsList)
    return input;
  },

  deletePerson: async({id}) => {
    let person = await findPerson(id);
    let personsList = await jsonToPersonList();
    personsList.splice(person[1], person[1]);
    writeToJson(personsList);
    return person[0];
  }
};

function writeToJson(json) {
  fs.writeFileSync(path, JSON.stringify({persons: json}), utf8);
}

async function findPerson(id) {
  var foundPerson;
  var personIndex;
  await jsonToPersonList()
  .then(result => {
    for (let index = 0; index < result.length; index++) {
      let person = result[index];
      if (person.id.startsWith(id)) {
        foundPerson = person;
        personIndex = index;
        break;
      }  
    }
  })
  .catch(error => {
    throw new Error(error);
  });
  return [foundPerson, personIndex];
}

async function jsonToPersonList() {
  let personsList = await readJson()
    .then(result => {
      let json = JSON.parse(result);
      return json["persons"]
    })
    .catch(error => {
      throw new Error(error);
    });
  return personsList;
}

function readJson() {
  let fileExists = fs.existsSync(path)
  if (!fileExists) {
    let emptyPersons = { persons: [] };
    fs.writeFileSync(path, JSON.stringify(emptyPersons), utf8);
  }

  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  })
}