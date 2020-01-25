$(document).ready(function() {
   // Transition effect for navbar
   $(window).scroll(function() {

       if($(this).scrollTop() > 100){
            $(".navbar").removeClass("solid");
       }
      // checks if window is scrolled more than 500px, adds/removes solid class
      if ($(this).scrollTop() > 575) {
         $(".navbar").addClass("solid");
      } else {
         $(".navbar").removeClass("solid");
      }
   });
});
