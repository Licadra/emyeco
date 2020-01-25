/*JQuery*/
(function($) {
  let c3 = window.c3 = window.c3 || {};   
  var position = $(this).scrollTop();
  
  var $status = $('.slide-counter');
  var $slickElement = $('.content-carousel');

  $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + ' / ' + slick.slideCount);
  });

  $slickElement.slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    fade: true,
    appendDots: $slickElement.next('.slider-controls').children('.slider-dots'),
    prevArrow: $slickElement.next('.slider-controls').children('.slider-prev'),
    nextArrow: $slickElement.next('.slider-controls').children('.slider-next')
  });

  /*Rotating hero*/
  var $heroContainer = $('.product-heros'),
  $heroes = $heroContainer.find('.rotating-hero'),
  activeClass = 'active',
  pageHeroClass = 'rotating-hero',
  heroTransitionTimer = 3000; // miliseconds

  if ($.browser.msie && $.browser.version == 11) {
    $("body").addClass("ie11");
  }


  
  //updateHeroContainerHeight();
  //$(window).on('resize', updateHeroContainerHeight);
  setInterval(switchHeroes, heroTransitionTimer);
  
  // Set height of heroes based on max height of all heroes.
  /*// This keeps them consistent when transitioning
  function updateHeroContainerHeight() {
    var maxHeroHeight = 0,
      currentMaxHeroHeight = 0;
    $heroes.css('height', 'auto');
    
    $heroes.each(function() {
      var $this = $(this),
        currentHeroHeight = $this.outerHeight();
      if ( currentHeroHeight > maxHeroHeight ) {
        maxHeroHeight = currentHeroHeight
      }
    });
    
    $heroContainer.css('height', maxHeroHeight);
    $heroes.css('height', maxHeroHeight);
  }*/
  
  // Hide old hero and show new hero
  function switchHeroes() {
    var $activeHero = getActiveHero(),
      $nextHero = getNextHero($activeHero);
    
    $activeHero.removeClass(activeClass);
    $nextHero.addClass(activeClass);
  }
  
  // Find the current active hero and return it as a jQuery Element
  function getActiveHero() {
    return $('.' + pageHeroClass + '.' + activeClass).first();
  }
  
  // Get the next hero based on current active hero
  // $activeHero : jQuery Element
  function getNextHero($activeHero) {
    var $nextElement = $activeHero.next();
    
    if ( $nextElement === null || !$nextElement.hasClass(pageHeroClass) ) {
      $nextElement = $('.' + pageHeroClass).first();
    }
    
    return $nextElement;
  }

  $(window).scroll(function(){
      if ($(this).scrollTop() > 0) {
         $('.light-header').addClass('scrolling');
         $('.section-menu').addClass('scrolled-position');
      } else {
         $('.light-header').removeClass('scrolling');
          $('.section-menu').removeClass('scrolled-position');
      }
  });
  
  
  
    /*sticky sidebar menu*/
  
    var $menu = $('.fixed-menu'),
      $timeline = $('.section-timeline, .cta-section, .footer, .nav-footer-action').first(),
      $socialWidgets = $('.fixed-menu + .widget_c3ai_social_share_widget'),
      anchorEl = $menu.data('anchor-el'),
      menuHeight = $menu.outerHeight(),
      menuDefaultTop = parseInt($menu.css('top')),
      menuPaddingTweak = 35;
  
  
    var $menu2 = $('.section-menu'),
      $cta = $('.section-timeline, .cta-section, .footer, .nav-footer-action').first(),
      menu2Height = $menu2.outerHeight(),
      menu2DefaultTop = parseInt($menu2.css('top')),
      menu2PaddingTweak = 35;

      $(document).ready( function(){
        $menu.addClass('fixed-menu-fade-in');
        cleanUpJumpPositions();
      });
  
    // Run on load then on scroll
    
    $(window).on('scroll', cleanUpJumpPositions );

    function cleanUpJumpPositions(){
        var scrollTop = $(document).scrollTop();

        if (top.length) {
          var menuMaxTop = $timeline.offset().top - parseInt($timeline.prev().css('paddingTop')) - menuHeight - menuDefaultTop - menuPaddingTweak;
        }

         // Adjust menu next to an elements if using our custom field
         if ( anchorEl && $('#' + anchorEl).length > 0 ){
           var anchorElTop = $('#' + anchorEl).offset();
           var menuMinTop = ( scrollTop * -1 ) + anchorElTop.top + 80;
           console.log( anchorElTop );
         }
  
  
         if ( 185 < menuMinTop ) {
          $menu.css('top', menuMinTop);
          $socialWidgets.css('top', menuMinTop + menuHeight + 50);
        } else if ( scrollTop >= menuMaxTop ) {
          var newMenuTop = menuDefaultTop - (scrollTop - menuMaxTop);
          $menu.css('top', newMenuTop);
          $socialWidgets.css('top', newMenuTop + menuHeight + 50);
        } else if ( parseInt($menu.css('top')) !== menuDefaultTop ) {
          $menu.css('top', menuDefaultTop);
          $socialWidgets.css('top', menuDefaultTop + menuHeight + 50);
        }
    
        if (top.length) {
        var menu2MaxTop = $cta.offset().top - parseInt($cta.prev().css('paddingTop')) - menu2Height - menu2DefaultTop - menu2PaddingTweak;
        }
        if ( scrollTop >= menu2MaxTop ) {
          var newMenu2Top = menu2DefaultTop - (scrollTop - menu2MaxTop);
          $menu2.css('top', newMenu2Top);
        } else if ( parseInt($menu2.css('top')) !== menu2DefaultTop ) {
          $menu2.css('top', menu2DefaultTop);
        }
    }
  /**
   * c3-horizon-card
   */
  $('.c3-horizon-card--wrapper').slick({
    arrows: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: false,
    prevArrow: '<button type="button" class="slick-prev c3-horizon-card--prev"><img src="/wp-content/themes/c3-ai-theme/assets/images/chevron-left-small.svg" /></button>',
    nextArrow: '<button type="button" class="slick-next c3-horizon-card--next"><img src="/wp-content/themes/c3-ai-theme/assets/images/chevron-right-small.svg" /></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          variableWidth: false
        }
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true
        }
      }
    ]
  }).each(function(index) {
    const $el = $(this);
    let ww;
    function updateHeight() {
      if (ww === window.innerWidth) { return; }
      ww = window.innerWidth;
      const $parent = $el.find('.slick-track');
      if (!$parent.length) { return; }
      const $link = $parent.find('.c3-horizon-card--link');
      // reset first
      $link.css('height', 'auto');
      const height = $parent.height();
      $link.css('height', height);
    }
    updateHeight();
    $(window).resize(updateHeight);
  });


  /**
   * set mobile menu where is slides from right when clicking hamburger icon (it's from jointswp theme)
   * @see http://jointswp.com/docs/off-canvas-menu/
   * @see https://foundation.zurb.com/sites/docs/off-canvas.html
   * @see https://foundation.zurb.com/sites/docs/drilldown-menu.html
   */
  const setMobileMenu = function() {
    const $offCanvas = $('#off-canvas');
    if (!$offCanvas.length) { return; }
    // add event when off-canvas is open/close to toggle the fullpagejs scroll
    // ignore if no c3 funciton exist (it means no fullpage js has used)
    if (window.c3 && c3.disableFPScroll && c3.enableFPScroll) {
      $offCanvas.on('opened.zf.offcanvas', c3.disableFPScroll);
      $offCanvas.on('closed.zf.offcanvas', c3.enableFPScroll);
    }
    // fixed the bug drilldown scroll is extremely longer
    // somehow height in an element with `is-drilldown` class gets a wrong height
    const $drilldown = $offCanvas.find('[data-drilldown]');
    if (!$drilldown.length) { return; }
    const $drilldownScroll = $offCanvas.find('.is-drilldown');
    if (!$drilldownScroll.length) { return; }
    const openDrilldown = function() {
      // get element has `is-active` class
      const $activeMenu = $drilldown.find('.menu.is-active');
      $activeMenu.css('min-height', 'auto');
      const menuHeight = $activeMenu.height();
      // apply 50ms later to overwrite the style
      setTimeout(function() {
        $drilldownScroll.css('min-height', Math.max(menuHeight + 16, window.innerHeight));
      }, 50);
      // lazy load images
      c3.lazyBgLoad($activeMenu[0].querySelectorAll('[data-bg-image]'));
      c3.lazyImage($activeMenu[0].querySelectorAll('[data-src]'));
    };
    $drilldown.on('open.zf.drilldown', openDrilldown);
  };

  $(document).ready(function() {
    setMobileMenu();
    c3.initModalVideos('c3-video--modal');
  });
})(jQuery);

  /*JS*/
  'use strict';
  (function(window, document) {
    var lightActiveLinkColor = '#fff';
    var darkActiveLinkColor = '#1a1a1a';
    var activeLinkColor = darkActiveLinkColor;
    var inactiveLinkBorderColor = 'transparent';
    
    if (document.querySelector('#menu-ai-suite-section-menu')) {
      inactiveLinkBorderColor = '#ccc';
    }

    // both menus shouldn't be present at the same time
    var linkQuery = 'div.has-fixed-sidemenu ul.fixed-menu li a, #menu-ai-suite-section-menu > li > a';
    document.addEventListener('DOMContentLoaded', function() {
      // look for the jump links
      var links = document.querySelectorAll(linkQuery);
  
      // if there are any...	
      if (links.length > 0) {
  
        //default the first link found to active
        var activeLink = links[0];

        if (links[0].hash && document.querySelector(links[0].hash)) {
          setJumpLinkActiveStyles(activeLink);
        } else {
          activeLink = null;
        }
        
        // create threshold array starting with 0
        var thresholdArray = [0];
        // add 100 even increments
        for (var i = 1; i < 101; i++) {
          thresholdArray.push(+((i/100).toFixed(2)));
        }
  
        // create a new IntersectionObserver that sets the state 
        // of the link which has the visible section
        var jumplinkSectionObserver = new window.IntersectionObserver(function(entries) {
          // go through each entry
          for (var i = 0; i < entries.length; i++) {
            // store the anchor tag that corresponds to the href hash
            var link = document.querySelector('[href*="#' + entries[i].target.id + '"]');
            // if it's intersecting the viewport and it's close enough to the top
            if (entries[i].isIntersecting && 
                entries[i].intersectionRect.top <= 40 && 
                entries[i].intersectionRect.bottom > 40) {
              // set the current activeLink styles to default
              setJumpLinkInactiveStyles(activeLink);
              // set the link to active styles
              setJumpLinkActiveStyles(link);
              // set the link as the active link
              activeLink = link;
            }
          }
        }, {
          threshold: [].concat(thresholdArray)
        });
  
        // for each of the jump links
        links.forEach(function(link) {
          // get the hash of the link (this should be the selector for the section)
          var selector = link.hash;
          // bail out if selector is empty
          if (!selector) return;
          // store the result of the query using that selector
          var elem = document.querySelector(selector);
          // if an element was found
          if (elem) {
            // observe it
            jumplinkSectionObserver.observe(elem);
          }
        });
  
        // for observing area that will result in low contrast for the active links
        var darkSectionObserver = new window.IntersectionObserver(function(entries) {
          var makeWhite = entries.some(function(entry) {
            return entry.isIntersecting && isIntersecting(entry.target, activeLink)
          });
  
          if (makeWhite) {
            activeLinkColor = lightActiveLinkColor;
          } else { // if not
            activeLinkColor = darkActiveLinkColor;
          }
          activeLink.style.color = activeLinkColor;
          activeLink.style.borderLeftColor = activeLinkColor;
        }, {
          threshold: [].concat(thresholdArray)
        });
  
        // observe all dark sections
        var darkSections = document.querySelectorAll('.dark-section');
        darkSections.forEach(function(s) {
          darkSectionObserver.observe(s);
        });
      }
    });
  
    /**
     * @param {HTMLElement} link
     * @description sets the styles for an "active" link
     */
    function setJumpLinkActiveStyles(link) {
      if (!link) return;
      link.style.color = activeLinkColor; // --brand
      link.style.fontWeight = 'bold';
      link.style.borderLeft = '3px solid ' + activeLinkColor;
    }
  
    /**
     * @param {HTMLElement} link
     * @description sets the styles for an "inactive" link
     */
    function setJumpLinkInactiveStyles(link) {
      if (!link) return;
      // link.style.color = '#ccc'; // from stylesheet
      link.style.fontWeight = 'normal';
      link.style.borderLeftWidth = '0px';
    }
  
    /**
     * @param {HTMLElement} target the target area to check the elem against
     * @param {HTMLElement} elem
     * @returns {boolean} true if the DOMRects intersect
     */
    function isIntersecting(target, elem) {
      var r1 = target.getBoundingClientRect();
      var r2 = elem.getBoundingClientRect();
      var dx = Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left);
      var dy = Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top);
      return dx * dy > 0;
    }
  })(window, document);



/**
 * Set up observer to pause/play videos as they come into view
 * Required attribute [data-video-auto-pause] on .video-container
 */
;(function(document) {
  document.addEventListener('DOMContentLoaded', function() {
    var videos = document.querySelectorAll('.video-container[data-video-auto-pause]');

    var videoObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var video = entry.target.querySelector('video');

        if ( ! video ) return;

        // Play or pause depending on if video is in view
        if ( entry.intersectionRatio === 0 ) {
          video.pause();
          video.currentTime = 0;
        } else {
          video.play();
        }
      });
    });
  
    videos.forEach(function(video) {
      videoObserver.observe(video);
    });
  });
})(document);


/**
 * Append videos to all video containers with appropriate settings
 */
;(function(document, EmbeddedVideo) {
  document.addEventListener('DOMContentLoaded', function() {
    var videoContainers = document.querySelectorAll('.video-container[data-video-source]');

    videoContainers.forEach(function(videoContainer) {
      var options = {
        src: videoContainer.getAttribute('data-video-source'),
        poster: videoContainer.getAttribute('data-video-poster'),
        loop: getBooleanValue(videoContainer.getAttribute('data-video-loop'), false),
        controls: getBooleanValue(videoContainer.getAttribute('data-video-controls'), true),
        autoplay: getBooleanValue(videoContainer.getAttribute('data-video-autoplay'), false),
        muted: getBooleanValue(videoContainer.getAttribute('data-video-muted'), false),
        immediateLoad: getBooleanValue(videoContainer.getAttribute('data-video-immediate'), true)
      };

      // If video is an embedded video, override some options
      if ( videoContainer.getAttribute('data-video-embedded') !== null ) {
        options.controls = false;
        options.autoplay = true;
        options.muted = true;
      }

      if ( ! options.src ) {
        console.error('Video source not set on video container. Expected data-video-source attribute.', videoContainer);
      }

      var embeddedVideo = new EmbeddedVideo(options);
      videoContainer.appendChild(embeddedVideo.video);
    });

  });

  /**
   * Return boolean based on provided string. If null or undefined,
   * return default value.
   * 
   * @param {String | null} attribute 
   * @param {Boolean} defaultValue 
   */
  function getBooleanValue(string, defaultValue) {
    switch ( string ) {
      case 'false':
        return false;
      case '':
        return true;
      default:
        return defaultValue;
    }
  }
})(document, window.c3.EmbeddedVideo);


/**
 * Add observer to manage some reveal animations
 * Simply add the attribute "data-reveal-animation" and
 * set it to the animation you want. Some examples include:
 * slide-up   slide-right   expand   reveal-right
 * 
 * Some animations may require additional elements, such as
 * "reveal-right"
 * 
 * Once an element is in view, it will add the class .is-visible
 * to the element with the data-reveal-animation attribute. You
 * can add custom animations if you want.
 * 
 * See CSS for additional information
 */
;(function(document) {
  document.addEventListener('DOMContentLoaded', function() {
    var elements = document.querySelectorAll('[data-reveal-animation]');
    var elementObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var hasBeenVisible = entry.target.classList.contains('is-visible');
        var isVisible = entry.isIntersecting;

        if ( isVisible && ! hasBeenVisible ) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      rootMargin: '20px'
    });
  
    elements.forEach(function(element) {
      elementObserver.observe(element);

      // Custom attributes for certain animations
      if ( element.attributes['data-reveal-animation'].value === 'reveal-right') {
        if ( element.attributes['data-reveal-animation-bg-color'] ) {
          var revealBox = element.querySelector('.reveal-box');
          revealBox.style.backgroundColor = element.attributes['data-reveal-animation-bg-color'].value;
        }
      }
    });
  });
})(document);

/*Object Fit Polyfill*/
/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="fregante:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();
