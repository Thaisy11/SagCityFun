document.addEventListener('DOMContentLoaded', cargarPAG);

let fechaSeleccionada = new Date();


// CUANDO SE CARGA EL DOM
function cargarPAG() {
    funcionFecha();
    cargarSolicitudes();
    const flechaIzquierda = document.querySelector('.flecha-izqMo');
    const flechaDerecha = document.querySelector('.flecha-dxaMO');
    const flechaIzquierdaP = document.querySelector('.flecha_izd');
    const flechaDerechaP = document.querySelector('.flecha_dxa');

    // FLECHAS FECHA
    flechaIzquierda.addEventListener('click', retrocederDia);
    flechaDerecha.addEventListener('click', avanzarDia);
    flechaIzquierdaP.addEventListener('click', avanzarDia);
    flechaDerechaP.addEventListener('click', retrocederDia);



}

// CARGAR ACTIVOS
async function cargarSolicitudes() {
    await realizarPeticionesActivas();

}
//FUNCIONES DE FECHA ATRAS Y ALANTE

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
    const fechaActual = new Date();
    const fechaMinima = new Date(fechaActual);
    fechaMinima.setDate(fechaActual.getDate() );

    if (fechaSeleccionada > fechaMinima) {
        fechaSeleccionada.setDate(fechaSeleccionada.getDate() - 1);
        funcionFecha();
        cargarSolicitudes();
    }
}

function avanzarDia() {
    fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1);
    funcionFecha();
    cargarSolicitudes();
}

//PETICION

function realizarPeticionesActivas() {
    let url = '/SaguntoCityFun/solicitudes/activas';
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

//MOSTRAR LOS EVENTOS
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

    // Eliminar artículos anteriores
    articlesAnteriores.forEach(article => {
        main.removeChild(article);
    });

    // Eliminar botón anterior si existe
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
        }
    }

}

