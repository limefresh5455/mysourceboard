  
var slider = $('.slick-carousel-solutions').slick({
  infinite: true,
  slidesToShow: 1, 
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 15000,
  dots: false,
  fade: false,
  speed: 1500,
  pauseOnHover: true,
  cssEase: 'ease-in-out',
  //pauseOnFocus: false,
  asNavFor: '.slider-nav'
});
  slider.on('afterChange', function(event, slick, currentSlide, nextSlide){  
  console.log(currentSlide)
  $('.csfMenu a').removeClass('slick-active');
  $('.csfMenu a[data-slide=' + (currentSlide + 1) + ']').addClass('slick-active');  
})
   $('a[data-slide]').click(function(e) {
   e.preventDefault();
   var slideno = $(this).data('slide');
   $('.slider-nav').slick('slickGoTo', slideno - 1);   
     console.log(this)     
   $('.csfMenu a').removeClass('slick-active');
        $(this).addClass('slick-active');
  }); 
  $(".csfMenu a[data-slide='1']").addClass('slick-active');