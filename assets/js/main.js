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

const magnetism = 0.5; // How much the cursor moves the button
const springStrength = 0.25; // How strong the spring force is
const dampening = 0.75; // How much the button slows down after leaving the cursor
const elasticity = 1.3; // How much the button seems to spring back after leaving the cursor

$(".magnetic-button").each(function () {
  let currentX = 0;
  let currentY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let animationFrame = null;

  function updateButtonPosition() {
    $(this).css("transform", `translate(${currentX}px, ${currentY}px)`);
  }

  function animate() {
    velocityX *= dampening;
    velocityY *= dampening;
    currentX += velocityX;
    currentY += velocityY;
    const distance = Math.sqrt(currentX * currentX + currentY * currentY);
    if (
      Math.abs(distance) < 0.01 &&
      Math.abs(velocityX) < 0.01 &&
      Math.abs(velocityY) < 0.01
    ) {
      currentX = 0;
      currentY = 0;
      velocityX = 0;
      velocityY = 0;
      updateButtonPosition.call(this);
      cancelAnimationFrame(animationFrame);
      return;
    }
    // Spring force towards origin
    const springForceX = -currentX * springStrength;
    const springForceY = -currentY * springStrength;
    velocityX += springForceX;
    velocityY += springForceY;
    updateButtonPosition.call(this);
    animationFrame = requestAnimationFrame(animate.bind(this));
  }

  $(this).on("mousemove", function (e) {
    cancelAnimationFrame(animationFrame);
    const rect = this.getBoundingClientRect();
    currentX = e.clientX - rect.left - rect.width / 2;
    currentY = e.clientY - rect.top - rect.height / 2;
    // Apply magnetism
    currentX *= magnetism;
    currentY *= magnetism;
    velocityX = 0;
    velocityY = 0;
    updateButtonPosition.call(this);
  });

  $(this).on("mouseleave", function (e) {
    const rect = this.getBoundingClientRect();
    const exitX = e.clientX - rect.left - rect.width / 2;
    const exitY = e.clientY - rect.top - rect.height / 2;
    // Set initial velocity in the opposite direction of exit
    velocityX = -exitX * magnetism * elasticity;
    velocityY = -exitY * magnetism * elasticity;
    animate.call(this);
  });
});
