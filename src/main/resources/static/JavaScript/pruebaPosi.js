document.addEventListener("DOMContentLoaded", cargarPosicionamiento);

let btnevento = document.getElementById("btnevento");
let nom = document.getElementById('nombre');
let local = document.getElementById('local');
let fecha = document.getElementById('fecha');
let hora = document.getElementById('hora');
let precio = document.getElementById('precio');
let link = document.getElementById('link');
let posicionamiento = document.getElementById('posicionamiento');
let idUsuario = sessionStorage.getItem("id");

let contenido = document.querySelector(".avisos");
var correcto;

let elementos = [nom, local, fecha, hora, precio, link];

btnevento.addEventListener('click', function (e) {
    e.preventDefault();

    switch (true) {
        case !(correcto = validaNombre(nom.value)):
            nom.focus();
            break;

        case !(correcto = validarCampos(elementos)):
            break;

        default:
            const registro = {
                "idusuario": idUsuario,
                "idestado": 1,
                "nombreevento": nom.value,
                "local": local.value,
                "dia": fecha.value,
                "hora": hora.value,
                "precio": precio.value,
                "link": link.value,
            };
            console.log(registro);
            realizarPeticiones(registro);
            break;
    }
});

function cargarPosicionamiento() {
    fecha.addEventListener('change', function (e) {
        e.preventDefault();
        realizarPeticionesfecha(fecha.value);
    });
    
    // Limpia las opciones existentes
    posicionamiento.innerHTML = '';

    // Agregar las opciones al desplegable
    opciones.forEach(opcion => {
        let option = document.createElement('option');
        option.value = opcion.valor;
        option.textContent = opcion.texto;
        posicionamiento.appendChild(option);
    });
}

function validaNombre(nombre) {
    var nomexpreg = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,50}$/;
    if (!nomexpreg.test(nombre)) {
        contenido.innerHTML = "";
        contenido.innerHTML += "El nombre del evento debe tener entre 2 y 50 caracteres";
        return false;
    }
    return true;
}

function validarCampos(elementos) {
    for (let campo of elementos) {
        if (!campos_llenos(campo)) {
            campo.focus();
            return false;
        }
    }
    return true;
}

function campos_llenos(campo) {
    if (campo.value.trim() === "") {
        contenido.innerHTML = "";
        contenido.innerHTML += "El " + campo.name + " no puede estar vacío";
        return false;
    }
    return true;
}

function realizarPeticiones(registro) {
    contenido.innerHTML = "";
    console.log(registro);
    let url = '/SaguntoCityFun/solicitudes/nueva';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registro)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en el registro de la solicitud. Estado: ${response.status}`);
            }
            return response.json();
        })
        .then(RegNuevo => {
            console.log('Evento:', RegNuevo);
            window.location.href = "/SaguntoCityFun/eventos";
        })
        .catch(error => {
            console.error(error);
            alert("Error en el registro de su solicitud. Por favor, inténtelo de nuevo.");
        });
}

function realizarPeticionesfecha(fechaSeleccionada) {
    console.log(fechaSeleccionada);
    let url = '/SaguntoCityFun/posicionamiento/' + fechaSeleccionada;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en el conteo de la solicitud. Estado: ${response.status}`);
            }
            return response.json();
        })
        .then(conteo => {
            console.log('Número de solicitudes:', conteo);
            cargarDatosPosicionamiento(conteo);
        })
        .catch(error => {
            console.error(error);
            alert("Error en el conteo de solicitudes. Por favor, inténtelo de nuevo.");
        });
}

function cargarDatosPosicionamiento(conteo) {
    // Ejemplo de cómo podrías cargar los datos en el elemento posicionamiento
    posicionamiento.innerHTML = '';
    if (conteo > 0) {
        // Si hay solicitudes, cargar más datos
        // Ejemplo:
        let option1 = document.createElement('option');
        option1.value = 'opcion1';
        option1.textContent = 'Opción 1';
        posicionamiento.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = 'opcion2';
        option2.textContent = 'Opción 2';
        posicionamiento.appendChild(option2);
    } else {
        // Si no hay solicitudes, cargar menos datos
        // Ejemplo:
        let option3 = document.createElement('option');
        option3.value = 'opcion3';
        option3.textContent = 'Opción 3';
        posicionamiento.appendChild(option3);
    } 
} 