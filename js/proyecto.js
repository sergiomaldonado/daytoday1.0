$(document).ready(function() {
  var idProyecto = $('#idProyecto').html();
  console.log(idProyecto);

  let tareasProyecto = firebase.database().ref('proyectos/'+idProyecto+'/tareas');
  tareasProyecto.on('value', function(snapshot) {
    let Tareas = snapshot.val();

    let row = "";
    $('#ContenedorTareasProyecto').empty();
    for(tarea in Tareas) {
      row += '<div style="margin-right:-20px;" class="col-md-4">' +
              '<div class="tarea" border-left: solid 5px ' + Tareas[tarea].color + ';>' + Tareas[tarea].nombre + '</div>' +
             '</div>';
             console.log(Tareas[tarea].categoria.color);
             console.log(Tareas[tarea].nombre);

    }
    $('#ContenedorTareasProyecto').append(row);
    row = "";
  }, function(errorObject) {
    console.log("La lectura de tareas falló: " + errorObject.code)
  })

  function agregarTarea() {
    let tarea = $('#tarea').val();
    let categoria = $('#categoria').val();
    let color = $('#color').val();
    let asignado = $('#asignado').val();

    let tareas = firebase.database().ref('proyectos/'+idProyecto+'tareas');

    let tarea = {
      nombre: tarea,
      categoria: {
        nombre: categoria,
        color: color
      },
      asignado: asignado,
      estado: "Pendiente"
    }

    tareas.push().set(tarea);
  }
})
