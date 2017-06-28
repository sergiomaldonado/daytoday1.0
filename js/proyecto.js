var idProyecto = $('#idProyecto').val();
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

/*function rellenarContenedorDeTareas() {
  let tareasProyecto = dbRef.ref('proyectos/'+idProyecto+'/tareas');
  tareasProyecto.on('value', function(snapshot) {
    let Tareas = snapshot.val();

    let row = "";
    $('#left-rollbacks').empty();
    for(tarea in Tareas) {
      row += '<div style="margin-right:-20px;" class="redips-drag t1 col-md-4">' +
              '<div class="tarea" style="border-left: solid 5px ' + Tareas[tarea].categoria.color + ';">' + Tareas[tarea].nombre + '</div>' +
             '</div>';
    }
    $('#left-rollbacks').append(row);
    row = "";

  }, function(errorObject) {
    console.log("La lectura de tareas falló: " + errorObject.code)
  });
}*/

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

  /*$('#tabsemana').on('shown.bs.tab', function (e) {
    e.target
    e.relatedTarget
  })*/

  $('#tabbrief').on('shown.bs.tab', function(e) {
    e.target
    e.relatedTarget

    rellenarBrief();
  })
});

function agregarTareaProyecto() {
  let nombre = $('#tarea').val();
  let categoria = $('#categoria').val();
  let asignado = $('#asignado').val();
  let fechaInicio = $('#fechaInicio').val();
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
  tareasProyecto.push(tarea);

  let tareas = dbRef.ref('tareas/');
  tareas.push(tarea);

  let miSemana = dbRef.ref('miSemana/'+asignado);
  miSemana.push(tarea);

  var numTareas;
  let proyecto = dbRef.ref('proyecto/'+idProyecto);
  proyecto.on('value', function(snapshot) {
    let proyecto = snapshot.val();
    numTareas = proyecto.numtareas;
  });
  numTareas++;
  proyecto.update({numtareas: numTareas});

  $('#tarea').val('').focus();
  $('#categoria').val('');
  $('#asignado').val('');
  $('#fechaInicio').val('');
}
