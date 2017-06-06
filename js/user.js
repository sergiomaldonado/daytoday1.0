const db = firebase.database();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("Usuario logeado");
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    console.log(uid);

    db.ref('usuarios/' + uid).on('value', function(snap) {
      let usuario = snap.val();
      var privilegio = usuario.puesto;
      console.log(privilegio);

      if(privilegio == 'Administrador') {
        //$(location).attr("href", "admin.html");
      }
      if(privilegio == 'Usuario') {
        //$(location).attr("href", "user.html");
      }
    })
  }
  else {
    $(location).attr("href", "404.html");
  }
})
