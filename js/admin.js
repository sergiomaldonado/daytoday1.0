
/*var admin = require("firebase-admin");
var serviceAccount = require("serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://daytoday-21c6d.firebaseio.com"
});*/

var usuarioLogeado;
var userID;
var auth = firebase.auth();
var db = firebase.database();

function obtenerUsuario(uid) {
  let usuario = firebase.database().ref('usuarios/'+uid);
  usuario.on('value', function(snapshot) {
    let usuarioactual = snapshot.val();
    usuarioLogeado = usuarioactual.nombre + " " + usuarioactual.apellidos;
    $('.nombreDeUsuario').html(usuarioLogeado);
    mostrarNotificaciones(usuarioLogeado);
  });

  let storageRef = firebase.storage().ref(uid + '/fotoPerfil/');
  storageRef.getDownloadURL().then(function(url) {
    $('#imgPerfil').attr('src', url).show();
    $('#imgPerfilModal').attr('src', url);
  });

  let rutahitos = firebase.database().ref('/tareas');
  rutahitos.on('value', function(snapshot) {
    let hitos = snapshot.val();
    for(let hito in hitos) {
      if(hitos[hito].categoria == "Hito") {
        let dia = hitos[hito].dia;
        let mes = hitos[hito].mes;
        let año = hitos[hito].año;
        let fechaHito = new Date(año, mes, dia);
        let hoy = new Date();

        if(fechaHito == hoy) {
          let rutaUsuarios = firebase.database().ref('usuarios/');
          rutaUsuarios.on('value', function(snap){
            let usuarios = snap.val();
            for(usuario in usuarios) {
              let nombre = usuarios[usuario].nombre + ' ' + usuarios[usuario].apellidos;
              let notificaciones = firebase.database().ref('notificaciones/'+nombre+'/notificaciones');
              moment.locale('es');
              let formato = moment().format("MMMM DD YYYY, HH:mm:ss");
              let fecha = formato.toString();
              let datosNotificacion = {
                mensaje: 'El hito de ' + hitos[hito].nombre + " se vence hoy",
                tipo: 'Orden',
                leida: false,
                fecha: fecha
              }
              notificaciones.push(datosNotificacion);

              let not = firebase.database().ref('notificaciones/'+nombre);
              not.once('value', function(snapshot) {
                let notusuario = snapshot.val();
                let cont = notusuario.cont + 1;

                not.update({cont: cont});
              });
            }
          });
        }
      }
    }
  });
}

function guardarCambios() {

}

function leerNotificaciones() {
  let rutanot = firebase.database().ref('notificaciones/'+usuarioLogeado);
  rutanot.update({cont: 0});
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
    for(let categoria in categorias) {
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
    for(let categoria in categorias) {
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
    numTareas = datosProyecto.numTareas;
    numTareas = numTareas-1;
    proyecto.update({numTareas: numTareas});
  });

  let notificaciones = firebase.database().ref('notificaciones/'+datos.asignado+'/notificaciones');
  moment.locale('es');
  let formato = moment().format("MMMM DD YYYY, HH:mm:ss");
  let fecha = formato.toString();
  let datosNotificacion = {
    mensaje: 'Se te ha eliminado la tarea ' + datos.nombre,
    tipo: 'Tarea',
    leida: false,
    fecha: fecha
  }
  notificaciones.push(datosNotificacion);

  let not = firebase.database().ref('notificaciones/'+datos.asignado);
  not.once('value', function(snapshot) {
    let notusuario = snapshot.val();
    let cont = notusuario.cont + 1;

    not.update({cont: cont});
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
      userID = uid;

      obtenerUsuario(uid);
      $('[data-toggle="tooltip"]').tooltip();
    }
    else {
      $(location).attr("href", "index.html");
    }
  });
}

haySesion();

$('#notificaciones').on('click', function() {
  leerNotificaciones();
  haySesion();
});

function mostrarNotificaciones(usuarioLogeado) {
    let not = firebase.database().ref('notificaciones/'+usuarioLogeado+'/notificaciones');
    not.on('value', function(datosNotificacion) {
      let notis = datosNotificacion.val();
      let row = "";

      let arrNotificaciones = [];
      for(let noti in notis) {
        arrNotificaciones.push(notis[noti]);
      }

      arrNotificaciones.reverse();
      for(let i=0; i<arrNotificaciones.length; i++){

        if(arrNotificaciones[i].leida == false) {

          let date = arrNotificaciones[i].fecha;
          moment.locale('es');
          let fecha = moment(date, "MMMM DD YYYY, HH:mm:ss").fromNow();
          row += '<div class="notification"><p id="pNoti">'+arrNotificaciones[i].mensaje+'</p><p id="horaNoti"><span class="glyphicon glyphicon-tasks"></span> '+fecha+'</p></div>';
        }
        else {
          row += '<div class="notification"><p id="pNoti">'+arrNotificaciones[i].mensaje+'</p><p id="horaNoti"><span class="glyphicon glyphicon-tasks"></span> '+fecha+'</p></div>';
        }
      }
      $('#notificaciones').attr('data-content', row);
      $('#notificaciones').popover({ content: row, html: true});
      row = "";
    });

    let rutanot = firebase.database().ref('notificaciones/'+usuarioLogeado);
    rutanot.on('value', function(datosNotUsuario) {
      let NotUsuario = datosNotUsuario.val();
      let cont = NotUsuario.cont;

      if(cont > 0) {
        $('#notificaciones').attr('style', 'font-size:20px; color: #74A6E9; margin-top:7px;');
        $('#spanNotificaciones').html(NotUsuario.cont).show();
      }
      else {
        $('#notificaciones').attr('style', 'font-size:20px; color: #CBCBCB; margin-top:7px;');
        $('#spanNotificaciones').hide();
      }
    });
}

function editarOrden(idOrden) {
  $('#modalEditarOrden').attr('data-id-orden', idOrden);

  let rutaorden = firebase.database().ref('ordenes/'+idOrden);
  rutaorden.once('value').then( function(snapshot) {
    let orden = snapshot.val();
    $('#clienteEditarOrden').val(orden.cliente);
    $('#descripcionEditarOrden').val(orden.descripcion);
    $('#fechaRecepEditarOrden').val(orden.fechaRecep);
    $('#fechaEntregaEditarOrden').val(orden.fechaEntrega);
    $('#clienteEncargadoEditarOrden').val(orden.encargado);
    $('#asignadoEditarOrden').val(orden.asignado);
    $('#modalEditarOrden').attr('data-asignado', orden.asignado);
    $('#comentariosEditarOrden').val(orden.comentarios);
  });

  $('#modalEditarOrden').modal();
}

$('#clienteEditarOrden').keyup(function () {
  let cliente = $('#clienteEditarOrden').val();
  if(cliente.length < 1) {
    $('#clienteEditarOrden').parent().addClass('has-error');
    $('#helpblockclienteEditarOrden').html("Este campo es requerido").show();
  }
  else {
    $('#clienteEditarOrden').parent().removeClass('has-error');
    $('#helpblockclienteEditarOrden').hide();
  }
});

$('#descripcionEditarOrden').keyup(function () {
  let descripcion = $('#descripcionEditarOrden').val();
  if(descripcion.length < 1) {
    $('#descripcionEditarOrden').parent().addClass('has-error');
    $('#helpblockdescripcionEditarOrden').html("Este campo es requerido").show();
  }
  else {
    $('#descripcionEditarOrden').parent().removeClass('has-error');
    $('#helpblockdescripcionEditarOrden').hide();
  }
});

$('#fechaEntregaEditarOrden').change(function () {
  let fechaEntrega = $('#fechaEntregaEditarOrden').val();
  if(fechaEntrega.length < 1) {
    $('#fechaEntregaEditarOrden').parent().parent().addClass('has-error');
    $('#helpblockfechaEntregaEditarOrden').html("Este campo es requerido").show();
  }
  else {
    $('#fechaEntregaEditarOrden').parent().parent().removeClass('has-error');
    $('#helpblockfechaEntregaEditarOrden').hide();
  }
});

$('#clienteEncargadoEditarOrden').keyup(function () {
  let encargado = $('#clienteEncargadoEditarOrden').val();
  if(encargado.length < 1) {
    $('#clienteEncargadoEditarOrden').parent().addClass('has-error');
    $('#helpblockEncargadoEditarOrden').html("Este campo es requerido").show();
  }
  else {
    $('#clienteEncargadoEditarOrden').parent().removeClass('has-error');
    $('#helpblockEncargadoEditarOrden').hide();
  }
});

$('#asignadoEditarOrden').keyup(function () {
  let asignadoOrden = $('#asignadoEditarOrden').val();
  if(asignadoOrden.length < 1) {
    $('#asignadoEditarOrden').parent().addClass('has-error');
    $('#helpblockasignadoEditarOrden').html("Este campo es requerido").show();
  }
  else {
    $('#asignadoEditarOrden').parent().removeClass('has-error');
    $('#helpblockasignadoEditarOrden').hide();
  }
});

$('#comentariosEditarOrden').keyup(function () {
  let comentarios = $('#comentariosEditarOrden').val();
  if(comentarios.length < 1) {
    $('#comentariosEditarOrden').parent().addClass('has-error');
    $('#helpblockcomentariosEditarOrden').empty().html("Este campo es requerido").show();
  }
  else {
    $('#comentariosEditarOrden').parent().removeClass('has-error');
    $('#helpblockcomentariosEditarOrden').hide();
  }
});

function actualizarOrden() {
  let idOrden = $('#modalEditarOrden').attr('data-id-orden');
  let asignadoAnterior = $('#modalEditarOrden').attr('data-asignado');

  let cliente = $('#clienteEditarOrden').val();
  let descripcion = $('#descripcionEditarOrden').val();
  let fechaRecep = $('#fechaRecepEditarOrden').val();
  let fechaEntrega = $('#fechaEntregaEditarOrden').val();
  let encargado = $('#clienteEncargadoEditarOrden').val();
  let asignado = $('#asignadoEditarOrden').val();
  let comentarios = $('#comentariosEditarOrden').val();

  if(cliente.length > 0 && descripcion.length > 0 && fechaEntrega.length > 0 && encargado.length > 0 && asignado.length > 0 && comentarios.length > 0) {
    let rutaOrden = firebase.database().ref('ordenes/'+idOrden);
    rutaOrden.update({
      cliente: cliente,
      descripcion: descripcion,
      fechaRecep: fechaRecep,
      fechaEntrega: fechaEntrega,
      asignado: asignado,
      encargado: encargado,
      comentarios: comentarios
    });

    if(asignado != asignadoAnterior) {
      let rutamiOrden = firebase.database().ref('misOrdenes/'+asignadoAnterior);
      rutamiOrden.remove(idOrden);

      let nuevoAsignado = firebase.database().ref('misOrdenes/'+asignado+'/'+idOrden)
      rutamiOrden.set({
        cliente: cliente,
        descripcion: descripcion,
        fechaRecep: fechaRecep,
        fechaEntrega: fechaEntrega,
        asignado: asignado,
        encargado: encargado,
        comentarios: comentarios
      });

      let notificacionesAsignadoAnterior = db.ref('notificaciones/'+asignadoAnterior+'/notificaciones');
      moment.locale('es');
      let formato = moment().format("MMMM DD YYYY, HH:mm:ss");
      let fecha = formato.toString();
      let datosNotificacion = {
        mensaje: 'Tu orden de ' + descripcion + ' se le ha asignado ahora a:' + asignado,
        tipo: 'Orden',
        leida: false,
        fecha: fecha
      }
      notificacionesAsignadoAnterior.push(datosNotificacion);

      let not = db.ref('notificaciones/'+asignadoAnterior);
      not.once('value', function(snapshot) {
        let notusuario = snapshot.val();
        let cont = notusuario.cont + 1;

        not.update({cont: cont});
      });

      let notificacionesAsignado = db.ref('notificaciones/'+asignado+'/notificaciones');
      moment.locale('es');
      let formato2 = moment().format("MMMM DD YYYY, HH:mm:ss");
      let fecha2 = formato2.toString();
      let datosNotificacion2 = {
        mensaje: 'Se te ha asignado ahora la orden de: ' + descripcion,
        tipo: 'Orden',
        leida: false,
        fecha: fecha2
      }
      notificacionesAsignado.push(datosNotificacion2);

      let not2 = db.ref('notificaciones/'+asignado);
      not2.once('value', function(snapshot) {
        let notusuario = snapshot.val();
        let cont = notusuario.cont + 1;

        not2.update({cont: cont});
      });
    }
  }
  else {
    if(cliente == "") {
      $('#clienteEditarOrden').parent().addClass('has-error');
      $('#helpblockclienteEditarOrden').html("Este campo es requerido").show();
    }
    else {
      $('#clienteEditarOrden').parent().removeClass('has-error');
      $('#helpblockclienteEditarOrden').hide();
    }
    if(descripcion == "") {
      $('#descripcionEditarOrden').parent().addClass('has-error');
      $('#helpblockdescripcionEditarOrden').html("Este campo es requerido").show();
    }
    else {
      $('#descripcion').parent().removeClass('has-error');
      $('#helpblockdescripcionEditarOrden').hide();
    }
    if(fechaEntrega == "") {
      $('#fechaEntregaEditarOrden').parent().parent().addClass('has-error');
      $('#helpblockfechaEntregaEditarOrden').html("Este campo es requerido").show();
    }
    else {
      $('#fechaEntregaEditarOrden').parent().parent().removeClass('has-error');
      $('#helpblockfechaEntregaEditarOrden').hide();
    }
    if(encargado == "") {
      $('#clienteEncargadoEditarOrden').parent().addClass('has-error');
      $('#helpblockclienteEncargadoEditarOrden').html("Este campo es requerido").show();
    }
    else {
      $('#clienteEncargado').parent().removeClass('has-error');
      $('#helpblockclienteEncargadoEditarOrden').hide();
    }
    if(asignado == "") {
      $('#asignadoEditarOrden').parent().addClass('has-error');
      $('#helpblockasignadoEditarOrden').html("Este campo es requerido").show();
    }
    else {
      $('#asignadoEditarOrden').parent().removeClass('has-error');
      $('#helpblockasignadoEditarOrden').hide();
    }
    if(comentarios == "") {
      $('#comentariosEditarOrden').parent().addClass('has-error');
      $('#helpblockcomentariosEditarOrden').html("Este campo es requerido").show();
    }
    else {
      $('#comentariosEditarOrden').parent().removeClass('has-error');
      $('#helpblockcomentariosEditarOrden').hide();
    }
  }
}

function cerrarModalEditarPerfil() {
  $('#modalEditarPerfil').modal('hide');
}

function cerrarModalEditarOrden() {
  $('#clienteEditarOrden').parent().removeClass('has-error');
  $('#helpblockclienteEditarOrden').hide();
  $('#descripcion').parent().removeClass('has-error');
  $('#helpblockdescripcionEditarOrden').hide();
  $('#fechaEntregaEditarOrden').parent().parent().removeClass('has-error');
  $('#helpblockfechaEntregaEditarOrden').hide();
  $('#clienteEncargado').parent().removeClass('has-error');
  $('#helpblockclienteEncargadoEditarOrden').hide();
  $('#asignadoEditarOrden').parent().removeClass('has-error');
  $('#helpblockasignadoEditarOrden').hide();
  $('#comentariosEditarOrden').parent().removeClass('has-error');
  $('#helpblockcomentariosEditarOrden').hide();

  $('#modalEditarOrden').modal('hide');
}

function mostrarOrdenes() {
   let ordenes = firebase.database().ref('ordenes/');
    ordenes.on('value', function(snapshot) {
      let ordenes = snapshot.val();
      $('#tablaordenes tbody').empty();

      let i = 1;
      for (let orden in ordenes) {
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

        let fechaRecep = ordenes[orden].fechaRecep;
        let dayRecep = fechaRecep.substr(0,2);
        let monthRecep = fechaRecep.substr(3,2);
        let yearRecep = fechaRecep.substr(6,4);
        let dateRecep = monthRecep + '/' + dayRecep + '/' + yearRecep;

        let fechaEntrega = ordenes[orden].fechaEntrega;
        let dayEntrega = fechaEntrega.substr(0,2);
        let monthEntrega = fechaEntrega.substr(3,2);
        let yearEntrega = fechaEntrega.substr(6,4);
        let dateEntrega = monthEntrega + '/' + dayEntrega + '/' + yearEntrega;

        let fechaDeEntrega = moment(dateEntrega).endOf('day').fromNow();
        let fechaDeRecep = moment(dateRecep).startOf('day').fromNow();

        let tr = $('<tr/>');
        let td = '<td>' + i + '</td>' +
                  '<td>' + ordenes[orden].cliente + '</td>' +
                  '<td>' + ordenes[orden].descripcion + '</td>' +
                  '<td>' + fechaDeRecep + '</td>' +
                  '<td>' + fechaDeEntrega + '</td>';

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

        let td2 = $('<td/>');
        let btnEditar = $('<button/>', {
          'onclick': 'editarOrden("'+orden+'")',
          'class': 'btn btn-warning'
        });
        let spanEditar = $('<span/>', {'class': 'glyphicon glyphicon-pencil'});
        btnEditar.append(spanEditar);

        td2.append(btnEditar);
        tr.append(td2);

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

      for (let proyecto in proyectos) {
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

function modalEditarPerfil() {

  let uid = firebase.auth().currentUser.uid;
  let usuario = firebase.database().ref('usuarios/'+uid);
  usuario.once('value').then(function(snapshot) {
    let datos = snapshot.val();
     $('#nombreUsuario').val(datos.nombre);
     $('#apellidosUsuario').val(datos.apellidos);
     $('#emailUsuario').val(datos.email);
     $('#puestoUsuario').val(datos.puesto);
  })

  $('#modalEditarPerfil').modal();


}

//muestra la modal para Crear una Orden
function modalOrden() {
  $("#agregarOrden").modal();
}

//muestra la modal para Crear un Proyecto
function modalProyecto() {
  $('#agregarProyecto').modal();
}

$('#upload-imagen').change(function(e) {
  if(this.files && this.files[0]) {
    var archivo = e.target.files[0];
    var nombre = e.target.files[0].name;

      let user = firebase.auth().currentUser.uid;

      var storageRef = firebase.storage().ref(user+'/');
      var uploadTask = storageRef.child('fotoPerfil').put(archivo);

      uploadTask.on('state_changed', function(snapshot){
      }, function(error) {

      }, function() {
        var downloadURL = uploadTask.snapshot.downloadURL;
        $('#imgPerfilModal').attr('src', downloadURL);
        $('#imgPerfil').attr('src', downloadURL);
      });
    }
  }
);

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

$('#fechaEntrega').change(function () {
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

$('#asignadoOrden').keyup(function () {
  let asignadoOrden = $('#asignadoOrden').val();
  if(asignadoOrden.length < 1) {
    $('#asignadoOrden').parent().addClass('has-error');
    $('#helpblockasignadoOrden').empty().html("Este campo es requerido").show();
  }
  else {
    $('#asignadoOrden').parent().removeClass('has-error');
    $('#helpblockasignadoOrden').hide();
  }
});

$('#comentarios').keyup(function () {
  let comentarios = $('#comentarios').val();
  if(comentarios.length < 1) {
    $('#comentarios').parent().addClass('has-error');
    $('#helpblockComentarios').empty().html("Este campo es requerido").show();
  }
  else {
    $('#comentarios').parent().removeClass('has-error');
    $('#helpblockComentarios').hide();
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
  let asignado = $('#asignadoOrden').val();
  let comentarios = $('#comentarios').val();

  if(cliente.length > 0 && descripcion.length > 0 && fechaRecep.length > 0 && fechaEntrega.length > 0 && estado.length > 0 && encargado.length > 0 && asignado.length > 0 && comentarios.length > 0) {
    let ordenes = firebase.database().ref('ordenes/');
    let Orden = {
      cliente: cliente,
      descripcion: descripcion,
      fechaRecep: fechaRecep,
      fechaEntrega: fechaEntrega,
      estado: estado,
      encargado: encargado,
      asignado: asignado,
      comentarios: comentarios
    }

    let key = ordenes.push(Orden).getKey(); //inserta en firebase asignando un id autogenerado por la plataforma

    let misOrdenes = firebase.database().ref('misOrdenes/'+asignado+'/'+key);
    misOrdenes.set(Orden);

    let notificaciones = firebase.database().ref('notificaciones/'+asignado+'/notificaciones');
    moment.locale('es');
    let formato = moment().format("MMMM DD YYYY, HH:mm:ss");
    let fecha = formato.toString();
    let datosNotificacion = {
      mensaje: 'Se te ha asignado la orden ' + descripcion,
      tipo: 'Orden',
      leida: false,
      fecha: fecha
    }
    notificaciones.push(datosNotificacion);

    let not = firebase.database().ref('notificaciones/'+asignado);
    not.once('value', function(snapshot) {
      let notusuario = snapshot.val();
      let cont = notusuario.cont + 1;

      not.update({cont: cont});
    });

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
    if(asignado == "") {
      $('#asignadoOrden').parent().addClass('has-error');
      $('#helpblockasignadoOrden').empty().html("Este campo es requerido").show();
    }
    else {
      $('#asignadoOrden').parent().removeClass('has-error');
      $('#helpblockasignadoOrden').hide();
    }
    if(comentarios == "") {
      $('#comentarios').parent().addClass('has-error');
      $('#helpblockComentarios').empty().html("Este campo es requerido").show();
    }
    else {
      $('#comentarios').parent().removeClass('has-error');
      $('#helpblockComentarios').hide();
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

  if(nombre.length > 0 && apellidos.length > 0 && agregarUsuarioEmail.length > 0 && agregarUsuarioPuesto.length > 0 && nuevaContraseña.length > 0 && confirmarContraseña.length > 0) {
    if(nuevaContraseña == confirmarContraseña) {

      var user = firebase.auth().currentUser;
      console.log(user);
      var credential;

      firebase.auth().createUserWithEmailAndPassword(agregarUsuarioEmail, nuevaContraseña)
      .then(function(data) {
        console.log(data);
        let uid = data.uid;
        console.log(uid);

        let usuarios = firebase.database().ref('usuarios/'+uid);
        let Usuario = {
          email: agregarUsuarioEmail,
          nombre: nombre,
          apellidos: apellidos,
          puesto: agregarUsuarioPuesto,
          sobremi: ""
        };
        usuarios.set(Usuario); //metodo set para insertar de Firebase
        let notificaciones = firebase.database().ref('notificaciones/'+nombre + ' ' +apellidos);
        let datosNot = {
          cont: 0
        };
        notificaciones.set(datosNot);

        cerrarModalUsuario();
        user.reauthenticate(credential).then(function() {

        }, function(error) {

        });

      })
      .catch(function(error) {
        console.log(error);
      });
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
}

function eliminarIndicador(id) {
  $('#'+id).remove();
}

var hitoInc = 1;
var arrHitos = [];

function agregarHito() {
  let nombre = $('#input-agregarHito').val();
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
    categoria: 'Hito',
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
  })
  $div.append($span);
  $div.append(nombre);
  $('#contenedorModalHitos').append($div);
  tareaInc++;

  $('#input-agregarHito').val('').focus();
  $('#fechaInicioHito').val('');
  $('#contadorHito').html('0/60');

  $('#contenedorModalHito').removeClass('has-error');
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
  //let hitos = arrHitos;
  let integrantes = arrIntegrantes;
  let tareas = arrTareas;

  if(nombreProyecto.length > 0 && fechaInicio.length > 0 && fechaEntrega.length > 0 && encargadoProyecto.length > 0 && estructuraProyecto.length > 0
    && descripcionProyecto.length > 0 && documentacion.length > 0 && objetivos.length > 0 && indicadores.length > 0 && integrantes.length > 0 && tareas.length > 0) {
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
      //hitos: hitos,
      equipo: integrantes
    }
    var proyectoId = proyectos.push(Proyecto).getKey();
    let tareasRef = db.ref('tareas/');
    let proyectoTareasRef = db.ref('proyectos/'+proyectoId+'/tareas/');

    for(let i=0; i<integrantes.length; i++) {
      let notificaciones = db.ref('notificaciones/'+integrantes[i]+'/notificaciones');
      moment.locale('es');
      let formato = moment().format("MMMM DD YYYY, HH:mm:ss");
      let fecha = formato.toString();
      let datosNotificacion = {
        mensaje: 'Se te ha agregado al proyecto ' + nombreProyecto,
        tipo: 'Proyecto',
        leida: false,
        fecha: fecha
      }
      notificaciones.push(datosNotificacion);

      let not = db.ref('notificaciones/'+integrantes[i]);
      not.once('value', function(snapshot) {
        let notusuario = snapshot.val();
        let cont = notusuario.cont + 1;

        not.update({cont: cont});
      });
    }

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

      let notificaciones = db.ref('notificaciones/'+tareas[i].asignado+'/notificaciones');
      moment.locale('es');
      let formato = moment().format("MMMM DD YYYY, HH:mm:ss");
      let fecha = formato.toString();
      let datosNotificacion = {
        mensaje: 'Se te ha agregado la tarea de ' + tareas[i].nombre,
        tipo: 'Proyecto',
        leida: false,
        fecha: fecha
      }
      notificaciones.push(datosNotificacion);

      let not = db.ref('notificaciones/'+tareas[i].asignado);
      not.once('value', function(snapshot) {
        let notusuario = snapshot.val();
        let cont = notusuario.cont + 1;

        not.update({cont: cont});
      });
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
    if($('contenedorModalHitos').html() == "") {
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

$('#contraseñaNuevaUsuario').keyup(function () {
  let contraseñaNuevaUsuario = $('#contraseñaNuevaUsuario').val();
  if(contraseñaNuevaUsuario.length < 1) {
    $('#contraseñaNuevaUsuario').parent().addClass('has-error');
    $('#helpblockcontraseñaNuevaUsuario').empty().html("Este campo es requerido").show();
  }
  else {
    $('#contraseñaNuevaUsuario').parent().removeClass('has-error');
    $('#helpblockcontraseñaNuevaUsuario').hide();
  }
});

$('#collapseExample').on('hidden.bs.collapse', function () {
  $('#contraseñaNuevaUsuario').parent().removeClass('has-error');
  $('#helpblockcontraseñaNuevaUsuario').hide();
})

function guardarContraseña() {
  let contraseñaNueva = $('#contraseñaNuevaUsuario').val();

  let contraseñaActualFirebase = auth.currentUser;

  if(contraseñaNueva.length > 0) {
    auth.currentUser.updatePassword(contraseñaNueva)
    .then(function () {
      $('#contraseñaNuevaUsuario').val('');

      $('#nuevaContraseñaAlertSuccess').fadeIn(2000);
      $('#nuevaContraseñaAlertSuccess').fadeOut(1000);
    }, function(error) {
      $('#contraseñaNuevaUsuario').val('');
      $('#nuevaContraseñaAlertDanger').fadeIn(2000);
      $('#nuevaContraseñaAlertDanger').fadeOut(1000);
    });
  }
  else {
    $('#contraseñaNuevaUsuario').parent().addClass('has-error');
    $('#helpblockcontraseñaNuevaUsuario').empty().html("La contraseña es obligatoria").show();
  }
}

function guardarCambios() {
  let nombre = $('#nombreUsuario').val();
  let apellidos = $('#apellidosUsuario').val();
  let email = $('#emailUsuario').val();
  //let puesto = $('#puestoUsuario').val();
  let sobremi = $('#sobremi').val();

  let uid = firebase.auth().currentUser.uid;

  if(nombre.length > 0 && apellidos.length > 0 && email.length > 0) {
    let rutausuario = firebase.database().ref('usuarios/'+userID);
    rutausuario.update({
      nombre: nombre,
      apellidos: apellidos,
      sobremi: sobremi
    });

    $('#modalEditarPerfil').modal('hide');
  }
  else {

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

$('#datetimepickerFechaEntregaEditarOrden').datepicker({ //Inicializa el datepicker de FechaEntrega
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
