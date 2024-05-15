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
        case !(correcto = validaNombre(nom.value)): // Modificado aquí
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
    posicionamiento.innerHTML = '';

    // Crear opciones para el desplegable
    let opciones = [
        { valor: '0.0', texto: '0.0' },
        { valor: '2.99', texto: '2.99' },
        { valor: '6.99', texto: '6.99' },
        { valor: '12.99', texto: '12.99' }
    ];

    // Agregar las opciones al desplegable
    opciones.forEach(opcion => {
        let option = document.createElement('option');
        option.value = opcion.valor;
        option.textContent = opcion.texto;
        posicionamiento.appendChild(option);
    });
}

function validaNombre(nombre) { // Modificado aquí
    var nomexpreg = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,50}$/;
    if (!nomexpreg.test(nombre)) {
        contenido.innerHTML = "";
        contenido.innerHTML += "El nombre del evento debe tener entre 2 y 50 carácteres";
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
