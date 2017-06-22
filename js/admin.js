function obtenerUsuario(uid) {
  let usuario = firebase.database().ref('usuarios/'+uid);
  usuario.on('value', function(snapshot) {
    let usuarioactual = snapshot.val();
    $('.nombreDeUsuario').html( usuarioactual.nombre + " " + usuarioactual.apellidos);
  });
}

function editarTarea() {
  
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

      let row = "";
      let i=1;
      for (orden in ordenes) {
        var state;
        if(ordenes[orden].estado === "Pendiente"){
          state='<span style="background-color: #FF0000; width: 30px; height: 25px; border-radius: 15px;" class="badge"><span>';
        }
        if(ordenes[orden].estado === "En proceso"){
          state='<span style="background-color: #FFCC00; width: 30px; height: 25px;" border-radius: 15px; class="badge"><span>';
        }
        if(ordenes[orden].estado === "Listo"){
          state='<span style="background-color: #4CDD85; width: 30px; height: 25px;" border-radius: 15px; class="badge"><span>';
        }

        row += '<tr>' +
                 '<td>' + i + '</td>' +
                 '<td>' + ordenes[orden].cliente + '</td>' +
                 '<td>' + ordenes[orden].descripcion + '</td>' +
                 '<td>' + ordenes[orden].fechaRecep + '</td>' +
                 '<td>' + ordenes[orden].fechaEntrega + '</td>' +
                 '<td>' + state + '</td>' +
                 '<td>' + ordenes[orden].encargado + '</td>' +
               '</tr>';
        i++;
      }

      $('#tablaordenes tbody').append(row);
      row = "";
      i = 1;
      state = "";
    }, function(errorObject) {
      console.log("La lectura de las ordenes falló: " + errorObject.code);
    })
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




        let porcentaje = ( proyectos[proyecto].tareasCompletadas * 100 )/ proyectos[proyecto].numTareas;
        row += '<div style="margin-top:10px;" class="col-xs-6 col-md-4">' +
                  '<a href="proyecto.php?id=' + proyecto + '">' +
                    '<div id="proyecto">' +
                      '<div id="nombreproyecto"><h3 style="padding:20px;">' + proyectos[proyecto].nombre + '</h3></div>' +
                      '<div id="fecha"><p>Tareas:' + proyectos[proyecto].numTareas + '   Entrega:' + proyectos[proyecto].fechaEntrega + '</p></div>' +
                      '<div class="progress">' +
                        '<div class="progress-bar progress-bar-custom" role="progressbar" aria-valuenow="' + porcentaje + '" aria-valuemin="0" aria-valuemax="100" style="width:' + porcentaje + '%;">' +
                          + porcentaje + '%' +
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

//introduce los integrantes del equipo a un arreglo
function agregarIntegrante() {
  let integrante = $('#ac-demo').val();

  equipo.push(integrante);

  $('#ac-demo').val("").focus();
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
