//const inputNacimiento = document.querySelector ("#birth");

//inputNacimiento.addEventListener("blur", (evento) =>{
   // validarNacimiento(evento.target);
//});



export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
//pintar de rojo los input si no ingresa datos

    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = " "
    } else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores =[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajeDeError ={
    nombre: {
        valueMissing: "El campo Nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 8 caracteres,maximo 15, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es xxxxxxxxx 9 numeros",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener entre10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre10 a 40 caracteres"
    },
    provincia: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La provincia debe contener entre10 a 40 caracteres"
    },
};

const validadores ={
    nacimiento: input => validarNacimiento (input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    })
    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date (input.value);
    let mensaje = ""
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "debes tener al menos 18 años de edad"
    };

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
         fecha.getUTCMonth(),
          fecha.getUTCDate());

    return diferenciaFechas <= fechaActual;
}