$(window).load(begin);
function begin() {
	if (window.matchMedia('(max-width: 1285px)').matches) {
		console.log('Min')
	}
	var scrollPage = true;
	var scrollLink = true;
	var scrollEnabled = false;
	var accessSlider = true;
	
	setInterval(slider, 50000);
	function slider() {
		if(accessSlider) {
			if($('.slider').hasClass('slide2')) {
				$('.mainContent_slog').fadeOut(2000, function(){
					$('.mainContent_slog').text('Любая недвижимость из надежных рук');
				})
				$('.mainContent_slog').fadeIn(1000);
				$('.slider').removeClass('slide2')	;
			} else {
				$('.mainContent_slog').fadeOut(2000, function(){
					$('.mainContent_slog').text('Репутация, проверенная временем');
				})
				$('.mainContent_slog').fadeIn(1000);
				$('.slider').addClass('slide2')	;
			}
		}	
	};
	setTimeout(event, 1000);
	function event() {
		$('.header_link_request_a').click(function(){
		$('body, html').stop().animate({scrollTop : 0}, 400,  'linear');
		});
		$('.flag').bind("click", function(e){
		scrollLink = false;
		scrollPage = false;
		  var anchor = $(this);
		  $('html, body').stop().animate({
		     scrollTop: $(anchor.attr('href')).offset().top - 60
		  }, 1000);
		  setTimeout(function(){
					scrollLink = true;
				}, 1001);
		  e.preventDefault();
		});	
	}
	$(window).scroll(function(eventObject){
		var scroll = Math.round($(window).scrollTop());
		if (!window.matchMedia('(max-width: 1285px)').matches && scrollLink) {
			if(scroll > 150 && scrollPage) {
				disableScroll();
				$('body, html').stop().animate({scrollTop : 688}, 800,  'linear');
				scrollPage = false;
				scrollEnabled = true;

			}
			if(scrollEnabled) {
				setTimeout(function(){
					enableScroll();
				}, 801);
				scrollEnabled = false;
			}
			if(scroll <= 150) {
				scrollPage = true;
			} 
			if(scroll <= 682) {
				accessSlider = true;
			} else {
				accessSlider = false;
			}
		}
		if(scroll>0) {
			if(!$('.header').hasClass('headerMin')) {
				$('.header').addClass('headerMin');
				$('.header_logo').addClass('header_logoMin');
				$('.linkMenu').addClass('linkMenuMin');
			}
		} else {
			if($('.header').hasClass('headerMin')) {
				$('.header').removeClass('headerMin');
				$('.header_logo').removeClass('header_logoMin');
				$('.linkMenu').removeClass('linkMenuMin');
			}
		}
	});
	// disabled scroll
	var keys = {37: 1, 38: 1, 39: 1, 40: 1};

	function preventDefault(e) {
	  e = e || window.event;
	  if (e.preventDefault)
		  e.preventDefault();
	  e.returnValue = false;  
	}

	function preventDefaultForScrollKeys(e) {
		if (keys[e.keyCode]) {
			preventDefault(e);
			return false;
		}
	}
	function disableScroll() {
	  if (window.addEventListener) // older FF
		  window.addEventListener('DOMMouseScroll', preventDefault, false);
		  window.onwheel = preventDefault; // modern standard
		  window.onmousewheel = document.onmousewheel = preventDefault; 
		  window.ontouchmove  = preventDefault; // mobile
		  document.onkeydown  = preventDefaultForScrollKeys;
	}
	function enableScroll() {
		if (window.removeEventListener)
			window.removeEventListener('DOMMouseScroll', preventDefault, false);
		window.onmousewheel = document.onmousewheel = null; 
		window.onwheel = null; 
		window.ontouchmove = null;  
		document.onkeydown = null;  
	}
}