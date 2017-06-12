var privilegio;
var db = firebase.database();
var puesto;

//checa si hay un usuario actualmente logeado
function checar() {
  firebase.auth().onAuthStateChanged(function (user) {
    //si hay un usuario
    if (user) {
      console.log("Usuario logeado");
      //obtiene el usuario actual
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      console.log(uid);
      //consulta el id del usuario
      db.ref('usuarios/' + uid).on('value', function(snap) {
        let usuario = snap.val();
        privilegio = usuario.puesto;
        console.log(privilegio);
      })
    }
    else {
      /*Sino hay un usuario escondemos ambos panels
      *Y mostramos la ventana modal de Inicio de Sesion
      */
      $('#panel-admin').hide();
      $('#panel-usuario').hide();
      $("#modal").modal();
      $('#email').val("");
      $('#contrasena').val("");
      $('#puesto').val("");
    }
  })
}

//checa desde la modal a ver si hay un usuario actualmente
function checarDesdeModal() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Usuario logeado");
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      console.log(uid);

      db.ref('usuarios/' + uid).on('value', function(snap) {
        let usuario = snap.val();
        privilegio = usuario.puesto;
        console.log(privilegio);
      })
    }
    else {
      $('#panel-admin').hide();
      $('#panel-usuario').hide();
    }
  })
}

//muestra el panel (de usuario o admin) una vez que se inice sesion desde la modal
function mostrarPanelDesdeModal() {
  checarDesdeModal();

  setTimeout(function() {
    console.log(privilegio);

    if(puesto == privilegio) { //si el puesto es igual, significa que ingresaste bien tu puesto
      if(privilegio == "Administrador") { //si el privilegio es Administrador te muestra el panel de admin
        $('#panel-usuario').hide();
        $("title").html("Panel de administrador");
        $('#panel-admin').show();
        $('#modal').modal('hide');
      }
      if(privilegio == "Usuario") { //si el privilegio es Usuario normal te lleva al panel de usuario
        $('#panel-admin').hide();
        $('#panel-usuario').show();
        $('title').html("Panel de usuario");
        $('#modal').modal('hide');
      }
    }
    else {
      $('#error').html('Tu puesto es incorrecto').show(); //si ingresaste mal el puesto te muestra un error
      setTimeout(function() {
        $('#error').fadeOut("slow").hide();
      }, 2000);
    }
  }, 2000);
}

//inicia la sesión en firebase con tu email y contraseña dede la modal
function login(){
  let email = $('#email').val();
  let password = $('#contrasena').val();
  puesto = $('#puesto').val();

  if(email.length != 0 && password.length != 0 && puesto.length != 0) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() { //si el intento de iniciar sesion fue exitoso, muestra el panel
      mostrarPanelDesdeModal();
    })
    .catch(function(error) { //en caso de errores
      console.log(error);

      if(error.code === 'auth/user-not-found') { //imprime un error si tu usuario es equivocado
        $('#error').html('El usuario es incorrecto').fadeIn("slow").show();
        setTimeout(function() {
          $('#error').fadeOut("slow").hide();
        }, 2000);
      }
      if(error.code === 'auth/wrong-password') { //imprime un error si te equivocaste en la contraseña
        $('#error').html('La contraseña es incorrecta').fadeIn("slow").show();
        setTimeout(function() {
          $('#error').fadeOut("slow").hide();
        }, 2000);
      }
    });
  }
  else { //si no llenas todos los campos te muestra un error
    $('#error').html("Rellena todos los campos").fadeIn("slow").show();
    setTimeout(function() {
      $('#error').fadeOut("slow").hide();
    }, 2000);
  }
}

//muestra el panel al entrar desde index
function mostrarPanel() {
  checar();

  setTimeout(function() {
    console.log(privilegio);


    if(privilegio == "Administrador") {
      $('#panel-usuario').hide();
      $("title").html("Panel de administrador");
      $('#panel-admin').show();
    }
    if(privilegio == "Usuario") {
      $('#panel-admin').hide();
      $('#panel-usuario').show();
      $('title').html("Panel de usuario");
    }
  }, 2000);


}

//cierra la sesion de firebase
function logOut() {
  firebase.auth().signOut();
}

mostrarPanel();

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
    fechaEntrega: fechaEntrea,
    estado: estado,
    encargado: encargado
  }

  ordenes.push().set(Orden); //inserta en firebase asignando un id autogenerado por la plataforma
}

//guarda un nuevo Usuario en la base de datos de Firebase en el nodo Usuarios
function guardarUsuario() {
  let nombre = $('#nombre').val();
  let apellidos = $('#apellidos').val();
  let email = $('#email').val();
  let puesto = $('#puesto').val();
  var contrasena;

  if($('#contrasena').val() === $('#confirmarcontrasena').val()) {
    contrasena = $('#contrasena').val();
  }

  firebase.auth().createUserWithEmailAndPassword(email, contrasena)
  .then(function(data) {
    console.log(data);
    let uid = data.uid;
    console.log(uid);

    let usuarios = firebase.database().ref('usuarios/'+uid);
    let Usuario = {
      nombre: nombre,
      apellidos: apellido,
      puesto: puesto
    }
    usuarios.set(Usuario); //metodo set para insertar de Firebase

  })
  .catch(function(error) {
    console.log(error);
  });
  $('#agregarUsuario').modal('hide');
  return false;
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
  let asignado = $('#asignado').val();
  let estado = "Pendiente";

  let tarea = {
    nombre: nombre,
    categoria: categoria,
    asignado: asignado,
    estado: estado
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
    tareas.push().set(tarea);
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
