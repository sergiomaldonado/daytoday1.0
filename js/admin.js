function obtenerUsuario(uid) {
  let usuario = firebase.database().ref('usuarios/'+uid);
  usuario.on('value', function(snapshot) {
    let usuarioactual = snapshot.val();
    $('.nombreDeUsuario').html( usuarioactual.nombre + " " + usuarioactual.apellidos);
  });
}

function editarTarea(idTarea) {
  console.log(idTarea);

  let tareas = firebase.database().ref('/tareas/'+idTarea);
  let nuevosDatos = {

  }

  //tareas.set(nuevosDatos);
}

function eliminarTarea(idTarea) {
  var datos;
  let tareas = firebase.database().ref('tareas/'+idTarea);
  tareas.on('value', function(snapshot) {
    let tareas = snapshot.val();
    for(tarea in tareas) {
      datos = {
        nombre: tareas[tarea].nombre,
        dia: tareas[tarea].dia,
        mes: tareas[tarea].mes,
        año: tareas[tarea].año,
        color: tareas[tarea].color,
        estado: tareas[tarea].estado
      }
    }
  });

  let historial = firebase.database().ref('historial/tareas/'+idTarea);
  let tareaHistorial = {

  }
  historial.push();
}

function completarTarea(idTarea) {
  let tareas = firebase.database().ref('tareas/'+idTarea);
  tareas.update({
    estado: "Completada"
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

function mostrarProyectos() {

    let proyectos = firebase.database().ref('proyectos/');
    proyectos.on('value', function(snapshot) {
    let proyectos = snapshot.val();

      $('#ContenedorProyectos').empty();
      let row = "";

      for (proyecto in proyectos) {
        let fechaEntrega = proyectos[proyecto].fechaEntrega;
        let relativa = moment().endOf('day').fromNow();
        console.log(relativa);

        let porcentaje = ( proyectos[proyecto].tareasCompletadas * 100 ) / proyectos[proyecto].numTareas;
        row += '<div style="margin-top:10px;" class="col-xs-6 col-md-4">' +
                  '<a href="proyecto.php?id=' + proyecto + '">' +
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

//metodo que guarda una nueva orden en Firebase
function guardarOrden() {
  let cliente = $('#cliente').val();
  let descripcion = $('#descripcion').val();
  let fechaRecep = moment().format('DD/MM/YYYY');
  let fechaEntrega = $('#fechaEntrega').val();
  let estado = "Pendiente";
  let encargado = $('#encargado').val();

  if(cliente.lenght > 0 && descripcion.lenght > 0 && fechaRecep.lenght > 0 && fechaEntrega.lenght > 0 && estado.lenght > 0 && encargado.lenght > 0) {
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
    $('#agregarOrden').modal('hide');
  }
}

//guarda un nuevo Usuario en la base de datos de Firebase en el nodo Usuarios
function guardarUsuario() {
  let nombre = $('#nombre').val();
  let apellidos = $('#apellidos').val();
  let agregarUsuarioEmail = $('#agregarUsuarioEmail').val();
  let agregarUsuarioPuesto = $('#agregarUsuarioPuesto').val();
  var agregarUsuarioContrasena;

  if($('#nuevacontrasena').val() == $('#confirmarcontrasena').val()) {
    agregarUsuarioContrasena = $('#nuevacontrasena').val();

    firebase.auth().createUserWithEmailAndPassword(agregarUsuarioEmail, agregarUsuarioContrasena)
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
    $('#agregarUsuario').modal('hide');

    logOut();
  }
  else {
    console.log("Las contraseñas no coinciden");
  }
}

var equipo = [];

var k = 1;
//introduce los integrantes del equipo a un arreglo
function agregarIntegrante() {
  let integrante = $('#input-agregarIntegrante').val();
  console.log(integrante);
  equipo.push(integrante);

  let id = 'integrante-'+k;

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
  $('#contenedorModalIntegrantes').append($div);
  k++;

  $('#input-agregarIntegrante').val('').focus();
}

function eliminarIntegrante(id) {
  $('#'+id).remove();
}

var numtareas = 0;
var tareas = [];

//atrapa las tareas que se asignan a un proyecto
function agregarTarea() {
  let nombre = $('#tarea').val();
  let categoria = $('#categoria').val();
  let color = $('#color').val();
  let asignado = $('#asignado').val();
  let estado = "Pendiente";

  let tarea = {
    nombre: nombre,
    categoria: {
      nombre: categoria,
      color: color
    },
    asignado: asignado,
    estado: estado,
    dias: []
  }

  tareas.push(tarea);
  numtareas++;
  $('#tarea').val().focus();
}

var i = 1;
function agregarObjetivo() {
  let objetivo = $('#input-agregarObjetivo').val();
  let id = 'objetivo-'+i;

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
  $('#contenedorModalObjetivos').append($div);
  i++;

  $('#input-agregarObjetivo').val('').focus();
  $('#contadorObjetivo').html('0/140');
}

function eliminarObjetivo(id) {
  $('#'+id).remove();
}

var j = 1;
function agregarIndicador() {
  let indicador = $('#input-agregarIndicador').val();
  let id = 'indicador-'+j;

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
  $('#contenedorModalIndicadores').append($div);
  j++;

  $('#input-agregarIndicador').val('').focus();
  $('#contadorIndicador').html('0/140');
}

function eliminarIndicador(id) {
  $('#'+id).remove();
}

function agregarHito() {
  let hito = $('#input-agregarHito').val();
  let id = 'indicador-'+j;

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
  $('#contenedorModalHitos').append($div);
  j++;

  $('#input-agregarHito').val('').focus();
  $('#contadorHito').html('0/140');
}

function eliminarHito(id) {
  $('#'+id).remove();
}

//crear un proyecto nuevo en la base de datos de Firebase en el nodo Proyectos
function guardarProyecto() {
  let nombreProyecto = $('#nombreProyecto').val();
  let fechaInicio = $('#fechaInicio').val();
  let fechaEntrega = $('#fechaEntrega').val();
  let encargadoProyecto = $('#encargadoProyecto').val();
  let estructuraProyecto = $('#estructuraProyecto').val();
  let descripcionProyecto = $('#descripcionProyecto').val();
  let documentacion = $('#documentacion').val();
  let indicador1 = $('#indicador1').val();
  let indicador2 = $('#indicador2').val();
  let objetivo1 = $('#objetivo1').val();
  let objetivo2 = $('#objetivo2').val();
  let objetivo3 = $('#objetivo3').val();
  let entregables = $('#entregables').val();

  let proyectos = firebase.database().ref('proyectos/');
  let Proyecto = {
    nombre: nombreProyecto,
    equipo: equipo,
    numtareas: numtareas,
    tareasCompletadas: 0,
    fechaInicio: fechaInicio,
    fechaEntrega: fechaEntrega,
    encargado: encargadoProyecto,
    estructura: estructuraProyecto,
    descripcion: descripcionProyecto,
    docuementacion: documentacion,
    objetivos: {
      objetivo1: objetivo1,
      objetivo2: objetivo2,
      objetivo3: objetivo3
    },
    indicadores: {
      indicador1: indicador1,
      indicador2: indicador2
    },
    entregables: entregables
  }
  proyectos.push().set(Proyecto);

  let tareasRef = firebase.database().ref('proyectos/tareas');

  for(tarea in tareas) {
    tareasRef.push().set(tarea);
  }
  $('#agregarProyecto').modal('hide');
}

$('#datetimepicker1').datepicker({
  startDate: "Today",
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
