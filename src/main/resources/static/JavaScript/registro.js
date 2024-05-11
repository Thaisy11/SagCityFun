
//registro
let btnreg = document.getElementById("btnreg");

let nom = document.getElementById('nom');
let mail = document.getElementById('mail');
let pass = document.getElementById('pass');
let repass = document.getElementById('repass');


var contenido = document.getElementById("avisos");
var correcto;




btnreg.addEventListener('click', function (e) {
    e.preventDefault();
    switch (true) {
        case !(correcto = campos_llenos(nom)):
            nom.focus();
            break;
        case !(correcto = validaNombre(nom)):
            nom.focus();
            break;
        case !(correcto = campos_llenos(mail)):
            mail.focus();
            break;
        case !(correcto = validaEmail(mail)):
            mail.focus();
            break;
        case !(correcto = campos_llenos(pass)):
            pass.focus();
            break;
        case !(correcto = validaContra(pass)):
            pass.focus();
            break;
        case !(correcto = campos_llenos(repass)):
            repass.focus();
            break;
        case !(correcto = campos_llenos(repass)):
            pass.focus();
            break;
        case !(correcto = passCoincida(pass, repass)):
            pass.focus();
            break;
        default:


            param = new FormData();
            param.append('opcion', 'RS');
            param.append('nombre', nom.value);
            param.append('email', mail.value);
            param.append('password', pass.value);


            realizarPeticiones(param);

            break;
    }
});



function validaContra(campo) {
    regexp_password = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{5,10}$)/;
    if (!regexp_password.test(campo.value)){
        contenido.innerHTML = "";
        contenido.innerHTML += "El campo " + campo.name + " debe tener entre 5 y 10 carácteres. 1 mayuíscula, minúscula y un número";

        return false;
    }
    return true;
}




function validaNombre(campo) {
    var nomexpreg = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{5,20}$/;
    if (!nomexpreg.test(campo.value)){
        contenido.innerHTML = "";
        contenido.innerHTML += "El campo " + campo.name + " debe tener entre 2 y 20 carácteres";

        return false;
    }
    return true;
}

function campos_llenos(campo) {

    if (campo.value.trim() === "") {
        contenido.innerHTML = "";

        contenido.innerHTML += "El campo " + campo.name + " no puede estar vacío";

        return false;
    }

    return true;
}

function validaEmail(campo) {
    var expRegEmail = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (!expRegEmail.test(campo.value)) {
        contenido.innerHTML = "";
        contenido.innerHTML = "Debe introducir un email válido<br>";
        return false;
    }
    return true;

}
function passCoincida(pass, repass) {
    if (pass.value !== repass.value) {
        contenido.innerHTML = "Las contraseñas deben coincidir";
        return false;
    } else {
        return true;
    }
}



function realizarPeticiones(param) {
    let url = 'http://localhost:8888/SaguntoCityFun/usuarios/registro';
    let peticion = new XMLHttpRequest();
    peticion.open('POST', url);

    peticion.addEventListener('readystatechange', function () {
        if (peticion.status === 200 && peticion.readyState === 4) {

            console.log(peticion.responseText);
            if (peticion.responseText.trim() === "ok") {
                alert("Socio registrado correctamente");

                window.location = "login.html";

            } else {
                console.log(peticion.responseText);
                alert("No se ha registrado");
                preventDefault();

            }
        }

    })
    peticion.send(param);
}



