class ContenedorMemoria {

    constructor() {
        this.data = []
    }
    
    async save(obj) {
        obj['id'] = this.data.length + 1;
        this.data.push(obj)

        return obj
    }

    async getByID(id) {
        const objID = this.data.find(obj => obj.id == id)
        return objID
    }
    async getAll() {
        return this.data
    }

    async editById(obj , id) {
        obj['id'] = id
        const idx = this.getAll().findIndex(p => p.id === id)
        this.data.splice(idx , 1 , obj )

        return obj
    }

    async deleteByID(id) {
        const idx = this.data.findIndex(obj => obj.id == id)
        this.data.splice(idx, 1)
    }

    async deleteAll() {
        this.data = []
    }

}

module.exports = ContenedorMemoria;

