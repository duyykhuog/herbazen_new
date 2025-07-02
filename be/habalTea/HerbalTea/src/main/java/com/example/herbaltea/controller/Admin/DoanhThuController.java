package com.example.herbaltea.controller.Admin;

import com.example.herbaltea.dto.TopProductDTO;
import com.example.herbaltea.repo.GuestOrderItemRepo;
import com.example.herbaltea.repo.GuestOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api/statistics")
public class DoanhThuController {
    @Autowired
    private GuestOrderRepo guestOrderRepo;

    @Autowired
    private GuestOrderItemRepo guestOrderItemRepo;

//    @GetMapping("/overview")
//    public Map<String, Object> getOverview() {
//        Map<String, Object> result = new HashMap<>();
//
//        // Thời gian hiện tại và đầu tháng
//        LocalDate now = LocalDate.now();
//        LocalDate firstDayOfMonth = now.withDayOfMonth(1);
//        LocalDate firstDayOfLastMonth = now.minusMonths(1).withDayOfMonth(1);
//        LocalDate lastDayOfLastMonth = firstDayOfMonth.minusDays(1);
//
//        // Doanh thu tháng này và tháng trước
//        BigDecimal doanhThuThangNay = guestOrderRepo.totalByDateRange(firstDayOfMonth, now);
//        BigDecimal doanhThuThangTruoc = guestOrderRepo.totalByDateRange(firstDayOfLastMonth, lastDayOfLastMonth);
//        int soDonThang = guestOrderRepo.countSuccessOrdersByDateRange(firstDayOfMonth, now);
//        int soSanPhamThang = guestOrderRepo.countSoldProductsByDateRange(firstDayOfMonth, now);
//        BigDecimal doanhThuTrungBinh = soDonThang > 0 ? doanhThuThangNay.divide(BigDecimal.valueOf(soDonThang), 2, RoundingMode.HALF_UP) : BigDecimal.ZERO;
//
//        // Tính tỉ lệ tăng trưởng doanh thu
//        BigDecimal tyLeDoanhThu = doanhThuThangTruoc.compareTo(BigDecimal.ZERO) > 0
//                ? doanhThuThangNay.multiply(BigDecimal.valueOf(100)).divide(doanhThuThangTruoc, 0, RoundingMode.HALF_UP)
//                : BigDecimal.valueOf(100);
//
//        BigDecimal tyLeSoSanPham = BigDecimal.valueOf(100); // nếu muốn, tính tương tự
//
//        result.put("doanhThuThang", doanhThuThangNay);
//        result.put("tyLeDoanhThu", tyLeDoanhThu);
//        result.put("soDonThang", soDonThang);
//        result.put("soSanPhamThang", soSanPhamThang);
//        result.put("tyLeSoSanPham", tyLeSoSanPham);
//        result.put("doanhThuTrungBinhThang", doanhThuTrungBinh);
//
//        return result;
//    }
    // giả sử đây là repo chứa đơn hàng

    @GetMapping("/overview/current-month")
    public Map<String, Object> getOverviewStatisticsCurrentMonth() {
        // Lấy năm tháng hiện tại
        LocalDate now = LocalDate.now();
        int year = now.getYear();
        int month = now.getMonthValue();

        // Giả sử bạn đã có các hàm repo lấy số liệu:
        Double revenue = guestOrderRepo.sumRevenueByMonth(year, month); // tổng doanh thu
        Long orderCount = guestOrderRepo.countOrdersByMonth(year, month); // số đơn
        Long productCount = guestOrderRepo.countProductsSoldByMonth(year, month); // số sản phẩm đã bán

        double avgRevenuePerOrder = 0;
        if (orderCount != null && orderCount > 0) {
            avgRevenuePerOrder = revenue / orderCount;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("doanhThuThang", revenue != null ? revenue : 0);
        result.put("soDonThang", orderCount != null ? orderCount : 0);
        result.put("soSanPhamThang", productCount != null ? productCount : 0);
        result.put("doanhThuTB", avgRevenuePerOrder);

        return result;
    }

    @GetMapping("/doanh-thu-theo-thang")
    public List<Double> getDoanhThuTheoThang() {
        int year = LocalDate.now().getYear();
        List<Double> doanhThuTheoThang = new ArrayList<>();

        for (int month = 1; month <= 12; month++) {
            Double doanhThuThang = guestOrderRepo.sumRevenueByMonth(year, month);
            doanhThuTheoThang.add(doanhThuThang != null ? doanhThuThang : 0.0);
        }

        return doanhThuTheoThang;
    }

    @GetMapping("/api/thong-ke/top-ban-chay")
    public Map<String, Object> getTopBanChay() {
        List<TopProductDTO> topProducts = guestOrderItemRepo.findTopProducts();

        Map<String, Object> response = new HashMap<>();
        response.put("data", topProducts);
        return response;
    }

    @GetMapping("/api/thong-ke/trang-thai-don-hang")
    public Map<String, Integer> countOrdersByStatus() {
        Map<String, Integer> result = new HashMap<>();
        result.put("thanhCong", guestOrderRepo.countByStatus(3));
        result.put("biHuy", guestOrderRepo.countByStatus(-1));
        return result;
    }
}
