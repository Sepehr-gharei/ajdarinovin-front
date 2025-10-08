$(document).ready(function() {
  // مدیریت منو موبایل
  $(".mobile-btn .open").click(function() {
    $("header .nav-section .menu-container").css("right", "0");
    $(this).css("display", "none");
    $(".mobile-btn .close").addClass("active");
    $(".overlay").fadeIn(200);
  });

  $(".mobile-btn .close").click(function() {
    closeMenu();
  });

  $(".overlay").click(function() {
    closeMenu();
  });

  $(document).on("click", function(e) {
    if ($(".overlay").is(":visible")) {
      if (
        $(e.target).closest("header .nav-section .menu-container").length === 0 &&
        !$(e.target).hasClass("open")
      ) {
        closeMenu();
      }
    }
  });

  function closeMenu() {
    $("header .nav-section .menu-container").css("right", "-1000px");
    $(".mobile-btn .open").css("display", "block");
    $(".mobile-btn .close").removeClass("active");
    $(".overlay").fadeOut(200);
  }

  // sticky header
  $(window).scroll(function() {
    var nav = $(".nav-section");
    if ($(window).scrollTop() > 150) {
      nav.addClass("sticky-header");
    } else {
      nav.removeClass("sticky-header");
    }
  });

  // تنظیم دکمه‌های hover
  $(".main-border-hover-btn").each(function() {
    var btn = $(this);
    var width = btn.outerWidth();
    var height = btn.outerHeight();
    var r = 10.5;
    var inset = 1.5;

    btn.find("svg").each(function() {
      var svg = $(this);
      var path = svg.find("path.border-path");

      if (path.length === 0) return;

      svg.attr("viewBox", `0 0 ${width} ${height}`);

      var d = `M${r + inset},${inset} H${width - r - inset} A${r},${r} 0 0 1 ${width - inset},${r + inset} V${height - r - inset} A${r},${r} 0 0 1 ${width - r - inset},${height - inset} H${r + inset} A${r},${r} 0 0 1 ${inset},${height - r - inset} V${r + inset} A${r},${r} 0 0 1 ${r + inset},${inset}`;

      path.attr("d", d);

      var length = path[0].getTotalLength();
      path.attr("stroke-dasharray", length).attr("stroke-dashoffset", length);
    });
  });

  // تنظیم Swiper
  $(".slider").each(function() {
    var $this = $(this);
    var setting = $this.attr("data-settings");
    var id = $this.attr("id");
    var items = JSON.parse(setting);

    var autoplaySetting = items.autoplay === "false" ? false : {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    };

    new Swiper("#" + id, {
      slidesPerView: items.columns,
      spaceBetween: items.space || 0,
      autoplay: autoplaySetting,
      loop: items.infinite,
      centeredSlides: items.centerMode,
      navigation: {
        nextEl: "#" + id + " .swiper-button-next",
        prevEl: "#" + id + " .swiper-button-prev",
      },
      pagination: {
        el: "#" + id + " .swiper-pagination",
        clickable: true,
        dynamicBullets: false,
      },
      breakpoints: {
        10: { slidesPerView: items.columns_mobile },
        480: { slidesPerView: items.columns_mobile_tablet },
        768: { slidesPerView: items.columns_tablet },
        1024: { slidesPerView: items.columns },
      },
    });
  });

  // ایجاد TOC
  var toc = $("<ul></ul>");
  $(".text-area :header").each(function(index) {
    var heading = $(this);
    var tag = heading.prop("tagName").toLowerCase();
    var text = heading.text();

    var id = heading.attr("id");
    if (!id) {
      id = "heading-" + index;
      heading.attr("id", id);
    }

    var li = $("<li></li>").addClass(tag === "h2" ? "large" : "small");
    var a = $("<a></a>").attr("href", "#" + id).text(text);
    li.append(a);
    toc.append(li);
  });

  $("#toc").append(toc);

  $("#toc a").on("click", function(event) {
    event.preventDefault();
    var target = $(this.hash);
    if (target.length) {
      $("html, body").animate({
        scrollTop: target.offset().top,
      }, 800);
    }
  });

  // مدیریت زیرمنو در موبایل (ادغام دو بخش مشابه)
  if ($(window).width() < 990) {
    $(".menu-item-has-children").on("click", function(e) {
      e.preventDefault();
      $(this).toggleClass("open-child");
    });

    $(".menu-item-has-children > a").on("click", function(e) {
      e.preventDefault();
      $(this).next(".sub-menu").slideToggle();
    });
  }

  // Fancybox
  Fancybox.bind('[data-fancybox="gallery"]', {});
});