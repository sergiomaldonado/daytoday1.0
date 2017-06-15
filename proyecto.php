<?php

  $id = $_GET["id"];
?>

<?php
  // Definimos nuestra zona horaria
  date_default_timezone_set("America/Mexico_City");

  // incluimos el archivo de funciones
  include 'funciones.php';

  // incluimos el archivo de configuracion
  include 'config.php';

  // Verificamos si se ha enviado el campo con name from
  if (isset($_POST['from']))
  {

      // Si se ha enviado verificamos que no vengan vacios
      if ($_POST['from']!="" AND $_POST['to']!="")
      {

          // Recibimos el fecha de inicio y la fecha final desde el form

          $inicio = _formatear($_POST['from']);
          // y la formateamos con la funcion _formatear

          $final  = _formatear($_POST['to']);

          // Recibimos el fecha de inicio y la fecha final desde el form

          $inicio_normal = $_POST['from'];

          // y la formateamos con la funcion _formatear
          $final_normal  = $_POST['to'];

          // Recibimos los demas datos desde el form
          $titulo = evaluar($_POST['title']);

          // y con la funcion evaluar
          $body   = evaluar($_POST['event']);

          // reemplazamos los caracteres no permitidos
          $clase  = evaluar($_POST['class']);

          // insertamos el evento
          $query="INSERT INTO eventos VALUES(null,'$titulo','$body','','$clase','$inicio','$final','$inicio_normal','$final_normal')";

          // Ejecutamos nuestra sentencia sql
          $conexion->query($query);

          // Obtenemos el ultimo id insetado
          $im=$conexion->query("SELECT MAX(id) AS id FROM eventos");
          $row = $im->fetch_row();
          $id = trim($row[0]);

          // para generar el link del evento
          $link = "$base_url"."descripcion_evento.php?id=$id";

          // y actualizamos su link
          $query="UPDATE eventos SET url = '$link' WHERE id = $id";

          // Ejecutamos nuestra sentencia sql
          $conexion->query($query);

          // redireccionamos a nuestro calendario
          header("Location:$base_url");
      }
  }
 ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title></title>
    <link href="vendor/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
    <link href="vendor/magnific-popup/magnific-popup.css" rel="stylesheet">
    <link href="css/creative.min.css" rel="stylesheet">
    <link href="css/creative.css" rel="stylesheet">
    <link href="css/social.css" rel="stylesheet">
    <link rel="stylesheet" href="css/bootstrap-datepicker3.css">
    <link rel="stylesheet" href="css/bootstrap-datepicker3.standalone.css">
    <link rel="shortcut icon" href="http://www.templatemonster.com/favicon.ico">
    <link rel="icon" href="http://www.templatemonster.com/favicon.ico">
    <link rel="stylesheet" type="text/css" media="all" href="css/jquery.minicolors.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/proyecto.css">
    <link rel="stylesheet" href="css/autocomplete.css">
    <link rel="stylesheet" href="css/calendar.css">

    <!--<script src="components/jquery/dist/jquery.min.js"></script>-->
    <script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script
    <script src="components/jquery-ui/jquery-ui.min.js"></script>
    <script src="components/angular/angular.min.js"></script>
    <script src="js/angular-dragdrop.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <style>
      .thumbnail { height: 280px !important; }
      .btn-droppable { width: 180px; height: 30px; padding-left: 4px; }
      .btn-draggable { width: 160px; }
    </style>
  </head>
  <body>
    <nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div  class="navbar-header">
          <button style="border:solid 1px #FF6700;" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span> Menu <i class="glyphicon glyphicon-triangle-bottom"></i>
          </button>
          <a href="http://agenciaaxios.com"><img id="logo" class="navbar-brand page-scroll" src="assets/logo1.svg"></a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse"  id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li><a style="height:55px; width:40px; margin-right:10px;" data-toggle="tooltip"  data-placement="bottom" title="Agregar orden" onclick="modalOrden()" class="page-scroll"><img src="assets/ico-1.svg" height="40px" alt=""></a></li>
            <li><a style="height:55px; width:40px;  margin-right:10px; " data-toggle="tooltip"  data-placement="bottom" title="Agregar proyecto" onclick="modalProyecto()" class="page-scroll"><img height="40px" src="assets/ico-2.svg" alt=""></a></li>
            <li><a style="height:55px; width:40px;  margin-right:10px; " data-toggle="tooltip"  data-placement="bottom" title="Agregar usuario" onclick="modalUsuario()" class="page-scroll"><img height="40px" src="assets/ico-3.svg" alt=""></a></li>
            <li><a class="page-scroll" href="http://agenciaaxios.com/live/"><span style="margin-top:10px;"  class="glyphicon glyphicon-menu-hamburger"></span></a></li>
          </ul>
          <!-- HTML to write -->
          <!-- /.navbar-collapse -->
        </div>
      </div>
    <!-- /.container-fluid -->
    </nav>

      <section style="display: none;" id="panel-admin">

        <div style="margin-top:40px;">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-4">
                <div class="row">
                  <div class="col-sm-6 col-md-4">
                    <div style="width:250px; overflow:hidden; border: solid 1px #74A6E9;" class="thumbnail no-padding" >
                      <img src="assets/bg-panel.png" alt="...">
                      <img style="margin-top:-50px;" width="100px"src="http://lorempixel.com/400/400/" alt="..." class="img-circle">
                      <div class="caption">
                        <h3>Sergio Maldonado</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="no-padding col-lg-9 col-md-9" style="margin-top:-30px; ">
		<div class="no-padding col-lg-12 col-md-12" style="margin-top:-30px; ">
                <div style="padding-top:30px;" class="live-box">

                <h2>Titulo del proyecto</h2><hr></div></div>
                <input id="idProyecto" style="display: none;" value="<?php echo $id; ?>"/>
		<div style="padding-top:30px;" class="live-box">
                  <ul class="nav nav-tabs">
                    <li class="active"><a id="tabsemana" href="#m1" data-toggle="tab">Tareas de Proyecto</a></li>
                    <li><a id="tabordenes" href="#m2" data-toggle="tab">Brief del Proyecto</a></li>

                  </ul>
                  <!-- Tab Semana-->
                  <div class="tab-content" style="padding-top:20px;">
                    <div class="tab-pane fade in active" id="m1">
                <div class="row">
                  <div style="" class="col-xs-8 col-sm-6">
                    <div class="item">
                      <form role="form" class="form-horizontal">
                        <div class="form-group">
                          <div class="col-md-12">
                            <input id="tarea" type="text" class="form-control input-lg" required placeholder="Tarea">
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-6">
                            <input id="categoria" type="text" class="form-control input-lg" placeholder="Categoría">
                          </div>
                          <div class="col-md-6">
                            <input type="text" placeholder="Color" id="color" class="form-control input-lg demo" data-control="wheel">
                          </div>
                          <div style="margin-top:15px;" class="col-md-12">
                            <input id="asignado" type="text" class="form-control input-lg" placeholder="Asignada a">
                          </div>
                        </div>
                        <div class="form-group">
                          <button onclick="agregarTareaProyecto()" class="btn btn-lg" style="background-color: #7BD500;" type="button" name="button"><span class="glyphicon glyphicon-plus"></span></button>
                        </div>
                      </form>

                    </div>


                  </div>
		<div id="redips-drag">
                      <div class='contentWrapper'>
                  <div id="ContenedorTareasProyecto" style="" class="col-xs-8 col-sm-6">

                    <div style="margin-right:-20px;" class="col-md-4">   <div class="tarea">tarea1 del lunes</div></div>
                    <div style="margin-right:-20px;" class="col-md-4">   <div class="tarea">tarea1 del lunes</div></div>
                    <div style="margin-right:-20px;" class="col-md-4">   <div class="tarea">tarea1 del lunes</div></div>
                    <div style="margin-right:-20px;" class="col-md-4">   <div class="tarea">tarea1 del lunes</div></div>
                    <div style="margin-right:-20px;" class="col-md-4">   <div class="tarea">tarea1 del lunes</div></div>



                  </div>

                  <div style="" class="col-xs-12 col-sm-12">

                    <div class="table-responsive no-padding">
                      <div class="panel panel-default no-padding" style="border:solid 1px white;">
                        <!-- Contenido a pintar por javascript -->
                        <div class="panel-body no-padding">
                          <ul>
                            <li style="display:inline; padding:20px;"><span style="color:#50E3C2;" class="glyphicon glyphicon-asterisk"></span>Home</li>
                            <li style="display:inline; padding:20px;"><span style="color:#FF9B00;" class="glyphicon glyphicon-asterisk"></span> News</li>
                            <li style="display:inline; padding:20px;"><span style="color:#6FDC25;" class="glyphicon glyphicon-asterisk"></span> Contact</li>
                            <li style="display:inline; padding:20px;"><span style="color:#B6247F;" class="glyphicon glyphicon-asterisk"></span>  About</li>
                          </ul>
                        </div>
                        <div class="row">
                              <div class="page-header"><h2></h2></div>
                                <div class="pull-left form-inline"><br>
                                  <div class="btn-group">
                                    <button class="btn btn-primary" data-calendar-nav="prev"><< Anterior</button>
                                    <!--<button class="btn" data-calendar-nav="today">Hoy</button>-->
                                    <button class="btn btn-primary" data-calendar-nav="next">Siguiente >></button>
                                  </div>
                      </div>
                    </div>
		    <div id="calendar"></div>
		
                  



                <!-- Tab Ordenes-->
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
	<!-- Modal agregar Orden -->
        <div data-keyboard="false" data-backdrop="static" id="agregarOrden" class="modal fade" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h3 class="modal-title">Nuevo proyecto</h3>
              </div>
              <div class="modal-body">
                <div id="carousel-proyecto" class="carousel slide">
                  <!-- Wrapper for slides -->
                  <div class="carousel-inner" role="listbox">
                    <div class="item active">
                      <h3>Brief</h3>
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
                          <div class="col-md-6">
                            <input id="documentacion" type="text" class="form-control input-lg" placeholder="Documentación"><br>
                            <label>Indicadores</label>
                            <input id="indicador1" type="text" class="form-control input-lg" placeholder="Indicador 1">
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-6">
                            <label>¿Qué se quiere lograr?</label>
                            <input id="objetivo1" type="text" class="form-control input-lg" placeholder="Objetivo 1">
                          </div>
                          <div class="col-md-6">
                            <br>
                            <input id="indicador2" type="text" class="form-control input-lg" placeholder="Indicador 2">
                          </div>
                        </div>
                      </form>
                      <button onclick="siguiente()" type="button" class="btns btn-siguiente">Siguiente <span class="glyphicon glyphicon-arrow-right"></span></button>
                    </div>
                    <div class="item">
                      <h3>Forma el equipo</h3>
                      <form role="form" class="form-horizontal">
                        <div class="form-group">
                          <div class="col-md-12">
                            <div class="input-group">
                              <input class="form-control bs-autocomplete" id="ac-demo" value="" placeholder="" type="text" data-source="demo_source.php" data-hidden_field_id="city-code" data-item_id="id" data-item_label="cityName" autocomplete="off">
                              <span class="input-group-btn">
                                <button class="btns btn-secondary" type="button"><span class="glyphicon glyphicon-plus"></span></button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </form>
                      <button onclick="volver()" type="button" class="btns btn-volver"><span class="glyphicon glyphicon-arrow-left"></span> Volver</button>
                      <button onclick="siguiente()" type="button" class="btns btn-siguiente">Siguiente <span class="glyphicon glyphicon-arrow-right"></span></button>
                    </div>
                    <div class="item">
                      <h3>Agrega tareas al proyecto</h3>
                      <form role="form" class="form-horizontal">
                        <div class="form-group">
                          <div class="col-md-12">
                            <input id="tarea" type="text" class="form-control input-lg" required placeholder="Tarea">
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-3">
                            <input id="categoria" type="text" class="form-control input-lg" placeholder="Categoría">
                          </div>
                          <div class="col-md-3">
                            <input type="text" placeholder="Color" id="color" class="form-control input-lg demo" data-control="wheel">
                          </div>
                          <div class="col-md-6">
                            <input id="asignado" type="text" class="form-control input-lg" placeholder="Asignada a">
                          </div>
                        </div>
                        <div class="form-group">
                          <button class="btns" style="background-color: #7BD500;" type="button" name="button"><span class="glyphicon glyphicon-plus"></span></button>
                        </div>
                      </form>
                      Tareas
                      <hr style="">
                      <button onclick="volver()" type="button" class="btns btn-volver"><span class="glyphicon glyphicon-arrow-left"></span> Volver</button>
                      <button onclick="guardar()" type="button" class="btns btn-siguiente">Guardar <span class="glyphicon glyphicon-floppy-disk"></span></button>
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
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
        <script src="vendor/bootstrap/js/bootstrap.js" type="text/javascript"> </script>
        <script type="text/javascript" src="js/bootstrap-datepicker.min.js"></script>
        <script type="text/javascript" src="js/jquery.minicolors.min.js"></script>
        <script src='js/moment.min.js'></script>
        <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js"></script>-->
        <script src="js/bootstrap-tooltip.js"></script>
        <script type="text/javascript" src="js/header.js"></script>
		    <script type="text/javascript" src="js/redips-drag-min.js"></script>
        <script type="text/javascript" src="js/script.js"></script>
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
          var App = angular.module('drag-and-drop', ['ngDragDrop']);

          App.controller('oneCtrl', function($scope, $timeout) {
            $scope.list5 = [];

            let tareasdelproyecto = firebase.database().ref("proyectos/"+idProyecto+"tareas");

            tareasdelproyecto.on('value', function(snapshot) {
              let todasTareas = snapshot.val();

              for(unatarea in todasTareas) {
                let json = {
                  'title': todasTareas[unatarea].nombre,
                  'drag': true
                }

                $scope.list5.push(json);
              }
            })

            // Limit items to be dropped in list1
            $scope.optionsList1 = {
              accept: function(dragEl) {
                if ($scope.list1.length >= 2) {
                  return false;
                } else {
                  return true;
                }
              }
            };
          });
        </script>
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
        <script src="js/underscore-min.js"></script>
        <script type="text/javascript" src="js/es-ES.js"></script>
        <script src="js/calendar.js"></script>
        <script type="text/javascript">
            (function($){
                    //creamos la fecha actual
                    var date = new Date();
                    var yyyy = date.getFullYear().toString();
                    var mm = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
                    var dd  = (date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString();

                    //establecemos los valores del calendario
                    var options = {

                        // definimos que los eventos se mostraran en ventana modal
                            modal: '#events-modal',

                            // dentro de un iframe
                            modal_type:'iframe',

                            //obtenemos los eventos de la base de datos
                            events_source: 'obtener_eventos.php',

                            // mostramos el calendario en el mes
                            view: 'week',

                            // y dia actual
                            day: yyyy+"-"+mm+"-"+dd,


                            // definimos el idioma por defecto
                            language: 'es-ES',

                            //Template de nuestro calendario
                            tmpl_path: 'tmpls/',
                            tmpl_cache: false,


                            // Hora de inicio
                            time_start: '08:00',

                            // y Hora final de cada dia
                            time_end: '22:00',

                            // intervalo de tiempo entre las hora, en este caso son 30 minutos
                            time_split: '30',

                            // Definimos un ancho del 100% a nuestro calendario
                            width: '100%',

                            onAfterEventsLoad: function(events)
                            {
                                    if(!events)
                                    {
                                            return;
                                    }
                                    var list = $('#eventlist');
                                    list.html('');

                                    $.each(events, function(key, val)
                                    {
                                            $(document.createElement('li'))
                                                    .html('<a href="' + val.url + '">' + val.title + '</a>')
                                                    .appendTo(list);
                                    });
                            },
                            onAfterViewLoad: function(view)
                            {
                                    $('.page-header h2').text(this.getTitle());
                                    $('.btn-group button').removeClass('active');
                                    $('button[data-calendar-view="' + view + '"]').addClass('active');
                            },
                            classes: {
                                    months: {
                                            general: 'label'
                                    }
                            }
                    };


                    // id del div donde se mostrara el calendario
                    var calendar = $('#calendar').calendar(options);

                    $('.btn-group button[data-calendar-nav]').each(function()
                    {
                            var $this = $(this);
                            $this.click(function()
                            {
                                    calendar.navigate($this.data('calendar-nav'));
                            });
                    });

                    $('.btn-group button[data-calendar-view]').each(function()
                    {
                            var $this = $(this);
                            $this.click(function()
                            {
                                    calendar.view($this.data('calendar-view'));
                            });
                    });

                    $('#first_day').change(function()
                    {
                            var value = $(this).val();
                            value = value.length ? parseInt(value) : null;
                            calendar.setOptions({first_day: value});
                            calendar.view();
                    });
            }(jQuery));
        </script>
        <script src="js/panel.js"></script>
        <script src="js/autocomplete.js"></script>
    </body>
  </html>
