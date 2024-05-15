//registro
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

let elementos = [nom, mail, pass, repass];
btnevento.addEventListener('click', function (e) {
    e.preventDefault();


    switch (true) {

        case !(correcto = validaNombre(nom)):
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
                'dia': formatearFecha(fecha.value),
                'hora': hora.value,
                'precio': precio.value,
                'link': link.value,

            };
console.log(registro);
            realizarPeticiones(registro);
            break;


    }
});

function formatearFecha(fecha) {
    // Dividir la fecha en día, mes y año
    var partes = fecha.split('/');

    // Crear un nuevo objeto Date con el formato correcto
    var nuevaFecha = new Date(partes[2], partes[1] - 1, partes[0]);

    // Formatear la fecha en el formato yyyy-mm-dd
    var fechaFormateada = nuevaFecha.getFullYear() + '-' +
        ('0' + (nuevaFecha.getMonth() + 1)).slice(-2) + '-' +
        ('0' + nuevaFecha.getDate()).slice(-2);

    return fechaFormateada;
}

// Ejemplo de uso
var fecha = '25/05/2024';
var fechaFormateada = formatearFecha(fecha);
console.log(fechaFormateada); // Output: '2024-05-25'

function validaNombre(nom) {
    var nomexpreg = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{5,20}$/;
    if (!nomexpreg.test(nom.value)) {
        contenido.innerHTML = "";
        contenido.innerHTML += "El nombre del evento debe tener entre 2 y 20 carácteres";

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



