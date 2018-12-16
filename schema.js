var fs = require('fs');
const personResolver = require('./person')
const path = "schema.graphql";
const utf8 = "UTF-8";

module.exports = {
  getResolvers: () => {
    return {
      Query: {
        listPersons: personResolver.listPersons,
        getPerson: personResolver.getPerson,
      },
      Mutation: {
        addPerson: personResolver.addPerson,
        deletePerson: personResolver.deletePerson
      }
    }
  },

  getSchema: function () {
    return String(fs.readFileSync(path, {encoding: utf8}));
  }
};
