const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const schema = normalizr.schema;
const util = require('util')

const schemaAuthor = new schema.Entity(
    "author",
    {},
    {
      idAttribute: "mail",
    }
  );
  
  const schemaMessages = new schema.Entity(
    "messages",
    {
      author: schemaAuthor,
    },
    {
      idAttribute: "id",
    }
  );
  
  const schemaAllMsg = new schema.Entity(
    "allMessages",
    {
      messages: [schemaMessages],
    },
    {
      idAttribute: "id",
    }
  );
  const normalizedMsg = (messages) => normalize(messages, [schemaAllMsg])
  module.exports = { normalizedMsg }