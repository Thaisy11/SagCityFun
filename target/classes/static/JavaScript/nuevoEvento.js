document.addEventListener("DOMContentLoaded", cargarPAG);

let btnevento = document.getElementById("btnevento");
let nom = document.getElementById('nom');
let local = document.getElementById('local');
let fecha = document.getElementById('fecha');
let hora = document.getElementById('hora');
let precio = document.getElementById('precio');
let link = document.getElementById('link');
let posicionamiento = document.getElementById('posicionamiento');
let idUsuario = sessionStorage.getItem("id");
let idPago = sessionStorage.getItem("pago");
let texto =document.getElementById("texto1");
let btnpago = document.getElementById("btnpago");
let contenido = document.querySelector(".avisos");
var correcto;

let elementos = [nom, local, fecha, hora, precio];

function cargarPAG() {
    console.log(sessionStorage.getItem("pagoCompletado"));
    if (sessionStorage.getItem("pagoCompletado") === 'true'){

        nom.value = sessionStorage.getItem("nom");
        local.value = sessionStorage.getItem("local");
        fecha.value = sessionStorage.getItem("fecha");
        hora.value = sessionStorage.getItem("hora");
        precio.value = sessionStorage.getItem("precio");
        link.value = sessionStorage.getItem("link");
        console.log(local);
        console.log(fecha);
        console.log(hora);
        console.log(precio);
        console.log(link);

        sessionStorage.removeItem("pagoCompletado");

        texto.textContent = "Este evento estará posicionado entre los 10 primeros";
        posicionamiento.style.display= 'none';


    }else{
        console.log(nom + local + fecha + hora + precio + link);

        cargarPosicionamiento();

    }
}

btnevento.addEventListener('click', function (e) {
    e.preventDefault();

    switch (true) {

        case !(correcto = validarCampos(elementos)):
            break;

        default:
            let idpagoString = sessionStorage.getItem('pago');
            let idpago = parseFloat(idpagoString);
            console.log(idpago);
            const registro = {
                "idusuario": idUsuario,
                "idestado": 1,
                "nombreevento": nom.value,
                "local": local.value,
                "dia": fecha.value,
                "hora": hora.value,
                "precio": precio.value,
                "link": link.value,
                "idpago": idpago
            };
            console.log(registro);
            realizarPeticiones(registro);
            break;
    }
});

function cargarPosicionamiento() {
    posicionamiento.innerHTML = '';

    // Añadir el listener para la fecha
    fecha.addEventListener('change', function (e) {
        validarFechaFutura();
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

    let defaultOption = document.createElement('option');
    defaultOption.value = 0;
    defaultOption.textContent = "No pagar posicionamiento";
    posicionamiento.appendChild(defaultOption);

    let options = [];
    if (conteo <= 3) {
        options = [2.99];
    } else if (conteo >= 4 && conteo <= 6) {
        options = [6.99];
    } else if (conteo >= 7) {
        options = [12.99];
    } else {
        options = ["Sin datos"];
    }

    options.forEach(val => {
        let option = document.createElement('option');
        option.value = val;
        option.textContent = `Precio: ${val}€`;
        posicionamiento.appendChild(option);
    });

    posicionamiento.addEventListener('change', function (e) {
        let seleccion = posicionamiento.options[posicionamiento.selectedIndex];
        console.log("Precio seleccionado:", seleccion.textContent);
        sessionStorage.setItem("seleccion", seleccion.textContent);

        btnpago.style.display="block";
        btnpago.addEventListener('click', function (e) {
            e.preventDefault();
            sessionStorage.setItem("nom", nom.value);
            sessionStorage.setItem("local", local.value);
            sessionStorage.setItem("fecha", fecha.value);
            sessionStorage.setItem("hora", hora.value);
            sessionStorage.setItem("precio", precio.value);
            sessionStorage.setItem("link", link.value);

            window.location.href = "/SaguntoCityFun/pago";
        });

        posicionamiento.parentNode.insertBefore(pago, posicionamiento.nextSibling);
    });
}

function validaNombre(nom) {
    var nomexpreg = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{5,20}$/;
    if (!nomexpreg.test(nom)) {
        contenido.innerHTML = "";
        contenido.innerHTML += "El nombre del evento debe tener entre 5 y 20 caracteres";
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

function validarFechaFutura(fecha) {
    let hoy = new Date();
    let fechaSeleccio = new Date(fecha);
console.log(fechaSeleccio);
    // Ajustar la fecha de hoy para excluir la hora
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccio <= hoy) {
        contenido.innerHTML = "";
        contenido.innerHTML += "La fecha debe ser posterior a hoy";
        fecha.focus();
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
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Su solicitud ha sido enviada correctamente",
                showConfirmButton: true
            }).then(() => {
                window.location.href = "/SaguntoCityFun/eventos";
            });
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error en la creación del evento",
                showConfirmButton: true
            });
        });
}
