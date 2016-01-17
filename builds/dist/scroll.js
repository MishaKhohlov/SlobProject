$(document).ready(begin);
function begin() {
	$('a[href^="#"]').click(function(){
	var target = $(this).attr('href');
	$('html, body').animate({scrollTop: $(target).offset().top}, 800);
	return false;
	});
	
	$(window).scroll(function(eventObject){
		var scroll = Math.round($(window).scrollTop());
		$('.header').css("top", scroll+50+'px');
		if(scroll>0) {
			$('.header').addClass('headerShadow');	
		} else {
			$('.header').removeClass('headerShadow');
		}
	});
}

//$('a[href*=#]').bind("click", function(e){
//var anchor = $(this);
//$('html, body').stop().animate({
//scrollTop: $(anchor.attr('href')).offset().top
//}, 1000);
//e.preventDefault();
//});
//return false;