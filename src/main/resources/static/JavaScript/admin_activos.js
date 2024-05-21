// VARIABLES PARA LA PAGINACIÓN
let paginaActual = 1;
const articulosPorPagina = 4;

// CUANDO SE CARGA EL DOM
document.addEventListener('DOMContentLoaded', cargarPAG);

// SE CARGA LA PAGINA, carga eventos
function cargarPAG() {
    muestraUsuario();
    funcionFecha();
    cargarSolicitudes();
    console.log("después de cargar solicitudes");
}

// CARGAR ARTÍCULOS DE LA TIENDA
function cargarSolicitudes() {
    realizarPeticionesActivas();
}
function obtenerFechaFormateada() {
    let fechaActual = new Date();

    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1;
    let año = fechaActual.getFullYear();

    dia = (dia < 10) ? '0' + dia : dia;
    mes = (mes < 10) ? '0' + mes : mes;

    return dia + '/' + mes + '/' + año;
}
function funcionFecha() {
    let h4Fecha = document.querySelector('aside h4');
    h4Fecha.textContent =  obtenerFechaFormateada();
}

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


function mostrarEventos(datosJSON) {
    console.log(datosJSON);
    const inicio = (paginaActual - 1) * articulosPorPagina;
    const fin = inicio + articulosPorPagina;

    // Obtener la fecha actual
    const fechaActual = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Filtrar eventos por fecha
    const eventosDeHoy = datosJSON.filter(evento => {
        // Convertir la fecha del evento a un formato comparable
        const fechaEvento = new Date(evento.dia).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        // Filtrar eventos que coincidan con la fecha actual
        return fechaEvento === fechaActual;
    });

    if (eventosDeHoy.length === 0) {
        // Si no hay eventos para la fecha actual, mostrar un mensaje
        let divSinEventos = crearElemento('article', document.querySelector('main'));
        crearElementoTexto("No hay eventos en esta fecha", 'h2', divSinEventos);
    } else {
        // Mostrar los eventos filtrados
        for (let i = inicio; i < fin && i < eventosDeHoy.length; i++) {
            let divEvento = crearElemento('article', document.querySelector('main'));
            crearElementoTexto(eventosDeHoy[i].nombreevento, 'h2', divEvento);
            crearElementoTextoAdicional(eventosDeHoy[i].local, "Local del evento: ", 'h4', divEvento);
            crearElementoTextoAdicional(eventosDeHoy[i].hora, "Hora del evento: ", 'p', divEvento);
            crearElementoTextoAdicional(eventosDeHoy[i].precio, "Precio de la entrada: ", 'p', divEvento);
            crearElementoTexto(eventosDeHoy[i].link, 'p', divEvento);
        }
    }
}


function mostrarBotonSiguiente() {
    let botonSiguiente = crearElementoTexto('Página siguiente', 'button', document.querySelector('main'));
    botonSiguiente.addEventListener('click', function () {
        paginaActual++;
        cargarSolicitudes();
    });
}

function mostrarBotonAnterior() {
    let botonAnterior = crearElementoTexto('Página anterior', 'button', document.querySelector('main'));
    botonAnterior.addEventListener('click', function () {
        paginaActual--;
        cargarSolicitudes();
    });
}

function muestraUsuario() {
    const usuario = sessionStorage.getItem("nombre");
    const id = sessionStorage.getItem("id");
    const muestraUsuari = document.getElementById("nombreUsuario");
    console.log(usuario);
    console.log(muestraUsuari);
    if (usuario) {
        muestraUsuari.textContent = usuario + ", elije tu próximo plan";
        console.log(usuario);
    }
}
