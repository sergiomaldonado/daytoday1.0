  function getUser() {
    firebase.auth().onAuthStateChanged(function (user) {
      if(user) {
        console.log("Usuario logeado");
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        console.log(uid);
        return uid;
      }
    })
  }

  var db = firebase.database();
  var privilegio;

  var login = function() {
    var email = $('#email').val();
    var contrasena = $('#contrasena').val();
    var puesto = $('#puesto').val();

    firebase.auth().signInWithEmailAndPassword(email, contrasena)
    .catch(function(error) {
      console.log(error);
    });

    let uid = getUser();
    firebase.database().ref('usuarios/' + uid).on('value', function(snap) {
      let usuario = snap.val();
      privilegio = usuario.puesto;
      console.log(privilegio);
      console.log(puesto);

      if(puesto == privilegio) {
        console.log("hola");

        $(location).attr("href", "user.html");
      }
    })
  }

  function haySesion(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("Usuario logeado");
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        console.log(uid);

        db.ref('usuarios/' + uid).on('value', function(snap) {
          let usuario = snap.val();
          privilegio = usuario.puesto;
          console.log(privilegio);

          if(puesto == privilegio) {
            console.log("hola");

            $(location).attr("href", "user.html");
          }
        })

      }
    });
  }

  var cerrarSesion = function() {
    firebase.auth().signOut();
  }
