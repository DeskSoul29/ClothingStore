toastr.options.preventDuplicates = true

function registrarContacto() {

    let inpCedula = document.getElementById("txtCedula")
    let inpNombre = document.getElementById("txtNombre")
    let inpApellido = document.getElementById("txtApellido")
    let inpAdress = document.getElementById("txtCorreo")
    let inpTel = document.getElementById("txtTel")
    let inpCity = document.getElementById("txtCity")

    if (validarCed(inpCedula, 1, 10)) {
        if (validarNombre(inpNombre, 1, 40)) {
            if (validarApellido(inpApellido, 1, 40)) {
                if (validarTel(inpTel, 3, 10)) {
                    if (validaCorreo(inpAdress)) {

                        let data = new FormData()
                        data.append("pers_ced", inpCedula.value)
                        data.append("pers_nombre", inpNombre.value)
                        data.append("pers_apellido", inpApellido.value)
                        data.append("pers_adress", inpAdress.value)
                        data.append("tele_celular", inpTel.value)
                        data.append("pers_city", inpCity.value)

                        $.ajax({
                            url: "http://127.0.0.1:9000/Persona/registrar",
                            data,
                            cache: false,
                            contentType: false,
                            processData: false,
                            type: 'POST',
                            success: res => {
                                //console.log(res)
                                if (res == 1) {
                                    toastr.success('Registrado Correctamente', 'Proceso Exitoso')
                                    inpCedula.value = ""
                                    inpNombre.value = ""
                                    inpApellido.value = ""
                                    inpTel.value = ""
                                    inpAdress.value = ""
                                    inpCity.value = ""
                                    llenarTablaContactos()
                                } else toastr.error(res, "Algo ha salido mal")
                            }
                        })
                    }
                }
            }
        }
    }
}

function llenarTablaContactos() {
    $.ajax({
        url: "http://127.0.0.1:9000/Persona/obtenerTodo",
        data: {},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: res => {
            //console.log(res)
            try {
                let data = JSON.parse(res)
                let tr = ""
                data.results.forEach(element => {
                    tr += `
                        <tr>
                            <td>${element.pers_ced}</td>
                            <td>${element.pers_nombre}</td>
                            <td>${element.pers_apellido}</td>
                            <td>${element.pers_correo}</td>
                            <td>${element.pers_tel}</td>
                            <td>${element.pers_city}</td>
                            <td>
                                <a onclick="btnEditar(this)" class="btn btn-secondary fas fa-marker"></a>
                                <a onclick="btnBorrar(this)" class="btn btn-secondary far fa-trash-alt"></a>
                            </td>
                        </tr>
                    `
                })
                $("#tablaContactos > tr").remove()
                $("#tablaContactos").append(tr)
            } catch (error) {
                toastr.error(error, "Algo ha salido mal")
            }
        }
    });
}

$().ready(() => {
    llenarTablaContactos()
})


var selectedRow = null;

function btnEditar(td) {
    $.ajax({
        url: "http://127.0.0.1:9000/Persona/obtenerTodo",
        data: {},
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: res => {
            //console.log(res)
            try {
                let data = JSON.parse(res)
                var n = 0;
                let s = "";
                if (data.results.length >= 5) {
                    for (var i = 0; i < data.results.length; i++) {
                        s = "" + data.results[i].pers_correo
                        var pos = s.split('@');
                        if (pos[1] == "gmail.com") {
                            n++
                        }
                    }
                    if (n >= 3) {
                        selectRow = td.parentElement.parentElement;
                        document.querySelector(".popup").style.display = "flex";//Abre el popup para su seguido llenado de datos
                        document.getElementById("tCedula").value = selectRow.cells[0].innerHTML;
                        document.getElementById("tNombre").value = selectRow.cells[1].innerHTML;
                        document.getElementById("tApellido").value = selectRow.cells[2].innerHTML;
                        document.getElementById("tCorreo").value = selectRow.cells[3].innerHTML;
                        document.getElementById("tTel").value = selectRow.cells[4].innerHTML;
                        document.getElementById("tCity").value = selectRow.cells[5].innerHTML;
                    } else {
                        toastr.error("Faltan @gmail.com por registrar", "Algo ha salido mal")
                    }
                } else {
                    toastr.error("No hay suficientes registros", "Algo ha salido mal")
                }
            } catch (error) {
                toastr.error(error, "Algo ha salido mal")
            }
        }
    });
}

function edit() {
    let inpCedula = document.getElementById("tCedula")
    let inpNombre = document.getElementById("tNombre")
    let inpApellido = document.getElementById("tApellido")
    let inpTel = document.getElementById("tTel")
    let inpAdress = document.getElementById("tCorreo")
    let inpCity = document.getElementById("tCity")

    if (validarCed(inpCedula, 1, 10)) {
        if (validarNombre(inpNombre, 1, 40)) {
            if (validarApellido(inpApellido, 1, 40)) {
                if (validarTel(inpTel, 3, 10)) {
                    if (validaCorreo(inpAdress)) {

                        let data = new FormData()
                        data.append("pers_ced", inpCedula.value)
                        data.append("pers_nombre", inpNombre.value)
                        data.append("pers_apellido", inpApellido.value)
                        data.append("tele_celular", inpTel.value)
                        data.append("pers_adress", inpAdress.value)
                        data.append("pers_city", inpCity.value)

                        $.ajax({
                            url: "http://127.0.0.1:9000/Persona/editar",
                            data,
                            cache: false,
                            contentType: false,
                            processData: false,
                            type: 'POST',
                            success: res => {
                                //console.log(res)
                                if (res == 1) {
                                    toastr.success('Datos Modificados Correctamente', 'Proceso Exitoso')
                                    document.querySelector(".popup").style.display = "none";
                                    llenarTablaContactos()
                                } else toastr.error(res, "Algo ha salido mal")
                            }
                        })
                    }
                }
            }
        }
    }
}

function btnBorrar(td) {
    selectRow = td.parentElement.parentElement;
    var len = selectRow.cells[0].innerHTML;
    var len2 = selectRow.cells[5].innerHTML;
    

    let data = new FormData()
    data.append("pers_ced", len)
    data.append("pers_city", len2)

    $.ajax({
        url: "http://127.0.0.1:9000/Persona/borrar",
        data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: res => {
            //console.log(res)
                if (res == 1) {
                    toastr.success('Eliminado Correctamente', 'Proceso Exitoso')
                    llenarTablaContactos()
                } else toastr.error(res, "Algo ha salido mal")
        }
    })
}

