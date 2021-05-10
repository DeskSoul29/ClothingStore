
function validarNombre(input, minLength, maxLength) {
    let nombre = input.value, valid = true
    if(nombre == "") {
        input.focus()
        toastr.warning("Debe digitar un nombre de contacto", "Proceso detenido", {timeOut: 2000})
        valid = false
    } else if(nombre.length < minLength ) {
        input.focus()
        toastr.warning(`La cantidad de caracteres mínimos permitidos para el nombre son ${minLength}`, "Proceso detenido", {timeOut: 2000})
        valid = false
    } else if(nombre.length > maxLength) {
        input.focus()
        toastr.warning(`La cantidad de caracteres máximos permitidos para el nombre son ${maxLength}`, "Proceso detenido", {timeOut: 2000})
        valid = false
    }
    return valid
    
}

function validarApellido(input, minLength, maxLength) {
    let apellido = input.value, valid = true
    
    if(apellido == "") {
        input.focus()
        toastr.warning("Debe digitar un apellido de contacto", "Proceso detenido", {timeOut: 2000})
        valid = false
    } else if(apellido.length < minLength ) {
        input.focus()
        toastr.warning(`La cantidad de caracteres mínimos permitidos para el apellido son ${minLength}`, "Proceso detenido", {timeOut: 2000})
        valid = false
    } else if(apellido.length > maxLength) {
        input.focus()
        toastr.warning(`La cantidad de caracteres máximos permitidos para el apellido son ${maxLength}`, "Proceso detenido", {timeOut: 2000})
        valid = false
    }

    return valid
}


function validarCed(input, minLength, maxLength){
    let cedula = input.value, valid = true
    if (cedula == "") {
        input.focus()
        toastr.warning("Debe digitar la cedula", "Proceso detenido", {timeOut: 2000})
        valid = false
    }

    if(cedula != "") {
        if(isNaN(cedula)) {
            input.focus()
            toastr.warning("La cedula solo puede contener números", "Proceso detenido", {timeOut: 2000})
            valid = false
        } else if(cedula.length < minLength) {
            input.focus()
            toastr.warning(`La cantidad de caracteres mínimos permitidos para la cedula son ${minLength}`, "Proceso detenido", {timeOut: 2000})
            valid = false
        } else if(cedula.length > maxLength) {
            input.focus()
            toastr.warning(`La cantidad de caracteres máximos permitidos para cedula son ${maxLength}`, "Proceso detenido", {timeOut: 2000})
            valid = false
        }
    }
    return valid
}

function validarTel(input, minLength, maxLength) {
    let telCel = input.value, cont = 0, valid = true
    if( telCel == "") {
        input.focus()
        toastr.warning("Debe digitar por lo menos un teléfono de contacto", "Proceso detenido", {timeOut: 2000})
        valid = false
    }
    
    if(telCel != "") {
        if(isNaN(telCel)) {
            input.focus()
            toastr.warning(`El teléfono celular solo puede contener números`, "Proceso detenido", {timeOut: 2000})
            valid = false
        } else if(telCel.length < minLength) {
            input.focus()
            toastr.warning(`La cantidad de caracteres mínimos permitidos para el teléfono celular son ${minLength}`, "Proceso detenido", {timeOut: 2000})
            valid = false
        } else if(telCel.length > maxLength) {
            input.focus()
            toastr.warning(`La cantidad de caracteres máximos permitidos para el teléfono celular son ${maxLength}`, "Proceso detenido", {timeOut: 2000})
            valid = false
        }
    }
    if(valid){
        cont = Math.pow(10,(telCel.length)-3)
        cont = parseInt(telCel/cont);

        if(cont != 315 && cont != 316 && cont != 318){
            input.focus()
            toastr.warning(`El teléfono celular empieza por ${cont},  es incorrecto`, "Proceso detenido", {timeOut: 2000})
            valid = false
        }
    }
    return valid
}

function validaCorreo(input){
    let correo = input.value, valid = true
    var explode = correo.split('@');

    if (correo == "") {
        input.focus()
        toastr.warning("Debe digitar un correo", "Proceso detenido", {timeOut: 2000})
        valid = false
    }else if (explode[1] == "gmail.com" || explode[1] == "outlook.com") {
		valid = true
	} else {
        input.focus()
        toastr.warning("El correo no es el deseado", "Proceso detenido", {timeOut: 2000})
        valid = false
	}
    return valid
}