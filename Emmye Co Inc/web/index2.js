// Find all iframes
var $iframes = $( "iframe" );
 
// Find &amp;amp;#x26; save the aspect ratio for all iframes
$iframes.each(function () {
  $( this ).data( "ratio", this.height / this.width )
    // Remove the hardcoded width &amp;amp;#x26; height attributes
    .removeAttr( "width" )
    .removeAttr( "height" );
});
 
// Resize the iframes when the window is resized
$( window ).resize( function () {
  $iframes.each( function() {
    // Get the parent container&amp;amp;#x27;s width
    var width = $( this ).parent().width();
    $( this ).width( width )
      .height( width * $( this ).data( "ratio" ) );
  });
// Resize to fix all iframes on page load.
}).resize();






$(document).ready(function() {
   // Transition effect for navbar
   $(window).scroll(function() {

      

      // checks if window is scroll is less than 80px, adds/removes solid class
      if($(this).scrollTop() > 1){

         $(".navbar").addClass("start");
        
      } else {
         $(".navbar").removeClass("solid");
      }
   });
});







$(document).ready(function() {
   // Transition effect for navbar
   $(window).scroll(function() {

       if($(this).scrollTop() > 100){
            $(".navbar").removeClass("solid");
       }

      // checks if window is scrolled more than 575px, adds/removes solid class
      if ($(this).scrollTop() > 575) {
         $(".navbar").addClass("solid");
      } else {
         $(".navbar").removeClass("solid");
      }
   });
});
