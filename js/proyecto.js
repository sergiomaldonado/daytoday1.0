var idProyecto = $('#idProyecto').val();

function obtenerTituloProyecto() {
  let ref = firebase.database().ref('proyectos/' + idProyecto);
  ref.on('value', function(snapshot) {
    let proyecto = snapshot.val();

    var tituloProyecto = proyecto.nombre;

    $('#TituloProyecto').html(tituloProyecto);
    $('#titleProyecto').html(tituloProyecto);
  });
}

obtenerTituloProyecto();

function rellenarContenedorDeTareas() {
  let tareasProyecto = firebase.database().ref('proyectos/'+idProyecto+'/tareas');
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
})

function agregarTareaProyecto() {
  let nombreTarea = $('#tarea').val();
  let categoria = $('#categoria').val();
  let color = $('#color').val();
  let asignadoTarea = $('#asignado').val();

  let ruta = "proyectos/"+idProyecto+"/tareas";
  let tareas = firebase.database().ref(ruta);

  let Tarea = {
    nombre: nombreTarea,
    categoria: {
      nombre: categoria,
      color: color
    },
    asignado: asignadoTarea,
    estado: "Pendiente"
  }

  tareas.push().set(Tarea);
  $('#tarea').val('');
  $('#categoria').val('');
  $('#color').val('');
  $('#asignado').val('');
  $('#tarea').focus();
}
