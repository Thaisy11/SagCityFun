document.addEventListener('DOMContentLoaded', cargarPAG);
// VARIABLES PARA LA PAGINACIÓN
let paginaActual = 1;
const articulosPorPagina = 4;
let fechaSeleccionada = new Date();


// CUANDO SE CARGA EL DOM
function cargarPAG() {
    funcionFecha();
    cargarSolicitudes();
    const flechaIzquierda = document.querySelector('.flecha-izqMo'); // Flecha izquierda para dispositivos móviles
    const flechaDerecha = document.querySelector('.flecha-dxaMO'); // Flecha derecha para dispositivos móviles
    const flechaIzquierdaP = document.querySelector('.flecha_izd'); // Flecha izquierda para dispositivos grandes
    const flechaDerechaP = document.querySelector('.flecha_dxa'); // Flecha derecha para dispositivos grandes

    // Agrega event listeners a las flechas para dispositivos móviles
    flechaIzquierda.addEventListener('click', retrocederDia);
    flechaDerecha.addEventListener('click', avanzarDia);

    // Agrega event listeners a las flechas para dispositivos grandes
    flechaIzquierdaP.addEventListener('click', avanzarDia);
    flechaDerechaP.addEventListener('click', retrocederDia);


}

// CARGAR ARTÍCULOS DE LA TIENDA
async function cargarSolicitudes() {
    await realizarPeticionesPasadas();

}

function obtenerFechaFormateada(fecha) {
    const fechaAyer = new Date(fecha); // Creamos una copia de la fecha para no modificar la original
    fechaAyer.setDate(fechaAyer.getDate() - 1); // Restamos un día a la fecha copiada

    let dia = fechaAyer.getDate();
    let mes = fechaAyer.getMonth() + 1;
    let año = fechaAyer.getFullYear();

    dia = (dia < 10) ? '0' + dia : dia;
    mes = (mes < 10) ? '0' + mes : mes;

    return dia + '/' + mes + '/' + año;
}

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
    const fechaHoy = new Date(); // Obtener la fecha actual
    const fechaAyer = new Date(fechaHoy); // Crear una copia de la fecha actual
    fechaAyer.setDate(fechaHoy.getDate() - 1); // Restar un día a la copia de la fecha actual

    if (fechaSeleccionada.getTime() < fechaHoy.getTime()) { // Verificar si la fecha seleccionada es anterior a la fecha actual
        if (fechaSeleccionada.getTime() < fechaAyer.getTime()) { // Verificar si la fecha seleccionada es anterior a la fecha de ayer
            fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1); // Sumar un día a la fecha seleccionada
            funcionFecha();
            cargarSolicitudes();
        }
    }
}


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

