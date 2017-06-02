<?php get_header('blog'); ?>
  <section id="head-blog">
    <div style="padding-top:50px;" class="container text-center">
      <div style="margin-top:0px; " class="header-content">
        <h1 style="text-shadow:0px 2px 10px black; color:white;">Suscríbete y consigue acceso al mejor contenido para emprendedores y empresarios de exito.</h1>
        <hr>
        <form class="form-inline">
          <div class="form-group">
            <input type="text" class="form-control btn-lg" placeholder="Nombre" style="height:55px;"aria-describedby="sizing-addon1">
          </div>
          <div class="form-group">
            <input type="text" class="form-control btn-lg" style="height:55px;" placeholder="Correo Electronico" aria-describedby="sizing-addon1">
          </div>
        <button style="background-color:#FC5810; height:55px;" type="submit" class="btn btn-default btn-lg">¡Quiero formar parte!</button>
        </form>
      </div>
    </div>
  </section>
  <?php get_template_part('categories'); ?>
  <section id="title-masleido" >
    <div class="container text-center">
      <div style="color: #010454" class="col-md-12"><h3>LO MÁS LEÍDO</h3></div>
    </div>
  </section>
  <section class="" id="portfolio">
    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="col-lg-6 col-sm-4">
          <a href="http://facebook.com" class="portfolio-box portfolio-box-1">
            <img width="100%" src="<?php bloginfo('template_url') ?>/blog/img/portfolio/thumbnails/1.jpg" class="img-responsive" alt="">
            <div class="portfolio-box-caption">
              <div class="portfolio-box-caption-content">
                <div class="project-category text-center"></div>
                <div class="project-name">
                  <h3>Como hacer un plan de negocios</h3>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-3 col-sm-4">
          <a href="<?php bloginfo('template_url') ?>/blog/img/portfolio/fullsize/2.jpg" class="portfolio-box">
            <img src="<?php bloginfo('template_url') ?>/blog/img/portfolio/thumbnails/2.jpg" class="img-responsive" alt="">
            <div class="portfolio-box-caption">
              <div class="portfolio-box-caption-content">
                <div class="project-name">
                  <h3>Como hacer un plan de negocios</h3>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-3 col-sm-4">
          <a href="<?php bloginfo('template_url') ?>/blog/img/portfolio/fullsize/3.jpg" class="portfolio-box">
            <img src="<?php bloginfo('template_url') ?>/blog/img/portfolio/thumbnails/3.jpg" class="img-responsive" alt="">
            <div class="portfolio-box-caption">
              <div class="portfolio-box-caption-content">
                <div class="project-name">
                  <h3>Como hacer un plan de negocios</h3>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-3 col-sm-4">
          <a href="<?php bloginfo('template_url') ?>/blog/img/portfolio/fullsize/4.jpg" class="portfolio-box">
            <img src="<?php bloginfo('template_url') ?>/blog/img/portfolio/thumbnails/4.jpg" class="img-responsive" alt="">
            <div class="portfolio-box-caption">
              <div class="portfolio-box-caption-content">
                <div class="project-name">
                  <h3>Como hacer un plan de negocios</h3>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-3 col-sm-4">
          <div style="width:100%; height:100%; background-color:black;"></div>
          <a href="<?php bloginfo('template_url') ?>/blog/img/portfolio/fullsize/5.jpg" class="portfolio-box">
            <img src="<?php bloginfo('template_url') ?>/blog/img/portfolio/thumbnails/5.jpg" class="img-responsive" alt="">
            <div class="portfolio-box-caption">
              <div class="portfolio-box-caption-content">
                <div class="project-name">
                  <h3>Como hacer un plan de negocios</h3>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
  <?php //LO MAS LEIDO
      $query = new WP_Query( array(
        'cat' => -5,
        'posts_per_page'  => 4,  /* get 4 posts, or set -1 for all */
        'orderby'      => 'meta_value_num',  /* this will look at the meta_key you set below */
        'meta_key'     => 'post_views_count',
        'order'        => 'DESC',
        'post_type' => array('news','database'),
        'post_status'  => 'publish'
      ) );



      if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post(); ?>
        <div class="col-lg-3 col-sm-4">
          <div style="width:100%; height:100%; background-color:black;"></div>
          <a href="<?php if(has_post_thumbnail()) { the_post_thumbnail_url(); } ?>" class="portfolio-box">
            <img src="<?php if(has_post_thumbnail()) { the_post_thumbnail_url(); } ?>" class="img-responsive" alt="">
            <div class="portfolio-box-caption">
              <div class="portfolio-box-caption-content">
                <div class="project-name">
                  <h3><?php the_title(); ?></h3>
                </div>
              </div>
            </div>
          </a>
        </div>
    	<?php endwhile; ?>
    	<!-- post navigation -->
    	<?php else: ?>
    	<!-- no posts found -->
    	<?php endif;
  ?>
  <?php
    $query = new WP_Query( array(
      'tag_id' => 6,
      'posts_per_page'  => 5
    ) );

    if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post(); ?>
      <div class="col-lg-3 col-sm-4">
        <div style="width:100%; height:100%; background-color:black;"></div>
        <a href="<?php if(has_post_thumbnail()) { the_post_thumbnail_url(); } ?>" class="portfolio-box">
          <img src="<?php if(has_post_thumbnail()) { the_post_thumbnail_url(); } ?>" class="img-responsive" alt="">
          <div class="portfolio-box-caption">
            <div class="portfolio-box-caption-content">
              <div class="project-name">
                <h3><?php the_title(); ?></h3>
              </div>
            </div>
          </div>
        </a>
      </div>
    <?php endwhile; ?>
    <!-- post navigation -->
    <?php else: ?>
    <!-- no posts found -->
    <?php endif;
  ?>


  <section class="" style="padding-bottom:5px;">
    <div  style="margin-top:-100px; padding-top:10px;" class="container">
      <div style="color: #010454" class="col-md-12 text-center"><h1>Top de descargas</h1></div>
      <br>
      <div class="container">
        <div class="row">
          <?php
           //filtro del loop
           $args = array('cat'=> 5);
           $category_posts = new WP_QUERY($args);

           if ($category_posts->have_posts()) : while ($category_posts->have_posts() && $i < 4) : $category_posts->the_post(); ?>
           <article class="col-lg-4 col-md-3">
             <div class="service-box">
               <a style="max-width:30px;" href="<?php the_permalink(); ?>"><img width="100%" height="auto" src="<?php if(has_post_thumbnail()) { the_post_thumbnail_url(); } ?>"></img></a>
               <h3 class="text-left"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
               <?php the_excerpt(); ?>
             </div>
             <br>
             <div class="service-box text-center">
               <form class="form-inline" action="" method="post">
                 <button style="background-color:#FC5810; height:55px;" type="submit" class="btn btn-default btn-lg">Descargar</button>
               </form>
             </div>
           </article>

          <?php endwhile; ?>
          <!-- post navigation -->
          <?php else: ?>
          <!-- no posts found -->
            <div class="col-sm-6 col-md-6" >
              <div class="thumbnail"  style="border:none;">
                <div class="caption">
                  <h3>No se encontraron descargas</h3>
                </div>
              </div>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </section>
  <hr style="width:100%!important;">
  <section>
    <div class="container">
      <div class="row posts-container">
        <?php
          //loop de wordpress
          $args = array('cat'=> -5);
          $category_posts = new WP_QUERY($args);

          if ($category_posts->have_posts() ) :
            while ( $category_posts->have_posts() ) : $category_posts->the_post(); ?>
              <article class="col-sm-4 col-md-4" >
                <div class="thumbnail"  style="border:none;">
                  <a style="max-width:30px;" href="<?php the_permalink(); ?>"><img width="100%" height="auto" src="<?php if(has_post_thumbnail()) { the_post_thumbnail_url(); } ?>"></img></a>
                  <div class="caption text-align-post">
                    <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                    <?php the_excerpt(); ?>
                  </div>
                </div>
              </article>
        <?php endwhile; ?>
        <!-- post navigation -->
        <?php else: ?>
        <!-- no posts found -->

        <?php endif; ?>
      </div>
      <div class="container text-center">
        <a class="btn btn-lg btn-contacto load-more" data-page="1" data-url="<?php echo admin_url('admin-ajax.php'); ?>">
          <span class="sunset-icon sunset-loading"></span>
          <span class="text">Cargar más</span>
        </a>
      </div>
    </div>
  </section>
  <?php get_footer('blog'); ?>
