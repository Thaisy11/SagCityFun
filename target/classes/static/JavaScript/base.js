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

