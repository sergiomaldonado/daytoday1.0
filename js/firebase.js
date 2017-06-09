  const db = firebase.database();
  var tipousuario;

  //inicia sesion en firebase
  function login() {
    var email = $('#email').val();
    var contrasena = $('#contrasena').val();
    tipousuario = $('#puesto').val();

    if(email.length != 0 && contrasena.length != 0 && tipousuario.length != 0) {
      firebase.auth().signInWithEmailAndPassword(email, contrasena)
      .then(function() { //en caso de exito se obtiene el usuario
        getUser();
      })
      .catch(function(error) {
        console.log(error); //en caso de error lo imprime en consola
      });
    }
    else {

    }
  }

  //Si hay sesion
  function haySesion() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("Usuario logeado");
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        console.log(uid);

        db.ref('usuarios/' + uid).on('value', function(snap) {
          let usuario = snap.val();
          var privilegio = usuario.puesto;

          // if(privilegio == 'Administrador') {
          //   $(location).attr("href", "admin.html");
          // }
          // if(privilegio == 'Usuario') {
          //   $(location).attr("href", "user.html");
          // }
          $(location).attr("href", "panel.html");
        })
      }
      else { //Si no hay usuario logeado
        //$(location).attr("href", "index.html");
      }
    })
  }

  haySesion();

  //obtiene el Usuario con sesion actual
  function getUser() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) { //si en realidad hay un usuario te redirecciona al panel
        console.log("Usuario logeado");
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        //console.log(uid);

        db.ref('usuarios/' + uid).on('value', function(snap) {
          let usuario = snap.val();
          var privilegio = usuario.puesto;
          //console.log(privilegio);

          // if(tipousuario == privilegio) {
          //   if(privilegio == 'Administrador') {
          //     $(location).attr("href", "admin.html");
          //   }
          //   if(privilegio == 'Usuario') {
          //     $(location).attr("href", "user.html");
          //   }
          // }
          // else {
          //
          // }
          $(location).attr("href", "panel.html");
        })
      }
    });
  }

  //cierra la sesión de firebase
  function logOut() {
    firebase.auth().signOut();
  }
