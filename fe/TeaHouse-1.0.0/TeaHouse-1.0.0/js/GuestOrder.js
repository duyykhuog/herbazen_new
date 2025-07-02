function formatCurrency(n) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN") + " " + d.toLocaleTimeString("vi-VN");
}

function loadOrderCounts() {
  fetch("http://localhost:8080/countByStatus")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Lỗi khi lấy số lượng hóa đơn");
      }
      return response.json();
    })
    .then((data) => {
      // Cập nhật số lượng vào các span
      document.getElementById("countWaiting").textContent = data.waiting || 0;
      document.getElementById("countShipping").textContent = data.shipping || 0;
      document.getElementById("countDelivered").textContent =
        data.delivered || 0;
      document.getElementById("countCanceled").textContent = data.canceled || 0;
    })
    .catch((error) => {
      console.error("Lỗi khi tải số lượng đơn hàng:", error);
    });
}


function fetchOrdersByStatus(status) {
  let container = null;

  switch (status) {
    case 1:
      container = document.getElementById("orderContainer");
      break;
    case 2:
      container = document.getElementById("shippingContainer");
      break;
    case 3:
      container = document.getElementById("deliveredContainer");
      break;
    case -1:
      container = document.getElementById("canceledContainer");
  }

  if (!container) {
    console.error("Không tìm thấy container cho status:", status);
    return;
  }

  container.innerHTML = "<p>Đang tải đơn hàng...</p>";

  axios
    .get(`http://localhost:8080/byStatus?status=${status}`)
    .then((res) => {
      const orders = res.data;
      if (!Array.isArray(orders) || orders.length === 0) {
        container.innerHTML = `<p class="text-muted fst-italic">Không có đơn hàng nào.</p>`;
        return;
      }

      container.innerHTML = orders
        .map((order) => {
          const itemsHtml = order.items
            .map(
              (item) => `
              <tr>
                <td>
                  <img src="${
                    item.product.imageUrl
                  }" style="width: 40px; height: 40px;" class="me-2 rounded-circle">
                  ${item.product.name}
                </td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>${formatCurrency(item.price * item.quantity)}</td>
              </tr>
            `
            )
            .join("");

          return `
            <div class="card mb-3">
              <div class="card-header d-flex justify-content-between align-items-center">
                <strong>Mã đơn: #${order.id}</strong>
                <small>Ngày tạo: ${formatDate(order.createDate)} 
                ${
                  status === 3
                    ? ` - Ngày nhận: ${formatDate(order.dateReceived)}`
                    : ""
                }
                ${
                  status === -1
                    ? ` - Ngày hủy: ${formatDate(order.dateCancel)}`
                    : ""
                }
              </small>
              </div>
              <div class="card-body">
              <div class="row mb-3">
              <div class="col-md-6">
                <p><strong>Khách hàng:</strong> ${order.name}</p>
                <p><strong>SDT:</strong> ${order.phone}</p>
                <p><strong>Địa chỉ:</strong> ${order.address}</p>
                </div>
                <div class="col-md-6">
                <p><strong>Thanh toán:</strong> Thanh toán khi nhận hàng</p>
                <p><strong>Tổng tiền:</strong> ${formatCurrency(
                  order.total
                )}</p>
                <p><strong>Ghi chú:</strong> ${order.note || ""}</p>
                ${
                  status === -1
                    ? `<p><strong>Lý do:</strong> ${
                        order.reasonCancel || ""
                      }</p>`
                    : ""
                }
                </div>
                    </div>
                    <hr>
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>${itemsHtml}</tbody>
                </table>
                ${
                  status === 1
                    ? `<div class="row mt-3">
                <div class="col-12">
                  <div class="d-flex overflow-scroll">
                    <div class="status-step active">
                      <div class="status-icon">
                        <i class="fas fa-file-invoice"></i>
                      </div>
                      <div class="status-text">Chờ xác nhận</div>
                    </div>
                    <div class="status-step">
                      <div class="status-icon">
                        <i class="fas fa-box"></i>
                      </div>
                      <div class="status-text">Đang giao</div>
                    </div>
                    <div class="status-step">
                      <div class="status-icon">
                        <i class="fas fa-truck"></i>
                      </div>
                      <div class="status-text">Đã giao</div>
                    </div>
                  </div>`
                    : ""
                }
                ${
                  status === 3
                    ? `<div class="row mt-3">
                <div class="col-12">
                  <div class="d-flex overflow-scroll">
                    <div class="status-step completed">
                      <div class="status-icon">
                        <i class="fas fa-check"></i>
                      </div>
                      <div class="status-text">Chờ xác nhận</div>
                    </div>
                    <div class="status-step completed">
                      <div class="status-icon">
                        <i class="fas fa-check"></i>
                      </div>
                      <div class="status-text">Đang giao</div>
                    </div>
                    <div class="status-step">
                      <div class="status-icon">
                        <i class="fas fa-check"></i>
                      </div>
                      <div class="status-text">Đã giao</div>
                    </div>
                  </div>
                </div>
              </div>`
                    : ""
                }
                ${
                  status === 2
                    ? `<div class="row mt-3">
                <div class="col-12">
                  <div class="d-flex overflow-scroll">
                    <div class="status-step completed">
                      <div class="status-icon">
                        <i class="fas fa-check"></i>
                      </div>
                      <div class="status-text">Chờ xác nhận</div>
                    </div>
                    <div class="status-step active">
                      <div class="status-icon">
                        <i class="fas fa-box"></i>
                      </div>
                      <div class="status-text">Đang giao</div>
                    </div>
                    <div class="status-step">
                      <div class="status-icon">
                        <i class="fas fa-truck"></i>
                      </div>
                      <div class="status-text">Đã giao</div>
                    </div>
                  </div>
                </div>
              </div>`
                    : ""
                }
                ${
                  status === 1
                    ? `<div class="text-end mt-3">
      <button class="btn btn-success btn-sm me-2" onclick="confirmOrder(${order.id})">Xác nhận đơn</button>
      <button class="btn btn-danger btn-sm" onclick="cancelOrder(${order.id})">Hủy đơn</button>
    </div>`
                    : ""
                }
                ${
                  status === 2
                    ? `<div class="text-end mt-3">
       <button class="btn btn-primary btn-sm" onclick="markAsDelivered(${order.id})">
         Đã giao thành công
       </button>
     </div>`
                    : ""
                }
                </div>
              </div>
              </div>
            </div>
          `;
        })
        .join("");
    })
    .catch((err) => {
      container.innerHTML =
        "<p class='text-danger'>Lỗi khi tải dữ liệu đơn hàng.</p>";
      console.error(err);
    });
}

// Auto gọi khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  fetchOrdersByStatus(1); // 1 là CHỜ XÁC NHẬN
  loadOrderCounts();
});

// submit đơn hàng
function confirmOrder(orderId) {
  Swal.fire({
    title: "Xác nhận đơn hàng?",
    text: `Bạn có chắc muốn xác nhận đơn hàng #${orderId}?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(`http://localhost:8080/api/guest-orders/${orderId}/confirm`)
        .then(() => {
          Swal.fire("Thành công", "Đơn hàng đã được xác nhận.", "success");
          fetchOrdersByStatus(1);
          loadOrderCounts();
        })
        .catch((err) => {
          console.error(err);
          Swal.fire("Lỗi", "Không thể xác nhận đơn hàng.", "error");
        });
    }
  });
}

// Hủy đơn hàng
function cancelOrder(orderId) {
  Swal.fire({
    title: "Hủy đơn hàng?",
    html: `
      <p>Bạn có chắc muốn hủy đơn hàng <strong>#${orderId}</strong>?</p>
      <select id="cancelReason" class="swal2-select" style="width:70%;margin-top:1rem;">
        <option value="">-- Chọn lý do hủy --</option>
        <option value="Đặt nhầm">Đặt nhầm</option>
        <option value="Thay đổi địa chỉ nhận">Thay đổi địa chỉ nhận</option>
        <option value="Không còn nhu cầu">Không còn nhu cầu</option>
        <option value="Lý do khác">Lý do khác</option>
      </select>
    `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Hủy đơn",
    cancelButtonText: "Không",
    preConfirm: () => {
      const reason = document.getElementById("cancelReason").value;
      if (!reason) {
        Swal.showValidationMessage("Vui lòng chọn lý do hủy đơn!");
        return false;
      }
      return reason;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const reason = result.value;
      axios
        .put(`http://localhost:8080/api/guest-orders/${orderId}/cancel`, null, {
          params: { reason: reason },
        })
        .then(() => {
          Swal.fire("Đã hủy", "Đơn hàng đã bị hủy.", "success");
          loadOrderCounts();
          fetchOrdersByStatus(1);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire("Lỗi", "Không thể hủy đơn hàng.", "error");
        });
    }
  });
}

//Nhận hàng
function markAsDelivered(orderId) {
  Swal.fire({
    title: "Xác nhận giao hàng?",
    text: "Bạn chắc chắn muốn đánh dấu đơn này là đã giao?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Đúng, đã giao!",
    cancelButtonText: "Huỷ",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(`http://localhost:8080/api/guest-orders/${orderId}/mark-delivered`)
        .then(() => {
          Swal.fire("Thành công", "Đơn đã được đánh dấu là đã giao", "success");
          fetchOrdersByStatus(2); // Refresh lại danh sách đang giao
          loadOrderCounts();
        })
        .catch((err) => {
          Swal.fire("Lỗi", "Không thể cập nhật trạng thái đơn hàng", "error");
          console.error(err);
        });
    }
  });
}
