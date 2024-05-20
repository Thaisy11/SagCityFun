
//DATOS DE ACCESO DEL FORMULARIO
let btnlog = document.getElementById("btnlog");
let log_mail = document.getElementById("log_mail");
let log_pass = document.getElementById("log_pass");

//ZONA DE AVISO DE ERROR
let contenido = document.querySelector(".avisos");

let correcto;

//EVENTO SOBRE EL BOTON DEL LOGIN.
btnlog.addEventListener('click', function (e) {
    e.preventDefault();
    switch (true) {

        case !(correcto = campos_llenos(log_mail)):
            log_mail.focus();
            break;
        case !(correcto = validaEmail(log_mail)):
            log_mail.focus();
            break;
        case !(correcto = campos_llenos(log_pass)):
            log_pass.focus();
            break;
        default:
            const usuario = {
                "email": log_mail.value,
                "contrasena": log_pass.value,

            };
            realizarPeticiones(usuario);
            break;
    }
});
//VALIDAR QUE NO HAYA CAMPOS VACIOS
function campos_llenos(campo) {
    if (campo.value.trim() === "") {
        contenido.innerHTML = "";
        contenido.innerHTML += "El campo " + campo.name + " no puede estar vacío";
        return false;
    }
    return true;
}
//VALIDAR QUE EL EMAIL CUMPLA CON LA EXPRESIÓN REGULAR
function validaEmail(campo) {
    let expRegEmail = /[\w-.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (!expRegEmail.test(campo.value)) {
        contenido.innerHTML = "";
        contenido.innerHTML = "Debe introducir un email válido";
        return false;
    }
    return true;

}

function realizarPeticiones(usuario) {
    console.log(usuario);
    let url = '/SaguntoCityFun/u/iniciarSesion';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en el login del usuario. Estado: ${response.status}`);
            }

            return response.json();
        })
        .then(usuarioOK => {
            console.log('Usuario:', usuarioOK);


            sessionStorage.setItem("email", usuarioOK.email);
            sessionStorage.setItem("contraUsuario", usuarioOK.contrasena);
            sessionStorage.setItem("rol", usuarioOK.rol);
            sessionStorage.setItem("nombre", usuarioOK.nombre);
            sessionStorage.setItem("id",usuarioOK.id);

            if (usuarioOK.rol === "A") {
                window.location.href = "/SaguntoCityFun/admin_activos";
            } else if (usuarioOK.rol === "U") {
                window.location.href = "/SaguntoCityFun/eventos";
            }
        })
        .catch(error => {
            console.error(error);
            alert("Error en el inicio de sesión. Por favor, inténtelo de nuevo.");
        });
}




