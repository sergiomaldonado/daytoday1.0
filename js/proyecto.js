var idProyecto = getQueryVariable('id');
var dbRef = firebase.database();

function obtenerTituloProyecto() {
  let ref = dbRef.ref('proyectos/' + idProyecto);
  ref.on('value', function(snapshot) {
    let proyecto = snapshot.val();

    var tituloProyecto = proyecto.nombre;

    $('#TituloProyecto').html(tituloProyecto);
    $('#titleProyecto').html(tituloProyecto);
  });
}

obtenerTituloProyecto();

$(function() {
  var datos = [];
  var usuarios = firebase.database().ref("proyectos/"+ idProyecto + "/equipo");
  usuarios.on('value', function(snapshot) {
    var users = snapshot.val();
    for(let i=0; i<users.length; i++) {
      datos.push({
        value: users[i],
        data: users[i]
      })
    }
  });

  var concurrencias = datos;

  $('#asignadoEnProyecto').autocomplete({
    lookup: concurrencias,
    onSelect: function (suggestion) {
      var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
      $('#outputcontent').html(thehtml);
    }
  });
});

function rellenarBrief() {
  let rutaProyecto = dbRef.ref('proyectos/'+idProyecto);
  rutaProyecto.on('value', function(snapshot) {
    let datosProyecto = snapshot.val();
    $('#contenedorBrief').empty();

    let objectives = "";
    for(let i=0; i<datosProyecto.objetivos.length; i++) {
      objectives += '<li>' + datosProyecto.objetivos[i] + '</li>';
    }

    let hitos = "";
    for(let i=0; i<datosProyecto.hitos.length; i++) {
      hitos += '<li><span class="glyphicon glyphicon-star"></span>' + datosProyecto.hitos[i] + '</li>';
    }

    let row = '<div style="" class="col-xs-8 col-sm-6">' +
                '<h3 class="text-left">Encargado del Proyecto:<span id="text-brief"> '+datosProyecto.encargado+'</span></h3>' +
              '</div>' +
              '<div style="" class="col-xs-8 col-sm-6">' +
                '<h3 class="text-left" style="font-weight:bold;">Equipo del Proyecto: <span id="text-brief"> '+datosProyecto.equipo.join(', ') +'</span></h3>' +
              '</div>' +
              '<div style="" class="col-xs-12 col-sm-12">' +
                '<h3 class="text-left" style="font-weight:bold;">Descripcion del proyecto: <span id="text-brief-coment">¿De que se trata el proyecto?</span></h3>' +
                '<div>' +
                  '<p class="text-left">'+datosProyecto.descripcion+'</p>' +
                '</div>' +
              '</div>' +
              '<div style="" class="col-xs-12 col-sm-12">' +
                '<h3 class="text-left" style="font-weight:bold;">Objetivos del proyecto: <span id="text-brief-coment">¿Que se quiere lograr?</span></h3>' +
                '<div>' +
                  '<ul class="text-left">' +
                    objectives +
                  '</ul>' +
                '</div>' +
              '</div>' +
              '<div style="" class="col-xs-12 col-sm-12">' +
                '<h3 class="text-left" style="font-weight:bold;">Estructura del proyecto: <span id="text-brief-coment">'+datosProyecto.estructura+'</span></h3>' +
                '<div>' +
                '</div>' +
              '</div>' +
              '<div style="" class="col-xs-12 col-sm-12">' +
                '<div>' +
                  '<h3 class="text-left" style="font-weight:bold;">Documentación: <span id="text-brief-coment">'+datosProyecto.documentacion+'</span></h3>' +
                '</div>' +
              '</div>' +
              '<div style="" class="col-xs-12 col-sm-12">' +
                '<div>' +
                  '<h3 class="text-left" style="font-weight:bold;">Tiempos de entrega: <span id="text-brief-coment">Fecha de entrega y estimado de duracion del proyecto.</span></h3>' +
                  '<ul class="text-left">' +
                    hitos +
                  '</ul>' +
                '</div>' +
              '</div>' +
              '<div style="" class="col-xs-12 col-sm-12">' +
                '<div>' +
                  '<h3 class="text-left" style="font-weight:bold;">Entregables: <span id="text-brief-coment">¿Que es lo que vamos a entregar una ves finalizado el proyecto?</span></h3>' +
                  '<ul class="text-left">' +
                    '<li>Entregable 1</li>' +
                    '<li>Entregable 2</li>' +
                  '</ul>' +
                '</div>' +
              '</div>';
              console.log(row);
    $('#contenedorBrief').append(row);
    row = "";
    objectives = "";
    hitos = "";
  })
}

$(document).ready(function() {
  $('#tabbrief').on('shown.bs.tab', function(e) {
    e.target
    e.relatedTarget

    rellenarBrief();
  })
});

$('#datetimepickerFechaInicioTareaProyecto').datepicker({ //Inicializa el datepicker de FechaInico
  startDate: "Today",
  autoclose: true,
  format: "mm/dd/yyyy",
  todayHighlight: true
});

function agregarTareaProyecto() {
  let nombre = $('#tarea').val();
  let categoria = $('#categoria').val();
  let asignado = $('#asignadoEnProyecto').val();
  let fechaInicio = $('#fechaInicioTareaProyecto').val();
  let idP = idProyecto;
  let date = new Date(fechaInicio);
  let dia = date.getDate();
  let mes = date.getMonth();
  let año = date.getFullYear();

  let tarea = {
    nombre: nombre,
    categoria: categoria,
    asignado: asignado,
    idP: idP,
    dia: dia,
    mes: mes,
    año: año,
    estado: "Pendiente"
  }

  let tareasProyecto = dbRef.ref('proyectos/'+idProyecto+'/tareas');
  let key = tareasProyecto.push(tarea).getKey();

  tarea.idTarea = key;

  let tareas = dbRef.ref('tareas/'+key);
  tareas.set(tarea);

  let miSemana = dbRef.ref('miSemana/'+asignado+'/'+key);
  miSemana.set(tarea);

  var numTareas;
  let proyecto = dbRef.ref('proyectos/'+idProyecto);
  proyecto.once('value', function(snapshot) {
    let datosProyecto = snapshot.val();
    numTareas = datosProyecto.numTareas;
    numTareas++;
    proyecto.update({numTareas: numTareas});
  });

  let notificaciones = db.ref('notificaciones/'+integrantes[i]+'/notificaciones');
  let datosNotificacion = {
    mensaje: 'Se te ha agregado al proyecto ' + nombreProyecto,
    tipo: 'Proyecto',
    leida: false
  }
  notificaciones.push(datosNotificacion);

  let not = db.ref('notificaciones/'+integrantes[i]);
  not.once('value', function(snapshot) {
    let notusuario = snapshot.val();
    let cont = notusuario.cont + 1;

    not.update({cont: cont});
  });

  $('#tarea').val('').focus();
  $('#categoria').val('');
  $('#asignadoEnProyecto').val('');
  $('#fechaInicioTareaProyecto').val('');
}
