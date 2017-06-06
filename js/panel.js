var privilegio;
var db = firebase.database();

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

function login(){
  let email = $('#email').val();
  let password = $('#contrasena').val();
  let puesto = $('#puesto').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(function(error) {
    console.log(error);
  });

  $('#modal').modal('hide');
  mostrarPanelDesdeModal();
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
