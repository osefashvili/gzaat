import $ from "jquery";
import Swiper from "swiper";
import "../vendor/bootstrap/js/bootstrap.js";

$(document).ready(function() {
  //init
  $('[data-toggle="popover"]').popover();
  var swiper = new Swiper(".swiper-container", {
    pagination: { el: ".swiper-pagination", clickable: true },
    effect: "fade"
  });

  swiper.on("slideChangeTransitionStart", function() {
    $(".swiper-slide .swiper-caption h4")
      .css({ visibility: "hidden" })
      .removeClass("bounceInLeft");

    $(".swiper-slide .swiper-caption p")
      .css({ visibility: "hidden" })
      .removeClass("bounceInLeft");

    setTimeout(() => {
      $(".swiper-slide-active .swiper-caption h4")
        .css({ visibility: "visible" })
        .addClass("bounceInLeft");
    }, 100);

    setTimeout(() => {
      $(".swiper-slide-active .swiper-caption p")
        .css({ visibility: "visible" })
        .addClass("bounceInLeft");
    }, 500);

    // setTimeout(function() {
    //   $(".swiper-slide-active .home-slider__item-layer-caption")
    //     .show()
    //     .addClass("fadeInRight animated");
    // }, 500);
  });

  swiper.on("slideChangeTransitionEnd", function() {
    // setTimeout(function() {
    //   $(".swiper-slide-active .swiper-caption h4").removeClass("bounceInLeft");
    // }, 1300);
    // $(
    //   ".swiper-slide:not(.swiper-slide-active) .home-slider__item-layer-caption"
    // ).hide();
  });

  // sticky navbar
  var win = $(window);
  var lastScrollTop = 0;
  var navbar = $(".js-sticky-navbar");
  var navbarRight = $(".js-navbar-right");
  var pos = navbarRight.offset().top;
  $(win).on("scroll", function() {
    if (win.scrollTop() > lastScrollTop) {
      // downscroll code
      win.scrollTop() >= pos + 80
        ? navbar.addClass("fixed")
        : navbar.removeClass("fixed");
    } else {
      // upscroll code
      win.scrollTop() >= pos + 80
        ? navbar.addClass("fixed")
        : navbar.removeClass("fixed");
      win.scrollTop() < pos + 170 && win.scrollTop() >= pos + 80
        ? navbar.addClass("end-fixed")
        : navbar.removeClass("end-fixed");
    }
    lastScrollTop = win.scrollTop();
  });
  // calendar tab
  $(".js-calendar-tab-item").on("click", function(e) {
    e.preventDefault();
    var target = $($(this).attr("data-target"));
    $(".js-calendar-tab-item").removeClass("active");
    $(this).addClass("active");
    $(".js-calendar-panel").hide();
    target.fadeIn();
    return false;
  });

  // $(".navbar-nav-list").on("mouseenter", function() {
  //   $(this)
  //     .find(".navbar-nav-list__dropdown")
  //     .addClass("fadeIn");
  // });

  // $(".navbar-nav-list").on("mouseleave", function() {
  //   var that = $(this);
  //   $(this)
  //     .find(".navbar-nav-list__dropdown")
  //     .addClass("fadeOut");
  //   setTimeout(function() {
  //     that.removeClass("fadeIn");
  //   }, 200);
  // });
});

$(window).on("load", function() {
  $(window)
    .scroll(function() {
      var windowBottom = $(this).scrollTop() + $(this).innerHeight();
      $(".transition").each(function() {
        /* Check the location of each desired element */
        var objectBottom = $(this).offset().top + $(this).outerHeight();

        /* If the element is completely within bounds of the window, fade it in */
        if (objectBottom - $(this).height() / 2 < windowBottom) {
          //object comes into view (scrolling down)
          // if ($(this).css("opacity") == 0) {
          //   $(this).fadeTo(500, 1);
          // }
          $(this).addClass("slideUp");
        } else {
          $(this).removeClass("slideUp");
        }
      });
    })
    .scroll(); //invoke scroll-handler on page-load
});
