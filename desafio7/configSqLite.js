const sqLiteConfig = {
    client: "sqlite3",
    connection: {
        filename: "./DB/ecommerce.sqlite",
    },
    useNullAsDefault: true,
};


module.exports = {
    sqLiteConfig,
};