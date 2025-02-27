// Variables globales
let intentos = 1;
let listaNumerosSorteados = [];
let maximo = 10;
let minimo = 1;
let numeroSecreto = 0;

// Funciones

function verificarIntento(){
    let numeroUsuario = parseInt(document.getElementById('inputNumeroUsuario').value);
    if (numeroUsuario == numeroSecreto){
        asignarTextoElemento('h1', '¡Felicidades!')
        asignarTextoElemento('p', `Has adivinado el número secreto en ${intentos} ${intentos == 1 ? 'intento' : 'intentos'}.`); 
        // Si intentos es igual a 1, se imprime 'intento', de lo contrario se imprime 'intentos'
        habilitaBoton('#reiniciar', false); // Habilitamos el botón de reiniciar
        habilitaBoton('#botonVerificar', true); // Deshabilitamos el botón de verificar
    }else {
        if (numeroUsuario > numeroSecreto){
            asignarTextoElemento('p', 'Intenta con un número menor a ' + numeroUsuario);
        }else {
            asignarTextoElemento('p', 'Intenta con un número mayor a ' + numeroUsuario);
        }
        intentos++; // Incrementamos el contador de intentos
        if (intentos > 3){
            asignarTextoElemento('p', `¡Perdiste!</br> El número secreto era ${numeroSecreto}`);
            habilitaBoton('#reiniciar', false); // Habilitamos el botón de reiniciar
            habilitaBoton('#botonVerificar', true); // Deshabilitamos el botón de verificar
        }
        limpiarCampo(); // Limpiamos el input
    }
    return ;
}

function reiniciarJuego(){
    habilitaBoton('#reiniciar', true); // Deshabilitamos el botón de reiniciar
    habilitaBoton('#botonVerificar', false); // Habilitamos el botón de verificar
    limpiarCampo(); // Limpiamos el input
    condicionesInciales(); // Restablecemos las condiciones
    console.log(listaNumerosSorteados)
    return;
}

function generarNumeroAleatorio(){
    let numeroGenerado = Math.floor(Math.random() * maximo) + minimo; // Generamos un número aleatorio entre 1 y 10
    if (listaNumerosSorteados.length == maximo){
        habilitaBoton('#botonVerificar', true); // Deshabilitamos el botón de verificar
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles.');
    }else {
        if (listaNumerosSorteados.includes(numeroGenerado)){ // includes recorre la lista y checa si el numero existe
            numeroGenerado = generarNumeroAleatorio(); // Recursividad
        }else {
            listaNumerosSorteados.push(numeroGenerado); // Agregamos el número a la lista de números sorteados
        }
    }
    return numeroGenerado;
}

function condicionesInciales(){
    asignarTextoElemento('h1', 'Juego del número secreto'); // Cambiamos el texto del título
    asignarTextoElemento('p', `Escribe un número del ${minimo} al ${maximo}`); // Cambiamos el texto del párrafo
    numeroSecreto = generarNumeroAleatorio(); // Generamos un nuevo número secreto
    intentos = 1; // Reiniciamos el contador de intentos
    console.log(`Número secreto: ${numeroSecreto}`);
    return;
}

function limpiarCampo(){
    let input = document.getElementById('inputNumeroUsuario');
    input.value = '';
    input.focus();
    return;
}

function habilitaBoton(elemento, estado){
    document.querySelector(elemento).disabled = estado;
    return;
}

function asignarTextoElemento(elemento , texto){
    let elementoHtml = document.querySelector(elemento); // Seleccionamos el elemento
    elementoHtml.innerHTML = texto; // Cambiamos el contenido del elemento
    return;
}


// Eventos
condicionesInciales();
