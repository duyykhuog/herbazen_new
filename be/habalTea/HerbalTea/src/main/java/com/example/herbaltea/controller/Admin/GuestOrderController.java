package com.example.herbaltea.controller.Admin;

import com.example.herbaltea.repo.GuestOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.herbaltea.model.GuestOrder;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
public class GuestOrderController {

    @Autowired
    private GuestOrderRepo guestOrderRepo;

    @GetMapping("/countByStatus")
    public Map<String, Integer> countOrdersByStatus() {
        Map<String, Integer> result = new HashMap<>();
        result.put("waiting", guestOrderRepo.countByStatus(1));
        result.put("shipping", guestOrderRepo.countByStatus(2));
        result.put("delivered", guestOrderRepo.countByStatus(3));
        result.put("canceled", guestOrderRepo.countByStatus(-1));
        return result;
    }

    @GetMapping("/byStatus")
    public List<GuestOrder> getOrdersByStatus(@RequestParam(defaultValue = "1") Integer status) {
        return guestOrderRepo.findByStatus(status);
    }

    @PutMapping("/api/guest-orders/{id}/confirm")
    public ResponseEntity<Void> confirmOrder(@PathVariable Integer id) {
        GuestOrder order = guestOrderRepo.findById(id).orElse(null);
        order.setStatus(2); // 2 = Đang giao
        guestOrderRepo.save(order);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/guest-orders/{id}/cancel")
    public ResponseEntity<Void> cancelOrder(@PathVariable Integer id, @RequestParam String reason) {
        GuestOrder order = guestOrderRepo.findById(id).orElse(null);
        order.setStatus(-1); // -1 = Đã hủy
        order.setDateCancel(new Date());
        order.setReasonCancel(reason);
        guestOrderRepo.save(order);
        return ResponseEntity.ok().build();
    }

        @PutMapping("/api/guest-orders/{id}/mark-delivered")
    public ResponseEntity<?> markOrderAsDelivered(@PathVariable("id") Integer id) {
        try {
            GuestOrder order = guestOrderRepo.findById(id).orElse(null);
            order.setStatus(3); // 3 = Giao thành công
            order.setDateReceived(new Date());
            guestOrderRepo.save(order);
            return ResponseEntity.ok().body("Đã cập nhật trạng thái đơn hàng thành 'Đã giao'");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
