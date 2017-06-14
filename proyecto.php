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
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
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
            <li><a style="height:55px; width:40px;  margin-right:10px; " data-toggle="tooltip"  data-placement="bottom" title="Agregar orden" onclick="modalProyecto()" class="page-scroll"><img height="40px" src="assets/ico-2.svg" alt=""></a></li>
            <li><a style="height:55px; width:40px;  margin-right:10px; " data-toggle="tooltip"  data-placement="bottom" title="Agregar orden" onclick="modalUsuario()" class="page-scroll"><img height="40px" src="assets/ico-3.svg" alt=""></a></li>
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
                <div style="padding-top:30px;" class="live-box">

                <h2>Titulo del proyecto</h2><hr>
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

                    </div>


                  </div>
                  <div style="" class="col-xs-8 col-sm-6">

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
