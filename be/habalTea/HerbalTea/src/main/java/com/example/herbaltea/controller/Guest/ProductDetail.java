package com.example.herbaltea.controller.Guest;


import com.example.herbaltea.model.Product;
import com.example.herbaltea.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
public class ProductDetail {
    @Autowired
    private ProductRepo productRepo;

    @GetMapping("/api/products/{id}")
    public Product getAll(@PathVariable Integer id) {
        return productRepo.findById(id).orElse(null);
    }
}
