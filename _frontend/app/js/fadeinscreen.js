$(document).ready(function() {
	var $fadeTarget = $('#mainContainer'); // на что применяется эффект плавного появления

   $fadeTarget.css("display", "none"); 

   $fadeTarget.fadeIn(100); /** время появления в миллисекундах */
 
   $("a.js-fade").click(function(event){ 
	   event.preventDefault();
	   linkLocation = this.href;
	   $fadeTarget.fadeOut(100, redirectPage); /** время изчезания в миллисекундах */
   });

   function redirectPage() {
	   window.location = linkLocation;
   }
});
