package com.example.herbaltea.controller.Guest;

import com.example.herbaltea.dto.GuestOrderItemDTO;
import com.example.herbaltea.model.GuestOrder;
import com.example.herbaltea.model.GuestOrderItem;
import com.example.herbaltea.model.Product;
import com.example.herbaltea.repo.GuestOrderRepo;
import com.example.herbaltea.repo.ProductRepo;
import com.example.herbaltea.request.GuestOrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
public class CheckOutController {
    @Autowired
    private GuestOrderRepo guestOrderRepo;

    @Autowired
    private ProductRepo productRepo;

    @PostMapping("/api/guest-orders")
    public ResponseEntity<?> createGuestOrder(@RequestBody GuestOrderRequest request) {
        System.out.println("Received request: " + request.getName());
        GuestOrder order = new GuestOrder();
        order.setName(request.getName());
        order.setPhone(request.getPhone());
        order.setAddress(request.getAddress());
        order.setNote(request.getNote());
        order.setTotal(request.getTotal());
        order.setCreateDate(new Date());
        order.setStatus(1);

        List<GuestOrderItem> itemList = new ArrayList<>();
        for (GuestOrderItemDTO dto : request.getItems()) {
            Product product = productRepo.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + dto.getProductId()));

            GuestOrderItem item = new GuestOrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(dto.getQuantity());
            item.setPrice(dto.getPrice());
            itemList.add(item);
        }

        order.setItems(itemList);
        GuestOrder saved = guestOrderRepo.save(order);

        return ResponseEntity.ok("ok");
    }
}
