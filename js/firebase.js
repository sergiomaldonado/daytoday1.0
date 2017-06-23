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
        getUser();
      })
      .catch(function(error) {
        console.log(error); //en caso de error lo imprime en consola

        if(error.code === 'auth/user-not-found') { //imprime un error si tu usuario es equivocado
          $('#errorusuario').html('El usuario es incorrecto').fadeIn("slow").show();
          setTimeout(function() {
            $('#error').fadeOut("slow").hide();
          }, 2000);
        }
        if(error.code === 'auth/wrong-password') { //imprime un error si te equivocaste en la contraseña
          $('#errorcontraseña').html('La contraseña es incorrecta').fadeIn("slow").show();
          setTimeout(function() {
            $('#error').fadeOut("slow").hide();
          }, 2000);
        }
      });
    }
    else {
      console.log(tipousuario);
      if(email == "") {
        $('#erroremail').html("El usuario es requerido").fadeIn("slow").show();
        setTimeout(function() {
          $('#erroremail').fadeOut("slow").hide();
        }, 2000);
      }
      if(contrasena == "") {
        $('#errorcontraseña').html("La contraseña es requerida").fadeIn("slow").show();
        setTimeout(function() {
          $('#errorcontraseña').fadeOut("slow").hide();
        }, 2000);
      }
      if(tipousuario == null || tipousuario == "") {
        $('#errorpuesto').html("El puesto es requerido").fadeIn("slow").show();
        setTimeout(function() {
          $('#errorpuesto').fadeOut("slow").hide();
        }, 2000);
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

          if(tipousuario == privilegio) {
             if(privilegio == 'Administrador') {
               $(location).attr("href", "admin.html");
             }
             if(privilegio == 'Usuario') {
              $(location).attr("href", "usuario.html");
             }
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
