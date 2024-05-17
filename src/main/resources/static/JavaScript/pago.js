document.addEventListener('DOMContentLoaded', cargarPAG);

let btnpagar = document.getElementById("btnpago");


// CUANDO SE CARGA EL DOM
function cargarPAG() {
    const precioString = sessionStorage.getItem(posicionamiento);
    console.log(precioString);
    console.log(posicionamiento);

    const precioP = parseFloat(precioString); // Convertir la cadena a float
    console.log(precio);

    muestraPrecio();
}

function muestraPrecio() {
    const localizacionPosicionamiento = document.getElementsByClassName('.morado');
    localizacionPosicionamiento.textContent = precioP + "$";
}

btnpagar.addEventListener('click', function (e) {
    e.preventDefault();

    const enviarPrecio = {
        "posicionamiento": precioP
    };


    console.log((enviarPrecio));
    realizarPeticiones(enviarPrecio);
});

function realizarPeticiones(enviarPrecio) {
    console.log(precio);
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
            sessionStorage.setItem("pago", pago);
        })
        .catch(error => {
            console.error(error);
            alert("Error en el Registro. Por favor, inténtelo de nuevo.");
        });
}

