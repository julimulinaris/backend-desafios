const express = require("express")
const { Server: HTTPServer } = require ("http")
const { Server: IOServer } = require ("socket.io")
const { connection } = require("./configMySql");
const { sqLiteConfig } = require("./configSqLite.js");

const Product = require("./productClass")
const producto = new Product (connection, "productos");

const ApiMsj = require("./messagesClass")
const mensajesApi = new ApiMsj(sqLiteConfig, "mensajes");

const app = express()
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", async socket => {
    const products = await producto.getAll()
    socket.emit("productos", products)

    socket.on("new-product", async data =>{
        await producto.save(data.title, data.price, data.thumbnail);
        const products = await producto.getAll()
        io.sockets.emit("productos", products)
    })

    messages = await mensajesApi.getAll()
    socket.emit("mensajes", messages)

    socket.on("new-msg", async data =>{
        const date = new Date().toLocaleString()
        await mensajesApi.save(data.autor, data.texto, date)
        messages = await mensajesApi.getAll()
        io.sockets.emit("mensajes", messages)
    })
})

httpServer.listen(8080, () =>{
    console.log("Conectado!")
})