function haySesion() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var usuario = firebase.auth().currentUser;
      var uid = usuario.uid;
      obtenerUsuario(uid);
    }
    else {
      $(location).attr("href", "index.html");
    }
  })
}

haySesion();

function obtenerUsuario(uid) {
  let usuario = firebase.database().ref('usuarios/'+uid);
  usuario.on('value', function(snapshot) {
    let usuarioactual = snapshot.val();
    $('.nombreDeUsuario').html( usuarioactual.nombre + " " + usuarioactual.apellidos);
  });
}

function logOut() {
  firebase.auth().signOut();
}
