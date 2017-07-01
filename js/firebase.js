  const db = firebase.database();
  var tipousuario = "";

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
          /*$('#errorusuario').html('El usuario es incorrecto').fadeIn("slow").show();
          setTimeout(function() {
            $('#error').fadeOut("slow").hide();
          }, 2000);*/

          $('#email').parent().addClass('has-error');
          $('#helpblockEmail').empty().html("El usuario es incorrecto").show();
        }
        if(error.code === 'auth/wrong-password') { //imprime un error si te equivocaste en la contraseña
          /*$('#errorcontraseña').html('La contraseña es incorrecta').fadeIn("slow").show();
          setTimeout(function() {
            $('#error').fadeOut("slow").hide();
          }, 2000);*/

          $('#contrasena').parent().addClass('has-error');
          $('#helpblockContraseña').empty().html("La contraseña es incorrecta").show();
        }
      });
    }
    else {
      console.log(tipousuario);
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
        console.log("Usuario logeado");
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        console.log(uid);

        db.ref('usuarios/' + uid).on('value', function(snap) {
          let usuario = snap.val();
          var privilegio = usuario.puesto;

          if(privilegio == 'Administrador') {
             $(location).attr("href", "admin.html");
           }
           if(privilegio == 'Usuario') {
             $(location).attr("href", "usuario.html");
           }
          //$(location).attr("href", "panel.php");
        })
      }
    })
  }

  haySesion();

  //obtiene el Usuario con sesion actual
  function getUser(tipousuario) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) { //si en realidad hay un usuario te redirecciona al panel
        console.log("Usuario logeado");
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        //console.log(uid);

        db.ref('usuarios/' + uid).on('value', function(snap) {
          let usuario = snap.val();
          var privilegio = usuario.puesto;
          console.log(privilegio);
          console.log(tipousuario);

          if(tipousuario == privilegio) {
             if(privilegio == 'Administrador') {
               $(location).attr("href", "admin.html");
             }
             if(privilegio == 'Usuario') {
              $(location).attr("href", "usuario.html");
             }
           }
           else {
             $('#puesto').parent().empty().html("El pusto es incorrecto").addClass('has-error');
             $('#helpblockPuesto').show();
           }
          //$(location).attr("href", "panel.html");
        })
      }
    });
  }

  //cierra la sesión de firebase
  function logOut() {
    firebase.auth().signOut();
  }
