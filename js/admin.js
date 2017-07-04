function obtenerUsuario(uid) {
  let usuario = firebase.database().ref('usuarios/'+uid);
  usuario.on('value', function(snapshot) {
    let usuarioactual = snapshot.val();
    $('.nombreDeUsuario').html( usuarioactual.nombre + " " + usuarioactual.apellidos);
  });
}

$('#nombreNuevoTarea').keyup(function () {
  let nombreNuevoTarea = $('#nombreNuevoTarea').val();
  if(nombreNuevoTarea.length < 1) {
    $('#nombreNuevoTarea').parent().addClass('has-error');
    $('#helpblocknombreNuevoTarea').empty().html("Este campo es requerido").show();
  }
  else {
    $('#nombreNuevoTarea').parent().removeClass('has-error');
    $('#helpblocknombreNuevoTarea').hide();
  }
});

$('#fechaInicioEditarTarea').keyup(function () {
  let fechaInicioEditarTarea = $('#fechaInicioEditarTarea').val();
  if(fechaInicioEditarTarea.length < 1) {
    $('#fechaInicioEditarTarea').parent().parent().addClass('has-error');
    $('#helpblockfechaInicioEditarTarea').empty().html("Este campo es requerido").show();
  }
  else {
    $('#fechaInicioEditarTarea').parent().parent().removeClass('has-error');
    $('#helpblockfechaInicioEditarTarea').hide();
  }
});

function editarTarea(idTarea, asignado, idP) {
  $('#btnActualizarTarea').attr({'data-id': idTarea, 'data-asignado': asignado, 'data-idP': idP});
  $('#modalEditarTarea').modal('show');

  let tareas = firebase.database().ref('tareas/');
  tareas.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
    let idTareaEnNodoTareas = snapshot.key;

    let tareasRuta = firebase.database().ref('tareas/'+idTareaEnNodoTareas);
    tareasRuta.once('value', function(daticos) {
      let datos = daticos.val();
      let nombre = datos.nombre;
      let dia = datos.dia;
      let mes = datos.mes;
      let año = datos.año;
      let date = new Date(año, mes, dia);
      fecha = moment(date).format('MM/DD/YYYY');

      $('#nombreNuevoTarea').val(nombre).focus();
      $('#fechaInicioEditarTarea').val(fecha);
    });
  });
}

function actualizarTarea() {
  let idTarea = $('#btnActualizarTarea').attr('data-id');
  let asignado = $('#btnActualizarTarea').attr('data-asignado');
  let idProyecto = $('#btnActualizarTarea').attr('data-idP');

  let nombreNuevo = $('#nombreNuevoTarea').val();
  let fechaInicioEditarTarea = $('#fechaInicioEditarTarea').val();

  if(nombreNuevo.length > 0 && fechaInicioEditarTarea.length > 0) {
    let date = new Date(fechaInicioEditarTarea);
    let dia = date.getDate();
    let mes = date.getMonth();
    let año = date.getFullYear();

    let tareasProyecto = firebase.database().ref('proyectos/'+idProyecto+'/tareas/'+idTarea);
    tareasProyecto.update({nombre: nombreNuevo, dia:dia, mes:mes, año:año});

    let tareas = firebase.database().ref('tareas/');
    tareas.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
      let idTareaEnNodoTareas = snapshot.key;
      let rutaTareas = firebase.database().ref('tareas/'+idTareaEnNodoTareas);
      rutaTareas.update({nombre: nombreNuevo, dia:dia, mes:mes, año:año});
    });

    let miSemana = firebase.database().ref('miSemana/'+asignado);
    miSemana.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
      let idTareaEnMiSemana = snapshot.key;
      let rutaMiSemana = firebase.database().ref('miSemana/'+asignado+'/'+idTareaEnMiSemana);
      rutaMiSemana.update({nombre: nombreNuevo, dia:dia, mes:mes, año:año});
    });
  }
  else {
    if(nombreNuevo.length < 1) {
      $('#nombreNuevoTarea').parent().addClass('has-error');
      $('#helpblocknombreNuevoTarea').empty().html("Este campo es requerido").show();
    }
    else {
      $('#nombreNuevoTarea').parent().removeClass('has-error');
      $('#helpblocknombreNuevoTarea').hide();
    }
    if(fechaInicioEditarTarea.length < 1) {
      $('#fechaInicioEditarTarea').parent().parent().addClass('has-error');
      $('#helpblockfechaInicioEditarTarea').empty().html("Este campo es requerido").show();
    }
    else {
      $('#fechaInicioEditarTarea').parent().parent().removeClass('has-error');
      $('#helpblockfechaInicioEditarTarea').hide();
    }
  }
}

function llenarCategorias() {
  let categorias = firebase.database().ref('/categorias');

  categorias.on('value', function(snapshot) {
    let categorias = snapshot.val();

    let options=""
    for(categoria in categorias) {
      options += '<option value="'+categorias[categoria].nombre+'">'+categorias[categoria].nombre+'</option>';
    }
    $('#select-categorias').empty().append(options);
  });
}

llenarCategorias();

function mostrarCategorias() {
  let categorias = firebase.database().ref('/categorias');
  categorias.on('value', function(snapshot) {
    let categorias = snapshot.val();

    let lis="";
    for(categoria in categorias) {
      lis += '<li style="display:inline; padding:20px;"><span style="color:'+categorias[categoria].color+';" class="glyphicon glyphicon-asterisk"></span>'+categorias[categoria].nombre+'</li>';
    }

    $('#listaCategorias').empty().append(lis);
  });
}

mostrarCategorias();

function eliminarTarea(idTarea) {
  //Eliminar del nodo Tarea
  var idTareaEnNodoTareas, idTareaEnNodoMiSemana, datos;

  let nodoTareas = firebase.database().ref('tareas/');
  nodoTareas.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
    idTareaEnNodoTareas = snapshot.key;

    let tareasRef = firebase.database().ref('tareas/'+idTareaEnNodoTareas);
    tareasRef.once('value', function(daticos) {
      let tareas = daticos.val();
      datos = {
        nombre: tareas.nombre,
        dia: tareas.dia,
        mes: tareas.mes,
        año: tareas.año,
        categoria: tareas.categoria,
        estado: tareas.estado,
        idP: tareas.idP,
        asignado: tareas.asignado,
        idTarea: tareas.idTarea
      }
    });

    let historial = firebase.database().ref('historial/tareas/'+idTarea); //mandar a historial
    historial.set(datos);
    nodoTareas.child(snapshot.key).remove();
  });

  let refMiSemana = firebase.database().ref('miSemana/'+datos.asignado);
  refMiSemana.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
    refMiSemana.child(snapshot.key).remove();
  });

  let tareasProyecto = firebase.database().ref('proyectos/'+datos.idP+'/tareas/'); //Eliminar del nodo tareas del proyecto
  tareasProyecto.child(idTarea).remove();

  var numTareas;
  let proyecto = firebase.database().ref('proyectos/'+datos.idP); //actualizar numero de tareas
  proyecto.once('value').then( function(snapshot) {
    let datosProyecto = snapshot.val();
    numTareas = datosProyecto.numtareas;
    numTareas = numTareas-1;
    proyecto.update({numtareas: numTareas});
  });
}

function completarTarea(idTarea) {
  var idTareaEnNodoTareas, idTareaEnNodoMiSemana, datos;

  let nodoTareas = firebase.database().ref('tareas/');
  nodoTareas.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
    idTareaEnNodoTareas = snapshot.key;

    let tareasRef = firebase.database().ref('tareas/'+idTareaEnNodoTareas);
    tareasRef.on('value', function(daticos) {
      let tareas = daticos.val();
      datos = {
        idP: tareas.idP,
        asignado: tareas.asignado
      }
    });

    firebase.database().ref('tareas/'+idTareaEnNodoTareas).update({ estado: "Completada" });
  });

  let refMiSemana = firebase.database().ref('miSemana/'+datos.asignado);
  refMiSemana.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
    firebase.database().ref('miSemana/'+datos.asignado+'/'+snapshot.key).update({ estado: "Completada"});
  });

  let tareasProyecto = firebase.database().ref('proyectos/'+datos.idP+'/tareas/'); //Eliminar del nodo tareas del proyecto
  firebase.database().ref('proyectos/'+datos.idP+'/tareas/'+idTarea).update({ estado: "Completada" });

  var tareasCompletadas;
  let proyecto = firebase.database().ref('proyectos/'+datos.idP); //actualizar numero de tareas
  proyecto.once('value').then( function(snapshot) {
    let datosProyecto = snapshot.val();
    tareasCompletadas = datosProyecto.tareasCompletadas;
    tareasCompletadas = tareasCompletadas+1;
    proyecto.update({ tareasCompletadas: tareasCompletadas });
  });
}

//checa si hay un usuario actualmente logeado
function haySesion() {
  firebase.auth().onAuthStateChanged(function (user) {
    //si hay un usuario
    if (user) {
      //obtiene el usuario actual
      var user = firebase.auth().currentUser;
      var uid = user.uid;

      obtenerUsuario(uid);
      $('[data-toggle="tooltip"]').tooltip();
    }
    else {
      $(location).attr("href", "index.html");
    }
  })
}

haySesion();

function mostrarOrdenes() {

   let ordenes = firebase.database().ref('ordenes/');
    ordenes.on('value', function(snapshot) {
      let ordenes = snapshot.val();
      $('#tablaordenes tbody').empty();

      let i = 1;
      for (orden in ordenes) {
        var state;
        if(ordenes[orden].estado === "Pendiente"){
          state='<a class="dropdown-toggle" data-toggle="dropdown"><span style="background-color: #FF0000; width: 30px; height: 25px; border-radius: 15px;" class="badge"><span></a>';
        }
        if(ordenes[orden].estado === "En proceso"){
          state='<a class="dropdown-toggle" data-toggle="dropdown"><span style="background-color: #FFCC00; width: 30px; height: 25px;" border-radius: 15px; class="badge"><span></a>';
        }
        if(ordenes[orden].estado === "Listo"){
          state='<a class="dropdown-toggle" data-toggle="dropdown"><span style="background-color: #4CDD85; width: 30px; height: 25px;" border-radius: 15px; class="badge"><span></a>';
        }

        let tr = $('<tr/>');
        let td = '<td>' + i + '</td>' +
                  '<td>' + ordenes[orden].cliente + '</td>' +
                  '<td>' + ordenes[orden].descripcion + '</td>' +
                  '<td>' + ordenes[orden].fechaRecep + '</td>' +
                  '<td>' + ordenes[orden].fechaEntrega + '</td>';
        tr.append(td);
        let tdDrop = $('<td/>', {
          'class': 'dropdown'
        });
        tdDrop.append(state);
        let ul = $('<ul/>', {
          'class': 'dropdown-menu'
        });
        let li1 = $('<li/>');
        let a1 = $('<a/>', { 'onclick': 'marcarComoPendiente("'+orden+'")'});
        let span1 = $('<span/>', {
          'style': 'color: #FF0000;',
          'class': 'glyphicon glyphicon-exclamation-sign'
        });
        a1.append(span1).append(' Marcar como pendiente');
        li1.append(a1);

        let li2 = $('<li/>');
        let a2 = $('<a/>', { 'onclick': 'marcarComoEnProceso("'+orden+'")'});
        let span2 = $('<span/>', {
          'style': 'color: #FFCC00;',
          'class': 'glyphicon glyphicon-time'
        });
        a2.append(span2).append(' Marcar como en proceso');
        li2.append(a2);

        let li3 = $('<li/>');
        let a3 = $('<a/>', { 'onclick': 'marcarComoLista("'+orden+'")'});
        let span3 = $('<span/>', {
          'style': 'color: #4CDD85;',
          'class': 'glyphicon glyphicon-ok'
        });
        a3.append(span3).append(' Marcar como lista');
        li3.append(a3);

        let li4 = $('<li/>');
        let a4 = $('<a/>', { 'onclick': 'eliminarOrden("'+orden+'")'});
        let span4 = $('<span/>', {
          'class': 'icons glyphicon glyphicon-minus-sign'
        });
        a4.append(span4).append(' Eliminar orden');
        li4.append(a4);

        ul.append(li1).append(li2).append(li3).append(li4);

        tdDrop.append(ul);
        tr.append(tdDrop);
        tr.append('<td>' + ordenes[orden].encargado + '</td>');

        $('#tablaordenes tbody').append(tr);

        i++;
      }

      i = 1;
      state = "";
    }, function(errorObject) {
      console.log("La lectura de las ordenes falló: " + errorObject.code);
    })
}

function marcarComoPendiente(idOrden) {
  let ordenes = firebase.database().ref('ordenes/'+idOrden);

  ordenes.update({
    estado: 'Pendiente'
  });
}

function marcarComoLista(idOrden) {
  let ordenes = firebase.database().ref('ordenes/'+idOrden);

  ordenes.update({
    estado: 'Listo'
  });
}

function marcarComoEnProceso(idOrden) {
  let ordenes = firebase.database().ref('ordenes/'+idOrden);

  ordenes.update({
    estado: 'En proceso'
  });
}

function eliminarOrden(idOrden) {
  let ordenes = firebase.database().ref('ordenes/');

  var ordenConsultada;

  let consulta = firebase.database().ref('ordenes/'+idOrden);
  consulta.on('value', function(snapshot) {
    let orden = snapshot.val();

    ordenConsultada = {
      cliente: orden.cliente,
      descripcion: orden.descripcion,
      encargado: orden.encargado,
      estado: orden.estado,
      fechaEntrega: orden.fechaEntrega,
      fechaRecep: orden.fechaRecep
    }
  });

  let historial = firebase.database().ref('historial/ordenes');
  historial.push(ordenConsultada);

  ordenes.child(idOrden).remove();
}

function mostrarProyectos() {

    let proyectos = firebase.database().ref('proyectos/');
    proyectos.on('value', function(snapshot) {
    let proyectos = snapshot.val();

      $('#ContenedorProyectos').empty();
      let row = "";

      for (proyecto in proyectos) {
        let fechaEntrega = proyectos[proyecto].fechaEntrega;
        let relativa = moment().endOf('day').fromNow();

        let porcentaje = Math.floor(( proyectos[proyecto].tareasCompletadas * 100 ) / proyectos[proyecto].numTareas);
        row += '<div style="margin-top:10px;" class="col-xs-6 col-md-4">' +
                  '<a href="proyecto.html?id=' + proyecto + '">' +
                    '<div id="proyecto">' +
                      '<div id="nombreproyecto"><h3 style="padding:20px;">' + proyectos[proyecto].nombre + '</h3></div>' +
                      '<div id="fecha"><p>Tareas:' + proyectos[proyecto].numTareas + '   Entrega:' + proyectos[proyecto].fechaEntrega + '</p></div>' +
                      '<div style="font-weight: bold;" class="progress">' +
                        '<div class="progress-bar progress-bar-custom" role="progressbar" aria-valuenow="' + porcentaje + '" aria-valuemin="0" aria-valuemax="100" style="width:' + porcentaje + '%;">' +
                          + porcentaje + ' %' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                  '</a>' +
                '</div>';
      }

      $('#ContenedorProyectos').append(row);
      row = "";
    }, function(errorObject) {
      console.log("La lectura de proyectos falló: " + errorObject.code);
    })
}

function cerrarModalUsuario() {
  $('#agregarUsuario').modal('hide');

  $('#nombre').val('');
  $('#apellidos').val('');
  $('#agregarUsuarioEmail').val('');
  $('#agregarUsuarioPuesto').val('');
  $('#nuevacontrasena').val('');
  $('#confirmarcontrasena').val('');
}

function cerrarModalOrden() {
  $('#agregarOrden').modal('hide');
  $('#cliente').val('');
  $('#descripcion').val('');
  $('#fechaEntrega').val('');
  $('#encargado').val('');
}

function cerrarModalProyecto() {
  $('#agregarProyecto').modal('hide');
  $('#nombreProyecto').val('');
  $('#fechaInicio').val('');
  $('#fechaEntrega').val('');
  $('#encargadoProyecto').val('');
  $('#estructuraProyecto').val('');
  $('#descripcionProyecto').val('');
  $('#documentacion').val('');
  $('#input-agregarObjetivo').val('');
  $('#input-agregarIndicador').val('');
  $('#input-agregarHito').val('');
  $('#input-agregarIntegrante').val('');
  $('#input-agregarTarea').val('');
  $('#select-categorias').val('');
  $('#asignado').val('');
  $('#fechaInicioTarea').val('');
  $('#contenedorModalTareas').empty();

  $('.chip-hitos').remove();
  $('.chip-objetivos').remove();

  objInc = 1;
  indInc = 1;
  hitoInc = 1;
  intInc = 1;
  tareaInc = 1;
  numtareas = 0;

  arrObjetivos = [];
  arrIndicadores = [];
  arrHitos = [];
  arrIntegrantes = [];
  arrTareas = [];
}

$('#tabordenes').on('shown.bs.tab', function (e) {
  e.target // newly activated tab
  e.relatedTarget // previous active tab
  mostrarOrdenes();
});

$('#tabproyectos').on('shown.bs.tab', function (e) {
  e.target // newly activated tab
  e.relatedTarget // previous active tab

  mostrarProyectos();
});

//cierra la sesion de firebase
function logOut() {
  firebase.auth().signOut();
}

//muestra la modal para Crear un Usuario
function modalUsuario() {
  $("#agregarUsuario").modal();
}

//muestra la modal para Crear una Orden
function modalOrden() {
  $("#agregarOrden").modal();
}

//muestra la modal para Crear un Proyecto
function modalProyecto() {
  $('#agregarProyecto').modal();
}

$('#cliente').keyup(function () {
  let cliente = $('#cliente').val();
  if(cliente.length < 1) {
    $('#cliente').parent().addClass('has-error');
    $('#helpblockCliente').empty().html("Este campo es requerido").show();
  }
  else {
    $('#cliente').parent().removeClass('has-error');
    $('#helpblockCliente').hide();
  }
});

$('#descripcion').keyup(function () {
  let descripcion = $('#descripcion').val();
  if(descripcion.length < 1) {
    $('#descripcion').parent().addClass('has-error');
    $('#helpblockDescripcion').empty().html("Este campo es requerido").show();
  }
  else {
    $('#descripcion').parent().removeClass('has-error');
    $('#helpblockDescripcion').hide();
  }
});

$('#fechaEntrega').keyup(function () {
  let fechaEntrega = $('#fechaEntrega').val();
  if(fechaEntrega.length < 1) {
    $('#fechaEntrega').parent().parent().addClass('has-error');
    $('#helpblockfechaEntrega').empty().html("Este campo es requerido").show();
  }
  else {
    $('#fechaEntrega').parent().parent().removeClass('has-error');
    $('#helpblockfechaEntrega').hide();
  }
});

$('#encargado').keyup(function () {
  let encargado = $('#encargado').val();
  if(encargado.length < 1) {
    $('#encargado').parent().addClass('has-error');
    $('#helpblockEncargado').empty().html("Este campo es requerido").show();
  }
  else {
    $('#encargado').parent().removeClass('has-error');
    $('#helpblockEncargado').hide();
  }
});

//metodo que guarda una nueva orden en Firebase
function guardarOrden() {
  let cliente = $('#cliente').val();
  let descripcion = $('#descripcion').val();
  let fechaRecep = moment().format('DD/MM/YYYY');
  let fechaEntrega = $('#fechaEntrega').val();
  let estado = "Pendiente";
  let encargado = $('#encargado').val();

  if(cliente.length > 0 && descripcion.length > 0 && fechaRecep.length > 0 && fechaEntrega.length > 0 && estado.length > 0 && encargado.length > 0) {
    let ordenes = firebase.database().ref('ordenes/');
    let Orden = {
      cliente: cliente,
      descripcion: descripcion,
      fechaRecep: fechaRecep,
      fechaEntrega: fechaEntrega,
      estado: estado,
      encargado: encargado
    }

    ordenes.push().set(Orden); //inserta en firebase asignando un id autogenerado por la plataforma
    cerrarModalOrden();
  }
  else {
    if(cliente == "") {
      $('#cliente').parent().addClass('has-error');
      $('#helpblockCliente').empty().html("Este campo es requerido").show();
    }
    else {
      $('#cliente').parent().removeClass('has-error');
      $('#helpblockCliente').hide();
    }
    if(descripcion == "") {
      $('#descripcion').parent().addClass('has-error');
      $('#helpblockDescripcion').empty().html("Este campo es requerido").show();
    }
    else {
      $('#descripcion').parent().removeClass('has-error');
      $('#helpblockDescripcion').hide();
    }
    if(fechaEntrega == "") {
      $('#fechaEntrega').parent().parent().addClass('has-error');
      $('#helpblockfechaEntrega').empty().html("Este campo es requerido").show();
    }
    else {
      $('#fechaEntrega').parent().parent().removeClass('has-error');
      $('#helpblockfechaEntrega').hide();
    }
    if(encargado == "") {
      $('#encargado').parent().addClass('has-error');
      $('#helpblockEncargado').empty().html("Este campo es requerido").show();
    }
    else {
      $('#encargado').parent().removeClass('has-error');
      $('#helpblockEncargado').hide();
    }
  }
}

$('#nombre').keyup(function () {
  let nombre = $('#nombre').val();
  if(nombre.length < 1) {
    $('#nombre').parent().addClass('has-error');
    $('#helpblockNombre').empty().html("Este campo es requerido").show();
  }
  else {
    $('#nombre').parent().removeClass('has-error');
    $('#helpblockNombre').hide();
  }
});

$('#apellidos').keyup(function () {
  let apellidos = $('#apellidos').val();
  if(apellidos.length < 1) {
    $('#apellidos').parent().addClass('has-error');
    $('#helpblockApellidos').empty().html("Este campo es requerido").show();
  }
  else {
    $('#apellidos').parent().removeClass('has-error');
    $('#helpblockApellidos').hide();
  }
});

$('#agregarUsuarioEmail').keyup(function () {
  let agregarUsuarioEmail = $('#agregarUsuarioEmail').val();
  if(agregarUsuarioEmail.length < 1) {
    $('#agregarUsuarioEmail').parent().addClass('has-error');
    $('#helpblockagregarUsuarioEmail').empty().html("Este campo es requerido").show();
  }
  else {
    $('#agregarUsuarioEmail').parent().removeClass('has-error');
    $('#helpblockagregarUsuarioEmail').hide();
  }
});

$('#agregarUsuarioPuesto').change(function () {
  let agregarUsuarioPuesto = $('#agregarUsuarioPuesto').val();
  if(agregarUsuarioPuesto.length < 1) {
    $('#agregarUsuarioPuesto').parent().addClass('has-error');
    $('#helpblockagregarUsuarioPuesto').empty().html("Este campo es requerido").show();
  }
  else {
    $('#agregarUsuarioPuesto').parent().removeClass('has-error');
    $('#helpblockagregarUsuarioPuesto').hide();
  }
});

$('#nuevacontraseña').keyup(function () {
  let nuevacontraseña = $('#nuevacontraseña').val();
  if(nuevacontraseña.length < 1) {
    $('#nuevacontraseña').parent().addClass('has-error');
    $('#helpblockNuevaContraseña').empty().html("Este campo es requerido").show();
  }
  else {
    $('#nuevacontraseña').parent().removeClass('has-error');
    $('#helpblockNuevaContraseña').hide();
  }
});

$('#confirmarcontraseña').keyup(function () {
  let confirmarcontraseña = $('#confirmarcontraseña').val();
  if(confirmarcontraseña.length < 1) {
    $('#confirmarcontraseña').parent().addClass('has-error');
    $('#helpblockConfirmarContraseña').empty().html("Este campo es requerido").show();
  }
  else {
    $('#confirmarcontraseña').parent().removeClass('has-error');
    $('#helpblockConfirmarContraseña').hide();
  }
});

//guarda un nuevo Usuario en la base de datos de Firebase en el nodo Usuarios
function guardarUsuario() {
  let nombre = $('#nombre').val();
  let apellidos = $('#apellidos').val();
  let agregarUsuarioEmail = $('#agregarUsuarioEmail').val();
  let agregarUsuarioPuesto = $('#agregarUsuarioPuesto').val();
  let nuevaContraseña = $('#nuevacontraseña').val()
  var confirmarContraseña = $('#confirmarcontraseña').val();

  if(nombre.length > 0 && apellidos.length > 0 && agregarUsuarioEmail.length > 0 && agregarUsuarioPuesto.length > 0 && nuevaContrasena.length > 0 && confirmarContrasena.length > 0) {
    if(nuevaContrasena == confirmarContrasena) {

      firebase.auth().createUserWithEmailAndPassword(agregarUsuarioEmail, nuevaContrasena)
      .then(function(data) {
        console.log(data);
        let uid = data.uid;
        console.log(uid);

        let usuarios = firebase.database().ref('usuarios/'+uid);
        let Usuario = {
          nombre: nombre,
          apellidos: apellidos,
          puesto: agregarUsuarioPuesto
        }
        usuarios.set(Usuario); //metodo set para insertar de Firebase

      })
      .catch(function(error) {
        console.log(error);
      });
      cerrarModalUsuario();

      logOut();
    }
    else {
      console.log("Las contraseñas no coinciden");
    }
  }
  else {
    if(nombre == "") {
      $('#nombre').parent().addClass('has-error');
      $('#helpblockNombre').empty().html("Este campo es requerido").show();
    }
    else {
      $('#nombre').parent().removeClass('has-error');
      $('#helpblockNombre').hide();
    }
    if(apellidos == "") {
      $('#apellidos').parent().addClass('has-error');
      $('#helpblockApellidos').empty().html("Este campo es requerido").show();
    }
    else {
      $('#apellidos').parent().removeClass('has-error');
      $('#helpblockApellidos').hide();
    }
    if(agregarUsuarioEmail == "") {
      $('#agregarUsuarioEmail').parent().addClass('has-error');
      $('#helpblockagregarUsuarioEmail').empty().html("Este campo es requerido").show();
    }
    else {
      $('#agregarUsuarioEmail').parent().removeClass('has-error');
      $('#helpblockagregarUsuarioEmail').hide();
    }
    if(agregarUsuarioPuesto == null) {
      $('#agregarUsuarioPuesto').parent().addClass('has-error');
      $('#helpblockagregarUsuarioPuesto').empty().html("Este campo es requerido").show();
    }
    else {
      $('#agregarUsuarioPuesto').parent().removeClass('has-error');
      $('#helpblockagregarUsuarioPuesto').hide();
    }
    if(nuevaContraseña == "") {
      $('#nuevacontraseña').parent().addClass('has-error');
      $('#helpblockNuevaContraseña').empty().html("Este campo es requerido").show();
    }
    else {
      $('#nuevacontraseña').parent().removeClass('has-error');
      $('#helpblockNuevaContraseña').hide();
    }
    if(confirmarContraseña == "") {
      $('#confirmarcontraseña').parent().addClass('has-error');
      $('#helpblockConfirmarContraseña').empty().html("Este campo es requerido").show();
    }
    else {
      $('#confirmarcontraseña').parent().removeClass('has-error');
      $('#helpblockConfirmarContraseña').hide();
    }
  }
}

var arrIntegrantes = [];
var intInc = 1;
//introduce los integrantes del equipo a un arreglo
function agregarIntegrante() {
  let integrante = $('#input-agregarIntegrante').val();

  let id = 'integrante-'+intInc;

  let $div = $('<div/>', {
    'class': 'chip-hitos',
    'id': id
  });

  let $span = $('<span/>', {
    'class': 'glyphicon glyphicon-remove',
    'onclick': 'eliminarIntegrante("'+id+'")',
    'style': 'font-size: 15px; float: right; color: #D6D6D6;'
  })
  $div.append($span);
  $div.append(integrante);
  arrIntegrantes.push(integrante);
  $('#contenedorModalIntegrantes').append($div);
  intInc++;

  $('#input-agregarIntegrante').val('').focus();

  $('#asignado').autocomplete({
    lookup: arrIntegrantes,
    onSelect: function (suggestion) {
      var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
      $('#outputcontent').html(thehtml);
    }
  });
}

function eliminarIntegrante(id) {
  $('#'+id).remove();
}

var numtareas = 0;
var arrTareas = [];
var tareaInc = 1;
//atrapa las tareas que se asignan a un proyecto
function agregarTarea() {
  let nombre = $('#input-agregarTarea').val();
  let categoria = $('#select-categorias').val();
  let asignado = $('#asignado').val();
  let estado = "Pendiente";
  let fecha = $('#fechaInicioTarea').val();
  let date = new Date(fecha);
  let dia = date.getDate();
  let mes = date.getMonth();
  let año = date.getFullYear();

  let tarea = {
    nombre: nombre,
    año: año,
    mes: mes,
    dia: dia,
    categoria: categoria,
    asignado: asignado,
    estado: estado,
  }

  arrTareas.push(tarea);
  numtareas++;

  let id = 'tarea-'+tareaInc;

  let $div = $('<div/>', {
    'class': 'chip-hitos',
    'id': id
  });

  let $span = $('<span/>', {
    'class': 'glyphicon glyphicon-remove',
    'onclick': 'borrarTarea("'+id+'")',
    'style': 'font-size: 15px; float: right; color: #D6D6D6;'
  })
  $div.append($span);
  $div.append(nombre);
  $('#contenedorModalTareas').append($div);
  tareaInc++;

  $('#input-agregarTarea').val('').focus();
  $('#asignado').val('');
  $('#select-categorias').val('');
  $('#fechaInicioTarea').val('');
  $('#contadorTarea').html('0/60');

  $('#contenedorModalTareas').removeClass('has-error');
  $('#helpblocktareas').hide();
}

function borrarTarea(id) {
  $('#'+id).remove();
}

var objInc = 1;
var arrObjetivos = [];

function agregarObjetivo() {
  let objetivo = $('#input-agregarObjetivo').val();
  let id = 'objetivo-'+objInc;

  let $div = $('<div/>', {
    'class': 'chip-objetivos',
    'id': id
  });

  let $span = $('<span/>', {
    'class': 'glyphicon glyphicon-remove',
    'onclick': 'eliminarObjetivo("'+id+'")',
    'style': 'font-size: 15px; float: right; color: #D6D6D6;'
  })
  $div.append($span);
  $div.append(objetivo);
  arrObjetivos.push(objetivo);
  $('#contenedorModalObjetivos').append($div);
  objInc++;

  $('#input-agregarObjetivo').val('').focus();
  $('#contadorObjetivo').html('0/140');

  $('#contenedorModalObjetivos').removeClass('has-error');
  $('#helpblockobjetivos').hide();
}

function eliminarObjetivo(id) {
  $('#'+id).remove();
}

var indInc = 1;
var arrIndicadores = [];

function agregarIndicador() {
  let indicador = $('#input-agregarIndicador').val();
  let id = 'indicador-'+indInc;

  let $div = $('<div/>', {
    'class': 'chip-objetivos',
    'id': id
  });

  let $span = $('<span/>', {
    'class': 'glyphicon glyphicon-remove',
    'onclick': 'eliminarIndicador("'+id+'")',
    'style': 'font-size: 15px; float: right; color: #D6D6D6;'
  })
  $div.append($span);
  $div.append(indicador);
  arrIndicadores.push(indicador);
  $('#contenedorModalIndicadores').append($div);
  indInc++;

  $('#input-agregarIndicador').val('').focus();
  $('#contadorIndicador').html('0/140');

  $('#contenedorModalIndicadores').removeClass('has-error');
  $('#helpblockindicadores').hide();

  let nombre = $('#input-agregarHito').val();
  let categoria = "Hito";
  let estado = "Pendiente";
  let fecha = $('#fechaInicioHito').val();
  let date = new Date(fecha);
  let dia = date.getDate();
  let mes = date.getMonth();
  let año = date.getFullYear();

  let hito = {
    nombre: nombre,
    año: año,
    mes: mes,
    dia: dia,
    categoria: categoria,
    estado: estado,
  }

  arrTareas.push(hito);
  numtareas++;

  let id = 'tarea-'+tareaInc;

  let $div = $('<div/>', {
    'class': 'chip-hitos',
    'id': id
  });

  let $span = $('<span/>', {
    'class': 'glyphicon glyphicon-remove',
    'onclick': 'borrarTarea("'+id+'")',
    'style': 'font-size: 15px; float: right; color: #D6D6D6;'
  });
  $div.append($span);
  $div.append(nombre);
  $('#contenedorModalTareas').append($div);
  tareaInc++;

  $('#input-agregarTarea').val('').focus();
  $('#asignado').val('');
  $('#select-categorias').val('');
  $('#fechaInicioTarea').val('');
  $('#contadorTarea').html('0/60');

  $('#contenedorModalTareas').removeClass('has-error');
  $('#helpblocktareas').hide();
}

function eliminarIndicador(id) {
  $('#'+id).remove();
}

var hitoInc = 1;
var arrHitos = [];

function agregarHito() {
  let hito = $('#input-agregarHito').val();
  let id = 'indicador-'+hitoInc;

  let $div = $('<div/>', {
    'class': 'chip-hitos',
    'id': id
  });

  let $span = $('<span/>', {
    'class': 'glyphicon glyphicon-remove',
    'onclick': 'eliminarIndicador("'+id+'")',
    'style': 'font-size: 15px; float: right; color: #D6D6D6;'
  })
  $div.append($span);
  $div.append(hito);
  arrHitos.push(hito);
  $('#contenedorModalHitos').append($div);
  hitoInc++;

  $('#input-agregarHito').val('').focus();
  $('#contadorHito').html('0/140');

  $('#contenedorModalHitos').removeClass('has-error');
  $('#helpblockhitos').hide();
}

function eliminarHito(id) {
  $('#'+id).remove();
}

$('#nombreProyecto').keyup(function () {
  let nombreProyecto = $('#nombreProyecto').val();
  if(nombreProyecto.length < 1) {
    $('#nombreProyecto').parent().addClass('has-error');
    $('#helpblocknombreProyecto').empty().html("Este campo es requerido").show();
  }
  else {
    $('#nombreProyecto').parent().removeClass('has-error');
    $('#helpblocknombreProyecto').hide();
  }
});

$('#fechaInicio').keyup(function () {
  let fechaInicio = $('#fechaInicio').val();
  if(fechaInicio.length < 1) {
    $('#fechaInicio').parent().parent().addClass('has-error');
    $('#helpblockfechaInicio').empty().html("Este campo es requerido").show();
  }
  else {
    $('#fechaInicio').parent().parent().removeClass('has-error');
    $('#helpblockfechaInicio').hide();
  }
});

$('#fechaEntregaProyecto').keyup(function () {
  let fechaEntregaProyecto = $('#fechaEntregaProyecto').val();
  if(fechaEntregaProyecto.length < 1) {
    $('#fechaEntregaProyecto').parent().parent().addClass('has-error');
    $('#helpblockfechaEntregaProyecto').empty().html("Este campo es requerido").show();
  }
  else {
    $('#fechaEntregaProyecto').parent().parent().removeClass('has-error');
    $('#helpblockfechaEntregaProyecto').hide();
  }
});

$('#encargadoProyecto').keyup(function () {
  let encargadoProyecto = $('#encargadoProyecto').val();
  if(encargadoProyecto.length < 1) {
    $('#encargadoProyecto').parent().addClass('has-error');
    $('#helpblockencargadoProyecto').empty().html("Este campo es requerido").show();
  }
  else {
    $('#encargadoProyecto').parent().removeClass('has-error');
    $('#helpblockencargadoProyecto').hide();
  }
});

$('#estructuraProyecto').keyup(function () {
  let estructuraProyecto = $('#estructuraProyecto').val();
  if(estructuraProyecto.length < 1) {
    $('#estructuraProyecto').parent().addClass('has-error');
    $('#helpblockestructuraProyecto').empty().html("Este campo es requerido").show();
  }
  else {
    $('#estructuraProyecto').parent().removeClass('has-error');
    $('#helpblockestructuraProyecto').hide();
  }
});

$('#descripcionProyecto').keyup(function () {
  let descripcionProyecto = $('#descripcionProyecto').val();
  if(descripcionProyecto.length < 1) {
    $('#descripcionProyecto').parent().addClass('has-error');
    $('#helpblockdescripcionProyecto').empty().html("Este campo es requerido").show();
  }
  else {
    $('#descripcionProyecto').parent().removeClass('has-error');
    $('#helpblockdescripcionProyecto').hide();
  }
});

$('#documentacion').keyup(function () {
  let documentacion = $('#documentacion').val();
  if(documentacion.length < 1) {
    $('#documentacion').parent().addClass('has-error');
    $('#helpblockdocumentacion').empty().html("Este campo es requerido").show();
  }
  else {
    $('#documentacion').parent().removeClass('has-error');
    $('#helpblockdocumentacion').hide();
  }
});

//crear un proyecto nuevo en la base de datos de Firebase en el nodo Proyectos
function guardarProyecto() {
  let nombreProyecto = $('#nombreProyecto').val();
  let fechaInicio = $('#fechaInicio').val();
  let fechaEntrega = $('#fechaEntregaProyecto').val();
  let encargadoProyecto = $('#encargadoProyecto').val();
  let estructuraProyecto = $('#estructuraProyecto').val();
  let descripcionProyecto = $('#descripcionProyecto').val();
  let documentacion = $('#documentacion').val();
  let objetivos = arrObjetivos;
  let indicadores = arrIndicadores;
  let hitos = arrHitos;
  let integrantes = arrIntegrantes;
  let tareas = arrTareas;

  if(nombreProyecto.length > 0 && fechaInicio.length > 0 && fechaEntrega.length > 0 && encargadoProyecto.length > 0 && estructuraProyecto.length > 0
    && descripcionProyecto.length > 0 && documentacion.length > 0 && objetivos.length > 0 && indicadores.length > 0 && hitos.length > 0
    && integrantes.length > 0 && tareas.length > 0) {
    var db = firebase.database();
    let proyectos = db.ref('proyectos/');
    let Proyecto = {
      nombre: nombreProyecto,
      numTareas: numtareas,
      tareasCompletadas: 0,
      fechaInicio: fechaInicio,
      fechaEntrega: fechaEntrega,
      encargado: encargadoProyecto,
      estructura: estructuraProyecto,
      descripcion: descripcionProyecto,
      documentacion: documentacion,
      objetivos: objetivos,
      indicadores: indicadores,
      hitos: hitos,
      equipo: integrantes
    }
    var proyectoId = proyectos.push(Proyecto).getKey();
    let tareasRef = db.ref('tareas/');
    let proyectoTareasRef = db.ref('proyectos/'+proyectoId+'/tareas/');

    for(let i=0; i<tareas.length; i++) {
      tareas[i].idP = proyectoId;
      let tareaId = proyectoTareasRef.push(tareas[i]).getKey();
      tareas[i].idTarea = tareaId;
      tareasRef.push(tareas[i]);

      for(let j=0; j<integrantes.length; j++) {
        if(integrantes[j] == tareas[i].asignado) {
          let miSemana = db.ref('miSemana/'+integrantes[j]);
          miSemana.push(tareas[i]);
        }
      }
    }

    cerrarModalProyecto();
  }
  else {
    if(nombreProyecto.length < 1) {
      $('#nombreProyecto').parent().addClass('has-error');
      $('#helpblocknombreProyecto').empty().html("Este campo es requerido").show();
    }
    else {
      $('#nombreProyecto').parent().removeClass('has-error');
      $('#helpblocknombreProyecto').hide();
    }
    if(fechaInicio.length < 1) {
      $('#fechaInicio').parent().parent().addClass('has-error');
      $('#helpblockfechaInicio').empty().html("Este campo es requerido").show();
    }
    else {
      $('#fechaInicio').parent().removeClass('has-error');
      $('#helpblockfechaInicio').hide();
    }
    if(fechaEntrega.length < 1) {
      $('#fechaEntregaProyecto').parent().parent().addClass('has-error');
      $('#helpblockfechaEntregaProyecto').empty().html("Este campo es requerido").show();
    }
    else {
      $('#fechaEntregaProyecto').parent().removeClass('has-error');
      $('#helpblockfechaEntregaProyecto').hide();
    }
    if(encargadoProyecto.length < 1) {
      $('#encargadoProyecto').parent().addClass('has-error');
      $('#helpblockencargadoProyecto').empty().html("Este campo es requerido").show();
    }
    else {
      $('#encargadoProyecto').parent().removeClass('has-error');
      $('#helpblockencargadoProyecto').hide();
    }
    if(estructuraProyecto.length < 1) {
      $('#estructuraProyecto').parent().addClass('has-error');
      $('#helpblockestructuraProyecto').empty().html("Este campo es requerido").show();
    }
    else {
      $('#estructuraProyecto').parent().removeClass('has-error');
      $('#helpblockestructuraProyecto').hide();
    }
    if(descripcionProyecto.length < 1) {
      $('#descripcionProyecto').parent().addClass('has-error');
      $('#helpblockdescripcionProyecto').empty().html("Este campo es requerido").show();
    }
    else {
      $('#descripcionProyecto').parent().removeClass('has-error');
      $('#helpblockdescripcionProyecto').hide();
    }
    if(documentacion.length < 1) {
      $('#documentacion').parent().addClass('has-error');
      $('#helpblockdocumentacion').empty().html("Este campo es requerido").show();
    }
    else {
      $('#documentacion').parent().removeClass('has-error');
      $('#helpblockdocumentacion').hide();
    }
    if(objetivos.length < 1) {
      $('#contenedorModalObjetivos').addClass('has-error');
      $('#helpblockobjetivos').empty().html("Un proyecto no puede no tener objetivos").show();
    }
    else {
      $('#contenedorModalObjetivos').removeClass('has-error');
      $('#helpblockobjetivos').hide();
    }
    if(indicadores.length < 1) {
      $('#contenedorModalIndicadores').addClass('has-error');
      $('#helpblockindicadores').empty().html("Un proyecto no puede no tener indicadores").show();
    }
    else {
      $('#contenedorModalIndicadores').removeClass('has-error');
      $('#helpblockindicadores').hide();
    }
    if(hitos.length < 1) {
      $('#contenedorModalHitos').addClass('has-error');
      $('#helpblockhitos').empty().html("Un proyecto no puede no tener hitos").show();
    }
    else {
      $('#contenedorModalHitos').removeClass('has-error');
      $('#helpblockhitos').hide();
    }
    if(integrantes.length < 1) {
      $('#contenedorModalIntegrantes').addClass('has-error');
      $('#helpblockintegrantes').empty().html("Un proyecto no puede no tener integrantes").show();
    }
    else {
      $('#contenedorModalIntegrantes').removeClass('has-error');
      $('#helpblockintegrantes').hide();
    }
    if(tareas.length < 1) {
      $('#contenedorModalTareas').addClass('has-error');
      $('#helpblocktareas').empty().html("Un proyecto no puede no tener tareas").show();
    }
    else {
      $('#contenedorModalTareas').removeClass('has-error');
      $('#helpblocktareas').hide();
    }
  }
}

$('#datetimepicker1').datepicker({
  startDate: "Today",
  format: "dd/mm/yyyy",
  autoclose: true,
  todayHighlight: true
});

$('#datetimepickerFechaInicio').datepicker({ //Inicializa el datepicker de FechaInico
  startDate: "Today",
  autoclose: true,
  format: "dd/mm/yyyy",
  todayHighlight: true
});

$('#datetimepickerFechaEntrega').datepicker({ //Inicializa el datepicker de FechaEntrega
  startDate: "Today",
  autoclose: true,
  format: "dd/mm/yyyy",
  todayHighlight: true
});

$('#datetimepickerFechaInicioTarea').datepicker({ //Inicializa el datepicker de FechaEntrega
  startDate: "Today",
  autoclose: true,
  format: "mm/dd/yyyy",
  todayHighlight: true
});

$('#datetimepickerFechaInicioHito').datepicker({ //Inicializa el datepicker de FechaEntrega
  startDate: "Today",
  autoclose: true,
  format: "mm/dd/yyyy",
  todayHighlight: true
});

$('#datetimepickerFechaInicioEditarTarea').datepicker({ //Inicializa el datepicker de FechaEntrega
  startDate: "Today",
  autoclose: true,
  format: "mm/dd/yyyy",
  todayHighlight: true
});

//Te regresa un paso en el carousel de la modal Crear Proyecto
function volver() {
  $('#carousel-proyecto').carousel('prev');
  $('#carousel-proyecto').carousel('pause');
}

//Te avanza un paso en el carousel de la modal Crear Proyecto
function siguiente() {
  $('#carousel-proyecto').carousel('next');
  $('#carousel-proyecto').carousel('pause');
}
