$(document).ready(function(){
    var options = {
        nextButton: true,
        prevButton: true,
        animateStartingFrameIn: true,
        autoPlayDelay: 3000,
        preloader: true,
        pauseOnHover: false,
        preloadTheseFrames: [2]
    };
    
    var sequence = $("#sequence").sequence(options).data("sequence");

    sequence.afterLoaded = function() {
		/**
		 * Create the navigation bullets
		 */
		var nav = document.createElement('ul');
		var li;
		
		nav.className = "nav";
		
		for( i=0; i < sequence.numberOfFrames; i++){
			li = document.createElement('li');
			nav.appendChild(li);
		}
		
		$("#sequence-theme").append(nav);
		
		 
        $("#sequence-theme .nav").fadeIn(100);
        $("#sequence-theme .nav li:nth-child("+(sequence.settings.startingFrameID)+")").addClass("active");
    }

    sequence.beforeNextFrameAnimatesIn = function() {
        $("#sequence-theme .nav li:not(:nth-child("+(sequence.nextFrameID)+"))").removeClass("active");
        $("#sequence-theme .nav li:nth-child("+(sequence.nextFrameID)+")").addClass("active");
		
		/**
		 * Align full width images horizontally to the center
		 */
		$("#sequence-theme .full-width img").each(function() {
			if ( $(this).width() > $(this).parent().width() ){
				$(this).css({
					left: ($(this).parent().width() - $(this).width()) / 2
				});
			}
		});
	
		/**
		 * Align png and framed images vertically to the center
		 */ 
		$("#sequence-theme .png, #sequence-theme .framed-img").each(function() {
			var pos;
			if ( $("#sequence-theme").height() > 315 )
				pos = (($(this).parent().height() - 80) - $(this).height()) / 2;
			else
				pos = ($(this).parent().height() - $(this).height()) / 2;
			
			if ($(this).height() != 0)
				$(this).css({ bottom: pos });
		});
    }
    
    $("#sequence-theme").on("click", ".nav li", function() {
        $(this).children("img").removeClass("active").children("img").addClass("active");
        sequence.nextFrameID = $(this).index()+1;
        sequence.goTo(sequence.nextFrameID);
    });
	
	
	/**
	 * Sequence slider controls effect
	 */
	$('#sequence-theme').hover(
		function () {
			$('#sequence-theme .prev').stop().animate({opacity:1, left: '3%'}, 500);
			$('#sequence-theme .next').stop().animate({opacity:1, right: '3%'}, 500);
		}, 
		function () {
			$('#sequence-theme .prev').stop().animate({opacity:0, left: '1%'}, 500);
			$('#sequence-theme .next').stop().animate({opacity:0, right: '1%'}, 500);
		}
	);
	
});