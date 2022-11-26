const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productos = []

//--------------------------------------------
// socket

io.on('connection', socket => {
    // console.log('Nuevo cliente conectado!');

    // carga inicial de personas
    socket.emit('productos', productos);

    // actualizacion de personas
    socket.on('update', producto => {
        personas.push(producto)
        io.sockets.emit('productos', producto);
    })
});

//--------------------------------------------
// middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// server

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))