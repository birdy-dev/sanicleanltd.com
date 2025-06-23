/*
* Author: Wisely Themes
* Author URI: http://creativemarket.com/wiselythemes
* Theme Name: Arctic
* Theme URI: http://www.wiselythemes.com/arctic
* Version: 1.0.0
*/
var templateSettings = {

	initialized: false,

	init: function() {
		"use strict";
		
		var $tis = this;

		if ($tis.initialized){ 
			return;
		}
		
		$tis.initialized = true;

		/**
		 * Append minicolors CSS
		 */
		$('head').append('<link href="css/jquery.minicolors.css" rel="stylesheet" type="text/css" />');
		
		/**
		 * Get minicolors Script
		 */
		$.getScript("js/jquery.minicolors.js", function() {
			$tis.construct();
			$tis.events();
		}).fail(function() {
			//alert( "Failed to load Template Settings Panel!" );
		});
	},

	construct: function() {
		"use strict";
		
		var $tis = this;
		
		$('.minicolors').minicolors({
			theme: 'bootstrap',
			change: function(hex){ 
						$tis.configColor(hex); 
					}
		});
	},

	events: function() {
		"use strict";
		
		var $tis = this;
		
		/**
		 * Template Settings Panel Open/Close
		 */
		var opened = false;
		$("#editor-icon").click(function(){
			if (opened){
				$('#template-settings').animate({left: '-185px'}, 400, 'easeInExpo');
				opened = false;
			}else{
				$('#template-settings').animate({left: '0px'}, 400, 'easeOutExpo');
				opened = true;
			}
		});
		
		/**
		 * Patterns
		 */
		$(".settings-pattern img").click(function(){
			$tis.setPattern($(this), $(this).attr("id"));
		});
		
		/**
		 * Theme Style
		 */
		$('select[name=theme]').change(function() {
			$tis.setTheme($(this).find('option:selected').val());
		});
		
		/**
		 * Menu Style
		 */
		$('select[name=menuStyle]').change(function() {
			$tis.setMenuStyle($(this).find('option:selected').val());
		});
		
		/**
		 *  Font Style
		 */
		$('select[name=fontStyle]').change(function() {
			$tis.setFontStyle($(this).find('option:selected').val());
		});
	},

	configColor: function(clr) {
		"use strict";
		
		$('#custom_color').remove();
		$('head').append('<style type="text/css" id="custom_color" />');

		$('#custom_color').html(
			'.txt-highlight-color, a, .sf-menu > li:hover a, .sf-menu li li a, .sf-menu > li.selected > a, #nav-mobile-holder > div:hover, .nav-mobile-div-active, #nav.black .sf-menu > li:hover a, #nav.black .sf-menu li li a, #nav.black .sf-menu > li.selected > a, .featured-item:hover .title, .featured-item:hover span a {color:' + clr + ';}'+
			'.bg-color, .flex-direction-nav a:hover, #services .service-item .item-info a:hover, .vertical-pricing-item:hover  li.title, .vertical-pricing-item:hover  li.price, .page-next:hover, .page-prev:hover, #sequence-theme .title-right.bg-color:before, #sequence-theme .title-top.bg-color:before, #sequence-theme .title-rotateRight.bg-color:before, #sequence-theme .title-fade.bg-color:before {background-color:' + clr + ';}'+
			'.border-color, .featured-item:hover .featured-item-img, #projects-slider .slides > li:hover, #projects-slider-home2 .slides > li:hover, #featured-slider .slides li:hover, .vertical-tabs > ul > li.selected, .portfolio-item:hover, .portfolio4-item:hover .portfolio4-item-img, .featured1-home2:hover .featured-item-img {border-color:' + clr + ';}'+
			'.triangle-down, .featured-item:hover .triangle-down, .vertical-pricing-item:hover li.price .triangle-down, .featured1-home2:hover .featured-item-img .triangle-down, .portfolio-item:hover .triangle-down {border-top-color:' + clr + ';}'+
			'.triangle-up, #projects-slider .slides > li:hover .triangle-up, #projects-slider-home2 .slides > li:hover .triangle-up, .portfolio-item:hover .triangle-up {border-bottom-color:' + clr + ';}'+
			'.triangle-right {border-left-color:' + clr + ';}'
		);
	},

	setPattern: function(img, pattern) {
		"use strict";
		
		$(".settings-pattern img").removeClass("selected");
		$(img).addClass("selected");
		$(".bg-pattern").css('background-image', 'url(imgs/patterns/' + pattern + '.png)');
	},
	
	setTheme: function(val){
		"use strict";
		
		if(val === 'darktheme'){
			$('head').append('<link href="css/darktheme.css" rel="stylesheet" type="text/css" id="darktheme" />');
		}
		else {
			$('#darktheme').remove();
		}
	},
	
	setMenuStyle: function(val){
		"use strict";
		
		if(val === 'Light Menu') {
			$("#nav").removeClass("black");
		}
		else{
			$("#nav").addClass("black");
		}
	},
	
	setFontStyle: function(val){
		"use strict";
		
		if(val === 'Light') {
			$(".hcfc").css("color", "#ffffff");
			$("#featured-slider").removeClass("dark");
		}
		else{
			$(".hcfc").css("color", "#222222");
			$("#featured-slider").addClass("dark");
		}
	}
};

templateSettings.init();