document.addEventListener('DOMContentLoaded', cargarPAG);

let fechaSeleccionada = new Date();
let btnconfirmar;
let btnrechazar;
let idpago = sessionStorage.getItem("pago");
let admin = sessionStorage.getItem("rol") ;


// CUANDO SE CARGA EL DOM
function cargarPAG() {
    if (admin === "A"){
    funcionFecha();
    cargarSolicitudes();
    const flechaIzquierda = document.querySelector('.flecha-izqMo');
    const flechaDerecha = document.querySelector('.flecha-dxaMO');
    const flechaIzquierdaP = document.querySelector('.flecha_izd');
    const flechaDerechaP = document.querySelector('.flecha_dxa');


    flechaIzquierda.addEventListener('click', retrocederDia);
    flechaDerecha.addEventListener('click', avanzarDia);
    flechaIzquierdaP.addEventListener('click', avanzarDia);
    flechaDerechaP.addEventListener('click', retrocederDia);
    }
    else{
        window.location.href ="sinacceso";
    }
}

// CARGAR
async function cargarSolicitudes() {
    await realizarPeticionesPendientes();
}

function obtenerFechaFormateada(fecha) {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();

    dia = (dia < 10) ? '0' + dia : dia;
    mes = (mes < 10) ? '0' + mes : mes;

    return dia + '/' + mes + '/' + año;
}

function funcionFecha() {
    let h4Fecha = document.querySelector('aside h4');
    h4Fecha.textContent = obtenerFechaFormateada(fechaSeleccionada);
}

function retrocederDia() {
    fechaSeleccionada.setDate(fechaSeleccionada.getDate() - 1);
    funcionFecha();
    cargarSolicitudes();
}

function avanzarDia() {
    fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1);
    funcionFecha();
    cargarSolicitudes();
}

function realizarPeticionesPendientes() {
    let url = '/SaguntoCityFun/solicitudes/pendientes';
    console.log("a punto de hacer el fetch");

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar eventos activos. Estado: ${response.status}`);
            }

            return response.json();
        })
        .then(datosJSON => {
            mostrarEventos(datosJSON);
        })
        .catch(error => {
            console.error(error);
            alert("Error en la carga de eventos. Por favor, inténtelo de nuevo.");
        });
}

function mostrarEventos(datosJSON) {
    console.log(datosJSON);
    const inicio = (paginaActual - 1) * articulosPorPagina;
    const fin = inicio + articulosPorPagina;

    const fechaSeleccionadaString = fechaSeleccionada.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const eventosDeHoy = datosJSON.filter(evento => {
        const fechaEvento = new Date(evento.dia).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        return fechaEvento === fechaSeleccionadaString;
    });

    const main = document.querySelector('main');
    const articlesAnteriores = main.querySelectorAll('article');
    const botonAnterior = document.getElementById('anadir');


    articlesAnteriores.forEach(article => {
        main.removeChild(article);
    });


    if (botonAnterior) {
        main.removeChild(botonAnterior);
    }

    if (eventosDeHoy.length === 0) {
        let divSinEventos = crearElemento('article', main);
        divSinEventos.classList.add('sinEventos');
        crearElementoTexto("No hay eventos en esta fecha", 'h2', divSinEventos);
    } else {
        for (let i = inicio; i < fin && i < eventosDeHoy.length; i++) {
            let divEvento = crearElemento('article', main);
            crearElementoTexto(eventosDeHoy[i].nombreevento, 'h2', divEvento);
            crearElementoTextoAdicional(eventosDeHoy[i].local, "Local del evento: ", 'h4', divEvento);
            crearElementoTextoAdicional(eventosDeHoy[i].hora, "Hora del evento: ", 'p', divEvento);
            crearElementoTextoAdicional(eventosDeHoy[i].precio, "Precio de la entrada: ", 'p', divEvento);
            crearElementoTexto(eventosDeHoy[i].link, 'p', divEvento);
            btnconfirmar = crearElementoTexto('APROBAR', 'button', divEvento);
            btnrechazar = crearElementoTexto('RECHAZAR', 'button', divEvento);
            btnrechazar.classList.add('boton-rechazar');
            btnconfirmar.classList.add('boton-confirmar');

            btnconfirmar.addEventListener('click', function() {
                const idSolicitud = eventosDeHoy[i].id;
                realizarPeticionesAprobar(idSolicitud);
            });

            btnrechazar.addEventListener('click', function() {
                const idSolicitud = eventosDeHoy[i].id;
                realizarPeticionesRechazar(idSolicitud);
            });
        }
    }
}

function realizarPeticionesAprobar(idSolicitud) {
    const url = `/SaguntoCityFun/solicitudes/aprobar/${idSolicitud}`;


    console.log("el id de la solicitud es: " + idSolicitud);
    fetch(url, {
        method: 'PUT', // Método PUT para actualizar la solicitud
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idestado: 2 })
    })
        .then(response => {
            cargarPAG();
            if (!response.ok) {
                throw new Error(`Error al aprobar la solicitud. Estado: ${response.status}`);
            }
        })
        .catch(error => {
            console.error(error);
            alert("Error al aprobar la solicitud. Por favor, inténtelo de nuevo.");
        });
}

function realizarPeticionesRechazar(idSolicitud) {
    const url = `/SaguntoCityFun/solicitudes/aprobar/${idSolicitud}`;
    console.log("el id de la solicitud es: " + idSolicitud);
    fetch(url, {
        method: 'PUT', // Método PUT para actualizar la solicitud
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idestado: 3 })
    })
        .then(response => {
            cargarPAG();
            if (!response.ok) {
                throw new Error(`Error al rechazar la solicitud. Estado: ${response.status}`);
            }
        })
        .catch(error => {
            console.error(error);
            alert("Error al rechazar la solicitud. Por favor, inténtelo de nuevo.");
        });
}

// Funciones auxiliares para crear elementos
function crearElemento(tag, parent) {
    const elemento = document.createElement(tag);
    parent.appendChild(elemento);
    return elemento;
}


