<!DOCTYPE html>
<html lang="<?php bloginfo('language'); ?>">
  <head>
      <meta charset="<?php bloginfo('charset'); ?>">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="">
      <meta name="author" content="">
      <title><?php bloginfo('title'); ?></title>

      <?php wp_head(); ?>
      <!-- Bootstrap Core CSS -->
      <link href="<?php bloginfo('template_url') ?>/vendor/bootstrap/css/bootstrap.css" rel="stylesheet">

      <!-- Custom Fonts -->
      <link href="<?php bloginfo('template_url') ?>/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
      <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
      <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>

      <!-- Plugin CSS -->
      <link href="<?php bloginfo('template_url') ?>/vendor/magnific-popup/magnific-popup.css" rel="stylesheet">

      <!-- Theme CSS -->
      <link href="<?php bloginfo('template_url') ?>/css/creative.min.css" rel="stylesheet">
      <link href="<?php bloginfo('template_url') ?>/css/creative.css" rel="stylesheet">

      <link href="<?php bloginfo('template_url') ?>/css/social.css" rel="stylesheet">
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
      <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
      <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
      <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
      <![endif]-->
  </head>
  <body id="page-top">
      <nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
        <div class="nav-ventas">
          <p style="font-size:14px;color:gray; margin-left:20px; padding-top:8px; width:100%;">
            Ventas: &nbsp   <i style="color:#FC5810;" class="glyphicon glyphicon-phone-alt">
            </i> &nbsp(834) 151 0629   &nbsp&nbsp&nbsp
            <img  width="14" style="margin-top:-5px;" src="<?php bloginfo('template_url') ?>/img/lwa.svg"> Whatsapp (831) 123 9023
            <div style="float:right; margin-top:-40px; margin-right:50px;">
              <object id="icons" width="25" height="25">
                  <a id="icon-facebook" class="social-icon" href=""><i class="fa fa-facebook" aria-hidden="true"></i></a>
              </object>&nbsp&nbsp&nbsp
              <object id="icons" width="25" height="25">
                  <a id="icon-instagram" class="social-icon" href=""><i class="fa fa-instagram" aria-hidden="true"></i></a>
              </object>&nbsp&nbsp&nbsp
              <object id="icons" width="25" height="25">
                  <a id="icon-linkedin" class="social-icon" href=""><i class="fa fa-linkedin" aria-hidden="true"></i></a>
              </object>
            </div>
          </p>
        </div>
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div  class="navbar-header">
            <button style="border:solid 1px #FF6700;" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span> Menu <i class="glyphicon glyphicon-triangle-bottom"></i>
            </button>
            <a href="<?php echo get_site_url(); ?>"><img id="logo" class="navbar-brand page-scroll" src="<?php bloginfo('template_url') ?>/logosv.svg"></a>
          </div>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
              <li id="icons2">
                <img  width="25" style="margin-top:-5px;" src="<?php bloginfo('template_url') ?>/img/fb.svg"></img>&nbsp&nbsp&nbsp
                <img width="25" style="margin-top:-5px;" src="<?php bloginfo('template_url') ?>/img/insta.svg"></img>&nbsp&nbsp&nbsp
                <img width="25" style="margin-top:-5px;" src="<?php bloginfo('template_url') ?>/img/in.svg"></img>
              </li>
              <li><a class="page-scroll" href="#service">Servicios</a></li>
              <li><a class="page-scroll" href="<?php echo get_permalink(47); ?>">Blog</a></li>
              <li><a class="page-scroll" href="<?php echo get_permalink(get_page_by_path( 'live' )) ?>">Axios Live</a></li>
              <li><a id="noseparador" class="page-scroll" href="#contact">Contacto</a></li>
            </ul>
          </div>
          <!-- /.navbar-collapse -->
        </div>
          <!-- /.container-fluid -->
      </nav>
      <header>
        <div style="margin-top:40px;" class="header-content">
        <!-- Button trigger modal -->
        <!-- Modal -->
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-6 ">
                <div class="service-box">
                  <h1 id="title-head">Somos más que una Agencia Digital.</h1>
                  <h3 id="sub-title-head">Buscamos conectar a las empresas con sus clientes ideales a través de la estrategia el diseño y la tecnología.</h3>
                  <hr>
                  <button type="button" id="btn-contacto" class="btn btn-default btn-lg">CONTACTANOS</button>
                </div>
              </div>
              <div style="margin-top:30px;" class="col-lg-6 col-md-6 text-center">
                <div class="servixte-box">
                  <a href="" data-toggle="modal" data-target=".modal1" ><img  class="img-responsive" id="img-video" src="<?php bloginfo('template_url') ?>/img/video.png"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
