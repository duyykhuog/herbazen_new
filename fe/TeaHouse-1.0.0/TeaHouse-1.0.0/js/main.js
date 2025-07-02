(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-150px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Modal Video
  var $videoSrc;
  $(".btn-play").click(function () {
    $videoSrc = $(this).data("src");
  });
  console.log($videoSrc);
  $("#videoModal").on("shown.bs.modal", function (e) {
    $("#video").attr(
      "src",
      $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
    );
  });
  $("#videoModal").on("hide.bs.modal", function (e) {
    $("#video").attr("src", $videoSrc);
  });

  // Product carousel
  const API_URL = "http://localhost:8080/api/products";

  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("productList");

      data.forEach((p) => {
        const html = `
          <a href="ProductDetails.html?id=${p.id}" class="d-block product-item rounded">
            <img src="${p.imageUrl}" alt="${p.name}" />
            <div class="bg-white shadow-sm text-center p-4 position-relative mt-n5 mx-4">
              <div class="price-container mb-3">
                <span class="price-amount">${p.price.toLocaleString()}</span>
                <span class="currency">₫</span>
            </div>
              <h4 class="text-primary">${p.name}</h4>
              <span class="text-body">${p.description}</span>
            </div>
          </a>
        `;
        container.insertAdjacentHTML("beforeend", html);
      });

      // 🟢 Khởi tạo carousel sau khi thêm toàn bộ sản phẩm
      $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        dots: false,
        nav: true,
        navText: [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>',
        ],
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          768: { items: 3 },
          992: { items: 4 }, // mỗi khung hình hiện tối đa 4 sản phẩm
        },
      });
    });

  // Testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    loop: true,
    dots: true,
    nav: false,
  });
})(jQuery);

// store index
fetch("http://localhost:8080/api/products/top3")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("top3Products");

    data.forEach((p, index) => {
      const delay = 0.1 + index * 0.2;

      const html = `
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${delay}s">
          <div class="store-item position-relative text-center">
            <img class="img-fluid product-img" src="${p.imageUrl}" alt="${
        p.name
      }"
                 style="width: 100%; height: 250px; object-fit: cover;" />
            <div class="p-4">
              <h4 class="mb-3">${p.name}</h4>
              <p>${p.description}</p>
              <h4 class="text-primary">${p.price.toLocaleString("vi-VN")}đ</h4>
            </div>
            <div class="store-overlay">
              <button class="btn btn-primary rounded-pill py-2 px-4 m-2 add-to-cart-btn"
                      data-id="${p.id}" data-name="${p.name}" data-price="${
        p.price
      }"
                      data-image="${p.imageUrl}">
                Add To Cart <i class="fa fa-shopping-cart"></i>
              </button>
              <a href="ProductDetails.html?id=${p.id}"
                 class="btn btn-primary rounded-pill py-2 px-4 m-2">
                More Detail <i class="fa fa-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      `;

      container.insertAdjacentHTML("beforeend", html);
    });
  })
  .catch((err) => {
    console.error("Lỗi khi tải sản phẩm:", err);
  });

// store
fetch("http://localhost:8080/api/products/all")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("allProduct");

    data.forEach((p, index) => {
      const delay = 0.1 + index * 0.2;

      const html = `
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${delay}s">
          <div class="store-item position-relative text-center">
            <img class="img-fluid product-img" src="${p.imageUrl}" alt="${
        p.name
      }"
                 style="width: 100%; height: 250px; object-fit: cover;" />
            <div class="p-4">
              <h4 class="mb-3">${p.name}</h4>
              <p>${p.description}</p>
              <h4 class="text-primary">${p.price.toLocaleString("vi-VN")}đ</h4>
            </div>
            <div class="store-overlay">
              <button class="btn btn-primary rounded-pill py-2 px-4 m-2 add-to-cart-btn"
                      data-id="${p.id}" data-name="${p.name}" data-price="${
        p.price
      }"
                      data-image="${p.imageUrl}">
                Thêm vào giỏ hàng <i class="fa fa-shopping-cart"></i>
              </button>
              <a href="ProductDetails.html?id=${p.id}"
                 class="btn btn-primary rounded-pill py-2 px-4 m-2">
                Xem chi tiết <i class="fa fa-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      `;

      container.insertAdjacentHTML("beforeend", html);
    });
  })
  .catch((err) => {
    console.error("Lỗi khi tải sản phẩm:", err);
  });

//Add vào giỏ hàng
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".add-to-cart-btn");
  if (!btn) return;

  // Lấy thông tin từ data-*
  const id = btn.dataset.id;
  const name = btn.dataset.name;
  const price = parseFloat(btn.dataset.price);
  const imageUrl = btn.dataset.image;

  // Tạo item
  const cartItem = {
    id: id,
    name: name,
    price: price,
    imageUrl: imageUrl,
    quantity: 1,
  };

  // Lấy giỏ hàng từ localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => String(item.id) === String(cartItem.id));

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(cartItem);
  }

  // Lưu lại
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIconCount();

  // Gọi hiệu ứng
  animateAddToCart(btn);
});

//Hiệu ứng thêm vào giỏ hàng
function animateAddToCart(btn) {
  const cartIcon = document.getElementById("cart-icon");
  if (!cartIcon) return;

  const productBox = btn.closest(".store-item");
  const img = productBox.querySelector(".product-img");
  if (!img) return;

  const clone = img.cloneNode(true);
  const imgRect = img.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  clone.style.position = "fixed";
  clone.style.top = imgRect.top + "px";
  clone.style.left = imgRect.left + "px";
  clone.style.width = imgRect.width + "px";
  clone.style.height = imgRect.height + "px";
  clone.style.zIndex = 1000;
  clone.style.transition = "all 0.8s ease-in-out";
  clone.style.borderRadius = "8px";

  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    clone.style.top = cartRect.top + "px";
    clone.style.left = cartRect.left + "px";
    clone.style.width = "30px";
    clone.style.height = "30px";
    clone.style.opacity = "0.5";
  });

  setTimeout(() => clone.remove(), 800);
}

//Hiển thị giỏ hàng
function updateCartIconCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.length; // Chỉ đếm số loại sản phẩm
  document.getElementById("cart-count").textContent = count;
}

function renderCartPopup() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-modal-body");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Giỏ hàng đang trống.</p>";
    updateCartIconCount();
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const html = `
      <div class="d-flex mb-3 border-bottom pb-2 align-items-center">
        <img src="${item.imageUrl}" alt="${
      item.name
    }" style="width: 80px; height: 80px; object-fit: cover;" class="me-3 rounded">
        <div class="flex-grow-1">
          <h6 class="mb-1">${item.name}</h6>
          <p class="mb-0">Giá: ${item.price.toLocaleString("vi-VN")}đ</p>
          <div class="input-group input-group-sm mt-1" style="width: 120px;">
            <button class="btn btn-outline-secondary" onclick="changeQuantity(${index}, -1)">-</button>
            <input type="text" class="form-control text-center" value="${
              item.quantity
            }" disabled>
            <button class="btn btn-outline-secondary" onclick="changeQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <button class="btn btn-sm btn-danger ms-3" onclick="removeItem(${index})">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });

  // Tổng tiền
  const totalHtml = `
    <div class="mt-3 text-end fw-bold fs-5">
      Tổng: ${total.toLocaleString("vi-VN")}đ
    </div>
  `;
  container.insertAdjacentHTML("beforeend", totalHtml);

  updateCartIconCount();
}

function changeQuantity(index, delta) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart[index]) return;

  cart[index].quantity += delta;

  if (cart[index].quantity < 1) {
    if (!confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      cart[index].quantity = 1; // Reset về 1 nếu không đồng ý xóa
    } else {
      cart.splice(index, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartPopup();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart[index]) return;

  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartPopup();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartIconCount();
});

// Check out
document.getElementById("checkoutBtn").addEventListener("click", function (e) {
  localStorage.setItem("checkoutMode", "cart");
  e.preventDefault(); // Ngăn chuyển trang ngay

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Giỏ hàng trống",
      text: "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.",
      confirmButtonText: "OK",
    });
  } else {
    // Nếu có sản phẩm, mới cho chuyển sang trang checkout
    window.location.href = "checkout.html";
  }
});

fetch('http://localhost:8080/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "Tôi muốn tư vấn trà",
    context: [
      { role: "user", content: "Tôi cần thư giãn" },
      { role: "bot", content: "Bạn có thể dùng trà hoa cúc" }
    ]
  })
})
.then(res => res.text())
.then(reply => {
  chatBox.innerHTML += `<div class="message bot"><strong>Bot:</strong> ${reply}</div>`;
});