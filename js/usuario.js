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

function mostrarCategorias() {
  let categorias = firebase.database().ref('/categorias');
  categorias.on('value', function(snapshot) {
    let categorias = snapshot.val();

    let lis="";
    for(categoria in categorias) {
      lis += '<li style="display:inline; padding:20px;"><span style="color:'+categorias[categoria].color+';" class="glyphicon glyphicon-asterisk"></span>'+categorias[categoria].nombre+'</li>';
    }

    $('#listaCategorias').empty().append(lis);
  });
}

mostrarCategorias();
