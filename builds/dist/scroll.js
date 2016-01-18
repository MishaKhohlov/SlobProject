$(window).load(begin);
function begin() {
//	$('a[href^="#"]').click(function(){
//	var target = $(this).attr('href');
//	$('html, body').animate({scrollTop: $(target).offset().top}, 800);
//	return false;
//	});
	setTimeout(readyOn, 20);
	function readyOn() {
		$('.header_link_home').hover(function(event){
			console.log(event.currentTarget.className)
			
		})
	}
	$(window).scroll(function(eventObject){
		var scroll = Math.round($(window).scrollTop());
		//$('.header').css("top", scroll +'px');
		// $(window).scrollTop(673);
		if(scroll>0) {
			if(!$('.header').hasClass('headerMin')) {
				$('.header').addClass('headerMin');
				$('.header_logo').addClass('header_logoMin');
			}
		} else {
			if($('.header').hasClass('headerMin')) {
				$('.header').removeClass('headerMin');
			$('.header_logo').removeClass('header_logoMin');
			}
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