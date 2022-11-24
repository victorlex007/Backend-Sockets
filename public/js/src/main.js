const socket = io();

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()

    // armo la persona extrayendo los datos de los campos del formulario

    const producto = {
        nombre: formAgregarProducto[0].value, // document.getElementById('txtNombre').value
        apellido: formAgregarUrl[1].value, // document.getElementById('txtApellido').value
    }

    // envio la persona al servidor via socket
    socket.emit('update', producto);

    // limpio el contenido de los campos del formulario
    formAgregarPersona.reset()
})

// agrego manejador de eventos de tipo 'personas'
socket.on('producto', manejarEventoProducto);

async function manejarEventoProducto(producto) {
    // console.log(producto)

    // busco la plantilla del servidor
    const recursoRemoto = await fetch('plantillas/tabla-productos.hbs')

    //extraigo el texto de la respuesta del servidor
    const textoPlantilla = await recursoRemoto.text()

    //armo el template con handlebars
    const functionTemplate = Handlebars.compile(textoPlantilla)

    // relleno la plantilla con las productos recibidas
    const html = functionTemplate({ producto })

    // reemplazo el contenido del navegador con los nuevos datos
    document.getElementById('productos').innerHTML = html
}