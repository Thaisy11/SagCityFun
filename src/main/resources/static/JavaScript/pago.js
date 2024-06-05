document.addEventListener('DOMContentLoaded', cargarPAG);

let btnpagar = document.getElementById("btnpago");

let titu = document.getElementById('titu');
let num = document.getElementById('num');
let cadmes = document.getElementById('cadmes');
let cadanyo = document.getElementById('cadanyo');
let ccv = document.getElementById('ccv');
let contenido = document.querySelector(".avisos");


const precioString = sessionStorage.getItem('seleccion');
const regex = /(\d+(\.\d+)?)/;
const match = precioString.match(regex);

let precio = 0;
if (match) {
    precio = parseFloat(match[0]); // Convertir la coincidencia a float
} else {
    console.error("No se encontró un número en la cadena:", precioString);
}

const localizacionPosicionamiento = document.querySelector('.morado');
var correcto;
let elementos = [titu, num, cadanyo, cadmes, ccv];


// CUANDO SE CARGA EL DOM
function cargarPAG() {
    console.log(precioString);
    console.log(precio);
    localizacionPosicionamiento.innerHTML = precio + " €";
}


btnpagar.addEventListener('click', function (e) {
    e.preventDefault();
    switch (true) {

        case !(correcto = validaNombre(titu.value)):
            titu.focus();
            break;

        case !(correcto = validaTarjeta(num.value)):
            num.focus();
            break;

        case !(correcto = validaCaduMes(cadmes.value)):
            cadmes.focus();
            break;
        case !(correcto = validaCaduAnyo(cadanyo.value)):
            cadmes.focus();
            break;
        case !(correcto = validaCcv(ccv.value)):
            ccv.focus();
            break;
        case !(correcto = validaCaduFecha(cadmes.value, cadanyo.value)):

            break;
        case !(correcto = validarCampos(elementos)):

            break;
        default:

            const enviarPrecio = {
                "posicionamiento": precio
            };
            console.log((enviarPrecio));
            realizarPeticiones(enviarPrecio);
            break;
    }

});

function realizarPeticiones(enviarPrecio) {
    let url = '/SaguntoCityFun/pagos/posicionamiento';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(enviarPrecio)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en el pago. Estado: ${response.status}`);
            }
            return response.json();
        })
        .then(pago => {
            console.log('Pago Posicionamiento:', pago);
            sessionStorage.setItem("pago", pago.id);
            sessionStorage.setItem('pagoCompletado', 'true');

            console.log(pago.id);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "El pago se ha realizado con éxito",
                showConfirmButton: true
            }).then(() => {
            window.location.href ="/SaguntoCityFun/nuevoEvento"
            });
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error en el pago. Inténtalo de nuevo",
                showConfirmButton: true
            });
        });
}

function validaNombre(titu) {
    var nomexpreg = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{5,50}$/;
    if (!nomexpreg.test(titu)) {
        contenido.innerHTML = "";
        contenido.innerHTML += "El nombre de la persona debe tener entre 5 y 50 caracteres";
        return false;
    }
    return true;
}

function validaTarjeta(num) {
    var nomexpreg = /^\d{16}$/;
    if (!nomexpreg.test(num)) {
        contenido.innerHTML = "";
        contenido.innerHTML += "La tarjeta debe tener 16 caracteres";
        return false;
    }
    return true;
}


function validaCaduMes(cadmes) {
    var nomexpreg = /^(0[1-9]|1[0-2])$/;
    if (!nomexpreg.test(cadmes)) {
        contenido.innerHTML = "";
        contenido.innerHTML += "Debe introducir un mes válido";
        return false;
    }
    return true;
}

function validaCcv(ccv) {
    var nomexpreg = /^\d{3}$/;
    if (!nomexpreg.test(ccv)) {
        contenido.innerHTML = "";
        contenido.innerHTML += "El CCV es un número de 3 dígitos";
        return false;
    }
    return true;
}

function validaCaduAnyo(cadanyo) {
    var nomexpreg = /^(2[4-9]|3[0-5])$/;
    if (!nomexpreg.test(cadanyo)) {
        contenido.innerHTML = "";
        contenido.innerHTML += "Debe introducir un año válido";
        return false;
    }
    return true;
}
function validaCaduFecha(cadmes, cadanyo) {
    if (!validaCaduAnyo(cadanyo)) {
        return false;
    }
    if (!validaCaduMes(cadmes)) {
        return false;
    }


    if (cadanyo === "24" && parseInt(cadmes, 10) < 6) {
        contenido.innerHTML = "";
        contenido.innerHTML += "Para el año 2024, el mes no puede ser menor que el mes actual";
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

