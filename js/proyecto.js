var idProyecto = $('#idProyecto').val();
console.log(idProyecto);

$(document).ready(function() {

  let tareasProyecto = firebase.database().ref('proyectos/'+idProyecto+'/tareas');
  tareasProyecto.on('value', function(snapshot) {
    let Tareas = snapshot.val();

    let row = "";
    $('#ContenedorTareasProyecto').empty();
    for(tarea in Tareas) {
      row += '<div style="margin-right:-20px;" class="col-md-4">' +
              '<div class="tarea" style="border-left: solid 5px ' + Tareas[tarea].categoria.color + ';">' + Tareas[tarea].nombre + '</div>' +
             '</div>';
    }
    $('#ContenedorTareasProyecto').append(row);
    row = "";

    var App = angular.module('drag-and-drop', ['ngDragDrop']);

    App.controller('oneCtrl', function($scope, $timeout) {
      $scope.list5 = [
        { 'title': 'Item 1', 'drag': true },
        { 'title': 'Item 2', 'drag': true },
        { 'title': 'Item 3', 'drag': true },
        { 'title': 'Item 4', 'drag': true },
        { 'title': 'Item 5', 'drag': true },
        { 'title': 'Item 6', 'drag': true },
        { 'title': 'Item 7', 'drag': true },
        { 'title': 'Item 8', 'drag': true },
        {'title': 'Hola', 'drag': true}
      ];

      // Limit items to be dropped in list1
      $scope.optionsList1 = {
        accept: function(dragEl) {
          if ($scope.list1.length >= 2) {
            return false;
          } else {
            return true;
          }
        }
      };
    });



  }, function(errorObject) {
    console.log("La lectura de tareas falló: " + errorObject.code)
  });
})

function agregarTareaProyecto() {
  let nombreTarea = $('#tarea').val();
  let categoria = $('#categoria').val();
  let color = $('#color').val();
  let asignadoTarea = $('#asignado').val();

  let ruta = "proyectos/"+idProyecto+"/tareas";
  console.log(ruta);

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
}
