//VARIABLES PARA LA PAGINACIÓN
let paginaActual = 1;
const articulosPorPagina = 4;

//CUANDO SE CARGA EL DOM
document.addEventListener('DOMContentLoaded', cargarPAG);

//SE CARGA LA PAGINA,carga eventos
function cargarPAG() {
    muestraUsuario();
    cargarSolicitudes();
    console.log("despues de cargar solicitudes");
}

//CARGAR ARTÍCULOS DE LA TIENDA
function cargarSolicitudes() {
    realizarPeticionesActivas();
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
        .then( datosJSON=> {
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


            let divEvento = crearElemento('article', document.querySelector('main'));

            crearElementoTexto(datosJSON[i].nombreevento, 'h2', divEvento);
            crearElementoTexto(datosJSON[i].local, 'h4', divEvento);
            crearElementoTexto(datosJSON[i].hora, 'p', divEvento);
            crearElementoTexto(datosJSON[i].precio, 'p', divEvento);
            crearElementoTexto(datosJSON[i].link, 'p', divEvento);



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
            muestraUsuari.textContent =  usuario +", elije tu próximo plan";
            console.log(usuario);
        }
    }
