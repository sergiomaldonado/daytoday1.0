<?php

  $id = $_GET["id"];
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title id="titleProyecto"></title>
    <link rel="stylesheet" type="text/css" media="all" href="css/styleAutocomplete.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
    <link href="vendor/magnific-popup/magnific-popup.css" rel="stylesheet">
    <link href="css/creative.min.css" rel="stylesheet">
    <link href="css/creative.css" rel="stylesheet">
    <link rel="stylesheet" href="css/bootstrap-datepicker3.css">
    <link rel="stylesheet" href="css/bootstrap-datepicker3.standalone.css">
    <link rel="stylesheet" type="text/css" media="all" href="css/jquery.minicolors.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/proyecto.css">
    <link rel="stylesheet" href="css/stylesCalendar.css">
    <script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link href='assets/logo1.ico' rel='shortcut icon' type='image/x-icon'/>
  </head>
  <body>
    <nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div  class="navbar-header">
          <button style="border:solid 1px #FF6700;" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span> Menu <i class="glyphicon glyphicon-triangle-bottom"></i>
          </button>
          <a ><img id="logo" class="navbar-brand page-scroll" src="assets/logo1.svg"></a>
        </div>
        <div class="collapse navbar-collapse"  id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li><a style="height:55px; width:40px; margin-right:10px;" data-toggle="tooltip"  data-placement="bottom" title="Agregar orden" onclick="modalOrden()" class="page-scroll"><img src="assets/ico-1.svg" height="40px" alt=""></a></li>
            <li><a style="height:55px; width:40px; margin-right:10px; " data-toggle="tooltip"  data-placement="bottom" title="Agregar proyecto" onclick="modalProyecto()" class="page-scroll"><img height="40px" src="assets/ico-2.svg" alt=""></a></li>
            <li><a style="height:55px; width:40px; margin-right:10px; " data-toggle="tooltip"  data-placement="bottom" title="Agregar usuario" onclick="modalUsuario()" class="page-scroll"><img height="40px" src="assets/ico-3.svg" alt=""></a></li>
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown"><span style="margin-top:10px;" class="glyphicon glyphicon-menu-hamburger"></span></a>
              <ul class="dropdown-menu">
                <li><a ><span class="icons glyphicon glyphicon-user"></span> Mi perfil</a></li>
                <li><a ><span class="icons glyphicon glyphicon-cog"></span> Ajustes</a></li>
                <li><a onclick="logOut()"><span class="icons glyphicon glyphicon-log-out"></span> Cerrar sesión</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
      <section id="panel-admin" style="margin-top:50px;">
        <div>
          <div class="container">
            <div class="row">
              <div class="col-lg-2 col-md-2" style="float:left;">
                <div class="row">
                  <div class="col-sm-6 col-md-4">
                    <div id="imagenUsuario" style="width:150px; overflow:hidden;" class="thumbnail no-padding" >
                      <img src="assets/bg-panel.png" alt="...">
                      <img style="margin-top:-40px;" width="80px"src="http://lorempixel.com/400/400/" alt="..." class="img-circle">
                      <div class="caption">
                        <h4 class="nombreDeUsuario"></h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="no-padding col-lg-10 col-md-11" style="margin-top:0px; ">
                <div class="no-padding col-lg-12 col-md-12" style="margin-top:-30px; ">
                  <div style="padding-top:30px;" class="live-box">
                    <h2 id="TituloProyecto"></h2><hr>
                  </div>
                </div>
                <input id="idProyecto" style="display: none;" value="<?php echo $id; ?>"/>
                <div style="padding-top:30px;" class="live-box">
                  <ul class="nav nav-tabs">
                    <li class="active"><a id="tabsemana" href="#m1" data-toggle="tab">Tareas de Proyecto</a></li>
                    <li><a id="tabordenes" id="tabbrief" href="#m2" data-toggle="tab">Brief del Proyecto</a></li>
                  </ul>
                  <!-- Tab Semana-->
                  <div class="tab-content" style="padding-top:20px;">
                    <div class="tab-pane fade in active" id="m1">
                      <div class="row">
                        <div>
                          <div>
                            <div style="" class="col-xs-12 col-sm-12">
                              <div class="table-responsive no-padding">
                                <div class="panel panel-default no-padding" style="border:solid 1px white;">
                                  <div class="panel-body no-padding">
                                    <p>Categorías</p>
                                    <ul id="listaCategorias">
                                  </div>
                                  <div id='holder' class="row" ></div>
                                </div>
                              </div>
                            </div>
                            <div style="" class="col-xs-8 col-sm-6">
                              <div class="item">
                                <form role="form" class="form-horizontal">
                                  <div class="form-group">
                                    <div class="col-md-12">
                                      <input id="tarea" type="text" class="form-control input-lg" required placeholder="Tarea">
                                      <p style="float: right;" id="contadorTaComentario">0/60</p>
                                      <input style="transform: translate(0px, -22px);" type="text" name="currency" class="form-control input-lg" id="asignado" placeholder="Asignada a">
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div style="" class="col-xs-8 col-sm-6">
                              <div class="item">
                                <form role="form" class="form-horizontal">
                                  <div class="form-group">
                                    <div class="col-md-12">
                                      <input id="categoria" type="text" class="form-control input-lg" placeholder="Categoría">
                                      <div style="margin-top:20px;" class="input-group date" id='datetimepickerFechaInicio' >
                                        <input id="fechaInicio" type="text" class="form-control input-lg" placeholder="Inicio">
                                         <div class="input-group-addon">
                                          <span class="glyphicon glyphicon-calendar"></span>
                                         </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                              <div style="" class="col-xs-8 col-sm-6">
                               <div class="form-group">
                                 <div class="col-md-6">
                                 </div>
                                  <div style="margin-top:15px;" class="col-md-6">
                                  </div>
                                </div>
                              </div>
                              <div stylw="margin-top:10px;" class="form-group">
                                <button  onclick="agregarTareaProyecto()" class="btn btn-lg" style="background-color: #7BD500;" type="button" name="button"><span class="glyphicon glyphicon-plus"></span></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Tab Brief-->
                    <div class="tab-pane fade" style="padding-top:0px;" id="m2">
                      <div class="row">
                        <div style="" class="col-xs-8 col-sm-6">
                          <h3 class="text-left">Encargado del Proyecto:<span id="text-brief"> Nombre del encargado</span></h3>
                        </div>
                        <div style="" class="col-xs-8 col-sm-6">
                          <h3 class="text-left" style="font-weight:bold;">Equipo del Proyecto: <span id="text-brief"> Nombre del encargado</span></h3>
                        </div>
                        <div style="" class="col-xs-12 col-sm-12">
                          <h3 class="text-left" style="font-weight:bold;">Descripcion del proyecto: <span id="text-brief-coment">¿De que se trata el proyecto?</span></h3>
                          <div>
                            <p class="text-left">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original.</p>
                          </div>
                        </div>
                        <div style="" class="col-xs-12 col-sm-12">
                          <h3 class="text-left" style="font-weight:bold;">Objetivos del proyecto: <span id="text-brief-coment">¿Que se quiere lograr?</span></h3>
                          <div>
                            <ul class="text-left">
                              <li>Objetivo 1</li>
                              <li>Objetivo 2</li>
                              <li>Objetivo 3</li>
                            </ul>
                          </div>
                        </div>
                        <div style="" class="col-xs-12 col-sm-12">
                          <h3 class="text-left" style="font-weight:bold;">Estructura del proyecto: <span id="text-brief-coment">¿Como se va a llevar acabo el proyecto? Pasos para realizar el proyecto.</span></h3>
                          <div>
                          </div>
                        </div>
                        <div style="" class="col-xs-12 col-sm-12">
                          <div>
                            <h3 class="text-left" style="font-weight:bold;">Documentación: <span id="text-brief-coment">Documentos necesarios para el proyecto.</span></h3>
                          </div>
                        </div>
                        <div style="" class="col-xs-12 col-sm-12">
                          <div>
                            <h3 class="text-left" style="font-weight:bold;">Tiempos de entrega: <span id="text-brief-coment">Fecha de entrega y estimado de duracion del proyecto.</span></h3>
                            <ul class="text-left">
                              <li>fecha 1</li>
                              <li id="hito"><span class="glyphicon glyphicon-star"></span>Fecha 2</li>
                              <li>fecha 3</li>
                            </ul>
                          </div>
                        </div>
                        <div style="" class="col-xs-12 col-sm-12">
                          <div>
                            <h3 class="text-left" style="font-weight:bold;">Entregables: <span id="text-brief-coment">¿Que es lo que vamos a entregar una ves finalizado el proyecto?</span></h3>
                            <ul class="text-left">
                              <li>Entregable 1</li>
                              <li>Entregable 2</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal agregar Orden -->
        <div data-keyboard="false" data-backdrop="static" id="agregarOrden" class="modal fade" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" style="font-size:40px;">&times;</span></button>
                <h4 class="modal-title">Agregar una orden</h4>
              </div>
              <div class="modal-body">
                <form role="form" id="form">
                  <div class="form-group">
                    <input id="cliente" type="text" name="" class="form-control input-lg" value="" placeholder="¿Para que cliente es esta orden?" required>
                  </div>
                  <div class="form-group">
                    <textarea id="descripcion" class="form-control input-lg" rows="5" placeholder="¿De qué trata esta orden?"></textarea>
                  </div>
                  <div class="form-group">
                    <div class="input-group date" id='datetimepicker1'>
                      <input id="fechaEntrega" type="text" class="form-control input-lg" placeholder="¿Que día tenemos que entregar esta orden?">
                      <div class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <input id="encargado" type="text" name="" class="form-control input-lg" value="" placeholder="¿Quién se encarga esta orden?" required>
                  </div>
                </form>
                  <!-- <input id="cliente" type="text" name="" class="form-control input-lg" value="" placeholder="¿Para que cliente es esta orden?" required><br>
                  <textarea id="descripcion" class="form-control input-lg" rows="5" placeholder="¿De qué trata esta orden?"></textarea><br>
                  <input id="cliente" type="text" name="" class="form-control input-lg" value="" placeholder="¿Para que cliente es esta orden?" required><br>
                  <input id="fechaEntrega" type="text" class="form-control input-lg" placeholder="¿Que día tenemos que entregar esta orden?" data-provide="datepicker"><br>
                  <input id="encargado" type="text" name="" class="form-control input-lg" value="" placeholder="¿Quién se encarga esta orden?" required><br> -->
              </div>
              <div class="modal-footer">
                <button onclick="guardarOrden()" id="guardarOrden" type="button" class="btns btn-siguiente">Guardar</button><br>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!--Modal Agregar Proyecto-->
        <div data-keyboard="false" data-backdrop="static" id="agregarProyecto" data-keyboard="false" data-backdrop="static" class="modal fade" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg" role="document">
            <div style="min-height:400px;" class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" style="font-size:40px;">&times;</span></button>
                <h2 class="modal-title text-left">Nuevo proyecto</h2>
              </div>
              <div class="modal-body">
                <div id="carousel-proyecto" class="carousel slide">
                  <!-- Wrapper for slides -->
                  <div class="carousel-inner" role="listbox">
                    <div style="margin-top:-20px;" class="item active">
                      <h3 class="text-left">Brief del proyecto</h3>
                      <form role="form" class="form-horizontal">
                        <div class="form-group">
                          <div class="col-md-6">
                            <input id="nombreProyecto" type="text" class="form-control input-lg" placeholder="¿Cuál es el nombre de este proyecto?">
                          </div>
                          <div class="col-md-3">
                            <div class="input-group date" id='datetimepickerFechaInicio'>
                              <input id="fechaInicio" type="text" class="form-control input-lg" placeholder="Inicio">
                              <div class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="input-group date" id='datetimepickerFechaEntrega'>
                              <input id="fechaEntrega" type="text" class="form-control input-lg" placeholder="Entrega">
                              <div class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-6">
                            <input id="encargadoProyecto" type="text" class="form-control input-lg" placeholder="¿Quién será el encargado?">
                          </div>
                          <div class="col-md-6">
                            <input id="estructuraProyecto" type="text" class="form-control input-lg" placeholder="Estructura del proyecto">
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-6">
                            <textarea id="descripcionProyecto" class="form-control input-lg" rows="4" placeholder="¿De qué trata el proyecto?"></textarea>
                          </div>
                          <div class="col-md-6" class="text-left">
                            <input id="documentacion" type="text" class="form-control input-lg" placeholder="Documentación"><br>
                          </div>
                        </div>
                      </form>
                      <button onclick="siguiente()" type="button" style="float:right;" class="btns btn-siguiente">Siguiente <span style="transform:translate(0px, 2px);" aria-hidden="true"class="glyphicon glyphicon-menu-right"></span></button>
                    </div>
                    <div class="item">
                      <form role="form" class="form-horizontal">
                        <div class="form-group">
                          <div id="contenedorModalObjetivos" class="col-md-6 text-left">
                            <label><h3>¿Qué se quiere lograr?</h3></label>
                            <div class="input-group">
                              <input id="input-agregarObjetivo" type="text" class="form-control input-lg" placeholder="Agrega objetivos al proyecto">
                              <span class="input-group-btn">
                                <button onclick="agregarObjetivo()" class="btn btn-default input-lg" type="button"><span class="glyphicon glyphicon-plus"></span></button>
                                <p style="" id="contadorObjetivo">0/140</p>
                              </span>
                            </div>
                          </div>
                          <div id="contenedorModalIndicadores" class="col-md-6 text-left">
                            <label><h3>Indicadores</h3></label>
                            <div class="input-group">
                              <input id="input-agregarIndicador" type="text" class="form-control input-lg" placeholder="Hazlo medible, agrega un indicador">
                              <span class="input-group-btn">
                                <button onclick="agregarIndicador()" class="btn btn-default input-lg" type="button"><span class="glyphicon glyphicon-plus"></span></button>
                                <p style="" id="contadorIndicador">0/140</p>
                              </span>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div  class="modal-footer">
                      <button onclick="volver()" type="button" style="float:left;" class="btns btn-volver"><span style="transform:translate(0px, 2px);" aria-hidden="true"class="glyphicon glyphicon-menu-left"></span>Volver</button>
                      <button onclick="siguiente()" type="button" style="float:right;" class="btns btn-siguiente">Siguiente <span style="transform:translate(0px, 2px);" aria-hidden="true"class="glyphicon glyphicon-menu-right"></span></button>
                    </div>
                  </div>
                  <div class="item">
                    <form id="contenedorModalHitos" role="form" class="form-horizontal text-left">
                      <label><h3>Hitos</h3></label>
                      <div class="input-group">
                        <input id="input-agregarHito" type="text" class="form-control input-lg" placeholder="Añade fechas importantes como entregas, reuniones, dead lines etc.">
                        <span class="input-group-btn">
                          <button onclick="agregarHito()" class="btn btn-default input-lg" type="button"><span class="glyphicon glyphicon-plus"></span></button>
                          <p style="" id="contadorHito">0/140</p>
                        </span>
                      </div>

                    </form>
                    <div style="margin-top:150px;" class="modal-footer">
                      <button onclick="volver()" type="button" style="float:left;" class="btns btn-volver"><span class="glyphicon glyphicon-menu-left"></span> Volver</button>
                      <button onclick="siguiente()" type="button" style="float:right;" class="btns btn-siguiente">Siguiente <span class="glyphicon glyphicon-menu-right"></span></button>
                    </div>
                  </div>
                  <div class="item"><!--      FORMA EL EQUIPO     -->
                    <h3>Forma el equipo</h3>
                    <div id="searchfield">
                      <form role="form" class="form-horizontal" id="contenedorModalIntegrantes">
                        <div class="form-group">
                          <div class="col-md-12">
                            <div class="input-group">
                              <input id="input-agregarIntegrante" type="text" name="currency" id="integrante" class="form-control input-lg" placeholder="Añade un integrante a tu equipo">
                              <span class="input-group-btn">
                                <button onclick="agregarIntegrante()" class="btn btn-default input-lg btn-secondary" type="button"><span class="glyphicon glyphicon-plus"></span></button>
                              </span>
                            </div>

                          </div>
                        </div>
                      </form>
                    </div>
                    <div style="margin-top:50px;" class="modal-footer">
                      <button onclick="volver()" type="button" style="float:left;" class="btns btn-volver"><span class="glyphicon glyphicon-menu-left"></span> Volver</button>
                      <button onclick="siguiente()" type="button" style="float:right;" class="btns btn-siguiente">Siguiente <span class="glyphicon glyphicon-menu-right"></span></button>
                    </div>
                  </div>
                  <div class="item">
                    <h3>Agrega tareas al proyecto</h3>
                    <div style="" class="col-xs-8 col-sm-6">
                      <div class="item">
                        <form role="form" class="form-horizontal">
                          <div class="form-group">
                            <div class="col-md-12">
                              <input id="tarea" type="text" class="form-control input-lg" required placeholder="Tarea">
                              <p style="float: right;" id="contadorTaComentario">0/60</p>
                              <input style="transform: translate(0px, -22px);" type="text" name="currency" class="form-control input-lg" id="asignado" placeholder="Asignada a">
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div style="" class="col-xs-8 col-sm-6">
                      <div class="item">
                        <form role="form" class="form-horizontal">
                          <div class="form-group">
                            <div class="col-md-12">
                              <input id="categoria" type="text" class="form-control input-lg" placeholder="Categoría">
                              <div style="margin-top:20px;" class="input-group date" id='datetimepickerFechaInicio' >
                                <input id="fechaInicio" type="text" class="form-control input-lg" placeholder="Inicio">
                                 <div class="input-group-addon">
                                  <span class="glyphicon glyphicon-calendar"></span>
                                 </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div style="" class="col-xs-8 col-sm-6">
                      <div class="form-group">
                        <div class="col-md-6">
                        </div>
                        <div style="margin-top:15px;" class="col-md-6">
                        </div>
                      </div>
                    </div>
                    <div stylw="margin-top:10px;" class="form-group">
                      <button  onclick="agregarTareaProyecto()" class="btn btn-lg" style="background-color: #7BD500;" type="button" name="button"><span class="glyphicon glyphicon-plus"></span></button>
                    </div>
                    Tareas
                    <hr style="">
                    <div class="modal-footer">
                      <button onclick="volver()" style="float:left;" type="button" class="btns btn-volver"><span class="glyphicon glyphicon-menu-left"></span> Volver</button>
                      <button onclick="guardar()" style="float:right;" type="button" class="btns btn-siguiente">Guardar <span class="glyphicon glyphicon-floppy-disk"></span></button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
        <div data-keyboard="false" data-backdrop="static" id="agregarUsuario" class="modal fade" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" onclick="cerrarModalUsuario()"><span aria-hidden="true" style="font-size:40px;">&times;</span></button>
                <h4 class="modal-title">Agrega un usuario</h4>
              </div>
              <div class="modal-body">
                <form role="form" id="form">
                  <div class="form-group">
                    <div class="col-md-6">
                      <input id="nombre" type="text" name="" class="form-control input-lg" value="" placeholder="Nombre" required>
                    </div>
                    <div class="col-md-6">
                      <input id="apellidos" type="text" name="" class="form-control input-lg" value="" placeholder="Apellidos" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <input id="agregarUsuarioEmail" type="text" name="" class="form-control input-lg" value="" placeholder="Correo electrónico" required>
                  </div>
                  <div class="form-group">
                    <select id="agregarUsuarioPuesto" name="" class="input-lg form-control" required>
                      <option disabled selected value="">Puesto</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Usuario">Usuario</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <input id="nuevacontrasena" type="password" name="" class="form-control input-lg" value="" placeholder="Contraseña" required>
                  </div>
                  <div class="form-group">
                    <input id="confirmarcontrasena" type="password" name="" class="form-control input-lg" value="" placeholder="Confirmar contraseña" required>
                  </div>
                  <div class="form-group">
                    <button onclick="guardarUsuario()" type="button" class="btns btn-siguiente">Guardar</button>
                  </div>
                </form>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        </section>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script type="text/javascript" src="js/bootstrap-datepicker.min.js"></script>
        <script type="text/javascript" src="js/jquery.minicolors.min.js"></script>
        <script src='js/moment.min.js'></script>
        <script src="js/bootstrap-tooltip.js"></script>
        <script type="text/javascript" src="js/jquery.autocomplete.min.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.1.1/firebase.js"></script>
        <script>
        // Initialize Firebase
        var config = {
          apiKey: "AIzaSyCNT5Gp61NyRo5iGQV3P7d51Y_B6lDLl9g",
          authDomain: "daytoday-21c6d.firebaseapp.com",
          databaseURL: "https://daytoday-21c6d.firebaseio.com",
          projectId: "daytoday-21c6d",
          storageBucket: "daytoday-21c6d.appspot.com",
          messagingSenderId: "934459413907"
        };
        firebase.initializeApp(config);
        </script>
        <script src="js/proyecto.js"></script>
        <script type="text/javascript">
        $(function(){
          var colpick = $('.demo').each( function() {
            $(this).minicolors({
              control: $(this).attr('data-control') || 'hue',
              inline: $(this).attr('data-inline') === 'true',
              letterCase: 'lowercase',
              opacity: false,
              change: function(hex, opacity) {
                if(!hex) return;
                if(opacity) hex += ', ' + opacity;
                try {
                  console.log(hex);
                } catch(e) {}
                $(this).select();
              },
              theme: 'bootstrap'
            });
          });

          var $inlinehex = $('#inlinecolorhex h3 small');
          $('#inlinecolors').minicolors({
            inline: true,
            theme: 'bootstrap',
            change: function(hex) {
              if(!hex) return;
              $inlinehex.html(hex);
            }
          });
        });
        </script>
        <script src="js/admin.js"></script>
        <script type="text/tmpl" id="tmpl">
          {{
          var date = date || new Date(),
              month = date.getMonth(),
              year = date.getFullYear(),
              first = new Date(year, month, 1),
              last = new Date(year, month + 1, 0),
              startingDay = first.getDay(),
              thedate = new Date(year, month, 1 - startingDay),
              dayclass = lastmonthcss,
              today = new Date(),
              i, j;
          if (mode === 'week') {
            thedate = new Date(date);
            thedate.setDate(date.getDate() - date.getDay());
            first = new Date(thedate);
            last = new Date(thedate);
            last.setDate(last.getDate()+6);
          } else if (mode === 'day') {
            thedate = new Date(date);
            first = new Date(thedate);
            last = new Date(thedate);
            last.setDate(thedate.getDate() + 1);
          }

          }}
          <table class="calendar-table table table-condensed table-tight">
            <thead>
              <tr>
                <td colspan="7" style="text-align: center">
                  <table style="white-space: nowrap; width: 100%">
                    <tr>

                      <td>
                        <span class="btn-group btn-group-lg">
                          {{ if (mode !== 'day') { }}
                            {{ if (mode === 'month') { }}<button class="js-cal-option btn btn-link" data-mode="year">{{: months[month] }}</button>{{ } }}
                            {{ if (mode ==='week') { }}
                          <h3><button id="btn-cal-proy" class="js-cal-prev btn btn-default"><span class="glyphicon glyphicon-menu-left"></span></button> Semana {{: shortMonths[first.getMonth()] }} {{: first.getDate() }} a {{: shortMonths[last.getMonth()] }} {{: last.getDate() }} de {{: year}} <button id="btn-cal-proy" class="js-cal-next btn btn-default"><span class="glyphicon glyphicon-menu-right"></span></button></h3>  {{ } }}

                          {{ } else { }}
                            <button class="btn btn-link disabled">{{: date.toDateString() }}</button>
                          {{ } }}
                        </span>
                      </td>
                      <td style="text-align: right">
                        <span class="btn-group">
                        </span>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </thead>
            {{ if (mode ==='year') {
              month = 0;
            }}
            <tbody>
              {{ for (j = 0; j < 3; j++) { }}
              <tr>
                {{ for (i = 0; i < 4; i++) { }}
                <td class="calendar-month month-{{:month}} js-cal-option" data-date="{{: new Date(year, month, 1).toISOString() }}" data-mode="month">
                  {{: months[month] }}
                  {{ month++;}}
                </td>
                {{ } }}
              </tr>
              {{ } }}
            </tbody>
            {{ } }}
            {{ if (mode ==='month' || mode ==='week') { }}
            <thead>
              <tr class="c-weeks">
                {{ for (i = 0; i < 7; i++) { }}

                  <th class="c-name text-center">
                    {{: days[i] }}
                  </th>
                {{ } }}
              </tr>
            </thead>
            <tbody>
              {{ for (j = 0; j < 6 && (j < 1 || mode === 'month'); j++) { }}
              <tr>
                {{ for (i = 0; i < 7; i++) { }}
                {{ if (thedate > last) { dayclass = nextmonthcss; } else if (thedate >= first) { dayclass = thismonthcss; } }}
                <td style="margin-left:200px;" class="right-rollbacks container calendar-day {{: dayclass }} {{: thedate.toDateCssClass() }} {{: date.toDateCssClass() === thedate.toDateCssClass() ? 'selected':'' }} {{: daycss[i] }} js-cal-option" data-date="{{: thedate.toISOString() }}">
                  <div class="date"><p style="font-weight: bold;" class="icons" id="diaCalendar">{{: thedate.getDate()}}<p></div>
                    <div style="margin-top:-35px;">{{ thedate.setDate(thedate.getDate() + 1);}}</div>

                </td>
                {{ } }}
              </tr>
              {{ } }}
            </tbody>
            {{ } }}
            {{ if (mode ==='day') { }}
            <tbody>
              <tr>
                <td colspan="7">
                  <table class="table table-striped table-condensed table-tight-vert" >
                    <thead>
                      <tr>
                        <th> </th>
                        <th style="text-align: center; width: 100%">{{: days[date.getDay()] }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th class="timetitle" >All Day</th>
                        <td class="{{: date.toDateCssClass() }}">  </td>
                      </tr>
                      <tr>
                        <th class="timetitle" >Before 6 AM</th>
                        <td class="time-0-0"> </td>
                      </tr>
                      {{for (i = 6; i < 22; i++) { }}
                      <tr>
                        <th class="timetitle" >{{: i <= 12 ? i : i - 12 }} {{: i < 12 ? "AM" : "PM"}}</th>
                        <td class="time-{{: i}}-0"> </td>
                      </tr>
                      <tr>
                        <th class="timetitle" >{{: i <= 12 ? i : i - 12 }}:30 {{: i < 12 ? "AM" : "PM"}}</th>
                        <td class="time-{{: i}}-30"> </td>
                      </tr>
                      {{ } }}
                      <tr>
                        <th class="timetitle" >After 10 PM</th>
                        <td class="time-22-0"> </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
            {{ } }}
          </table>
        </script>
        <script src="js/calendarioProyecto.js"></script>
        <script src="js/busqueda.js"></script>
        <script src="js/contador.js"></script>
        <script type="text/javascript" src="js/currency-autocomplete.js"></script>
    </body>
  </html>
