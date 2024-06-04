document.addEventListener("DOMContentLoaded", cargarPAG);



let btnreg = document.getElementById("btnreg");

let nom = document.getElementById('nom');
let mail = document.getElementById('mail');
let pass = document.getElementById('pass');
let repass = document.getElementById('repass');
let idusuario = parseInt(sessionStorage.getItem("id"), 10);

let contenido = document.querySelector(".avisos");
var correcto;

let elementos = [nom, mail, pass, repass];
function cargarPAG() {
    console.log("el id de usuario es" +idusuario);
    cargarUsuario();
}

function cargarUsuario() {
    contenido.innerHTML = '';

        fetch(`/SaguntoCityFun/u/${idusuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar el usuario. Estado: ${response.status}`);
                }
                return response.json();
            })
            .then(datos => {
                nom.value = datos.nombre;
                mail.value = datos.email;
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error al cargar los datos de usuario",
                    showConfirmButton: true
                });
            });

}


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
                "id": idusuario,
                "nombre": nom.value,
                "contrasena": pass.value,
                'email': mail.value,


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
    let url = `/SaguntoCityFun/u/actualizar/${idusuario}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registro)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la actualizacion del usuario. Estado: ${response.status}`);
            }

            return response.json();
        })
        .then(RegUsuario => {
            console.log('Usuario:', RegUsuario);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Datos cambiados correctamente",
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
                title: "Error en la actualización",
                showConfirmButton: true
            });        });


}



