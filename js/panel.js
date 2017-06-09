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

}

$('#agregarProyecto').modal();

$('#datetimepicker1').datepicker({
  startDate: "Today",
  autoclose: true,
  todayHighlight: true
});

$('#datetimepickerFechaInicio').datepicker({ //Inicializa el datepicker de FechaInico
  startDate: "Today",
  autoclose: true,
  todayHighlight: true
});

$('#datetimepickerFechaEntrega').datepicker({ //Inicializa el datepicker de FechaEntrega
  startDate: "Today",
  autoclose: true,
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
