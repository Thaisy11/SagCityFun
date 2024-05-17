document.addEventListener("DOMContentLoaded", cargarPosicionamiento);

let btnevento = document.getElementById("btnevento");
let nom = document.getElementById('nom');
let local = document.getElementById('local');
let fecha = document.getElementById('fecha');
let hora = document.getElementById('hora');
let precio = document.getElementById('precio');
let link = document.getElementById('link');
let posicionamiento = document.getElementById('posicionamiento');
let idUsuario = sessionStorage.getItem("id");

let contenido = document.querySelector(".avisos");
var correcto;

let elementos = [nom, local, fecha, hora, precio];

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
    posicionamiento.innerHTML = '';

    fecha.addEventListener('change', function (e) {
        const selectedDate = fecha.value;
        console.log(selectedDate);

        fetch(`/SaguntoCityFun/solicitudes/posicionamiento/${selectedDate}`, {
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
    });
}

function cargarDatosPosicionamiento(conteo) {
    posicionamiento.innerHTML = '';
    console.log("conteo en cargarDatosPos: " + conteo);

    // Agregar la opción por defecto "No pagar posicionamiento" con valor 0
    let defaultOption = document.createElement('option');
    defaultOption.value = 0;
    defaultOption.textContent = "No pagar posicionamiento";
    posicionamiento.appendChild(defaultOption);

    // Definir los valores de precio según el conteo de solicitudes
    let options = [];
    if (conteo <= 3) {
        options = [2.99];
    } else if (conteo >= 4 && conteo <= 6) {
        options = [2.99, 6.99];
    } else if (conteo >= 7) {
        options = [2.99, 6.99, 12.99];
    } else {
        options = ["Sin datos"];
    }

    // Agregar las opciones al select
    options.forEach(val => {
        let option = document.createElement('option');
        option.value = val;
        option.textContent = `Precio: ${val}€`;
        posicionamiento.appendChild(option);
    });

    // Establecer un evento de cambio en el select
    posicionamiento.addEventListener('change', function (e) {
        let selectedOption = posicionamiento.options[posicionamiento.selectedIndex];
        console.log("Precio seleccionado:", selectedOption.textContent);
        const pago = crearElemento( "button", document.getElementById("posicionamiento"));
        pago.textContent= "Ir al pago";
        pago.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = "/SaguntoCityFun/pago";
        });
        posicionamiento.parentNode.insertBefore(pago, posicionamiento.nextSibling); // Inserta el botón después del select

    });
}

function validaNombre(nom) {
    var nomexpreg = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,50}$/;
    if (!nomexpreg.test(nom)) {
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
