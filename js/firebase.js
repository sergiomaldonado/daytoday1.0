  const db = firebase.database();
  var tipousuario;

  function login() {
    var email = $('#email').val();
    var contrasena = $('#contrasena').val();
    tipousuario = $('#puesto').val();

    firebase.auth().signInWithEmailAndPassword(email, contrasena)
    .catch(function(error) {
      console.log(error);
    });

    getUser();
  }

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
            $(location).attr("href", "user.html");
          }
        })
      }
      else {
        //$(location).attr("href", "404.html");
      }
    })
  }

  haySesion();

  function getUser() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
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
              $(location).attr("href", "user.html");
            }
          }
          else {

          }
        })

      }
    });
  }

  function logOut() {
    firebase.auth().signOut();
  }
