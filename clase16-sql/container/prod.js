class Container {

    constructor(db, tabla){
        this.db = db
        this.tabla = tabla
        
    }
    async save(obj) {
        const knex = require('knex')(this.db)
        try {
            await knex(this.tabla).insert(obj)
        }catch (error) { console.log(error);
    }}

    async getAll() {
        const knex = require('knex')(this.db)
        try {
            const all = await knex.select("*").from(this.tabla)
            return all
        } catch (error) {console.log(error)}
    }
};

module.exports = Container;