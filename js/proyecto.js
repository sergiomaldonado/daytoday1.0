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

function rellenarContenedorDeTareas() {
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
}

$(document).ready(function() {

  rellenarContenedorDeTareas();

  $('#tabsemana').on('shown.bs.tab', function (e) {
    e.target
    e.relatedTarget

    rellenarContenedorDeTareas();
  })

  $('#tabbrief').on('shown.bs.tab', function(e) {
    e.target
    e.relatedTarget
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
