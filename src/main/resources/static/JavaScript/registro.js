//registro
let btnreg = document.getElementById("btnreg");

let nom = document.getElementById('nom');
let mail = document.getElementById('mail');
let pass = document.getElementById('pass');
let repass = document.getElementById('repass');


let contenido = document.querySelector(".avisos");
var correcto;

let elementos = [nom, mail, pass, repass];
btnreg.addEventListener('click', function (e) {
    e.preventDefault();


    switch (true) {

        case !(correcto = validaNombre(nom)):
            nom.focus();
            break;

        case !(correcto = validaEmail(mail)):
            mail.focus();
            break;

        case !(correcto = validaPass(pass)):
            pass.focus();
            break;

        case !(correcto = passCoincida(pass, repass)):
            pass.focus();
            break;

        case !(correcto = validarCampos(elementos)):
            
            break;


        default:

            const registro = {
                "nombre": nom.value,
                "contrasena": pass.value,
                'email': mail.value,
                'rol': "U",

            };

            realizarPeticiones(registro);
            break;


    }
});


function validaNombre(nom) {
    var nomexpreg = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{5,20}$/;
    if (!nomexpreg.test(nom.value)) {
        contenido.innerHTML = "";
        contenido.innerHTML += "El nombre debe tener entre 2 y 20 carácteres";

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

function validaEmail(mail) {
    var expRegEmail = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (!expRegEmail.test(mail.value)) {
        contenido.innerHTML = "";
        contenido.innerHTML = "Debe introducir un email válido";
        return false;
    }
    return true;

}

function passCoincida(pass, repass) {
    if (pass.value !== repass.value) {
        contenido.innerHTML = "";

        contenido.innerHTML = "Las contraseñas deben coincidir";
        return false;
    } else {
        return true;
    }


}


function validaPass(pass) {
    var expRegEmail = /^(?=.*[0-9])[a-zA-Z0-9]{6,}$/;
    if (!expRegEmail.test(pass.value)) {
        contenido.innerHTML = "";
        contenido.innerHTML = "Debe introducir una contraseña válida.<br>";
                contenido.innerHTML += "Mínimo 6 carácteres con al menos un número";

        return false;
    }
    return true;
}


function realizarPeticiones(registro) {
    contenido.innerHTML = "";
    console.log(registro);
    let url = '/SaguntoCityFun/u/registrar';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registro)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en el registro del usuario. Estado: ${response.status}`);
            }

            return response.json();
        })
        .then(RegUsuario => {
            console.log('Usuario:', RegUsuario);
            window.location.href = "/SaguntoCityFun/login";
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Usuario creado correctamente",
                showConfirmButton: false,
                timer: 5500
            })




        })
        .catch(error => {
            console.error(error);
            alert("Error en el Registro. Por favor, inténtelo de nuevo.");
        });


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

