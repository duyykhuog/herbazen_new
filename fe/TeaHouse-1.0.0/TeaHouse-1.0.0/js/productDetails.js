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
          <a href="/san_pham_chi_tiet/${p.id}" class="d-block product-item rounded">
            <img src="${p.imageUrl}" alt="${p.name}" />
            <div class="bg-white shadow-sm text-center p-4 position-relative mt-n5 mx-4">
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

//total
const quantityInput = document.getElementById("quantityInput");
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");

increaseBtn.addEventListener("click", () => {
  let current = parseInt(quantityInput.value) || 1;
  quantityInput.value = current + 1;
});

decreaseBtn.addEventListener("click", () => {
  let current = parseInt(quantityInput.value) || 1;
  if (current > 1) {
    quantityInput.value = current - 1;
  }
});

// Optional: ngăn người dùng nhập số nhỏ hơn 1
quantityInput.addEventListener("input", () => {
  let current = parseInt(quantityInput.value);
  if (isNaN(current) || current < 1) {
    quantityInput.value = 1;
  }
});

// Lấy id sản phẩm
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
var p;

// product detail
if (productId) {
  fetch(`http://localhost:8080/api/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      p = product;
      // Gán dữ liệu sản phẩm lên giao diện, ví dụ:
      document.getElementById("productName").textContent = product.name;
      document.getElementById("productNameLink").textContent = product.name;
      document.getElementById("productImage").src = product.imageUrl;
      document.getElementById("productImage").alt = product.name;
      document.getElementById("productPrice").textContent =
        product.price.toLocaleString("vi-VN") + "đ";
      document.getElementById("productNameInfo").textContent = product.name;
      document.getElementById("productIngredientInfo").textContent =
        product.ingredient;
      document.getElementById("productUsesInfo").textContent = product.uses;
      if (product.use != null || product.use.trim !== "")
        document.getElementById("productUseInfo").innerHTML =
          product.use.replace(/\n/g, "<br>");
    })
    .catch((err) => console.error("Lỗi tải chi tiết sản phẩm:", err));
} else {
  console.error("Không có ID sản phẩm trong URL");
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

//Thêm sản phẩm vào giỏ hàng
document.getElementById("addToCartBtn").addEventListener("click", function (e) {
  // Lấy giỏ hàng hiện tại từ localStorage (nếu có)
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Lấy số lượng từ input người dùng

  const quantity = parseInt(document.getElementById("quantityInput").value);

  // Tạo item sản phẩm để lưu
  const cartItem = {
    id: p.id,
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
    quantity: quantity,
  };

  console.log(cartItem);

  // Kiểm tra nếu sản phẩm đã có trong giỏ => cộng dồn số lượng
  const existingItem = cart.find(
    (item) => String(item.id) === String(cartItem.id)
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push(cartItem);
  }

  // Lưu lại vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Hiển thị thông báo thành công (bạn có thể dùng Swal nếu muốn)
  animateAddToCartFromProduct(p, e.target);

  updateCartIconCount();
});

function updateCartIconCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.length; // Chỉ đếm số loại sản phẩm
  document.getElementById("cart-count").textContent = count;
}

//Hiệu ứng thêm vào giỏ hàng
function animateAddToCartFromProduct(p, btn) {
  if (!p || !p.imageUrl) return;
  const cartIcon = document.getElementById("cart-icon");
  if (!cartIcon) return;

  // Lấy vị trí nút Thêm vào giỏ hàng (điểm bắt đầu bay)
  const btnRect = btn.getBoundingClientRect();
  // Lấy vị trí icon giỏ hàng (điểm kết thúc)
  const cartRect = cartIcon.getBoundingClientRect();

  // Tạo clone ảnh mới từ URL p.imageUrl
  const clone = document.createElement("img");
  clone.src = p.imageUrl;
  clone.classList.add("fly-img");

  // Set style ban đầu: vị trí nút Thêm vào giỏ hàng
  clone.style.position = "fixed";
  clone.style.top = btnRect.top + "px";
  clone.style.left = btnRect.left + "px";
  clone.style.width = "100px"; // có thể chỉnh size ảnh bay
  clone.style.height = "100px";
  clone.style.transition = "all 0.8s ease-in-out";
  clone.style.zIndex = "1000";
  clone.style.borderRadius = "8px";
  clone.style.pointerEvents = "none";

  // Thêm clone vào body
  document.body.appendChild(clone);

  // Cho trình duyệt xử lý layout, rồi bắt đầu chuyển động
  requestAnimationFrame(() => {
    clone.style.top = cartRect.top + "px";
    clone.style.left = cartRect.left + "px";
    clone.style.width = "30px";
    clone.style.height = "30px";
    clone.style.opacity = "0.5";
  });

  // Xóa clone sau hiệu ứng 0.8s
  setTimeout(() => {
    clone.remove();
  }, 900);
}

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

//Mua ngay
document.getElementById("buyNowBtn").addEventListener("click", function () {
  const productName = document.getElementById("productName").innerText;
  const productPriceText = document.getElementById("productPrice").innerText;
  const productPrice = parseInt(productPriceText.replace(/\D/g, "")) || 0;
  const quantity =
    parseInt(document.getElementById("quantityInput").value) || 1;

  const buyNowCart = [
    {
      id: p.id,
      name: productName,
      price: productPrice,
      quantity: quantity,
    },
  ];

  localStorage.removeItem("buyNowCart");
  localStorage.setItem("buyNowCart", JSON.stringify(buyNowCart));
  localStorage.setItem("checkoutMode", "buyNow");

  // Chuyển đến trang thanh toán
  window.location.href = "checkout.html";
});
