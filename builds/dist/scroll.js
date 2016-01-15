$(document).ready(begin);
function begin() {
	$('a[href^="#"]').click(function(){
	var target = $(this).attr('href');
	$('html, body').animate({scrollTop: $(target).offset().top}, 800);
	return false;
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