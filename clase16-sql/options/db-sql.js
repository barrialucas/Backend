const option = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'administrador',
        database: 'coder'
    }
}
const knex = require("knex")(option);

knex.schema.hasTable("products")
.then((result) => {
  if (!result) {
    knex.schema.createTable("products", table => {
      table.increments("id", {primaryKey: true,});
      table.string("item");
      table.integer("price");
      table.string("url");
    })
    .then(() => {console.log("Tabla de productos creada!");})
    .catch(error => {console.log(error)})
    .finally(() => {knex.destroy();});
  }
});

module.exports = option;