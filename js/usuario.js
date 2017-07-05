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

function mostrarOrdenes() {
   $('#misOrdenes').show();
   let ordenes = firebase.database().ref('misOrdenes/'+usuarioLogeado);
    ordenes.on('value', function(snapshot) {
      let ordenes = snapshot.val();
      $('#tablaordenes tbody').empty();

      let i = 1;
      for (orden in ordenes) {

        if(ordenes[orden].asignado == usuarioLogeado) {
          var state;
          if(ordenes[orden].estado === "Pendiente"){
            state='<a class="dropdown-toggle" data-toggle="dropdown"><span style="background-color: #FF0000; width: 30px; height: 25px; border-radius: 15px;" class="badge"><span></a>';
          }
          if(ordenes[orden].estado === "En proceso"){
            state='<a class="dropdown-toggle" data-toggle="dropdown"><span style="background-color: #FFCC00; width: 30px; height: 25px;" border-radius: 15px; class="badge"><span></a>';
          }
          if(ordenes[orden].estado === "Listo"){
            state='<a class="dropdown-toggle" data-toggle="dropdown"><span style="background-color: #4CDD85; width: 30px; height: 25px;" border-radius: 15px; class="badge"><span></a>';
          }

          let tr = $('<tr/>');
          let td = '<td>' + i + '</td>' +
                    '<td>' + ordenes[orden].cliente + '</td>' +
                    '<td>' + ordenes[orden].descripcion + '</td>' +
                    '<td>' + ordenes[orden].fechaRecep + '</td>' +
                    '<td>' + ordenes[orden].fechaEntrega + '</td>';
          tr.append(td);
          let tdDrop = $('<td/>', {
            'class': 'dropdown'
          });
          tdDrop.append(state);
          let ul = $('<ul/>', {
            'class': 'dropdown-menu'
          });
          let li1 = $('<li/>');
          let a1 = $('<a/>', { 'onclick': 'marcarComoPendiente("'+orden+'")'});
          let span1 = $('<span/>', {
            'style': 'color: #FF0000;',
            'class': 'glyphicon glyphicon-exclamation-sign'
          });
          a1.append(span1).append(' Marcar como pendiente');
          li1.append(a1);

          let li2 = $('<li/>');
          let a2 = $('<a/>', { 'onclick': 'marcarComoEnProceso("'+orden+'")'});
          let span2 = $('<span/>', {
            'style': 'color: #FFCC00;',
            'class': 'glyphicon glyphicon-time'
          });
          a2.append(span2).append(' Marcar como en proceso');
          li2.append(a2);

          let li3 = $('<li/>');
          let a3 = $('<a/>', { 'onclick': 'marcarComoLista("'+orden+'")'});
          let span3 = $('<span/>', {
            'style': 'color: #4CDD85;',
            'class': 'glyphicon glyphicon-ok'
          });
          a3.append(span3).append(' Marcar como lista');
          li3.append(a3);

          let li4 = $('<li/>');
          let a4 = $('<a/>', { 'onclick': 'eliminarOrden("'+orden+'")'});
          let span4 = $('<span/>', {
            'class': 'icons glyphicon glyphicon-minus-sign'
          });
          a4.append(span4).append(' Eliminar orden');
          li4.append(a4);

          ul.append(li1).append(li2).append(li3).append(li4);

          tdDrop.append(ul);
          tr.append(tdDrop);
          tr.append('<td>' + ordenes[orden].encargado + '</td>');

          $('#tablaordenes tbody').append(tr);

          i++;
        }

        i = 1;
        state = "";
      }
    }, function(errorObject) {
      console.log("La lectura de las ordenes falló: " + errorObject.code);
    })
}

function misOrdenes() {
  $('#Semana').hide();
  mostrarOrdenes();
}

var usuarioLogeado;

function obtenerUsuario(uid) {
  let usuario = firebase.database().ref('usuarios/'+uid);
  usuario.on('value', function(snapshot) {
    let usuarioactual = snapshot.val();
    $('.nombreDeUsuario').html( usuarioactual.nombre + " " + usuarioactual.apellidos);
    let usuarioLogeado = usuarioactual.nombre + " " + usuarioactual.apellidos;
    userLogeado = usuarioLogeado;

    let not = firebase.database().ref('notificaciones/'+usuarioLogeado+'/notificaciones');
    not.on('value', function(datosNotificacion) {
      let notis = datosNotificacion.val();
      let row = "";
      for(noti in notis) {
        if(notis[noti].leida == false) {
          row += '<div class="notification">'+notis[noti].mensaje+'</div>';
        }
        else {
          row += '<div class="notification">'+notis[noti].mensaje+'</div>';
        }
      }

      $('#notificaciones').popover({ content: row, html: true});
      row = "";
    });

    let rutanot = firebase.database().ref('notificaciones/'+usuarioLogeado);
    rutanot.on('value', function(datosNotUsuario) {
      let NotUsuario = datosNotUsuario.val();
      let cont = NotUsuario.cont;

      if(cont > 0) {
        $('#spanNotificaciones').html(NotUsuario.cont).show();
      }
      else {
        $('#spanNotificaciones').hide();
      }
    });
  });
}

function leerNotificaciones() {
  let rutanot = firebase.database().ref('notificaciones/'+userLogeado);
  rutanot.update({cont: 0});
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

function completarTarea(idTarea, idProyecto) {
  var idTareaEnNodoTareas, datos;

  let nodoTareas = firebase.database().ref('tareas/');
  nodoTareas.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
    idTareaEnNodoTareas = snapshot.key;

    let tareasRef = firebase.database().ref('tareas/'+idTareaEnNodoTareas);
    tareasRef.on('value', function(daticos) {
      let tareas = daticos.val();
      datos = {
        idP: tareas.idP,
        asignado: tareas.asignado
      }
      let refMiSemana = firebase.database().ref('miSemana/'+tareas.asignado);
      refMiSemana.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
        firebase.database().ref('miSemana/'+datos.asignado+'/'+snapshot.key).update({ estado: "Completada"});
      });
    });

    firebase.database().ref('tareas/'+idTareaEnNodoTareas).update({ estado: "Completada" });
  });

  let tareasProyecto = firebase.database().ref('proyectos/'+idProyecto+'/tareas/');
  firebase.database().ref('proyectos/'+idProyecto+'/tareas/'+idTarea).update({ estado: "Completada" });

  var tareasCompletadas;
  let proyecto = firebase.database().ref('proyectos/'+idProyecto);
  proyecto.once('value').then( function(snapshot) {
    let datosProyecto = snapshot.val();
    tareasCompletadas = datosProyecto.tareasCompletadas;
    tareasCompletadas = tareasCompletadas+1;
    proyecto.update({ tareasCompletadas: tareasCompletadas });
  });
}
