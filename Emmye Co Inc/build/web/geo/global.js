/*global jQuery*/
/**
 * woodnew
 * Global JS
 *
 * version: 0.0.1
 * file:    global.js
 * author:  Squiz Australia
 * change log:
 *     Wed Oct 02 2019 11:40:04 GMT+0100 (British Summer Time) - First revision
 */

/*
 * Table of Contents
 *
 * - Global
 * - Modules

 */
"use strict";
/*
--------------------
Global
--------------------
*/
//  Declare JS Enabled.

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

$("body").removeClass("no-js").addClass("js-enabled");

/**
 * @description - Function  returns information wether given DOM element is currently in the viewport (with additional offset).
 * @param {DOM element} elem - pass DOM element
 */
var isInViewport = function isInViewport(elem) {
  var bounding = elem.getBoundingClientRect();
  var offsetFromTop = 50;
  var offsetFromBottom = 400;
  return bounding.top + offsetFromTop <= (window.innerHeight || document.documentElement.clientHeight) && bounding.bottom >= (window.innerHeight || document.documentElement.clientHeight) - offsetFromBottom;
};

/**
 * @description - Fallback for older browsers when using object-fit: cover
 *
 * To use it apply class .object-fit-fallback to wrapper of an image you want to make fallback for
 */
if (!Modernizr["object-fit"]) {
  $(".object-fit-fallback").each(function () {
    var $container = $(this),
        imgUrl = $container.find("img").prop("src");
    if (imgUrl) {
      $container.css("backgroundImage", "url(" + imgUrl + ")").addClass("compat-object-fit");
    }
  });
}

/**
 * @description - Function for smoothScrolling on homepage
 */
var scroll = new SmoothScroll('a[href="#scrollTo"]', {
  speed: 1000,
  updateURL: false
});

/**
 * @description Polyfill for forEach on IE11
 */
(function () {
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
      for (var i = 0, len = this.length; i < len; ++i) {
        fn.call(scope, this[i], i, this);
      }
    };
  }

  if (!Array.from) {
    Array.from = function (object) {
      "use strict";

      return [].slice.call(object);
    };
  }
})();

/**
 * @description Polyfill for CustomEvent on Internet Explorer >= 9
 */
(function () {
  if (typeof window.CustomEvent === "function") return false;
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

/*
--------------------
Modules
--------------------
*/
var globals = {
  languageMapper: {
    "EN": "https://www.woodplc.com/home",
    "ES": "",
    "FR": "https://www.woodplc.com/fr"
  }
};

$('.lang-select-mob').selectric({
  disableOnMobile: false,
  nativeOnMobile: false,
  inheritOriginalWidth: true
}).on('change', function () {
  var selected = $('.selectric-lang-select-mob .selectric-scroll ul').find('li.selected').data('index');
  var lang = $('.selectric-lang-select-mob .lang-select option:eq(' + selected + ')').data("lang");
  window.location.href = globals.languageMapper[lang];
});

$('.lang-select-desktop').selectric().on('change', function () {
  var selected = $('.selectric-lang-select-desktop .selectric-scroll ul').find('li.selected').data('index');
  var lang = $('.selectric-lang-select-desktop .lang-select option:eq(' + selected + ')').data("lang");
  window.location.href = globals.languageMapper[lang];
});

$('.js_lang-select').selectric().on('change', function () {
  window.location.href = $(this).find(':selected').val();
});

(function ($) {
  var $searchInput = $('#quick-search__query');
  // Mimick placeholder support where it is not available.
  // Credit: http://webdesignerwall.com/tutorials/cross-browser-html5-placeholder-text
  if (!Modernizr.input.placeholder && $searchInput.attr('placeholder') !== '') {
    $searchInput.focus(function () {
      var input = $(this);
      if (input.val() === input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function () {
      var input = $(this);
      if (input.val() === '' || input.val() === input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur();
    $searchInput.parents('form').submit(function () {
      $(this).find('[placeholder]').each(function () {
        var input = $(this);
        if (input.val() === input.attr('placeholder')) {
          input.val('');
        }
      });
    });
  } //end if
})(jQuery);

var blockStats = document.querySelector(".block-with-stats");
var blockStatsNumbers = Array.from(document.querySelectorAll(".block-with-stats p"));

/**
 * @description - Function checks if element is in the viewport and adds appropriate class to it.
 */
var showBlockStatsWhenInViewport = debounce(function () {
  if (blockStats && isInViewport(blockStats)) {
    if (!blockStats.classList.contains("in-viewport")) {
      setTimeout(function () {
        blockStatsNumbers.forEach(function (item) {
          if (!blockStats.classList.contains("in-viewport")) {
            $(item).animateNumber({ number: $(item).text() }, 2500);
          }
        });
        blockStats.classList.add("in-viewport");
      }, 1000);
    }
  }
}, 30);

/**
 * Initialize functions on start and on scroll
 */
showBlockStatsWhenInViewport();

$(window).on("scroll touchmove", showBlockStatsWhenInViewport);

$(function ($) {

  var urlloc = window.location.href;
  if (urlloc.indexOf('reason') != -1) {
    $.urlParam = function (name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
    };

    var reason = $.urlParam('reason');
    $('select#q42718_q1 option:selected').removeAttr("selected");
    $('select#q42718_q1 option[value="' + reason + '"]').attr("selected", "selected");
    $("label[for='q42718_q1']").css({ "display": "none" });
    $('#q42718_q1').css({ "height": "0px", "padding": "0px", "margin": "0px", "border": "0px" });
  }

  function validateForm() {
    $('#form_email_42718').validate({
      errorPlacement: function errorPlacement(error, element) {
        var id = element[0]['id'];
        $(element).before("<label for='" + id + "' class='error'>" + error.text() + "</label>");
      }
    });
  }

  if ($('#form_email_42718').length) {
    validateForm();
  }
});
(function ($) {
  var _this = this;

  var contentListings = Array.from(document.querySelectorAll(".content-listing__list"));

  /**
   * @description - Function checks if listing should be changed to slider on mobile and init slider if so
   */
  var slidersInit = function slidersInit() {
    contentListings.forEach(function (item) {
      var slider = $(item);

      if ($(window).width() < 600) {
        if (!$(_this).hasClass("slick-initialized")) {
          slider.slick({
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            responsive: [{
              breakpoint: 600,
              settings: "unslick"
            }]
          });
        }
      }
    });
  };

  /**
   * Initialize functions on start and on resize
   */
  $(window).on("resize", function () {
    slidersInit();
  });

  $(document).ready(function () {
    slidersInit();
  });
})(jQuery);

(function ($) {
  var homepageTextImage = Array.from(document.querySelectorAll(".content-text-image--left, .content-text-image--right"));

  /**
   * @description - Function checks if element is in the viewport and adds appropriate class to it.
   */
  var showImageWhenInViewport = function showImageWhenInViewport(item) {
    var show = debounce(function (item) {
      if (item && isInViewport(item)) {
        item.classList.add("in-viewport");
      }
    }, 30);
    show(item);
  };

  /**
   * Initialize functions on start and on scroll
   */
  $(window).on("scroll touchmove", function () {
    homepageTextImage.forEach(function (item) {
      showImageWhenInViewport(item);
    });
  });

  $(document).ready(function () {
    homepageTextImage.forEach(function (item) {
      showImageWhenInViewport(item);
    });
  });
})(jQuery);

var homepageStats = document.querySelector(".content-text-stats");

var separateNumber = function separateNumber(target) {
  var value = target.text();
  var num = value.match(/\d+/g);
  var letter = value.match(/[a-zA-Z+]+/g);

  if (num && letter) {
    target.replaceWith("\n      <div class=\"content-text-stats__wrapper\">\n        <p class=\"content-text-stats__number\">" + num[0] + "</p>\n        <p class=\"content-text-stats__letter\">" + letter.join(' ') + "</p>\n      </div>");
  } else {
    target.replaceWith("\n      <div class=\"content-text-stats__wrapper\">\n        <p class=\"content-text-stats__number\">" + num[0] + "</p>\n      </div>");
  }
};

/**
 * @description - Function checks if element is in the viewport and adds appropriate class to it.
 */
var showStatsWhenInViewport = debounce(function () {
  if (homepageStats && isInViewport(homepageStats)) {
    if (!$(homepageStats).hasClass("in-viewport")) {
      setTimeout(function () {
        $(homepageStats).find(".content-text-stats__number").each(function () {
          if (!$(homepageStats).hasClass("in-viewport")) {
            var currentNumber = $(this);
            $(this).animateNumber({ number: $(this).text() }, 2500);
          }
        });
        homepageStats.classList.add("in-viewport");
      }, 1000);
    }
  }
}, 30);

/**
 * Initialize functions on start and on scroll
 */
$(document).ready(function () {
  $(homepageStats).find(".content-text-stats__stats div").each(function () {

    separateNumber($(this));
  });
  showStatsWhenInViewport();
});

$(window).on("scroll touchmove", showStatsWhenInViewport);

(function ($) {
  var tableSections = Array.from(document.querySelectorAll(".content-text-table"));

  /**
   * @description - This function sets min-height of section to it's absolute element to be sure that it's never smaller
   */
  var tableSectionHeight = function tableSectionHeight() {
    tableSections.forEach(function (item) {
      var tableHeight = $(tableSections).find(".table").height();

      item.setAttribute("style", "min-height: " + (tableHeight + 100) + "px;");
    });
  };

  $(document).ready(function () {
    tableSectionHeight();
  });

  $(window).on("resize", function () {
    tableSectionHeight();
  });
})(jQuery);

// For landscape view on smaller devices e.g. Pixel 2 XL
if ($(window).width() < 768) {
  if (window.innerWidth > window.innerHeight) {
    var events = document.querySelectorAll('.events');
    [].forEach.call(events, function (replace) {
      replace.classList.remove('col-xs-12');
      replace.classList.add('col-xs-6');
    });
  };
};
// Once either select is changed begin
$('#geographies, #sectors').change(function () {
  var geographies = $('#geographies').val();
  var sectors = $('#sectors').val();
  console.log(geographies + ";" + sectors);
  var geographiesIsAvailable = $('.event-tile[data-geographies="' + geographies + '"]').length;
  var sectorsIsAvailable = $('.event-tile[data-sectors="' + sectors + '"]').length;
  console.log(geographiesIsAvailable + ";" + sectorsIsAvailable);
  $('.no-event-results').remove();
  // if the geographies select and/or sectors select is changed, run
  if ($('#geographies').val() != 'geographies' && $('#sectors').val() != 'sectors') {
    $('.event-tile').parent().addClass('hidden-event');
    if (geographiesIsAvailable > 0 && sectorsIsAvailable > 0) {
      $('.event-tile[data-geographies="' + geographies + '"][data-sectors="' + sectors + '"]').parent().removeClass('hidden-event');
    };
  } else if ($('#sectors').val() == 'sectors' && $('#geographies').val() != 'geographies') {
    $('.event-tile').parent().addClass('hidden-event');
    if (geographiesIsAvailable > 0) {
      $('.event-tile[data-geographies="' + geographies + '"]').parent().removeClass('hidden-event');
    };
  } else if ($('#sectors').val() != 'sectors' && $('#geographies').val() == 'geographies') {
    /* console.log('tomato paste'); */
    $('.event-tile').parent().addClass('hidden-event');
    if (sectorsIsAvailable >= 0) {
      $('.event-tile[data-sectors="' + sectors + '"]').parent().removeClass('hidden-event');
    };
  } else if ($('#sectors').val() == 'sectors' && $('#geographies').val() == 'geographies') {
    $('.event-tile').parent().removeClass('hidden-event');
  };

  // if one or more .this-month elements does not have .hidden-event, run
  if ($('.this-month').not('.hidden-event').length >= 1) {
    $('.this-month-grouping').removeClass('hidden-event');
  }
  // else hide the grouping
  else {
      $('.this-month-grouping').addClass('hidden-event');
    };
  if ($('.next-month').not('.hidden-event').length >= 1) {
    $('.next-month-grouping').removeClass('hidden-event');
  } else {
    $('.next-month-grouping').addClass('hidden-event');
  };
  if ($('.this-year').not('.hidden-event').length >= 1) {
    $('.later-year-grouping').removeClass('hidden-event');
  } else {
    $('.later-year-grouping').addClass('hidden-event');
  };

  var thisMonthHidden = $('.this-month-grouping').hasClass('hidden-event');
  var nextMonthHidden = $('.next-month-grouping').hasClass('hidden-event');
  var laterYearHidden = $('.later-year-grouping').hasClass('hidden-event');
  var noResults = $('<div class="row is-flex featured-event-grouping no-event-results"><div class="col-xs-12"><span class="events-title"><h1>No "' + geographies + '" events found in "' + sectors + '"</h1></span></div></div>');
  var noResultsgeographies = $('<div class="row is-flex featured-event-grouping no-event-results"><div class="col-xs-12"><span class="events-title"><h1>No "' + geographies + '" events found</h1></span></div></div>');
  var noResultssectors = $('<div class="row is-flex featured-event-grouping no-event-results"><div class="col-xs-12"><span class="events-title"><h1>No "' + sectors + '" events found</h1></span></div></div>');

  if (thisMonthHidden === true && nextMonthHidden === true && laterYearHidden === true) {
    if ($('#geographies').val() != 'geographies' && $('#sectors').val() != 'sectors') {
      if ($('.no-event-results').length === 0) {
        $('.this-month-grouping').before(noResults);
      } else {
        $('.no-event-results').remove();
        $('.this-month-grouping').before(noResults);
      };
    } else if ($('#sectors').val() == 'sectors' && $('#geographies').val() != 'geographies') {
      if ($('.no-event-results').length === 0) {
        $('.this-month-grouping').before(noResultsgeographies);
      } else {
        $('.no-event-results').remove();
        $('.this-month-grouping').before(noResultsgeographies);
      };
    } else if ($('#sectors').val() == 'sectors' && $('#geographies').val() != 'geographies') {
      if ($('.no-event-results').length === 0) {
        $('.this-month-grouping').before(noResultssectors);
      } else {
        $('.no-event-results').remove();
        $('.this-month-grouping').before(noResultssectors);
      };
    };
  };
});
var cliveParam = '';
var paginVar = { pages: 1, loadMore: false, edgePages: false };
var clives = [{
  value: '',
  label: 'All'
}, {
  value: 'wood-newsroom',
  label: 'News'
}, {
  value: 'wood-web-events',
  label: 'Events'
}, {
  value: 'wood-web-investors',
  label: 'Investors'
}];

function encodeQuery(query) {
  return query.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  // return query.replace(/<\/?[\w\s="\/.':;#-\/\?]+>/gi, "");
}

var changeAccordionsState = function changeAccordionsState(item) {
  if ($(item).hasClass("active")) {
    $(item).removeClass("active");
  } else {
    $(item).addClass("active");
  }

  $(item).next().slideToggle("fast");
  if ($(window).width() < 768) {
    $(".checkbox-facet > div").not($(item)).removeClass("active");

    $(".checkbox-facet > ul").not($(item).next()).slideUp("fast");
  }
};

/**
 * @description - Toggles the accordions
 */
var facetAccordions = function facetAccordions() {
  if ($(window).width() < 768) {} else {
    $('.facets .checkbox-facet  ul  li  input:checked').parents('.checkbox-facet').find('.checkbox-label').addClass("active").next().show();
  }
  $(".facets .checkbox-facet > div").click(function () {
    changeAccordionsState(this);
  }).keyup(function (e) {
    if (e.keyCode === 13) {
      changeAccordionsState(this);
    }
  });
};

var responsiveFacetsWrapperAccordion = function responsiveFacetsWrapperAccordion() {

  $('.facets__wrapper > h2').click(function () {
    if ($('.facets__wrapper').hasClass('accordion')) {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
      }

      $(this).next().slideToggle("fast");
    }
  });
};

var accessibleSearch = function accessibleSearch() {
  var elements = $('.checkbox-facet label, .active-facets span, .pagination li');
  elements.each(function () {
    $(this).keyup(function (e) {
      if (e.keyCode === 13) {
        $(this).click();
      }
    });
  });
};

/**
 * @description - Hides filters wrapper if there's no filters
 */
var handleFacetsSectionAppearance = function handleFacetsSectionAppearance() {
  var section = $('.facets__wrapper');
  var hasFacets = $('.facets__wrapper .facets > div').length > 0;
  if (!hasFacets) {
    section.addClass('hidden');
  } else {
    section.removeClass('hidden');
  }
};

/**
 * @description - Finds clive in given URL and returns it's value
 */
var findClive = function findClive() {
  var url = window.location.search.slice(1).split('&');

  url = url.filter(function (item) {
    var newItem = item.split('=');
    if (newItem[0] === 'clive') return true;
    return false;
  });

  if (url.length > 0) {
    return url[0].split('=')[1];
  }
  return '';
};

$(document).ready(function () {
  // handleResponsiveChanges();

  if ($(window).width() < 768) {
    if (!$('.facets__wrapper').hasClass('accordion')) {
      $('.facets__wrapper').addClass('accordion');
      responsiveFacetsWrapperAccordion();
    }
  } else {
    $('.facets__wrapper').removeClass('accordion');
    $('.facets').attr('style', '');
  }

  $('a.clive-btn').on('click', function () {
    var searchQueryClive = $('#search-queryinput').val();
    var searchHrefClive = $(this).attr('href');
    var newHrefClive = void 0;
    $(this).attr('href', null);
    if (searchHrefClive == '?clive=') {
      newHrefClive = '?query=' + searchQueryClive;
    } else {
      newHrefClive = searchHrefClive + '&query=' + searchQueryClive;
    }
    $(this).attr('href', newHrefClive);
  });
});

$(window).resize(function () {
  // handleResponsiveChanges();

  if ($(window).width() < 768) {
    if (!$('.facets__wrapper').hasClass('accordion')) {
      $('.facets__wrapper').addClass('accordion');
      responsiveFacetsWrapperAccordion();
    }
  } else {
    $('.facets__wrapper').removeClass('accordion');
    $('.facets').attr('style', '');
  }
});

var sharedConfig = {
  url: "https://wood-search01.squiz.co.uk/s/search.json",
  results: {
    numRanks: 10
  },
  pagination: paginVar,
  onFiltersUpdate: function onFiltersUpdate() {
    facetAccordions();
    handleFacetsSectionAppearance();
    accessibleSearch();
  },
  templates: {
    informationTemplate: function informationTemplate(fields, resultsSummary, h) {
      return "<p>Showing " + resultsSummary.currStart + "-" + resultsSummary.currEnd + " of " + resultsSummary.totalMatching + "</p>";
    },
    arrowNextTemplate: function arrowNextTemplate(startrank) {
      return startrank ? "<li class=\"next-page navigation-buttons\" tabindex=\"0\" data-startrank=" + startrank + "></li>" : null;
    },
    arrowPrevTemplate: function arrowPrevTemplate(startrank) {
      return startrank ? "<li class=\"prev-page navigation-buttons\" tabindex=\"0\" data-startrank=" + startrank + "></li>" : null;
    },
    facetCheckbox: function facetCheckbox(_ref, activeFacets, h) {
      var name = _ref.name,
          categories = _ref.categories,
          singleChoice = _ref.singleChoice,
          label = _ref.label;

      var header = label ? "<div tabindex=\"0\" class=\"checkbox-label\">" + label + "</div>" : "<div tabindex=\"0\" class=\"checkbox-label\">" + name + "</div>";
      var list = "";

      categories[0].values.forEach(function (item) {
        list += "<li>\n                        <input\n                        type=\"checkbox\"\n                        " + item.checked + "\n                        value=\"" + item.data + "\"\n                        name=\"" + item.label + "\"\n                        id=\"" + name + "-" + item.label + "\"\n                        data-fparam=\"" + h.queryStringParamName + "\"\n                        data-singlechoice=\"" + singleChoice + "\"\n                        />\n                        <label for=\"" + name + "-" + item.label + "\" tabindex=\"0\">" + item.label + "</label>\n                    </li>";
      });

      return "\n                <div class=\"checkbox-facet\" id=\"" + name + "\">\n                    " + header + "\n                    <ul>\n                        " + list + "\n                    </ul>\n                </div>";
    },
    activeFacet: function activeFacet(name, param) {
      return "\n              <span param=\"" + param + "\" name=\"" + name + "\" tabindex=\"0\">\n                " + name + "\n              </span>\n            ";
    }
  }
};

if ($("#content-search").length > 0) {
  var mySearch = new Search.default({
    url: sharedConfig.url, // url for funnelback
    collections: [collection], // collection name
    query: {
      value: queryValue,
      canBeChanged: true
    },
    updateUrlOnSearch: false,
    additionalFBparams: additional,
    activeFacetsOnStart: startingFacets,
    results: sharedConfig.results,
    pagination: paginVar,
    facets: {
      items: facetlist
    },
    onFiltersUpdate: sharedConfig.onFiltersUpdate,
    templates: {
      noResults: function noResults(query, spell) {
        var spellSuggestion = '';
        if (spell.text) {
          spellSuggestion = "<div>Did you mean: <a href=\"?" + spell.url + "\">" + spell.text + "</a>?</div>";
          return "<div>We're sorry, we couldn't find anything matching.</div>" + spellSuggestion;
        }
        return "<div>We're sorry, we couldn't find anything matching.</div>" + encodeQuery(query);
      },
      articleTemplate: function articleTemplate(fields, highlightFields) {
        var img = fields.metaData.Previewimage ? "<div class=\"sidenewsimgwrapper\"><img src=\"" + fields.metaData.Previewimage + "\" class=\"to-wrap\"/></div>" : "";
        if (fields.metaData.Description) {
          return "\n                    <div class=\"results__item\">\n                    <a href=\"" + fields.clickTrackingUrl + "\">\n                        " + img + "\n                        <h2>" + highlightFields.title + "</h2>\n                        <p>" + fields.metaData.Description + "</p>\n                    </a>\n                    </div>\n                ";
        } else {
          return "\n                    <div class=\"results__item\">\n                    <a href=\"" + fields.clickTrackingUrl + "\">\n                        " + img + "\n                        <h2>" + highlightFields.title + "</h2>\n                        <p>" + fields.summary + "</p>\n                    </a>\n                    </div>\n                ";
        }
      },
      informationTemplate: sharedConfig.templates.informationTemplate,
      arrowNextTemplate: sharedConfig.templates.arrowNextTemplate,
      arrowPrevTemplate: sharedConfig.templates.arrowPrevTemplate,
      facetCheckbox: sharedConfig.templates.facetCheckbox,
      activeFacet: sharedConfig.templates.activeFacet
    }
  });

  mySearch.init(); // you need to initialize the fbjs search at the end
} else if ($("#global-search").length > 0) {
  cliveParam = findClive();
  var mySearchGlobal = new Search.default({
    url: sharedConfig.url, // url for funnelback
    collections: [collection], // collection name
    additionalFBparams: {
      // all the parameters that should be added at start ( key is the name, value is the value )
      profile: "_default",
      clive: cliveParam
    },
    results: sharedConfig.results,
    updateUrlOnSearch: false,
    pagination: paginVar,
    facets: {
      items: facetlist
    },
    onFiltersUpdate: sharedConfig.onFiltersUpdate,
    templates: {
      formTemplate: function formTemplate(search, query, inputId) {
        var clivesButtons = '';

        clives.forEach(function (item) {
          var classes = item.value === cliveParam ? 'clive-btn active' : 'clive-btn';

          clivesButtons += "<a class=\"" + classes + "\" data-clive=\"" + item.value + "\" href=\"?clive=" + item.value + "\">" + item.label + "</a>";
        });

        return "\n                    <div class=\"fbjs-search-content\">\n                        <form id=\"search-form\">\n                        <div class=\"row\">\n                            <div class=\"col-xs-12\">\n                                <label for=\"" + inputId + "\">Search for: </label><input id=\"" + inputId + "\" type=\"text\" value=\"" + encodeQuery(query) + "\" name=\"searchquery\" placeholder=\"Type your query\"/>\n                                <button type=\"submit\" value=\"\" />\n                            </div>\n                            <div class=\"col-xs-12\">\n                                <div id=\"clives\" style=\"margin-top:25px;\">\n                                    " + clivesButtons + "\n                                </div>\n                            </div>\n                        </div>\n                        </form>\n                    </div>\n                ";
      },
      noResults: function noResults(query, spell) {
        var spellSuggestion = '';
        if (spell.text) {
          spellSuggestion = "<div>Did you mean: <a href=\"?" + spell.url + "\">" + spell.text + "</a>?</div>";
          return "<div>We're sorry, we couldn't find anything matching.</div>" + spellSuggestion;
        }
        return "<div>We're sorry, we couldn't find anything matching.</div>" + encodeQuery(query);
      },
      articleTemplate: function articleTemplate(fields, highlightFields) {
        var breadcrumb = void 0;
        if (fields.metaData.Pagelineage) {
          breadcrumb = "<cite><small>" + fields.metaData.Pagelineage + "</small></cite>";
        } else if (fields.metaData.Datepublished) {
          breadcrumb = "<cite><small>" + fields.metaData.Datepublished.substr(0, 16) + "</small></cite>";
        } else {
          breadcrumb = ' ';
        }
        var content = fields.metaData.Description ? "<p>" + fields.metaData.Description + "</p>" : "<p>" + fields.summary + "</p>";
        var externalTarget = fields.collection == 'wood-newsroom' ? "target=\"_blank\"" : " ";
        return "\n                    <div class=\"results__item\">\n                    <a href=\"" + fields.clickTrackingUrl + "\" " + externalTarget + ">\n                        <h2>" + highlightFields.title + "</h2>\n                        " + content + "\n                        " + breadcrumb + "\n                    </a>\n                    </div>\n                ";
      },
      bestBets: function bestBets(_bestBets) {
        var body = '';
        _bestBets.forEach(function (item) {
          body += "<div class=\"best-bets__item\">\n                <a href=\"" + item.linkUrl + "\">\n                    <h2>" + item.titleHtml + "</h2>\n                    <p>" + item.descriptionHtml + "</p>\n                </a>\n              </div>";
        });

        return body;
      },
      informationTemplate: sharedConfig.templates.informationTemplate,
      arrowNextTemplate: sharedConfig.templates.arrowNextTemplate,
      arrowPrevTemplate: sharedConfig.templates.arrowPrevTemplate,
      facetCheckbox: sharedConfig.templates.facetCheckbox,
      activeFacet: sharedConfig.templates.activeFacet
    }
  });

  mySearchGlobal.init(); // you need to initialize the fbjs search at the end
} else if ($("#content-listing-search").length > 0) {
  var mySearchListing = new Search.default({
    url: sharedConfig.url, // url for funnelback
    collections: [collection], // collection name
    query: {
      value: queryValue,
      canBeChanged: true
    },
    additionalFBparams: additional,
    results: {
      numRanks: returnElement,
      target: '.content-listing__list'
    },
    updateUrlOnSearch: false,
    templates: {
      articleTemplate: function articleTemplate(fields) {
        var content = fields.metaData.Description ? "<p>" + fields.metaData.Description + "</p>" : "<p>" + fields.summary.split(/\./).slice(0, 1) + ".</p>";
        var img = fields.metaData.Previewimage ? "<div class=\"content-listing__image object-fit-fallback\"><img src=\"" + fields.metaData.Previewimage + "\" /></div>" : "";
        return "    \n                    <div class=\"content-listing__item\">\n                    <a href=\"" + fields.clickTrackingUrl + "\">\n                        " + img + "\n                        <h3 class=\"headline__underlined headline__underlined--blue\">" + fields.title + "</h3>\n                        " + content + "\n                        <span>Read more...</span>\n                    </a>\n                    </div>\n                ";
      }
    }
  });

  mySearchListing.init();
}

$(function () {
  var windowWidth = $(window).width();

  $('.footerheading').on('click', function (e) {
    e.preventDefault();
    windowWidth = $(window).width();
    if (windowWidth <= 991) {
      var $this = $(this);
      $this.toggleClass('chevron_close chevron_open');
      var $list = $this.next();
      $list.slideToggle();
    }
  });

  $(window).on('resize', function (event) {
    // console.log(windowWidth)
    windowWidth = $(window).width();
    if (windowWidth > 991) {
      $('ul.chevronlist').removeAttr("style");
      $('.footerheading').removeClass('chevron_open');
      $('.footerheading').addClass('chevron_close');
    }
  });
});

(function ($) {
  $('.video .video_container .video_play').on('click', function () {
    var $videoWidget = $(this).parent('.video_container');
    var videoUrl = $videoWidget.data('video-url');
    $videoWidget.append('<iframe class="video_embedded" src="' + videoUrl + '" allowfullscreen></iframe><div class="video_embedded_close"></div>');
    $('.video_embedded_close').on('click', function (e) {
      e.preventDefault();
      $('.video .video_container .video_embedded, .video .video_container .video_embedded_close, .video .video_container .video_embedded').fadeTo(250, 0, function () {
        $('.video .video_container .video_embedded_close, .video .video_container .video_embedded').remove();
      });
    });
  });
})(jQuery);

/**
 * @description - Function removes class 'active' from all given DOM elements
 *
 * @param {Object} items - given list of DOM elements
 */
var removeActiveClassFromItems = function removeActiveClassFromItems(items) {
  $.each(items, function (key, value) {
    if ($(value).hasClass("active")) {
      $(value).removeClass("active");
    }
  });
};

/**
 * @description - Function adds class 'active' to given DOM element
 *
 * @param {string} item - element you look for
 */
var makeItemActive = function makeItemActive(item) {
  $(item).addClass("active");
};

/**
 * @description - Function that handles hover state on MegaMenu main nav
 *
 * @param {Object} nav - object with all DOM elements for main nav in MegaMenu
 * @param {Object} subNav - object with all DOM element for sub nav in MegaMenu
 */
var handleMegaMenuHoverState = function handleMegaMenuHoverState(nav, subNav) {
  var timeDelay = 200; // Time delay when user hovers on different tabs quickly [in ms]

  $.each(nav, function (key, value) {
    var timer;

    $(value).hover(function () {
      timer = setTimeout(function () {
        removeActiveClassFromItems(nav);
        removeActiveClassFromItems(subNav);
        makeItemActive(value);
        makeItemActive(subNav[key]);
      }, timeDelay);
    }, function () {
      clearTimeout(timer);
    });

    $(value).on('keyup', function (e) {
      e.preventDefault();

      if (e.keyCode === 32) {
        e.preventDefault();
        removeActiveClassFromItems(nav);
        removeActiveClassFromItems(subNav);
        makeItemActive(value);
        makeItemActive(subNav[key]);
      } else if (e.keyCode === 27) {
        // removeActiveClassFromItems(nav);
        // removeActiveClassFromItems($(value).find(megaMenuNav));
        // removeActiveClassFromItems($(value).find(megaMenuSubNav));
        // removeActiveClassFromItems(top);
        // makeItemActive($(value).find(megaMenuNav)[0]);
        // makeItemActive($(value).find(megaMenuSubNav)[0]);
      }
    });
  });
};

/**
 * @description - Function that handles hover state on Main Menu
 */
var handleMenuHoverState = function handleMenuHoverState() {
  var nav = $(".header-navlist__item");
  var megaMenuNav = ".main-nav li";
  var megaMenuSubNav = ".sub-nav__item";
  var top = $(".top");
  var timeDelay = 200;

  $.each(nav, function (key, value) {
    var timer;
    $(value).hover(function () {
      timer = setTimeout(function () {
        removeActiveClassFromItems(nav);
        makeItemActive(value);
        makeItemActive(top);
        handleMegaMenuHoverState($(value).find(megaMenuNav), $(value).find(megaMenuSubNav));
      }, timeDelay);
    }, function () {
      clearTimeout(timer);
    });

    $(value).on('keyup', function (e) {
      e.preventDefault();
      if (e.keyCode === 13) {
        removeActiveClassFromItems(nav);
        makeItemActive(value);
        makeItemActive(top);
        handleMegaMenuHoverState($(value).find(megaMenuNav), $(value).find(megaMenuSubNav));
      } else if (e.keyCode === 27) {
        removeActiveClassFromItems(nav);
        removeActiveClassFromItems($(value).find(megaMenuNav));
        removeActiveClassFromItems($(value).find(megaMenuSubNav));
        removeActiveClassFromItems(top);
        makeItemActive($(value).find(megaMenuNav)[0]);
        makeItemActive($(value).find(megaMenuSubNav)[0]);
      }
    });

    top.on("mouseleave", function () {
      removeActiveClassFromItems(nav);
      removeActiveClassFromItems($(value).find(megaMenuNav));
      removeActiveClassFromItems($(value).find(megaMenuSubNav));
      removeActiveClassFromItems(top);
      makeItemActive($(value).find(megaMenuNav)[0]);
      makeItemActive($(value).find(megaMenuSubNav)[0]);
    });

    $(value).find(".header-navlist__title").click(function (e) {
      e.preventDefault();
    });
  });
};

handleMenuHoverState();

(function ($) {
  var homepageContent = document.querySelector(".homepage-careers");
  /**
   * @description - Function checks if element is in the viewport and adds appropriate class to it.
   */
  var showContentWhenInViewport = debounce(function () {
    if (homepageContent && isInViewport(homepageContent)) {
      homepageContent.classList.add("in-viewport");
    }
  }, 30);

  /**
   * Initialize functions on start and on scroll
   */
  $(document).ready(function () {
    showContentWhenInViewport();
  });

  $(window).on("scroll touchmove", function () {
    showContentWhenInViewport();
  });
})(jQuery);

$(function () {

  if ($('.filter-trigger').length > 0) {
    $('.filter-trigger').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.toggleClass('chevron_close chevron_open');
      var $list = $this.next();
      $list.slideToggle();
      var $message = $('#filter-message');
      $message.fadeToggle(300, 'swing');
    });

    $('input.form-check-input').change(function () {
      if ($('input.form-check-input').is(':checked')) {
        $('#filter-message').html('filter(s) selected. this may limit results');
      } else {
        $('#filter-message').html(' ');
      }
    });
  }

  //get user location

  var $locationButton = $('#form_location_button');
  if ($locationButton.length) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError, { timeout: 10000, maximumAge: 0 });
    } else {
      console.log("Geolocation is not supported by this browser.");
      $('#form_location_button').addClass('disabled').html('<span class="locationarrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"/></svg></span>Location not supported');
    }
    $locationButton.on('click', function (e) {
      e.preventDefault();
      if ($('#form_location [name="origin"]').val() === '' || $locationButton.hasClass('disabled')) {
        console.log('Accessing location information');
        return;
      } else {
        $('#form_location').submit();
      }
    });
  }

  function showPosition(position) {
    var localCoord = position.coords.latitude + "," + position.coords.longitude;
    $('#form_location [name="origin"]').val(localCoord);
    $('#form_location_button').removeClass('disabled').html('<span class="locationarrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"/></svg></span>Find my nearest office');
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        $('#form_location_button').addClass('disabled').html('<span class="locationarrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"/></svg></span>Blocked by user');
        break;
      case error.POSITION_UNAVAILABLE:
        $('#form_location_button').addClass('disabled').html('<span class="locationarrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"/></svg></span>Location unavailable');
        break;
      case error.TIMEOUT:
        $('#form_location_button').addClass('disabled').html('<span class="locationarrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"/></svg></span>Location Timed out');
        break;
      case error.UNKNOWN_ERROR:
        $('#form_location_button').addClass('disabled').html('<span class="locationarrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z"/></svg></span>Unknown error');
        break;
    }
  }

  //get coordinates of city

  var $dropdownForm = $('#form_dropdown_select');
  if ($dropdownForm.length) {
    $dropdownForm.on('change', function (e) {
      e.preventDefault();
      var selection = this.value;
      if (selection === 'null') {
        return;
      }
      // getLatLng(selection);
      $('#form_dropdown [name="query"]').val(selection);
      $('#form_dropdown').submit();
    });
  }

  function getLatLng(city) {
    var address = city;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': address
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results[0]);
        var Lat = results[0].geometry.location.lat();
        var Lng = results[0].geometry.location.lng();
        var one = results[0].geometry.bounds.getNorthEast().lat();
        var two = results[0].geometry.bounds.getNorthEast().lng();
        var three = results[0].geometry.bounds.getSouthWest().lat();
        var four = results[0].geometry.bounds.getSouthWest().lng();
        var returnValue = Lat + ',' + Lng;
        var radius = getDistanceFromLatLonInKm(one, two, three, four);
      } else {
        var returnValue = "57.1425543,-2.1122146";
        var radius = "1000";
      }
      if (returnValue) {
        $('#form_dropdown [name="origin"]').val(returnValue);
        $('#form_dropdown [name="maxdist"]').val(radius);
        $('#form_dropdown').submit();
      }
    });
  }

  //get size of country

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km

    d = d / 2;
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
});
$(".media-library__asset-img, .media-library__asset-vid").click(function () {
  $('.media-library__asset-dl-bg').removeClass('hidden');
  $(this).children('.media-library__asset-dl').removeClass('hidden');
}).children().children().not('img, a').click(function (e) {
  return false;
});

$('.media-library__asset-dl-bg, .media-library__asset-dl-close').on("click", function () {
  $('.media-library__asset-dl-bg, .media-library__asset-dl').addClass('hidden');
});

var mediaOptions = $(".media-library__options > .images, .media-library__options > .videos, .media-library__options > .documents");
$(mediaOptions).click(function () {
  // if($(this).hasClass('clicked-pill')) {
  //     $('.media-library__asset-vid, .media-library__asset-img, .media-library__asset-doc').removeClass('hidden');
  //     $(this).removeClass('clicked-pill');
  // }
  // else {
  $(mediaOptions).removeClass('clicked-pill');
  $(this).addClass('clicked-pill');
  $('.media-library__asset-vid, .media-library__asset-doc, .media-library__asset-img').addClass('hidden');
  if ($(this).hasClass('images')) {
    $('.media-library__asset-img').removeClass('hidden');
    $('.media-library__asset-filters-category').removeClass('hidden');
  } else if ($(this).hasClass('videos')) {
    $('.media-library__asset-vid').removeClass('hidden');
    $('.media-library__asset-filters-category').addClass('hidden');
  } else if ($(this).hasClass('documents')) {
    $('.media-library__asset-doc').removeClass('hidden');
    $('.media-library__asset-filters-category').addClass('hidden');
  }
  // }
});

$('.media-library__asset-filters-container input:checkbox').change(function () {
  var checkedCategories = [];
  $('.media-library__asset-container').fadeOut('fast');
  $('.media-library__asset-img').show();
  $.each($('.media-library__asset-filters-category input[type="checkbox"]:checked'), function () {
    checkedCategories.push($(this).data('person-category'));
  });
  if (checkedCategories.length) {
    filterPeople(checkedCategories);
  } else {
    $('.media-library__asset-img').show();
    $('.media-library__asset-container').fadeIn('fast');
  }

  if ($(this).is(":checked")) {
    $(this).parent().addClass("checked__status");
  } else {
    $(this).parent().removeClass("checked__status");
  }
});

var filterPeople = function filterPeople(categories) {
  var showCategories = categories;
  $.each($('.media-library__asset-img'), function () {
    var obj = this;
    var assetCategories = $(this).data('person-category').split(';');
    $.each(assetCategories, function (key, value) {
      var index = $.inArray(value.trim(), showCategories);
      if (index == -1) {
        $(obj).hide();
      } else {
        $(obj).show();
        return false;
      }
    });
  });
  $('.media-library__asset-container').fadeIn('fast');
};

// var maxheightImg = 0;
// var maxheightVid = 0;
// var maxheightDoc = 0;

// $('.media-library__asset-img').each(function () {
//     maxheightImg = ($(this).height() > maxheightImg ? $(this).height() : maxheightImg); 
// });
// $('.media-library__asset-vid').each(function () {
//     maxheightVid = ($(this).height() > maxheightVid ? $(this).height() : maxheightVid); 
// });

// $('.media-library__asset-doc > li').each(function () {
//     maxheightVid = ($(this).height() > maxheightVid ? $(this).height() : maxheightVid); 
// });

// $('.media-library__asset-img').height(maxheightImg);
// $('.media-library__asset-vid').height(maxheightVid);
$(function () {
  var $menuTrigger = $('.menu_trigger');
  var $menuTrigger2 = $('.menu_trigger2');
  var $closeTrigger = $('.menu_overlay .close_trigger');
  var $menuOverlay = $('.menu_overlay');

  $(document).keyup(function (e) {
    if ($('body').hasClass('menuOpen')) {
      if (e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();
        $menuOverlay.animate({ scrollTop: 0 }, 1);
        $('body').removeClass('menuOpen');
        $menuOverlay.fadeOut("slow");
        $menuOverlay.off('click', removeMenu);
      }
    }
  });

  $menuTrigger.on('click', function (e) {
    e.preventDefault();
    $('body').addClass('menuOpen');
    $menuOverlay.fadeIn("slow", function (e) {
      $menuOverlay.on('click', removeMenu);
    });
    $('.menu_overlay_content a')[0].focus();
  });

  $menuTrigger2.on('click', function (e) {
    e.preventDefault();
    $('body').addClass('menuOpen');
    $menuOverlay.fadeIn("slow", function (e) {
      $menuOverlay.on('click', removeMenu);
    });
  });
  $closeTrigger.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $menuOverlay.animate({ scrollTop: 0 }, 1);
    $('body').removeClass('menuOpen');
    $menuOverlay.fadeOut("slow");
    $menuOverlay.off('click', removeMenu);
  });
  function removeMenu(e) {
    if (!$(e.target).is('.menu_overlay_inner div[class^="col"] *')) {
      $('body').removeClass('menuOpen');
      $menuOverlay.fadeOut("slow");
      $menuOverlay.off('click', removeMenu);
    }
  }
});

var toggleNewsFilters = function toggleNewsFilters(obj) {
  var target = $('.' + $(obj).data('target'));

  if ($(target).hasClass('show')) {
    $(target).removeClass('show');
    $(".filter-label").not($(obj).parent('.filter-label')).fadeTo('fast', 1);
    $(target).slideUp('fast');
    $('.filter-label').css("pointer-events", "auto");
    $(obj).parent('.filter-label').removeClass('show-change');
  } else {
    $('.filter-options').removeClass('show');
    $(target).toggleClass('show');
    $(".filter-label").not($(obj).parent('.filter-label')).fadeTo('fast', 0.2);
    $(obj).parent('.filter-label').fadeTo('fast', 1);
    $(target).slideDown('fast');
    $(obj).parent('.filter-label').addClass('show-change');
  }
};

if ($('#newsroom-search').length > 0) {

  var relatedArticles = $('.newsroom-container__featured .newsroom-article');
  var excludeUrls = '';
  if (relatedArticles) {
    $.each(relatedArticles, function () {
      if (_typeof(this.href) !== undefined) {
        if (this.href.length > 0) {
          excludeUrls += this.href + ' ';
        }
      }
    });
  }

  var newsroomSearch = new Search.default({
    url: sharedConfig.url,
    collections: [collection],
    query: {
      value: '!nullquery',
      canBeChanged: true
    },
    updateUrlOnSearch: false,
    sort: {
      type: 'dmetad'
    },
    additionalFBparams: {
      profile: '_default',
      remove_urls: excludeUrls
    },
    pagination: {
      target: '.newsroom-container__load-more',
      loadMore: true,
      arrows: false,
      pages: 5
    },
    results: {
      numRanks: 12
    },
    facets: {
      target: '.newsroom-container__all-filters',
      items: facetlist
    },
    onNoResultsPageUpdate: function onNoResultsPageUpdate() {
      $('.newsroom-title__filter').hide();
      $('.newsroom-container__all-filters--list').hide();
      return;
    },
    onFiltersUpdate: function onFiltersUpdate() {
      if ($('.newsroom-container__all-filters--list').html().length > 5) {
        $('.newsroom-title__filter').show();
        $('.newsroom-container__all-filters--list').show();
      }
    },
    templates: {
      articleTemplate: function articleTemplate(fields) {
        var img;var summary;
        if (fields.metaData.I === undefined) {
          img = "";
          summary = fields.summary ? '<p class="newsroom-articles__intro">' + fields.summary.replace(/^(.{150}[^\s]*).*/, "$1") + '...</p>' : "";
        } else {
          img = "<img class=\"newsroom-articles__all-img\" src=\"" + fields.metaData.I + "\">";
          summary = "";
        }

        var tampstampToDate = function tampstampToDate(UNIX_timestamp) {
          var newDate = new Date(UNIX_timestamp),
              months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              year = newDate.getFullYear(),
              month = months[newDate.getMonth()],
              date = newDate.getDate(),
              time = date + ' ' + month + ' ' + year;
          return time;
        };
        return "\n            <a href=\"" + fields.clickTrackingUrl + "\" class=\"newsroom-article col-lg-3 col-md-4 col-sm-6 col-xs-12\">\n                <div class=\"newsroom-articles__regular\">\n                " + img + "\n                <div class=\"newsroom-articles__regular-content\">\n                    <h4>" + fields.title + "</h4>\n                    <p class=\"newsroom-articles__date\">" + fields.metaData.articleDate + "</p>\n                    <p class=\"newsroom-articles__intro\">" + summary + "</p>\n                    <span class=\"newsroom-articles__read-more\">Read more</span>\n                    <span class=\"newsroom-articles__share\" onclick=\"return false;\"></span>\n                </div>\n                </div>\n            </a>\n          ";
      },
      loadMoreTemplate: function loadMoreTemplate(fields) {
        return '<button id="search-loadmore" class="button button--blue newsroom-container__load-more">Load more</button>';
      },
      formTemplate: function formTemplate(search, query, inputId) {
        return "\n                <form class=\"newsroom-container__search__form\">\n                    <input type=\"text\" id=\"" + inputId + "\" name=\"query\" placeholder=\"\" value=\"\" class=\"ui-autocomplete-input tt-input\">\n                    <input type=\"submit\" class=\"button button--green newsroom-container__search-button\" value=\"\">\n                </form>\n            ";
      },
      facetCheckbox: function facetCheckbox(_ref2, activeFacets, h) {
        var name = _ref2.name,
            label = _ref2.label,
            categories = _ref2.categories,
            singleChoice = _ref2.singleChoice;


        var header = "<div class=\"filter-" + name.toLowerCase() + " filter-label\"><p class=\"filter-label__text\" value=\"\" onclick=\"toggleNewsFilters(this);\" data-target=\"filter-" + name.toLowerCase() + "__options\">" + label + "</p></div>";
        var headerHTML = '';

        var list = '';
        categories.forEach(function (cat) {
          cat.values.forEach(function (item) {
            if (item.selected == false) {
              list += "<li>\n                            <label for=\"" + name + "-" + item.label + "\">\n                                <input\n                                type=\"checkbox\"\n                                " + item.checked + "\n                                value=\"" + item.data + "\"\n                                name=\"" + item.label + "\"\n                                id=\"" + name + "-" + item.label + "\"\n                                data-fparam=\"" + encodeURI(item.queryStringParamName) + "\"\n                                data-singlechoice=\"" + singleChoice + "\"\n                                />\n                                " + item.label + " (" + item.count + ")\n                            </label>\n                            </li>";
            }
          });
        });

        return header + "\n                      <div class=\"filter-" + name.toLowerCase() + "__options filter-options checkbox-facet\">\n                          <ul>\n                          " + list + "\n                          </ul>\n                      </div>";
      },
      activeFacet: function activeFacet(name, param) {
        var header = '<h4 class="newsroom-title__filter">Active Facets</h4>';
        return "\n                <span class=\"newsroom-container__all-filters__facet--active\" param=\"" + param + "\" name=\"" + name + "\">\n                  " + name + "\n                </span>\n              ";
      },
      noResults: function noResults(query, spell) {
        return "<div class=\"newsroom-articles--no-results\">No matching articles</div>";
      }

    }
  });
  newsroomSearch.init();
  toggleNewsFilters();
  if ($('#search-queryinput').val() == '!nullquery') {
    $('#search-queryinput').val('');
  }
}

if ($('.related-articles').length > 0) {
  var title = $('title').text().split('|')[0].trim();
  var metaQuery = '';
  $.each($('.article__filter-tags >  .fb-meta'), function () {
    metaQuery += this.innerText + '+';
  });
  var newsroomRelated = new Search.default({
    url: sharedConfig.url,
    collections: [collection],
    query: {
      value: '!"' + title + '"',
      canBeChanged: true
    },
    sort: {
      type: 'relevance'
    },
    additionalFBparams: {
      profile: '_default',
      query_or: '' + metaQuery + ''
    },
    updateUrlOnSearch: false,
    results: {
      target: '.related-articles .newsroom-articles',
      numRanks: 4
    },
    templates: {
      articleTemplate: function articleTemplate(fields) {
        var img;var summary;
        if (fields.metaData.I === undefined) {
          img = "";
          summary = fields.summary ? '<p class="newsroom-articles__intro">' + fields.summary.replace(/^(.{150}[^\s]*).*/, "$1") + '...</p>' : "";
        } else {
          img = "<img class=\"newsroom-articles__all-img\" src=\"" + fields.metaData.I + "\">";
          summary = "";
        }
        var tampstampToDate = function tampstampToDate(UNIX_timestamp) {
          var newDate = new Date(UNIX_timestamp),
              months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              year = newDate.getFullYear(),
              month = months[newDate.getMonth()],
              date = newDate.getDate(),
              time = date + ' ' + month + ' ' + year;
          return time;
        };
        return "\n                <a href=\"" + fields.clickTrackingUrl + "\" class=\"newsroom-article col-lg-3 col-md-4 col-sm-6 col-xs-12\">\n                    <div class=\"newsroom-articles__regular\">\n                    " + img + "\n                    <div class=\"newsroom-articles__regular-content\">\n                        <h4>" + fields.title + "</h4>\n                        <p class=\"newsroom-articles__date\">" + fields.metaData.articleDate + "</p>\n                        <p class=\"newsroom-articles__intro\">" + summary + "</p>\n                        <span class=\"newsroom-articles__read-more\">Read more</span>\n                        <span class=\"newsroom-articles__share\" onclick=\"return:false;\"></span>\n                    </div>\n                    </div>\n                </a>\n              ";
      }
    }
  });
  newsroomRelated.init();
}
jQuery(document).ready(function () {
  $(".newsroom-articles__share").on("click", function () {
    var copyLink = $(this).parent().parent().parent('a').attr("href");
    $(".newsroom-articles__sharing-link > input").val(copyLink);
    var facebookUrl = "https://www.facebook.com/sharer/sharer.php?u=" + copyLink;
    var twitterUrl = "https://twitter.com/home?status=" + copyLink;
    var linkedinUrl = "https://www.linkedin.com/shareArticle?mini=true&url=" + copyLink;
    $(".newsroom-articles__sharing > .facebook").attr("href", facebookUrl);
    $(".newsroom-articles__sharing > .twitter").attr("href", twitterUrl);
    $(".newsroom-articles__sharing > .linkedin").attr("href", linkedinUrl);
  });
});

$(".newsroom-articles__share").on("click", function () {
  $('.newsroom-articles__sharing-bg').removeClass('hidden');
  $('.newsroom-articles__sharing').removeClass('hidden');
});
$('.newsroom-articles__sharing-bg, .newsroom-articles__sharing-close').on("click", function () {
  $('.newsroom-articles__sharing-bg').addClass('hidden');
  $('.newsroom-articles__sharing').addClass('hidden');
});

$(function () {
  $('.copy-to-clipboard input').click(function () {
    $(this).focus();
    $(this).select();
    document.execCommand('copy');
    $(".copied").text("Copied to clipboard").show().fadeOut(1200);
  });
});

var handleButtonActive = function handleButtonActive(btn, target) {
  var buttonlang = btn.find("span");
  if (target.hasClass("expand")) {
    if (buttonlang.text() == "Read less") {
      buttonlang.text("Read more");
    }
    if (buttonlang.text() == "Lire moins") {
      buttonlang.text("Lire plus");
    }
  } else {
    if (buttonlang.text() == "Read more") {
      buttonlang.text("Read less");
    }
    if (buttonlang.text() == "Lire plus") {
      buttonlang.text("Lire moins");
    }
  }
  target.toggleClass("expand");
};

var readMoreBoxButton = function readMoreBoxButton(btn, target) {
  btn.on("click", function (e) {
    handleButtonActive(btn, target);
  });

  btn.keyup(function (e) {
    if (e.keyCode === 13) {
      handleButtonActive(btn, target);
    }
  });
};

var readMoreBox = function readMoreBox() {
  var target = $(".read-more-content");
  var btn = $(".read-more-content__button > span");

  if (target.data('auto')) {
    if (target.height() > 340) {
      target.addClass("active");
    }

    readMoreBoxButton(btn, target);
  } else if (target.data('use')) {
    target.addClass("active");
    readMoreBoxButton(btn, target);
  }
};

$(document).ready(function () {
  readMoreBox();
});
$(function () {
  //Initialize responsive menu
  var menu = new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('trigger'));

  // Prevent default for second level links with sub-nav
  $('.mp-menu a').each(function () {
    if ($(this).siblings('div.mp-level').length > 0) {
      $(this).attr('href', '#');
    }
  });

  $('.mp-menu a').each(function () {
    if ($(this).siblings('div.mp-level').length > 0) {
      $(this).addClass('chevronarrow');
    }
  });
}());
$(function () {
  var $searchTrigger = $('form.search input, #menu-trigger');
  var $searchCloseTrigger = $('.search_overlay .search_close_trigger');
  var $searchOverlay = $('.search_overlay');
  var paddingTop = 48 - parseInt($('header .top').css('padding-top'));

  $('.search_overlay #query').on('keyup', function (e) {
    // console.log(e.keyCode);
    if (e.keyCode === 27) {
      e.preventDefault();
      e.stopPropagation();
      $searchOverlay.animate({ scrollTop: 0 }, 1);
      if (!$('.menu_overlay').is(':visible')) {
        $('body').removeClass('menuOpen');
      }
      $searchOverlay.fadeOut('slow');
      $searchOverlay.off('click', removeSearch);
    }
  });

  $searchTrigger.on('click', function (e) {
    e.preventDefault();

    $('body').addClass('menuOpen');

    if ($('#homepagesearch').length > 0) {
      var $parenform = $searchTrigger.parents('.middle');
      var offset = parseInt($('#homepagesearch form.search').offset().top - $(window).scrollTop());

      var scrollTo = 300 - paddingTop + (306 - offset);
      $parenform.css('top', scrollTo + 'px');
    }

    $searchOverlay.fadeIn('slow', function (e) {
      $('.search_overlay #query').focus();
      $searchOverlay.on('click', removeSearch);

      if ($('#homepagesearch').length > 0) {
        $parenform.css('top', '306px');
      }
    });
  });

  $('.search_trigger').on('click', function (e) {
    e.preventDefault();
    $('body').addClass('menuOpen');
    $searchOverlay.fadeIn('slow', function (e) {
      $('.search_overlay #query').focus();
      $searchOverlay.on('click', removeSearch);
    });
  });

  $searchCloseTrigger.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $searchOverlay.animate({ scrollTop: 0 }, 1);
    if (!$('.menu_overlay').is(':visible')) {
      $('body').removeClass('menuOpen');
    }
    $searchOverlay.fadeOut('slow');
    $searchOverlay.off('click', removeSearch);
  });

  function removeSearch(e) {
    if (!$(e.target).is('.search_overlay_inner div[class^="col"] *')) {
      $searchOverlay.animate({ scrollTop: 0 }, 1);
      if (!$('.menu_overlay').is(':visible')) {
        $('body').removeClass('menuOpen');
      }
      $searchOverlay.fadeOut('slow');
      $searchOverlay.off('click', removeSearch);
    }
  }

  // $(function(){
  //
  //   $(".search_overlay_inner form.searchover input.searchresultinput").keyup(function(){
  //
  //     // var val = $(this).val().trim();
  //     // val = val.replace(/\s+/g, '');
  //     if( this.value.length < 3 ) return;
  //
  //       console.log('3 or more');
  //       $.ajax({
  //         url: 'https://wood-search01.squiz.co.uk/s/suggest.json?collection=woodMeta&fmt=json%2B%2B&alpha=0.5&profile=_default&partial_query=pag',
  //         success: function (result) {
  //           console.log(result);
  //         }
  //       })
  //
  //
  //   });
  // });
});
// const facetAccordions = () => {
//     $(".checkbox-facet > div").removeClass("active");
//
//     $(".checkbox-facet > ul").slideUp("fast");
//
//     $(".facets > div:first-child > div").addClass("active");
//     $(".facets > div:first-child > div").next().slideToggle("fast");
//
//     $(".facets")
//         .find(".checkbox-facet > div")
//         .click(function () {
//             if ($(this).hasClass("active")) {
//                 $(this).removeClass("active");
//             } else {
//                 $(this).addClass("active");
//             }
//
//             $(this)
//                 .next()
//                 .slideToggle("fast");
//
//             $(".checkbox-facet > div")
//                 .not($(this))
//                 .removeClass("active");
//
//             $(".checkbox-facet > ul")
//                 .not($(this).next())
//                 .slideUp("fast");
//         });
// };
//
//
// $(document).ready(() => {
//     if ($(".fb_results").length > 0) {
//         facetAccordions();
//     }
//     ;
// });

$(document).ready(function () {
  $(".sector-container:nth-child(1) > .sectortile").addClass("notopborder1");
  $(".sector-container:nth-child(2) > .sectortile").addClass("notopborder2");
  $(".sector-container:nth-child(3) > .sectortile").addClass("notopborder3");
});
(function ($) {
  'use strict';
})(jQuery);
(function ($) {
  var $leftArea = $("#event_scroller_left"),
      $rightArea = $("#event_scroller_right"),
      $leftDate = $("#date_scroller_left"),
      $rightDate = $("#date_scroller_right"),
      tId = null,
      time = 300,
      position = 0,
      numEvent = $(".event").length,
      eventWidth = parseInt($(".event").css("width")),
      eventWidthTotal = numEvent * eventWidth,
      relativePosition = parseInt($(".events").css("width")) - eventWidthTotal;
  $(window).on("resize", function (e) {
    $(".events, .dates").css("left", "0px");
    $leftArea = $("#event_scroller_left"), $rightArea = $("#event_scroller_right"), $leftDate = $("#date_scroller_left"), $rightDate = $("#date_scroller_right"), tId = null, time = 300, position = 0, numEvent = $(".event").length, eventWidth = parseInt($(".event").css("width")), eventWidthTotal = numEvent * eventWidth, relativePosition = parseInt($(".events").css("width")) - eventWidthTotal;
  });
  if ($(window).width() > 767) {
    $leftArea.on("click", function (e) {
      e.preventDefault();
      if ($(this).hasClass("disable")) {
        return;
      }
      position = parseInt($(".events").css("left"));
      position = position + parseInt(eventWidth);
      if (position > 0) {
        position = 0;
      }
      console.log(position);
      $(".events, .dates").css("left", position + "px");
    });

    $rightArea.on("click", function (e) {
      e.preventDefault();
      if ($(this).hasClass("disable")) {
        return;
      }
      position = parseInt($(".events").css("left"));
      position = position - parseInt(eventWidth);
      if (position < relativePosition) {
        position = relativePosition;
      }
      console.log(position);
      $(".events, .dates").css("left", position + "px");
    });

    $leftDate.on("click", function (e) {
      e.preventDefault();
      if ($(this).hasClass("disable")) {
        return;
      }
      position = parseInt($(".events").css("left"));
      position = 3 * eventWidth + position;
      if (position > 0) {
        position = 0;
      }
      $(".events, .dates").css("left", position + "px");
    });
    $rightDate.on("click", function (e) {
      e.preventDefault();
      if ($(this).hasClass("disable")) {
        return;
      }
      position = parseInt($(".events").css("left"));
      position = -1 * (3 * eventWidth - position);
      if (position + (eventWidthTotal - eventWidth * 5) <= 0) {
        position = -1 * (eventWidthTotal - eventWidth * 5);
      }
      $(".events, .dates").css("left", position + "px");
    });

    $(".event").on("click", function (e) {
      var $this = $(this);
      e.preventDefault();
      var index = $("div.event").index(this);
      if ($(this).hasClass("expanded")) {
        $(".events").css("left", position + "px");
        $this.removeClass("expanded");
        $leftArea.removeClass("disable");
        $rightArea.removeClass("disable");
        $leftDate.removeClass("disable");
        $rightDate.removeClass("disable");
      } else {
        $this.addClass("expanded");
        $leftArea.addClass("disable");
        $rightArea.addClass("disable");
        $leftDate.addClass("disable");
        $rightDate.addClass("disable");
        $(".events").css("left", "-" + index * eventWidth + "px");
      }
    });

    $(".date").on("click", function (e) {
      e.preventDefault();
      if ($(this).hasClass("disable")) {
        return;
      }
      var index = $("div.date").index(this);
      var date = $("p", this).html();
      if ($('.event[data-year="' + date + '"]').hasClass("expanded")) {
        $(".events").css("left", position + "px");
        $('.event[data-year="' + date + '"]').removeClass("expanded");
        $leftArea.removeClass("disable");
        $rightArea.removeClass("disable");
        $leftDate.removeClass("disable");
        $rightDate.removeClass("disable");
      } else {
        $(".event").removeClass("expanded");
        $('.event[data-year="' + date + '"]').addClass("expanded");
        $(".events").css("left", "-" + index * eventWidth + "px");
        $leftArea.addClass("disable");
        $rightArea.addClass("disable");
        $leftDate.addClass("disable");
        $rightDate.addClass("disable");
      }
    });
  }
})(jQuery);

(function ($) {
  var videoPlay = function videoPlay() {
    var play = $(".video-with-thumbnail__play");
    var thumbnail = $(".video-with-thumbnail__responsive img");
    var videoContainer = $(".video-with-thumbnail__responsive");
    var iframe = $(".video-with-thumbnail iframe");

    play.on("click", function (e) {
      e.preventDefault();
      var src = thumbnail.attr("data-youtube") + "?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0"; // src: the original URL for embedding
      videoContainer.empty().append(iframe.attr({ src: src })); // $iframe: the original iframe for embedding
    });
  };

  $(document).ready(function () {
    videoPlay();
  });
})(jQuery);
//# sourceMappingURL=global.js.map
