$(document).ready(function () {
    // باز کردن منو
    $(".mobile-btn .open").click(function () {
      $("header .nav-section .menu-container").css("right", "0");
      $(this).css("display", "none");
  
      // دکمه close بیاد داخل
      $(".mobile-btn .close").addClass("active");
  
      $(".overlay").fadeIn(200); // نمایش overlay
    });
  
    // بستن منو با دکمه بستن
    $(".mobile-btn .close").click(function () {
      closeMenu();
    });
  
    // بستن منو با کلیک روی overlay
    $(".overlay").click(function () {
      closeMenu();
    });
  
    // بستن منو با کلیک بیرون از منو
    $(document).on("click", function (e) {
      if ($(".overlay").is(":visible")) {
        if (
          $(e.target).closest("header .nav-section .menu-container").length === 0 &&
          !$(e.target).hasClass("open")
        ) {
          closeMenu();
        }
      }
    });
  
    // تابع برای بستن منو
    function closeMenu() {
      $("header .nav-section .menu-container").css("right", "-1000px");
      $(".mobile-btn .open").css("display", "block");
  
      // دکمه close برگرده عقب
      $(".mobile-btn .close").removeClass("active");
  
      $(".overlay").fadeOut(200); // مخفی کردن overlay
    }
  });
  
window.onscroll = function () {
  const nav = document.querySelector(".nav-section");
  if (window.scrollY > 150) {
    nav.classList.add("sticky-header");
  } else {
    nav.classList.remove("sticky-header");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".main-border-hover-btn").forEach((btn) => {
    const svg = btn.querySelector("svg");
    const path = svg.querySelector("path.border-path"); // فقط path با کلاس border-path

    if (!path) return; // اگر path نبود رد بشه

    const width = btn.offsetWidth;
    const height = btn.offsetHeight;
    const r = 10.5;
    const inset = 1.5;

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const d = `M${r + inset},${inset} H${width - r - inset} A${r},${r} 0 0 1 ${
      width - inset
    },${r + inset} V${height - r - inset} A${r},${r} 0 0 1 ${
      width - r - inset
    },${height - inset} H${r + inset} A${r},${r} 0 0 1 ${inset},${
      height - r - inset
    } V${r + inset} A${r},${r} 0 0 1 ${r + inset},${inset}`;

    path.setAttribute("d", d);

    const length = path.getTotalLength();
    path.setAttribute("stroke-dasharray", length);
    path.setAttribute("stroke-dashoffset", length);
  });
});
$(".slider").each(function () {
  var setting = $(this).attr("data-settings");
  var id = $(this).attr("id");
  var items = JSON.parse(setting);

  var autoplaySetting =
    items.autoplay === "false"
      ? false
      : {
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
      dynamicBullets: false, // bullet‌ها با اندازه یکسان
    },
    breakpoints: {
      10: { slidesPerView: items.columns_mobile },
      480: { slidesPerView: items.columns_mobile_tablet },
      768: { slidesPerView: items.columns_tablet },
      1024: { slidesPerView: items.columns },
    },
  });
});

$(document).ready(function() {
    // Create TOC container
    var toc = $('<ul></ul>');

    // Find all headings inside .text-area
    $('.text-area :header').each(function(index) {
        var heading = $(this);
        var tag = heading.prop('tagName').toLowerCase(); // e.g., h1, h2, etc.
        var text = heading.text();
        
        // Generate ID if not present
        var id = heading.attr('id');
        if (!id) {
            id = 'heading-' + index;
            heading.attr('id', id);
        }
        
        // Create list item with link
        var li = $('<li></li>');
        var a = $('<a></a>').attr('href', '#' + id).text(text);
        li.append(a);
        
        // Add class based on heading level
        if (tag === 'h2') {
            li.addClass('large');
        } else {
            li.addClass('small');
        }
        
        // Append to TOC (simple flat list, no nesting for simplicity)
        toc.append(li);
    });

    // Append TOC to the container
    $('#toc').append(toc);

    // Add smooth scrolling to TOC links
    $('#toc a').on('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        var target = $(this.hash); // Get the target element
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800); // 800ms duration for smooth scroll
        }
    });
});