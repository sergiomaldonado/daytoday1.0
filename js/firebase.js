  var db = firebase.database();
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

  function getUser() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("Usuario logeado");
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        console.log(uid);

        db.ref('usuarios/' + uid).on('value', function(snap) {
          let usuario = snap.val();
          var privilegio = usuario.puesto;
          console.log(privilegio);

          if(tipousuario == privilegio) {
            if(privilegio == 'Administrador') {

            }
            if(privilegio == 'Usuario') {
                $(location).attr("href", "user.html");
            }
          }
        })

      }
    });
  }

  function logOut() {
    firebase.auth().signOut();
  }
