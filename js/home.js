/**************************************************************************
 * home main
 **************************************************************************/
(function($) {
	let c3 = window.c3 = window.c3 || {};
	let timeoutId;
	const $logo = $('.top-bar .logo');
	const lazyImage = function(section) {
		if (!section) { return; }
		c3.lazyImage(section.item.querySelectorAll('[data-src]'));
	};
	const lazyBgLoad = function(section) {
		if (!section) { return; }
		c3.lazyBgLoad(section.item.querySelectorAll('[data-bg-image]'));
	};
	const updateNav = function(section) {
		if (!section) { return; }
		// color theme / header
		const darkNavTheme = 'dark-nav';
		const $nav = $('#fp-nav');
		const $header = $('header.header');
		const lightTheme = 'light-header';
		// update header theme (uses regular theme in featured section, otherwise uses light theme)
		if (section && section.item.classList.contains('section-featured')) {
			$nav.addClass(darkNavTheme);
			$header.removeClass(lightTheme);
		} else {
			$nav.removeClass(darkNavTheme);
			$header.addClass(lightTheme);
		}
	};
	const updateAnnouncement = function(section) {
		const visiblityClassName = 'is-show';
		const $announcement = $('.announcement');
		if (!section || !$announcement.length) { return; }
		// show announce in hero section, otherwise hide it
		if (section && section.item.classList.contains('section-hero')) {
			$announcement.addClass(visiblityClassName);
		} else {
			$announcement.removeClass(visiblityClassName);
		}
	};
	$(document).ready(function() {
		// fullpage
		var navlabels = $("#fullpagenavlabels").data('labels').split(',');
		$('#fullpage').fullpage({
			licenseKey: 'D8228F9E-36E54825-8D971E23-DA26E927',
			verticalCentered: false,
			css3: true,
			navigation: true,
			navigationPosition: 'right',
			navigationTooltips: navlabels,
			scrollOverflow: true,
			scrollingSpeed: 1200,
			responsiveHeight: 526,
			lazyLoading: false,
			afterRender: function () {
				clearTimeout(timeoutId);
				c3.startHeroAnimation && c3.startHeroAnimation();
				const section = $.fn.fullpage.getActiveSection();
				updateNav(section);
			},
			onLeave: function (origin, destination, direction) {
				lazyBgLoad(destination);
				lazyImage(destination);
				updateAnnouncement(destination);
				// nav
				if (origin && destination) {
					if (destination.index === 0) {
						c3.hideHamburgerHeader();
					} else {
						c3.showHamburgerHeader();
					}
				}
				// hero
				if (destination && destination.item.classList.contains('section-hero')) {
					// if destination is hero, then start animation
					c3.startHeroAnimation && c3.startHeroAnimation();
				} else if (origin && origin.item.classList.contains('section-hero')) {
					// if origin is hero, then stop animation
					c3.stopHeroAnimation && c3.stopHeroAnimation();
				}
				// case study
				if (destination && destination.item.classList.contains('section-case-study')) {
					// if destination is case-study, then start animation
					c3.startCaseStudyAnimation && c3.startCaseStudyAnimation();
				} else if (origin && origin.item.classList.contains('section-case-study')) {
					// if origin is case-study, then stop animation
					c3.stopCaseStudyAnimation && c3.stopCaseStudyAnimation();
				}
				// products
				if (destination && destination.item.classList.contains('section-products')) {
					// if destination is products, then start animation
					c3.startProductsAnimation && c3.startProductsAnimation();
				} else if (origin && origin.item.classList.contains('section-products')) {
					// if origin is products, then stop animation
					c3.stopProductsAnimation && c3.stopProductsAnimation();
				}
				// industries
				if (destination && destination.item.classList.contains('section-industries')) {
					// if destination is industries, then start animation
					c3.startIndustriesAnimation && c3.startIndustriesAnimation();
				} else if (origin && origin.item.classList.contains('section-industries')) {
					// if origin is industries, then stop animation
					c3.stopIndustriesAnimation && c3.stopIndustriesAnimation();
				}
				// color theme / header
				updateNav(destination);
				// header logo
				$logo.fadeOut(200);
			},
			afterLoad: function(origin, destination, direction){
				if (destination && !destination.item.classList.contains('home-footer')) {
					// show header logo if the section is not footer
					$logo.fadeIn(200);
				}
			}
		});
		// disabling scrolling
		c3.disableFPScroll();
		c3.initHamburgerHeader();
		// call first section if afterRender is not called
		// timeoutId = setTimeout(function() {
		// 	c3.startHeroAnimation && c3.startHeroAnimation();
		// 	const section = $.fn.fullpage.getActiveSection();
		// 	updateNav(section);
		// }, 1000);
	});
	/************************************
	* hamburger header
	* for homepage, create hamburger icon to show/hide depends on sections
	************************************/
	let headerMenuItems;
	let $headerLinesEl;
	let $headerGridContainerEl;
	c3.showHamburgerHeader = function() {
		if ($headerGridContainerEl.classList.contains('has-hamburger')) {
			return;
		}
		$headerGridContainerEl.classList.add('has-hamburger');
		$headerGridContainerEl.classList.add('is-transition');
		const linesPos = $headerLinesEl.getBoundingClientRect();
		headerMenuItems.forEach(function(item) {
			// hide text
			anime.remove(item.$labelEl);
			anime.remove(item.$lineEl);
			anime({
				targets: item.$labelEl,
				translateY: ['0%', '100%'],
				delay: function () { return item.index * 30; },
				easing: 'easeInOutQuad',
				scrollingSpeed: 1500,
				complete: function() {
					anime({
						targets: item.$lineEl,
						opacity: [0, 1],
						duration: 100,
						delay: 50,
						easing: 'linear',
						complete: function() {
							anime({
								targets: item.pos,
								scaleX: 1,
								translateX: 0,
								duration: 300,
								easing: 'easeInOutQuad',
								update: function() {
									item.$lineEl.style.transform = 'translateX(' + item.pos.translateX + 'px) scaleX(' + item.pos.scaleX + ')';
								},
								complete: function() {
									if (item.index === 0) {
										$headerGridContainerEl.classList.remove('is-transition');
									}
									if (item.index < 3) {
										anime({
											targets: item.$lineEl,
											translateY: [0, ((item.index * 8) - 8)],
											duration: 100,
											delay: 350 - (item.index * 30),
											easing: 'easeInOutQuad'
										});
									} else {
										item.$lineEl.style.opacity = 0;
									}
								}
							});
						}
					});
				}
			});
			// prep line
			const pos = item.$labelEl.getBoundingClientRect();
			item.pos = {
				translateX: pos.left - linesPos.right + 24,
				scaleX: pos.width / 24
			};
			anime({
				targets: item.$lineEl,
				translateX: item.pos.translateX,
				scaleX: item.pos.scaleX,
				duration: 0,
				opacity: 0,
				easing: 'linear'
			});
		});
	};
	c3.hideHamburgerHeader = function() {
		if (!$headerGridContainerEl.classList.contains('has-hamburger')) {
			return;
		}
		$headerGridContainerEl.classList.add('is-transition');
		headerMenuItems.forEach(function(item) {
			// hide lines
			anime.remove(item.$labelEl);
			anime.remove(item.$lineEl);
			anime({
				targets: item.$lineEl,
				translateY: item.index < 3 ? [((item.index * 10) - 10), 0] : 0,
				opacity: 1,
				duration: 200,
				easing: 'easeInQuad',
				complete: function() {
					anime({
						targets: item.$lineEl,
						scaleX: [1, 0],
						opacity: [1, 0],
						duration: 200,
						easing: 'easeOutQuad',
						complete: function() {
							anime({
								targets: item.$labelEl,
								translateY: ['100%', '0%'],
								delay: function () { return item.index * 30; },
								easing: 'easeInOutQuad',
								duration: 300,
								complete: function() {
									if (item.index === 0) {
										$headerGridContainerEl.classList.remove('has-hamburger');
										$headerGridContainerEl.classList.remove('is-transition');
									}
								}
							});
						}
					});
				}
			});
		});
	};
	c3.initHamburgerHeader = function() {
		// add extra node in menu-item
		$headerGridContainerEl = document.querySelector('.header .top-bar .grid-container');
		$headerLinesEl = document.createElement('div');
		$headerLinesEl.classList.add('header--menu-item-lines');
		$headerLinesEl.addEventListener('click', c3.hideHamburgerHeader);
		$headerGridContainerEl.appendChild($headerLinesEl);
		headerMenuItems = Array.prototype.slice.call($headerGridContainerEl.querySelectorAll('.header .top-bar-right > .menu > .menu-item > a')).map(function($el, index) {
			$el.innerHTML = '<span class="header--menu-item-label-wrapper"><span class="header--menu-item-label">' + $el.innerText + '</span></span>';
			const $lineEl = document.createElement('div');
			$lineEl.classList.add('header--menu-item-line');
			$el.parentNode.classList.add('header--menu-item-list');
			$headerLinesEl.appendChild($lineEl);
			return {
				index: index,
				$el: $el,
				$parentEl: $el.parentNode, // <li></li>
				$labelEl: $el.querySelector('.header--menu-item-label'),
				$lineEl: $lineEl
			};
		});
	};
	/************************************
	* start app
	* add `has-started` class in body and make fullpage js enabled
	************************************/
	c3.startApp = function() {
		if (!c3.startFlag) {
			c3.startFlag = true;
			document.body.classList.add('has-started');
			c3.enableFPScroll();
			// show banner
			const section = $.fn.fullpage.getActiveSection();
			updateAnnouncement(section);
			c3.lazyImage(document.querySelector('.announcement').querySelectorAll('[data-src]'));
			c3.lazyImage(document.getElementById('hero-modal').querySelectorAll('[data-src]'));
		}
	};
})(jQuery);

/**************************************************************************
 * hero
 **************************************************************************/
const introStartTime = Date.now();
const $c3IconEl = document.querySelector('.section-hero--c3-icon');
const showIntroLogo = function() {
	$c3IconEl.classList.add('is-show');
};
const hideIntroLogo = function() {
	$c3IconEl.classList.remove('is-show');
};
// show intro
showIntroLogo();
(function($) {
	let c3 = window.c3 = window.c3 || {};
	const $mainEl = document.querySelector('.section-hero');
	const $modalEl = document.querySelector('#hero-modal');
	
	/**
	 * Carousel
	 */
	let carousel = null;
	const $textElms = $mainEl.querySelectorAll('.section-hero--item');

	const initCarousel = function() {
		const carouselSelector = '.section-hero [' + c3.VideoCarousel.srcAttr + ']';
		if (c3.isMobile || c3.noVideos) {
			carousel = new c3.ImageCarousel(carouselSelector, 5000);
		} else {
			carousel = new c3.VideoCarousel(carouselSelector, 5000, 500);
		}

		carousel.on('change', function(indices) {
			if (indices.activeIndex !== null) {
				$textElms[indices.activeIndex].classList.add('is-active');
				$textElms[indices.activeIndex].classList.remove('is-hiding');
			}
			if (indices.lastIndex !== null) {
				$textElms[indices.lastIndex].classList.remove('is-active');
				$textElms[indices.lastIndex].classList.add('is-hiding');
			}
		});

		carousel.on('end', function(index) {
			$textElms[index].classList.add('is-hiding');
		});

		if (carousel.isReady) {
			if (!c3.startFlag) {
				// check intro logo time
				const diffTime = Date.now() - introStartTime;
				const duration = Math.max(0, 2000 - diffTime);
				setTimeout(function() {
					// open curtain animation
					$mainEl.querySelector('.section-hero--curtain-overlay').classList.add('is-open');
					c3.startApp();
					// hide intro
					hideIntroLogo();
				}, duration);
			}
		} else {
			carousel.once('ready', function() {
				if (!c3.startFlag) {
					// check intro logo time
					const diffTime = Date.now() - introStartTime;
					const duration = Math.max(0, 2000 - diffTime);
					setTimeout(function() {
						// open curtain animation
						$mainEl.querySelector('.section-hero--curtain-overlay').classList.add('is-open');
						c3.startApp();
						// hide intro
						hideIntroLogo();
					}, duration);
				}
			});
		}
	};

	// add transition delay to modal menu
	$modalEl.querySelectorAll('h3').forEach(function($el, index) {
		$el.style.transitionDelay = ((70 * index) + 400) + 'ms';
	});

	const startHeroAnimation = function() {
		if (carousel) {
			carousel.start();
		}
	};
	const stopHeroAnimation = function() {
		if (carousel) {
			carousel.stop();
		}
	};
	const openHeroModal = function() {
		c3.disableFPScroll();
		$modalEl.classList.add('is-open');
	};
	const closedHeroModal = function() {
		c3.enableFPScroll();
		$modalEl.classList.remove('is-open');
	};
	c3.startHeroAnimation = startHeroAnimation;
	c3.stopHeroAnimation = stopHeroAnimation;
	// modal event (DEPENDS ON JQUERY !!!!!)
	window.jQuery('#hero-modal').on('open.zf.reveal', openHeroModal);
	window.jQuery('#hero-modal').on('closed.zf.reveal', closedHeroModal);
	document.addEventListener('DOMContentLoaded', initCarousel);
})(window, document);

/**************************************************************************
 * casestudies
 **************************************************************************/
(function(window, document) {
	let c3 = window.c3 = window.c3 || {};
	let carousel;
	let firstFlag = true;
	const $mainEl = document.querySelector('.section-case-study');
	const $textElms = $mainEl.querySelectorAll('.section-case-study--item');
	const $ctaElms = $mainEl.querySelectorAll('.c3-slide-button');
	const $thumbElms = $mainEl.querySelectorAll('.overlay-item');
	const $videoModalEl = document.getElementById('c3-video--modal');
	const initCarousel = function() {
		const carouselSelector = '.section-case-study [' + c3.VideoCarousel.srcAttr + ']';
		if (c3.isMobile || c3.noVideos) {
			carousel = new c3.ImageCarousel(carouselSelector, 5000);
		} else {
			carousel = new c3.VideoCarousel(carouselSelector, 5000, 500);
		}

		carousel.on('change', function(indices) {
			if (indices.activeIndex !== null) {
				$textElms[indices.activeIndex].classList.add('is-active');
				$thumbElms[indices.activeIndex].classList.add('active');
				c3.showSlideButton($ctaElms[indices.activeIndex]);
			}

			if (indices.lastIndex !== null) {
				$textElms[indices.lastIndex].classList.remove('is-active');
				$thumbElms[indices.lastIndex].classList.remove('active');
				c3.hideSlideButton($ctaElms[indices.lastIndex]);
			}
		});

		if (carousel.isReady) {
			if (firstFlag) {
				firstFlag = false;
			}
		} else {
			carousel.once('ready', function() {
				if (firstFlag) {
					firstFlag = false;
				}
			});
		}

		$thumbElms.forEach(function(el, idx) {
			el.addEventListener('click', function() {
				if (idx > -1 && idx < carousel.containers.length && idx !== carousel.activeIndex) {
					carousel.next(idx);
				}
			});
		});

		// add slick
		window.jQuery('.logo-carousel').slick({
      infinite: false,
      slidesToShow: 10,
      slidesToScroll: 10,
      prevArrow: false,
        nextArrow: '<img class="a-right control-c next slick-next" src="/wp-content/themes/c3-ai-theme/assets/images/chevron-right-small.svg">',
				responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 6
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 5
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				}
			]
    });
	};

	const openModal = function() {};
	const closeModal = function() {};
	const startCaseStudyAnimation = function() {
		if (carousel) {
			carousel.start();
		}

		window.jQuery($videoModalEl).on('open.zf.reveal', openModal);
		window.jQuery($videoModalEl).on('closed.zf.reveal', closeModal);
	};
	const stopCaseStudyAnimation = function() {
		if (carousel) {
			carousel.stop();
		}

		window.jQuery($videoModalEl).off('open.zf.reveal', openModal);
		window.jQuery($videoModalEl).off('closed.zf.reveal', closeModal);
	};
	c3.startCaseStudyAnimation = startCaseStudyAnimation;
	c3.stopCaseStudyAnimation = stopCaseStudyAnimation;
	document.addEventListener('DOMContentLoaded', initCarousel);
})(window, document);

/**************************************************************************
 * products
 **************************************************************************/
(function($) {
	// set all element
	let firstFlag = true;
	const $mainEl = document.querySelector('.section-products');
	const $c3AISuiteLogoElm = $mainEl.querySelector('.section-products--c3-ai-suite-logo');
	const $c3AISuiteTitleElm = $mainEl.querySelector('.section-products--c3-ai-suite-title');
	const c3AISuitePathItems = Array.prototype.slice.call($mainEl.querySelectorAll('.section-products--morethan-small .section-products--c3-ai-suite-logo-path')).map(function($el, index) { return {
		$el: $el,
		index: index,
		delay: +$el.getAttribute('data-delay') || 0,
		fromD: $el.getAttribute('d'),
		toD: $el.getAttribute('data-to-d')
	}; });
	const c3ProductItems = Array.prototype.slice.call($mainEl.querySelectorAll('.section-products--item')).map(function($el, index) { return {
		$el: $el,
		$logoEl: $el.querySelector('.section-products--item-logo'),
		$titleEl: $el.querySelector('.section-products--item-title'),
		index: index,
		initX: index % 4 < 2 ? -30 : 30,
		initY: Math.floor(index / 4) < 1 ? -30 : 30
	}; });
	const showProductsAnimation = function() {
		// c3 AI suite logo
		anime.remove($c3AISuiteLogoElm);
		anime({
			targets: $c3AISuiteLogoElm,
			scale: [0.6, 1],
			duration: 1300,
			delay: 800
		});
		anime.remove($c3AISuiteTitleElm);
		anime({
			targets: $c3AISuiteTitleElm,
			opacity: [0, 1],
			duration: 500,
			delay: 1500
		});
		c3AISuitePathItems.forEach(function(item) {
			anime.remove(item.$el);
			anime({
				targets: item.$el,
				d: item.toD,
				duration: 500,
				delay: function() { return item.delay + 800 },
				easing: 'easeInOutExpo'
			});
		});
		// c3 products
		c3ProductItems.forEach(function(item) {
			anime.remove(item.$logoEl);
			anime.remove(item.$titleEl);
			anime({
				targets: item.$logoEl,
				duration: 800,
				opacity: [0, 1],
				scale: [0.6, 1],
				translateX: [item.initX, 0],
				translateY: [item.initY, 0],
				delay: function() { return (item.index * 100) + 1300 }
			});
			anime({
				targets: item.$titleEl,
				duration: 800,
				opacity: [0, 1],
				scale: [0.6, 1],
				translateX: [item.initX, 0],
				translateY: [item.initY, 0],
				delay: function() { return (item.index * 100) + 1400 }
			});
		});
	}
	const hideProductsAnimation = function() {
		// c3 AI suite logo
		anime.remove($c3AISuiteTitleElm);
		anime({
			targets: $c3AISuiteTitleElm,
			opacity: [1, 0],
			duration: 500,
		});
		c3AISuitePathItems.forEach(function(item) {
			anime.remove(item.$el);
			anime({
				targets: item.$el,
				d: item.fromD,
				duration: 200,
				delay: 300
			});
		});
		// c3 products
		c3ProductItems.forEach(function(item) {
			anime.remove(item.$logoEl);
			anime.remove(item.$titleEl);
			anime({
				targets: [item.$logoEl, item.$titleEl],
				duration: 200,
				opacity: 0,
				delay: 300
			});
		});
	}
	const initProducts = function() {
		// slick for mobile
		$('.section-products--mobile-items').slick({
			arrows: false,
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 3,
			variableWidth: true
		});
	};
	const startProductsAnimation = function() {
		showProductsAnimation();
		if (firstFlag) {
			firstFlag = false;
		}
	};
	const stopProductsAnimation = function() {
		hideProductsAnimation();
	};
	// set public function
	let c3 = window.c3 = window.c3 || {};
	c3.startProductsAnimation = startProductsAnimation;
	c3.stopProductsAnimation = stopProductsAnimation;
	$(document).ready(initProducts);
})(jQuery);

/**************************************************************************
 * industries
 **************************************************************************/
(function($) {
	let c3 = window.c3 = window.c3 || {};
	let firstFlag = true;
	// set all element
	const $mailEl = document.querySelector('.section-industries');
	// list
	const $listItemsWrapperEl = $mailEl.querySelector('.section-industries--list-items-wrapper');
	const $listItemsEl = $mailEl.querySelector('.section-industries--list-items');
	const $listItemElms = $mailEl.querySelectorAll('.section-industries--list-item');
	const $listItemBgImageElms = $mailEl.querySelectorAll('.section-industries--list-item-bg-image');
	const $listItemLinkElms = $mailEl.querySelectorAll('.section-industries--list-item-link');
	// intro
	const $introBgEl = $mailEl.querySelector('.section-industries--intro-bg');
	const $introElms = $mailEl.querySelectorAll('.section-industries--intro-item');
	const introItems = Array.prototype.slice.call($introElms).map(function($el, index) {
		return {
			$el: $el,
			index: index,
			$bgImageEl: $listItemBgImageElms[index],
			$videoThumBgEl: $el.querySelector('.section-industries--intro-video-thumb-bg'),
			$captionLogoEl: $el.querySelector('.section-industries--intro-item-caption-logo'),
			$captionTextEl: $el.querySelector('.section-industries--intro-item-caption-right'),
			$textEl: $el.querySelector('.section-industries--intro-item-text'),
			$ctaEl: $el.querySelector('.c3-slide-button')
		};
	});

	const totalListLength = $listItemElms.length;
	let activeIndex = null;
	// time ids
	let intervalId;
	let updateAnimationTimeId;
	let activateTimeoutId;

	// activate item
	function activateItem(index) {
		if (index === activeIndex) { return; }
		clearTimeout(activateTimeoutId);
		$mailEl.classList.add('is-transitioning');
		let activeIntroItem;
		// clear current active item
		if (typeof activeIndex === 'number') {
			$listItemLinkElms[activeIndex].classList.remove('is-active');
			activeIntroItem = introItems[activeIndex];
			c3.hideSlideButton(activeIntroItem.$ctaEl);
			// move black bg to left
			anime({
				targets: $introBgEl,
				scaleX: [0.5, 1],
				duration: 500,
				easing: 'easeOutQuad',
			});
			// hide current active intro
			anime({
				targets: activeIntroItem.$videoThumBgEl,
				scaleX: [0, 1],
				duration: 300,
				easing: 'easeInQuad',
			});
			anime({
				targets: activeIntroItem.$captionLogoEl,
				opacity: [1, 0],
				translateY: [0, 10],
				delay: 200,
				duration: 250,
				easing: 'easeOutQuad',
			});
			anime({
				targets: activeIntroItem.$captionTextEl,
				opacity: [1, 0],
				translateY: [0, 10],
				delay: 250,
				duration: 250,
				easing: 'easeOutQuad',
			});
			anime({
				targets: activeIntroItem.$textEl,
				opacity: [1, 0],
				translateY: [0, -10],
				delay: 200,
				duration: 250,
				easing: 'easeOutQuad',
			});
		}
		// activate item
		activateTimeoutId = setTimeout(function() {
			if (typeof activeIndex === 'number') {
				activeIntroItem.$el.classList.remove('is-active');
				activeIntroItem.$bgImageEl.classList.remove('is-active');
			}
			activeIndex = index;
			$mailEl.classList.remove('is-transitioning');
			if (typeof activeIndex === 'number') {
				$listItemLinkElms[activeIndex].classList.add('is-active');
				activeIntroItem = introItems[activeIndex];
				activeIntroItem.$el.classList.add('is-active');
				activeIntroItem.$bgImageEl.classList.add('is-active');
				// move black bg to right
				anime({
					targets: $introBgEl,
					scaleX: [1, 0.5],
					duration: 300,
					easing: 'easeInQuad',
				});
				anime({
					targets: activeIntroItem.$videoThumBgEl,
					scaleX: [1, 0],
					duration: 200,
					easing: 'easeInQuad',
				});
				anime({
					targets: activeIntroItem.$captionLogoEl,
					opacity: [0, 1],
					translateY: [10, 0],
					delay: 200,
					duration: 250,
					easing: 'easeInQuad',
				});
				anime({
					targets: activeIntroItem.$captionTextEl,
					opacity: [0, 1],
					translateY: [10, 0],
					delay: 250,
					duration: 250,
					easing: 'easeInQuad',
				});
				anime({
					targets: activeIntroItem.$textEl,
					opacity: [0, 1],
					translateY: [-10, 0],
					delay: 200,
					duration: 250,
					easing: 'easeInQuad',
				});
				c3.showSlideButton(activeIntroItem.$ctaEl);
			}
		}, 500);
	}
	function activateNextItem() {
		let nextIndex = activeIndex + 1;
		if (nextIndex === totalListLength) {
			nextIndex = 0;
		}
		activateItem(nextIndex);
	}
	function activatePrevItem() {
		let prevIndex = activeIndex - 1;
		if (prevIndex < 0) {
			prevIndex = 0;
		}
		activateItem(prevIndex);
	}
	function startIntervalAnimation() {
		intervalId =  setInterval(activateNextItem, 10000);
	}
	function stopIntervalAnimation() {
		clearInterval(intervalId);
	}
	function resumeIndustriesAnimation() {
		stopIntervalAnimation();
		resetIndustriesAnimation();
		// show box
		anime({
			targets: $listItemElms,
			opacity: [0, 1],
			translateX: [-50, 0],
			duration: 500,
			easing: 'easeOutQuad',
			delay: function(el, i, l) { return (i * 50) + 500; }
		});
		// start intro
		startIntervalAnimation();
		activateItem(0);
	}
	function pauseIndustriesAnimation() {
		clearTimeout(updateAnimationTimeId);
		// hide box
		anime({
			targets: $listItemElms,
			opacity: [1, 0],
			translateX: [0, 50],
			duration: 500,
			easing: 'easeOutQuad',
			delay: function(el, i, l) { return (i * 50); }
		});
		// stop intro
		stopIntervalAnimation();
		activateItem(null);
	}
	function updateIndustriesAnimation() {
		clearTimeout(updateAnimationTimeId);
		updateAnimationTimeId = setTimeout(resetIndustriesAnimation, 500);
	}
	function resetIndustriesAnimation() {
		const listItemFontsize = Math.floor(Math.min(47, ((window.innerHeight - 90 - 15) / (1.6 * totalListLength))));
		Array.prototype.slice.call($listItemLinkElms).forEach(function($el) {
			$el.style.fontSize = listItemFontsize + 'px';
		});
	}
	// activate item when clicking list title
	Array.prototype.slice.call($listItemLinkElms).forEach(function($el, index) {
		$el.addEventListener('click', function() {
			stopIntervalAnimation();
			activateItem(index);
		});
	});
	// stop interval animation when clicking video thumbnail
	const $mailElThumb = $mailEl.querySelector('.c3-video--thumb');
	if ( $mailElThumb ) {
		$mailElThumb.addEventListener('click', stopIntervalAnimation);
	}

	// set public function
	c3.startIndustriesAnimation = function() {
		window.addEventListener('resize', updateIndustriesAnimation);
		resumeIndustriesAnimation();
		if (firstFlag) {
			firstFlag = false;
		}
	};
	c3.stopIndustriesAnimation = function() {
		window.removeEventListener('resize', updateIndustriesAnimation);
		pauseIndustriesAnimation();
	};
})(jQuery);

/**************************************************************************
 * featured
 **************************************************************************/


/**************************************************************************
 * layout
 **************************************************************************/


