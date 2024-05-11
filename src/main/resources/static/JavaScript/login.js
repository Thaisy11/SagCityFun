
//DATOS DE ACCESO DEL FORMULARIO
let btnlog = document.getElementById("btnlog");
let log_mail = document.getElementById("log_mail");
let log_pass = document.getElementById("log_pass");

//ZONA DE AVISO DE ERROR
let contenido = document.getElementById("avisos");
let correcto;

//EVENTO SOBRE EL BOTON DEL LOGIN. VALIDACION Y CREACION FORMDATA
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

            param = new FormData();
            param.append('opcion', 'SR');
            param.append('email', log_mail.value);
            param.append('password', log_pass.value);
            realizarPeticiones(param);
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
        contenido.innerHTML = "Debe introducir un email válido<br>";
        return false;
    }
    return true;

}
//PETICION HTTPREQUEST
function realizarPeticiones(param) {
    let url = 'http://localhost:8888/SaguntoCityFun/login';
    let peticion = new XMLHttpRequest();
    peticion.open('POST', url);
    console.log(url);

    peticion.addEventListener('readystatechange', function () {
        if (peticion.status === 200 && peticion.readyState === 4) {
            document.querySelector('main').innerHTML = '';

            console.log(peticion.responseText);
            if (peticion.responseText.trim() === "error") {
                alert("Usuario no registrado");
                window.location="registro.html";

            } else {

                console.log(peticion.responseText);
                let datosJSON = JSON.parse(peticion.responseText);
                console.log("sí que hace la petición");
                let nombreUsuario = datosJSON[0].nombre;
                let idUsuario = datosJSON[0].id;
                let rolUsuario = datosJSON[0].rol;
                sessionStorage.setItem("nombre", nombreUsuario);
                sessionStorage.setItem("id", idUsuario);
                sessionStorage.setItem("rol", rolUsuario);


                if(rolUsuario === "A"){
                    window.location="admin_activos.html";


                } else if (rolUsuario === "U") {
                    window.location="eventos.html";

                }
            }
        }

    })
    peticion.send(param)
}


