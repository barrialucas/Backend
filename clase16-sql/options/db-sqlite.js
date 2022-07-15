const option = {
    client: 'sqlite3',
    connection: {
        filename: "./DB/ecommerce.sqlite"
    },
    useNullAsDefault: true
}
const knex = require("knex")(option);

knex.schema.hasTable("messages")
.then((result) => {
  if (!result) {
    knex.schema.createTable("messages", (table) => {
          table.increments("id", {primaryKey: true,});
          table.string("mail"),
          table.string("text"),
          table.string("fecha")
      })
      .then(() => {console.log("Tabla de mensajes creada!")})
      .catch(error => {console.log(error)})
      .finally(() => {knex.destroy()});
  }
});

module.exports = option;

