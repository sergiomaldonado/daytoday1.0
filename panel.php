
<!DOCTYPE html>
<html lang="es">
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
    <link rel='stylesheet' href='css/fullcalendar.css' />
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/proyecto.css">
    <link rel="stylesheet" href="css/autocomplete.css">
    <link rel="stylesheet" href="css/calendar.css">
    <!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.3.0/css/mdb.min.css">-->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
  </head>
  <body>
    <nav style="display: none;" id="mainNav" class="navbar navbar-default navbar-fixed-top">
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
    <div data-keyboard="false" data-backdrop="static" id="modal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="color: #137BD6;">Primero inicia sesión</h4>
          </div>
          <div class="modal-body">
            <div style="margin-top:0px; " class="header-content">
              <img src="assets/logo.svg" width="250px" heigth="90px" alt="">
              <p>El día a día de tu trabajo</p>
              <div id="form">
                <div id="error" style="display: none;" class="alert alert-danger animated" role="alert"></div>
                <input id="email" type="text" name="" class="form-control input-lg" value="" placeholder="Correo electrónico" required><br>
                <input id="contrasena" type="password" name="" class="form-control input-lg" value="" placeholder="Contraseña" required><br>
                <select id="puesto" name="" class="input-lg form-control" required>
                  <option disabled selected value="">Puesto</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Usuario">Usuario</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <!--<button  type="button" class="boton btn-default" data-dismiss="modal">Cerrar</button>-->
            <button onclick="login()" id="listo" type="button" class="boton btn-primary">Entrar</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <section style="display: none;" id="panel-usuario"  class="no-padding">
      <div style="margin-top:40px;">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-4">
              <div style="width:250px;" class="thumbnail">
                <img src="assets/bg-panel.png" alt="...">
                <img style="margin-top:-50px;" width="100px"src="http://lorempixel.com/400/400/" alt="..." class="img-circle">
                <div class="caption">
                  <h3>Saul</h3>
                </div>
              </div>
            </div>
		        <div  class="no-padding col-lg-9 col-md-9" style=" background-color:red;">
              <div style="background-color:white; padding-top:30px;" class="live-box">
                <ul class="nav nav-tabs">
                  <li class="active"><a href="#coment" data-toggle="tab">Semana</a></li>
                  <li><a href="#recursos" data-toggle="tab">Mi Semana</a></li>
                  <li><a href="#recursos" data-toggle="tab">Completado</a></li>
                </ul>
                <div class="tab-content no-padding" style="padding:20px;">
                  <div class="tab-pane fade in active no-padding" id="coment">
                    <div style="display: inline;" id="authentication">
                      <div class="table-responsive no-padding">
                        <div class="panel panel-default no-padding" style="border:solid 1px white;">
                          <!-- Default panel contents -->
                          <div class="panel-body no-padding">
                            <p>Categorias</p>
                          </div>
                          <table class="table">
                            <tr class="no-padding">
                              <td><h4>Lunes</h4></td>
                              <td><h4>Martes</h4></td>
                              <td><h4>Miercoles</h4></td>
                              <td><h4>Jueves</h4></td>
                              <td><h4>Viernes</h4></td>
                              <td><h4>Sabado</h4></td>
                            </tr>
                            <tr  class="no-padding">
                            <td id="lunes" style="padding:1px; margin:2px 2px 2px;" class="no-padding">
                              <ul class="no-padding">
                                <li style="list-style:none;">
                                  <div  class="tarea">
                                    <div id="category-color"></div>
                                    <div id="text-tarea">Programacion del loggin. Diferenciar entre usuarios</div>
                                  </div>
                                </li>
                                <li style="list-style:none;"><div  class="tarea"><div id="category-color"></div>Maquetar pantalla user</div></li>
                              </ul>
                            </td>
                            <td id="Martes" class="no-padding" style="padding:1px; margin:2px 2px 2px;">
                              <ul class="no-padding">
                                <li style="list-style:none; width:100%; margin-left-20px;"><div class="tarea"><div id="category-color"></div>Programacion del loggin. Diferenciar entre usuarios</div></li>
                                <li style="list-style:none;"><div class="tarea"><div id="category-color"></div>tarea1 del lunes</div></li>
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                              </ul>
                            </td>
                            <td id="Miercoles"  style="padding:1px; margin:2px 2px 2px;">
                              <ul class="no-padding">
                                <li style="list-style:none; width:100%; margin-left-20px;"><div class="tarea">tarea1 del lunes</div></li>
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                              </ul>
                            </td>
                            <td id="jueves"  style="padding:1px; margin:2px 2px 2px;">
                              <ul class="no-padding">
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                              </ul>
                            </td>
                            <td id="viernes"  style="padding:1px; margin:2px 2px 2px;">
                              <ul class="no-padding">
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                              </ul>
                            </td>
                            <td id="sabado"  style="padding:1px; margin:2px 2px 2px;">
                              <ul class="no-padding">
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                              </ul>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
 	         </div>
        </div>
      </div>
    </section>
    <section style="display: none;" id="panel-admin">
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
              <div style="padding-top:30px;" class="live-box">
                <ul class="nav nav-tabs">
                  <li class="active"><a id="tabsemana" href="#m1" data-toggle="tab">Semana</a></li>
                  <li><a id="tabordenes" href="#m2" data-toggle="tab">Ordenes</a></li>
                  <li><a id="tabproyectos" href="#m3" data-toggle="tab">Proyectos</a></li>
                  <li><a id="tabreporte" href="#m4" data-toggle="tab">Reporte</a></li>
                  <li><a id="tabhistorial" href="#m5" data-toggle="tab">Historial</a></li>
                </ul>
                <!-- Tab Semana-->
                <div class="tab-content" style="padding-top:20px;">
                  <div class="tab-pane fade in active" id="m1">
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
                        <table class="table">
                          <tr class="no-padding">
                            <td><h4>Lunes</h4></td>
                            <td><h4>Martes</h4></td>
                            <td><h4>Miercoles</h4></td>
                            <td><h4>Jueves</h4></td>
                            <td><h4>Viernes</h4></td>
                            <td><h4>Sabado</h4></td>
                          </tr>
                          <tr class="no-padding">
                            <td id="lunes" style="padding:1px; margin:2px 2px 2px;" class="no-padding">
                              <ul class="no-padding">
                                <li style="list-style:none;">
                                  <div  class="tarea">
                                    <div id="category-color"></div>
                                    <div id="text-tarea">Programacion del loggin. Diferenciar entre usuarios</div>
                                  </div>
                                </li>
                                <li style="list-style:none;"><div  class="tarea"><div id="category-color"></div>Maquetar pantalla user</div></li>
                              </ul>
                            </td>
                            <td id="Martes" class="no-padding" style="padding:1px; margin:2px 2px 2px;">
                              <ul class="no-padding">
                                <li style="list-style:none; width:100%; margin-left-20px;"><div class="tarea"><div id="category-color"></div>Programacion del loggin. Diferenciar entre usuarios</div></li>
                                <li style="list-style:none;"><div class="tarea"><div id="category-color"></div>tarea1 del lunes</div></li>
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                              </ul>
                            </td>
                            <td id="Miercoles"  style="padding:1px; margin:2px 2px 2px;">
                              <ul class="no-padding">
                                <li style="list-style:none; width:100%; margin-left-20px;"><div class="tarea">tarea1 del lunes</div></li>
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                              </ul>
                            </td>
                            <td id="jueves"  style="padding:1px; margin:2px 2px 2px;">
                              <ul class="no-padding">
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                              </ul>
                            </td>
                            <td id="viernes"  style="padding:1px; margin:2px 2px 2px;">
                              <ul class="no-padding">
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                              </ul>
                            </td>
                            <td id="sabado"  style="padding:1px; margin:2px 2px 2px;">
                              <ul class="no-padding">
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                                <li style="list-style:none;"><div class="tarea">tarea1 del lunes</div></li>
                              </ul>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>

                  </div>


                  <!-- Tab Ordenes-->
                  <div class="tab-pane fade" style="padding-top:0px;" id="m2">
                    <form role="form">
                      <div style="width:30%; float:right;" class="form-group has-feedback">
                        <input  type="text" class="form-control" placeholder="" />
                        <i style="color: #4388E5;" class="form-control-feedback glyphicon glyphicon-search rota-horizontal"></i>
                      </div>
                    </form>
                    <table id="tablaordenes" class="table">
                      <thead>
                        <th>Id</th>
                        <th>Cliente</th>
                        <th>Descripción del pedido</th>
                        <th>Recepción</th>
                        <th>Entrega</th>
                        <th>Estado</th>
                        <th>Cliente Encargado</th>
                      </thead>
                      <tbody id="cuerpoTablaOrdenes">

                      </tbody>
                    </table>
                  </div>
                  <!--  PROYECTOS ---->
                  <div  style="padding-top:0px;" class="tab-pane fade" id="m3">
                    <div id="ContenedorProyectos" class="row">


                      <div style="margin-top:10px;" class='col-xs-6 col-md-4'>
                        <a href="proyecto.php?id=idproyecto">
                          <div id="proyecto">
                            <div id="nombreproyecto"><h3 style="padding:20px;">Plan de Comunicacion de Axios</h3></div>
                            <div id="fecha"><p>Tareas: 25          Entrega: 28/07/2017</p></div>
                            <div class="progress">
                              <div class="progress-bar progress-bar-custom" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style="width: 85%;">
                                70%
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
      <script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
      <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.3.0/js/mdb.min.js"></script>-->
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
      <script src="vendor/bootstrap/js/bootstrap.js" type="text/javascript"> </script>
      <script type="text/javascript" src="js/bootstrap-datepicker.min.js"></script>
      <script type="text/javascript" src="js/jquery.minicolors.min.js"></script>
      <script src="http://momentjs.com/downloads/moment.min.js"></script>
      <script src='js/moment.min.js'></script>
      <script src='js/fullcalendar.js'></script>
      <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js"></script>-->
      <script src="js/bootstrap-tooltip.js"></script>
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
      <script src="js/panel.js"></script>
      <script src="js/autocomplete.js"></script>
  </body>
</html>