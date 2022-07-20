const fs = require("fs");
class Container {

    constructor(filename,){
        this.filename = filename
        this.data = []
        try {
            this.read()
        } catch (error) {
            this.write()
        }
    }

    async write() {
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(this.data, null, 2))
        } catch (error) {
            console.log(error)
        }
    }

    async read() {
        try {
            const data = await fs.promises.readFile(this.filename);
            this.data = JSON.parse(data)
        } catch (error) {
            console.log(error)
        }
    }
    save(obj) {
        const id = this.getLastID()
        this.data.push({
            ...obj, ...{ id: id + 1 }
        })
        this.write()
    }
    async getAll() {
        try {
            const allContent = await fs.promises.readFile(this.filename, 'utf-8')
            const content = JSON.parse(allContent)
            return content;
        } catch (error) {
            console.log(error)
        }
    }
    getLastID() {
        const dataLength = this.data.length
        if (dataLength < 1) return 0
        return this.data[this.data.length - 1].id
    }
};

module.exports = Container;