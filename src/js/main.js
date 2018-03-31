import $ from "jquery";
import Swiper from "swiper";
import "../vendor/bootstrap/js/bootstrap.js";
import "daterangepicker";
import "daterangepicker/daterangepicker.scss";
import "slick-carousel";
import "slick-carousel/slick/slick.scss";

$(document).ready(function() {
  function resetContactForm() {
    $(".contact-form")
      .find("input,textarea")
      .val("");
  }
  function resetContactFormErrors() {
    $(".contact-form")
      .find("input,textarea")
      .removeClass("has-error");
  }

  $(".contact-form").on("submit", function(e) {
    var form = $(this);
    form.find(".contact-form__btn").attr("disabled", "disabled");
    e.preventDefault();
    var token = $('meta[name="csrf-token"]').attr("content");
    // var token = 1;
    var name = form.find('*[name="name"]').val();
    var surname = form.find('*[name="surname"]').val();
    var email = form.find('*[name="email"]').val();
    var phone = form.find('*[name="phone"]').val();
    var message = form.find('*[name="message"]').val();

    $.post(
      $(this).attr("action"),
      {
        _token: token,
        name: name,
        surname: surname,
        email: email,
        phone: phone,
        message: message
      },
      function(res) {
        form.find(".contact-form__btn").removeAttr("disabled");
        if (res.status === "success") {
          form.find(".contact-form__message h4").text(res.title);
          form.find(".contact-form__message p").text(res.message);
          form.find(".contact-form__message").addClass("visible");
          setTimeout(() => {
            resetContactForm();
            resetContactFormErrors();
            form.find(".contact-form__message").removeClass("visible");
          }, 3000);
        } else if (res.status === "fail") {
          form.find(".contact-form__message h4").text(res.title);
          form.find(".contact-form__message p").text(res.message);
          form.find(".contact-form__message").addClass("visible");
          setTimeout(() => {
            resetContactFormErrors();
            form.find(".contact-form__message").removeClass("visible");
          }, 3000);
        } else if (res.status === "validation") {
          resetContactFormErrors();
          res.errors.forEach(element => {
            form.find('*[name="' + element + '"]').addClass("has-error");
          });
        }
      }
    );
  });

  function initTabSlick() {
    $(".js-tab-gallery").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      asNavFor: ".gallery-nav",
      prevArrow:
        '<button class="slick-prev slick-arrow" type="button"></button>',
      nextArrow:
        '<button class="slick-next slick-arrow" type="button"></button>'
    });

    $(".js-tab-gallery-nav").slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: ".gallery",
      dots: false,
      centerMode: true,
      arrows: false,
      focusOnSelect: true
    });
  }

  function initSlick() {
    $(".js-gallery").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      asNavFor: ".gallery-nav",
      prevArrow:
        '<button class="slick-prev slick-arrow" type="button"></button>',
      nextArrow:
        '<button class="slick-next slick-arrow" type="button"></button>'
    });

    $(".js-gallery-nav").slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: ".gallery",
      dots: false,
      centerMode: true,
      arrows: false,
      focusOnSelect: true
    });
  }

  initSlick();

  $(".init-tab-slick").on("click", function() {
    setTimeout(function() {
      initTabSlick();
    }, 100);
  });

  //init
  $('[data-toggle="popover"]').popover();
  var interleaveOffset = 0.5;
  var swiper = new Swiper(".swiper-container", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    loop: true,
    speed: 1000,
    grabCursor: false,
    watchSlidesProgress: true,
    mousewheelControl: true,
    keyboardControl: true,
    draggable: false,
    simulateTouch: false,
    on: {
      init: function() {
        setTimeout(function() {
          $(".swiper-slide-active  .swiper-caption")
            .css({
              visibility: "visible"
            })
            .addClass("slideInRight");
        }, 1500);
      },
      progress: function() {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          var slideProgress = swiper.slides[i].progress;
          var innerOffset = swiper.width * interleaveOffset;
          var innerTranslate = slideProgress * innerOffset;
          swiper.slides[i].querySelector(".slide-inner").style.transform =
            "translate3d(" + innerTranslate + "px, 0, 0)";
        }
      },
      touchStart: function() {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = "";
        }
      },
      setTransition: function(speed) {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = speed + "ms";
          swiper.slides[i].querySelector(".slide-inner").style.transition =
            speed + "ms";
        }
      }
    }
  });

  swiper.on("slideChangeTransitionStart", function() {
    $(".swiper-slide .swiper-caption")
      .css({
        visibility: "hidden"
      })
      .removeClass("slideInRight");

    setTimeout(function() {
      $(".swiper-slide-active  .swiper-caption")
        .css({
          visibility: "visible"
        })
        .addClass("slideInRight");
    }, 500);
  });

  // swiper.on("slideChangeTransitionEnd", function() {
  //   // setTimeout(function() {
  //   //   $(".swiper-slide-active .swiper-caption h4").removeClass("bounceInLeft");
  //   // }, 1300);
  //   // $(
  //   //   ".swiper-slide:not(.swiper-slide-active) .home-slider__item-layer-caption"
  //   // ).hide();
  // });

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

  $(".yellow-tab__item").on("click", function(e) {
    e.preventDefault();
    var target = $(this)
      .find("a")
      .attr("href");
    $(".yellow-tab__item").removeClass("yellow-tab__item--active");
    $(this).addClass("yellow-tab__item--active");
    $(".yellow-tab__pane")
      .removeClass("yellow-tab__pane--active")
      .hide();
    $(target)
      .fadeIn()
      .addClass("yellow-tab__pane--active");
  });

  return false;
});

$(window).on("load", function() {
  $(".navbar-brand__img")
    .addClass("animate")
    .addClass("fadeInOut");

  if (!$(".navbar").hasClass("fixed")) {
    setTimeout(function() {
      $(".navbar-wrapper")
        .addClass("animate")
        .addClass("fadeInOut");
      setTimeout(function() {
        $(".navbar-wrapper").removeClass("animate");
      }, 1200);
    }, 500);
    setTimeout(function() {
      $(".top-menu__list")
        .addClass("animate")
        .addClass("fadeInOut");
      setTimeout(function() {
        $(".top-menu__list").removeClass("animate");
      }, 1200);
    }, 700);
  } else {
    $(".navbar-wrapper").addClass("fadeInOut");
    $(".top-menu__list").addClass("fadeInOut");
  }

  setTimeout(function() {
    $(".slider-section")
      .addClass("animate")
      .addClass("fadeInOut");
    setTimeout(function() {
      $(".slider-section").removeClass("animate");
    }, 1200);
  }, 1000);

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

  $(".range-picker")
    .daterangepicker(
      {
        opens: "center",
        autoUpdateInput: true,
        autoApply: true
      },
      function(start, end, label) {
        $("#from").val(start.format("MM/DD/YYYY"));
        $("#to").val(end.format("MM/DD/YYYY"));

        setTimeout(function() {
          $(".news-date-picker form").submit();
        }, 200);
      }
    )
    .on("changeDate", function(ev) {});

  $(".navbar-nav-href.parent").on("click", function(e) {
    e.preventDefault();

    return false;
  });
});
