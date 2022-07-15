const fs = require('fs');

class ContenedorArchivo {

    constructor(e) {
        this.textJson = e;
        this.data = []
        try {
            this.read()
        } catch (error) {
            this.write()
        }
    }

    read() {
        this.data = JSON.parse(fs.readFileSync(this.e));
    }
    write() {
        fs.writeFileSync(this.textJson, JSON.stringify(this.data));
    }

    async save(obj) {
        obj['id'] = this.data.length + 1;
        this.data.push(obj)
        this.write()
        return obj
    }

    async getByID(id) {
        const objID = this.data.find(obj => obj.id === id)
        return objID
    }
    async getAll() {
        return this.data
    }

    async editById(obj , id) {
        obj['id'] = id
        const idx = this.getAll().findIndex(p => p.id === id)
        this.getAll().splice(idx , 1 , obj )
        this.write()
        return obj
    }

    async deleteByID(id) {
        const idx = this.data.findIndex(obj => obj.id == id)
        this.data.splice(idx, 1)
        this.write()
    }

    async deleteAll() {
        this.data = []
        this.write()
    }
  
}

module.exports = ContenedorArchivo;
