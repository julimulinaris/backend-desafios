class Product {
    constructor(connection, table) {
        this.KnexProducts = require("knex")(connection);
        this.table = table;
    }

    async getAll () {
        try {
            return await this.KnexProducts.select("*").from(this.table)
        }
        catch (e) {
            console.log(e);
        }
    }

    async save (title, price, thumbnail){
        try {
            const newProduct = {
                title,
                price,
                thumbnail
            }
            return await this.KnexProducts.insert(newProduct).into(this.table)
        } catch (e) {
            console.log(e);
        }
    }
}


module.exports = Product;