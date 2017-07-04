function getQueryVariable(variable) {
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0; i < vars.length; i++) {
       var pair = vars[i].split("=");
       if(pair[0] == variable) {
           return pair[1];
       }
   }
   return false;
}

function obtenerUsuario(uid) {
  let usuario = firebase.database().ref('usuarios/'+uid);
  usuario.on('value', function(snapshot) {
    let usuarioactual = snapshot.val();
    $('.nombreDeUsuario').html( usuarioactual.nombre + " " + usuarioactual.apellidos);
  });
}

function editarTarea(idTarea) {
  console.log(idTarea);

  let tareas = firebase.database().ref('/tareas/'+idTarea);
  let nuevosDatos = {

  }

  //tareas.set(nuevosDatos);
}

function llenarCategorias() {
  let categorias = firebase.database().ref('/categorias');

  categorias.on('value', function(snapshot) {
    let categorias = snapshot.val();

    let options=""
    for(categoria in categorias) {
      options += '<option value="'+categorias[categoria].nombre+'">'+categorias[categoria].nombre+'</option>';
    }
    $('#categoria').empty().append(options);
  });
}

llenarCategorias();

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

function eliminarTarea(idTarea) {
  //Eliminar del nodo Tarea
  var idTareaEnNodoTareas, datos;
  var refMiSemana;
  let nodoTareas = firebase.database().ref('tareas/');
  nodoTareas.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
    idTareaEnNodoTareas = snapshot.key;

    let tareasRef = firebase.database().ref('tareas/'+idTareaEnNodoTareas);
    tareasRef.once('value', function(daticos) {
      let tareas = daticos.val();
      datos = {
        nombre: tareas.nombre,
        dia: tareas.dia,
        mes: tareas.mes,
        año: tareas.año,
        categoria: tareas.categoria,
        estado: tareas.estado,
        idP: tareas.idP,
        asignado: tareas.asignado,
        idTarea: tareas.idTarea
      }
      refMiSemana = firebase.database().ref('miSemana/'+tareas.asignado);
      refMiSemana.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
        refMiSemana.child(snapshot.key).remove();
      });
    });

    let historial = firebase.database().ref('historial/tareas/'+idTarea); //mandar a historial
    historial.set(datos);
    nodoTareas.child(snapshot.key).remove();
  });

  //let refMiSemana = firebase.database().ref('miSemana/'+datos.asignado);

  let idProyecto = getQueryVariable('id');
  let tareasProyecto = firebase.database().ref('proyectos/'+idProyecto+'/tareas/'); //Eliminar del nodo tareas del proyecto
  tareasProyecto.child(idTarea).remove();

  var numTareas;
  let proyecto = firebase.database().ref('proyectos/'+idProyecto); //actualizar numero de tareas
  proyecto.once('value').then( function(snapshot) {
    let datosProyecto = snapshot.val();
    numTareas = datosProyecto.numtareas;
    numTareas = numTareas-1;
    proyecto.update({numtareas: numTareas});
  });
}

function completarTarea(idTarea) {
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

  let idProyecto = getQueryVariable('id');
  let tareasProyecto = firebase.database().ref('proyectos/'+idProyecto+'/tareas/'); //Eliminar del nodo tareas del proyecto
  firebase.database().ref('proyectos/'+idProyecto+'/tareas/'+idTarea).update({ estado: "Completada" });

  var tareasCompletadas;
  let proyecto = firebase.database().ref('proyectos/'+idProyecto); //actualizar numero de tareas
  proyecto.once('value').then( function(snapshot) {
    let datosProyecto = snapshot.val();
    tareasCompletadas = datosProyecto.tareasCompletadas;
    tareasCompletadas = tareasCompletadas+1;
    proyecto.update({ tareasCompletadas: tareasCompletadas });
  });
}

$('#nombreNuevoTarea').keyup(function () {
  let nombreNuevoTarea = $('#nombreNuevoTarea').val();
  if(nombreNuevoTarea.length < 1) {
    $('#nombreNuevoTarea').parent().addClass('has-error');
    $('#helpblocknombreNuevoTarea').empty().html("Este campo es requerido").show();
  }
  else {
    $('#nombreNuevoTarea').parent().removeClass('has-error');
    $('#helpblocknombreNuevoTarea').hide();
  }
});

$('#fechaInicioEditarTarea').keyup(function () {
  let fechaInicioEditarTarea = $('#fechaInicioEditarTarea').val();
  if(fechaInicioEditarTarea.length < 1) {
    $('#fechaInicioEditarTarea').parent().parent().addClass('has-error');
    $('#helpblockfechaInicioEditarTarea').empty().html("Este campo es requerido").show();
  }
  else {
    $('#fechaInicioEditarTarea').parent().parent().removeClass('has-error');
    $('#helpblockfechaInicioEditarTarea').hide();
  }
});

function editarTarea(idTarea, asignado, idP) {
  $('#btnActualizarTarea').attr({'data-id': idTarea, 'data-asignado': asignado, 'data-idP': idP});
  $('#modalEditarTarea').modal('show');

  let tareas = firebase.database().ref('proyectos/'+idProyecto+'/tareas/'+idTarea);
  tareas.once('value', function(snapshot) {
    let datos = snapshot.val();
    let nombre = datos.nombre;
    let dia = datos.dia;
    let mes = datos.mes;
    let año = datos.año;
    let date = new Date(año, mes, dia);
    fecha = moment(date).format('MM/DD/YYYY');

    $('#nombreNuevoTarea').val(nombre).focus();
    $('#fechaInicioEditarTarea').val(fecha);
  });
}

function actualizarTarea() {
  let idTarea = $('#btnActualizarTarea').attr('data-id');
  let asignado = $('#btnActualizarTarea').attr('data-asignado');
  let idProyecto = $('#btnActualizarTarea').attr('data-idP');

  let nombreNuevo = $('#nombreNuevoTarea').val();
  let fechaInicioEditarTarea = $('#fechaInicioEditarTarea').val();

  if(nombreNuevo.length > 0 && fechaInicioEditarTarea.length > 0) {
    let date = new Date(fechaInicioEditarTarea);
    let dia = date.getDate();
    let mes = date.getMonth();
    let año = date.getFullYear();

    let tareasProyecto = firebase.database().ref('proyectos/'+idProyecto+'/tareas/'+idTarea);
    tareasProyecto.update({nombre: nombreNuevo, dia:dia, mes:mes, año:año});

    let tareas = firebase.database().ref('tareas/');
    tareas.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
      let idTareaEnNodoTareas = snapshot.key;
      let rutaTareas = firebase.database().ref('tareas/'+idTareaEnNodoTareas);
      rutaTareas.update({nombre: nombreNuevo, dia:dia, mes:mes, año:año});
    });

    let miSemana = firebase.database().ref('miSemana/'+asignado);
    miSemana.orderByChild("idTarea").equalTo(idTarea).on("child_added", function(snapshot) {
      let idTareaEnMiSemana = snapshot.key;
      let rutaMiSemana = firebase.database().ref('miSemana/'+asignado+'/'+idTareaEnMiSemana);
      rutaMiSemana.update({nombre: nombreNuevo, dia:dia, mes:mes, año:año});
    });
  }
  else {
    if(nombreNuevo.length < 1) {
      $('#nombreNuevoTarea').parent().addClass('has-error');
      $('#helpblocknombreNuevoTarea').empty().html("Este campo es requerido").show();
    }
    else {
      $('#nombreNuevoTarea').parent().removeClass('has-error');
      $('#helpblocknombreNuevoTarea').hide();
    }
    if(fechaInicioEditarTarea.length < 1) {
      $('#fechaInicioEditarTarea').parent().parent().addClass('has-error');
      $('#helpblockfechaInicioEditarTarea').empty().html("Este campo es requerido").show();
    }
    else {
      $('#fechaInicioEditarTarea').parent().parent().removeClass('has-error');
      $('#helpblockfechaInicioEditarTarea').hide();
    }
  }
}

//checa si hay un usuario actualmente logeado
function haySesion() {
  firebase.auth().onAuthStateChanged(function (user) {
    //si hay un usuario
    if (user) {
      //obtiene el usuario actual
      var user = firebase.auth().currentUser;
      var uid = user.uid;

      obtenerUsuario(uid);
      $('[data-toggle="tooltip"]').tooltip();
    }
    else {
      $(location).attr("href", "index.html");
    }
  })
}

haySesion();

function cerrarModalUsuario() {
  $('#agregarUsuario').modal('hide');

  $('#nombre').val('');
  $('#apellidos').val('');
  $('#agregarUsuarioEmail').val('');
  $('#agregarUsuarioPuesto').val('');
  $('#nuevacontrasena').val('');
  $('#confirmarcontrasena').val('');
}

function cerrarModalOrden() {
  $('#agregarOrden').modal('hide');
  $('#cliente').val('');
  $('#descripcion').val('');
  $('#fechaEntrega').val('');
  $('#encargado').val('');
}

function cerrarModalProyecto() {
  $('#agregarProyecto').modal('hide');
  $('#nombreProyecto').val('');
  $('#fechaInicio').val('');
  $('#fechaEntrega').val('');
  $('#encargadoProyecto').val('');
  $('#estructuraProyecto').val('');
  $('#descripcionProyecto').val('');
  $('#documentacion').val('');
  $('#input-agregarObjetivo').val('');
  $('#input-agregarIndicador').val('');
  $('#input-agregarHito').val('');
  $('#input-agregarIntegrante').val('');
  $('#input-agregarTarea').val('');
  $('#select-categorias').val('');
  $('#asignado').val('');
  $('#fechaInicioTarea').val('');
  $('#contenedorModalTareas').empty();

  $('.chip-hitos').remove();
  $('.chip-objetivos').remove();

  objInc = 1;
  indInc = 1;
  hitoInc = 1;
  intInc = 1;
  tareaInc = 1;
  numtareas = 0;

  arrObjetivos = [];
  arrIndicadores = [];
  arrHitos = [];
  arrIntegrantes = [];
  arrTareas = [];
}

$('#tabordenes').on('shown.bs.tab', function (e) {
  e.target // newly activated tab
  e.relatedTarget // previous active tab
  mostrarOrdenes();
});

$('#tabproyectos').on('shown.bs.tab', function (e) {
  e.target // newly activated tab
  e.relatedTarget // previous active tab

  mostrarProyectos();
});

//cierra la sesion de firebase
function logOut() {
  firebase.auth().signOut();
}

//muestra la modal para Crear un Usuario
function modalUsuario() {
  $("#agregarUsuario").modal();
}

//muestra la modal para Crear una Orden
function modalOrden() {
  $("#agregarOrden").modal();
}

//muestra la modal para Crear un Proyecto
function modalProyecto() {
  $('#agregarProyecto').modal();
}

//metodo que guarda una nueva orden en Firebase
function guardarOrden() {
  let cliente = $('#cliente').val();
  let descripcion = $('#descripcion').val();
  let fechaRecep = moment().format('DD/MM/YYYY');
  let fechaEntrega = $('#fechaEntrega').val();
  let estado = "Pendiente";
  let encargado = $('#encargado').val();

  let ordenes = firebase.database().ref('ordenes/');
  let Orden = {
    cliente: cliente,
    descripcion: descripcion,
    fechaRecep: fechaRecep,
    fechaEntrega: fechaEntrega,
    estado: estado,
    encargado: encargado
  }

  ordenes.push().set(Orden); //inserta en firebase asignando un id autogenerado por la plataforma
  cerrarModalOrden();
}

//guarda un nuevo Usuario en la base de datos de Firebase en el nodo Usuarios
function guardarUsuario() {
  let nombre = $('#nombre').val();
  let apellidos = $('#apellidos').val();
  let agregarUsuarioEmail = $('#agregarUsuarioEmail').val();
  let agregarUsuarioPuesto = $('#agregarUsuarioPuesto').val();
  var agregarUsuarioContrasena;

  if($('#nuevacontrasena').val() == $('#confirmarcontrasena').val()) {
    agregarUsuarioContrasena = $('#nuevacontrasena').val();

    firebase.auth().createUserWithEmailAndPassword(agregarUsuarioEmail, agregarUsuarioContrasena)
    .then(function(data) {
      console.log(data);
      let uid = data.uid;
      console.log(uid);

      let usuarios = firebase.database().ref('usuarios/'+uid);
      let Usuario = {
        nombre: nombre,
        apellidos: apellidos,
        puesto: agregarUsuarioPuesto
      }
      usuarios.set(Usuario); //metodo set para insertar de Firebase

    })
    .catch(function(error) {
      console.log(error);
    });
    cerrarModalUsuario();

    logOut();
  }
  else {
    console.log("Las contraseñas no coinciden");
  }
}

var arrIntegrantes = [];
var intInc = 1;
//introduce los integrantes del equipo a un arreglo
function agregarIntegrante() {
  let integrante = $('#input-agregarIntegrante').val();

  let id = 'integrante-'+intInc;

  let $div = $('<div/>', {
    'class': 'chip-hitos',
    'id': id
  });

  let $span = $('<span/>', {
    'class': 'glyphicon glyphicon-remove',
    'onclick': 'eliminarIntegrante("'+id+'")',
    'style': 'font-size: 15px; float: right; color: #D6D6D6;'
  })
  $div.append($span);
  $div.append(integrante);
  arrIntegrantes.push(integrante);
  $('#contenedorModalIntegrantes').append($div);
  intInc++;

  $('#input-agregarIntegrante').val('').focus();

  $('#asignado').autocomplete({
    lookup: arrIntegrantes,
    onSelect: function (suggestion) {
      var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
      $('#outputcontent').html(thehtml);
    }
  });
}

function eliminarIntegrante(id) {
  $('#'+id).remove();
}

var numtareas = 0;
var arrTareas = [];
var tareaInc = 1;
//atrapa las tareas que se asignan a un proyecto
function agregarTarea() {
  let nombre = $('#input-agregarTarea').val();
  let categoria = $('#select-categorias').val();
  let asignado = $('#asignado').val();
  let estado = "Pendiente";
  let fecha = $('#fechaInicioTarea').val();
  let date = new Date(fecha);
  let dia = date.getDate();
  let mes = date.getMonth();
  let año = date.getFullYear();

  let tarea = {
    nombre: nombre,
    año: año,
    mes: mes,
    dia: dia,
    categoria: categoria,
    asignado: asignado,
    estado: estado,
  }

  arrTareas.push(tarea);
  numtareas++;

  let id = 'tarea-'+tareaInc;

  let $div = $('<div/>', {
    'class': 'chip-hitos',
    'id': id
  });

  let $span = $('<span/>', {
    'class': 'glyphicon glyphicon-remove',
    'onclick': 'borrarTarea("'+id+'")',
    'style': 'font-size: 15px; float: right; color: #D6D6D6;'
  })
  $div.append($span);
  $div.append(nombre);
  $('#contenedorModalTareas').append($div);
  tareaInc++;

  $('#input-agregarTarea').val('').focus();
  $('#asignado').val('');
  $('#select-categorias').val('');
  $('#fechaInicioTarea').val('');
  $('#contadorTarea').html('0/60');
}

function borrarTarea(id) {
  $('#'+id).remove();
}

var objInc = 1;
var arrObjetivos = [];

function agregarObjetivo() {
  let objetivo = $('#input-agregarObjetivo').val();
  let id = 'objetivo-'+objInc;

  let $div = $('<div/>', {
    'class': 'chip-objetivos',
    'id': id
  });

  let $span = $('<span/>', {
    'class': 'glyphicon glyphicon-remove',
    'onclick': 'eliminarObjetivo("'+id+'")',
    'style': 'font-size: 15px; float: right; color: #D6D6D6;'
  })
  $div.append($span);
  $div.append(objetivo);
  arrObjetivos.push(objetivo);
  $('#contenedorModalObjetivos').append($div);
  objInc++;

  $('#input-agregarObjetivo').val('').focus();
  $('#contadorObjetivo').html('0/140');
}

function eliminarObjetivo(id) {
  $('#'+id).remove();
}

var indInc = 1;
var arrIndicadores = [];

function agregarIndicador() {
  let indicador = $('#input-agregarIndicador').val();
  let id = 'indicador-'+indInc;

  let $div = $('<div/>', {
    'class': 'chip-objetivos',
    'id': id
  });

  let $span = $('<span/>', {
    'class': 'glyphicon glyphicon-remove',
    'onclick': 'eliminarIndicador("'+id+'")',
    'style': 'font-size: 15px; float: right; color: #D6D6D6;'
  })
  $div.append($span);
  $div.append(indicador);
  arrIndicadores.push(indicador);
  $('#contenedorModalIndicadores').append($div);
  indInc++;

  $('#input-agregarIndicador').val('').focus();
  $('#contadorIndicador').html('0/140');
}

function eliminarIndicador(id) {
  $('#'+id).remove();
}

var hitoInc = 1;
var arrHitos = [];

function agregarHito() {
  let hito = $('#input-agregarHito').val();
  let id = 'indicador-'+hitoInc;

  let $div = $('<div/>', {
    'class': 'chip-hitos',
    'id': id
  });

  let $span = $('<span/>', {
    'class': 'glyphicon glyphicon-remove',
    'onclick': 'eliminarIndicador("'+id+'")',
    'style': 'font-size: 15px; float: right; color: #D6D6D6;'
  })
  $div.append($span);
  $div.append(hito);
  arrHitos.push(hito);
  $('#contenedorModalHitos').append($div);
  hitoInc++;

  $('#input-agregarHito').val('').focus();
  $('#contadorHito').html('0/140');
}

function eliminarHito(id) {
  $('#'+id).remove();
}

//crear un proyecto nuevo en la base de datos de Firebase en el nodo Proyectos
function guardarProyecto() {
  let nombreProyecto = $('#nombreProyecto').val();
  let fechaInicio = $('#fechaInicio').val();
  let fechaEntrega = $('#fechaEntregaProyecto').val();
  let encargadoProyecto = $('#encargadoProyecto').val();
  let estructuraProyecto = $('#estructuraProyecto').val();
  let descripcionProyecto = $('#descripcionProyecto').val();
  let documentacion = $('#documentacion').val();
  let objetivos = arrObjetivos;
  let indicadores = arrIndicadores;
  let hitos = arrHitos;
  let integrantes = arrIntegrantes;
  let tareas = arrTareas;

  var db = firebase.database();
  let proyectos = db.ref('proyectos/');
  let Proyecto = {
    nombre: nombreProyecto,
    numTareas: numtareas,
    tareasCompletadas: 0,
    fechaInicio: fechaInicio,
    fechaEntrega: fechaEntrega,
    encargado: encargadoProyecto,
    estructura: estructuraProyecto,
    descripcion: descripcionProyecto,
    documentacion: documentacion,
    objetivos: objetivos,
    indicadores: indicadores,
    hitos: hitos,
    equipo: integrantes
  }
  var proyectoId = proyectos.push(Proyecto).getKey();
  let tareasRef = db.ref('tareas/');
  let proyectoTareasRef = db.ref('proyectos/'+proyectoId+'/tareas/');

  for(let i=0; i<tareas.length; i++) {
    tareas[i].idP = proyectoId;
    let tareaId = proyectoTareasRef.push(tareas[i]).getKey();
    tareas[i].idTarea = tareaId;
    tareasRef.push(tareas[i]);

    for(let j=0; j<integrantes.length; j++) {
      if(integrantes[j] == tareas[i].asignado) {
        let miSemana = db.ref('miSemana/'+integrantes[j]);
        miSemana.push(tareas[i]);
      }
    }
  }

  cerrarModalProyecto();
}

$('#datetimepicker1').datepicker({
  startDate: "Today",
  format: "dd/mm/yyyy",
  autoclose: true,
  todayHighlight: true
});

$('#datetimepickerFechaInicio').datepicker({ //Inicializa el datepicker de FechaInico
  startDate: "Today",
  autoclose: true,
  format: "dd/mm/yyyy",
  todayHighlight: true
});

$('#datetimepickerFechaEntrega').datepicker({ //Inicializa el datepicker de FechaEntrega
  startDate: "Today",
  autoclose: true,
  format: "dd/mm/yyyy",
  todayHighlight: true
});

$('#datetimepickerFechaInicioTarea').datepicker({ //Inicializa el datepicker de FechaEntrega
  startDate: "Today",
  autoclose: true,
  format: "mm/dd/yyyy",
  todayHighlight: true
});

$('#datetimepickerFechaInicioHito').datepicker({ //Inicializa el datepicker de FechaEntrega
  startDate: "Today",
  autoclose: true,
  format: "mm/dd/yyyy",
  todayHighlight: true
});

$('#datetimepickerFechaInicioEditarTarea').datepicker({ //Inicializa el datepicker de FechaEntrega
  startDate: "Today",
  autoclose: true,
  format: "mm/dd/yyyy",
  todayHighlight: true
});

//Te regresa un paso en el carousel de la modal Crear Proyecto
function volver() {
  $('#carousel-proyecto').carousel('prev');
  $('#carousel-proyecto').carousel('pause');
}

//Te avanza un paso en el carousel de la modal Crear Proyecto
function siguiente() {
  $('#carousel-proyecto').carousel('next');
  $('#carousel-proyecto').carousel('pause');
}
