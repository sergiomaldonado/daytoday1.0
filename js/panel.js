var privilegio;
var db = firebase.database();
var puesto;

function checar() {
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
      $("#modal").modal();
    }
  })
}

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

function mostrarPanelDesdeModal() {
  checarDesdeModal();

  setTimeout(function() {
    console.log(privilegio);

    if(puesto == privilegio) {
      if(privilegio == "Administrador") {
        $('#panel-usuario').hide();
        $("title").html("Panel de administrador");
        $('#panel-admin').show();
        $('#modal').modal('hide');
      }
      if(privilegio == "Usuario") {
        $('#panel-admin').hide();
        $('#panel-usuario').show();
        $('title').html("Panel de usuario");
        $('#modal').modal('hide');
      }
    }
    else {
      $('#error').html('Tu puesto es incorrecto').show();
    }
  }, 2000);
}

function login(){
  let email = $('#email').val();
  let password = $('#contrasena').val();
  puesto = $('#puesto').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function() {
    mostrarPanelDesdeModal();
  })
  .catch(function(error) {
    console.log(error);

    if(error.code === 'auth/user-not-found') {
      $('#error').html('El usuario es incorrecto').show();
    }
    if(error.code === 'auth/wrong-password') {
      $('#error').html('La contraseña es incorrecta').show();
    }
  });
}

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

function logOut() {
  firebase.auth().signOut();
}

mostrarPanel();
