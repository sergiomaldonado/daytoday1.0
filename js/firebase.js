  const db = firebase.database();
  var tipousuario;
  //inicia sesion en firebase
  function login() {
    var email = $('#email').val();
    var contrasena = $('#contrasena').val();
    tipousuario = $('#puesto').val();

    if(email.length > 0 && contrasena.length > 0 && tipousuario != null) {
      firebase.auth().signInWithEmailAndPassword(email, contrasena)
      .then(function() { //en caso de exito se obtiene el usuario
        getUser(tipousuario);
      })
      .catch(function(error) {
        console.log(error); //en caso de error lo imprime en consola

        if(error.code === 'auth/user-not-found') { //imprime un error si tu usuario es equivocado
          $('#email').parent().addClass('has-error');
          $('#helpblockEmail').empty().html("El usuario es incorrecto").show();
        }
        if(error.code === 'auth/wrong-password') { //imprime un error si te equivocaste en la contraseña
          $('#contrasena').parent().addClass('has-error');
          $('#helpblockContraseña').empty().html("La contraseña es incorrecta").show();
        }
      });
    }
    else {
      if(email == "") {
        $('#email').parent().addClass('has-error');
        $('#helpblockEmail').show();
      }
      else {
        $('#email').parent().removeClass('has-error');
        $('#helpblockEmail').hide();
      }
      if(contrasena == "") {
        $('#contrasena').parent().addClass('has-error');
        $('#helpblockContraseña').show();
      }
      else {
        $('#contrasena').parent().removeClass('has-error');
        $('#helpblockContraseña').hide();
      }
      if(tipousuario == null || tipousuario == "") {
        $('#puesto').parent().addClass('has-error');
        $('#helpblockPuesto').show();
      }
      else {
        $('#puesto').parent().removeClass('has-error');
        $('#helpblockPuesto').hide();
      }
    }
  }

  //Si hay sesion
  function haySesion() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var user = firebase.auth().currentUser;
        var uid = user.uid;

        db.ref('usuarios/' + uid).on('value', function(snap) {
          let usuario = snap.val();
          var privilegio = usuario.puesto;

          if(tipousuario == privilegio) {
            if(privilegio == 'Administrador') {
              $(location).attr("href", "admin.html");
            }
            if(privilegio == 'Usuario') {
              $(location).attr("href", "usuario.html");
            }
          }
        })
      }
    })
  }

  haySesion();

  //obtiene el Usuario con sesion actual
  function getUser(tipousuario) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) { //si en realidad hay un usuario te redirecciona al panel
        var user = firebase.auth().currentUser;
        var uid = user.uid;

        db.ref('usuarios/' + uid).on('value', function(snap) {
          let usuario = snap.val();
          var privilegio = usuario.puesto;

          if(tipousuario == privilegio) {
             if(privilegio == 'Administrador') {
               $(location).attr("href", "admin.html");
             }
             if(privilegio == 'Usuario') {
              $(location).attr("href", "usuario.html");
             }
           }
           else {
             $('#puesto').parent().addClass('has-error');
             $('#helpblockPuesto').empty().html("El pusto es incorrecto").show();
           }
        })
      }
    });
  }

  //cierra la sesión de firebase
  function logOut() {
    firebase.auth().signOut();
  }
