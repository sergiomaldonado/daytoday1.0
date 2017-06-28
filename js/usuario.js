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

function completarTarea(idTarea) {
  var idTareaEnNodoTareas, idTareaEnNodoMiSemana, datos;
  var Asignado;
  var idProy;

  let nodoTareas = firebase.database().ref('tareas/');
  nodoTareas.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
    idTareaEnNodoTareas = snapshot.key;

    let tareasRef = firebase.database().ref('tareas/'+idTareaEnNodoTareas);
    tareasRef.on('value').then( function(daticos) {
      let tareas = daticos.val();
      idProy = tareas.idP;
      Asignado = tareas.asignado;
    });
    console.log(Asignado);
    firebase.database().ref('tareas/'+idTareaEnNodoTareas).update({ estado: "Completada" });
  });
  let refMiSemana = firebase.database().ref('miSemana/'+Asignado);
  refMiSemana.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
    firebase.database().ref('miSemana/'+Asignado+'/'+snapshot.key).update({ estado: "Completada"});
  });

  let tareasProyecto = firebase.database().ref('proyectos/'+idProy+'/tareas/'); //Eliminar del nodo tareas del proyecto
  firebase.database().ref('proyectos/'+idProy+'/tareas/'+idTarea).update({ estado: "Completada" });

  var tareasCompletadas;
  let proyecto = firebase.database().ref('proyectos/'+idProy); //actualizar numero de tareas
  proyecto.once('value').then( function(snapshot) {
    let datosProyecto = snapshot.val();
    tareasCompletadas = datosProyecto.tareasCompletadas;
    tareasCompletadas = tareasCompletadas+1;
    proyecto.update({ tareasCompletadas: tareasCompletadas });
  });
}
