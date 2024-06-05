document.addEventListener('DOMContentLoaded', cargarPAG);
let fechaSeleccionada = new Date();
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

    // FUNCION FLECHA
    flechaIzquierda.addEventListener('click', retrocederDia);
    flechaDerecha.addEventListener('click', avanzarDia);
    flechaIzquierdaP.addEventListener('click', avanzarDia);
    flechaDerechaP.addEventListener('click', retrocederDia);
    }
    else{
        window.location.href ="sinacceso";
    }

}

// CARGAR SOLICITUDES
async function cargarSolicitudes() {
    await realizarPeticionesPasadas();

}

function obtenerFechaFormateada(fecha) {
    const fechaAyer = new Date(fecha);
    fechaAyer.setDate(fechaAyer.getDate() - 1);

    let dia = fechaAyer.getDate();
    let mes = fechaAyer.getMonth() + 1;
    let año = fechaAyer.getFullYear();

    dia = (dia < 10) ? '0' + dia : dia;
    mes = (mes < 10) ? '0' + mes : mes;
    return dia + '/' + mes + '/' + año;
}
//FUNCIONES PRA LA FECHA
function funcionFecha() {
    let h4Fecha = document.querySelector('aside h4');
    h4Fecha.textContent = obtenerFechaFormateada(fechaSeleccionada);
}


function retrocederDia() {
    const fechaActual = new Date() ;

    if (fechaSeleccionada > fechaActual) {
        return; // No retroceder más allá del día actual
    }

    fechaSeleccionada.setDate(fechaSeleccionada.getDate() - 1);
    funcionFecha();
    cargarSolicitudes();
}


function avanzarDia() {
    const fechaHoy = new Date();
    const fechaAyer = new Date(fechaHoy);
    fechaAyer.setDate(fechaHoy.getDate() - 1);

    if (fechaSeleccionada.getTime() < fechaHoy.getTime()) {
        if (fechaSeleccionada.getTime() < fechaAyer.getTime()) {
            fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1);
            funcionFecha();
            cargarSolicitudes();
        }
    }
}

//PETICION PASADAS
function realizarPeticionesPasadas() {
    let url = '/SaguntoCityFun/solicitudes/pasadas';
    console.log("a punto de hacer el fetch");

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar eventos pasados. Estado: ${response.status}`);
            }

            return response.json();
        })
        .then(datosJSON => {
            mostrarEventos(datosJSON);
        })
        .catch(error => {
            console.error(error);
            alert("Error en la carga de eventos pasados. Por favor, inténtelo de nuevo.");
        });
}
function mostrarEventos(datosJSON) {
    console.log(datosJSON);

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
        for (let i = 0; i < eventosDeHoy.length; i++) {
            let divEvento = crearElemento('article', main);
            crearElementoTexto(eventosDeHoy[i].nombreevento, 'h2', divEvento);
            crearElementoTextoAdicional(eventosDeHoy[i].local, "Local del evento: ", 'h4', divEvento);
            crearElementoTextoAdicional(eventosDeHoy[i].hora, "Hora del evento: ", 'p', divEvento);
            crearElementoTextoAdicional(eventosDeHoy[i].precio, "Precio de la entrada: ", 'p', divEvento);
            crearElementoTexto(eventosDeHoy[i].link, 'p', divEvento);
        }
    }

}

function crearElemento(tipo = "", padre = "") {
    let elemento = document.createElement(tipo);
    padre.appendChild(elemento);
    return elemento;
}
function crearElementoTexto(texto, tipo, padre) {
    let elemento = document.createElement(tipo);
    elemento.textContent = texto;
    padre.appendChild(elemento);
    return elemento;
}

function crearElementoTextoAdicional(texto, textoAdicional, tipo, padre) {
    let elemento = document.createElement(tipo);
    elemento.textContent = textoAdicional + texto;
    padre.appendChild(elemento);
    return elemento;
}

