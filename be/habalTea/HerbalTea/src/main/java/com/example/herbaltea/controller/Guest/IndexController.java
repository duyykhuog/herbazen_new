package com.example.herbaltea.controller.Guest;

import com.example.herbaltea.model.Product;
import com.example.herbaltea.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/products")
public class IndexController {
    @Autowired
    private ProductRepo productRepo;

    @GetMapping
    public List<Product> getAll() {
        return productRepo.findAll();
    }

    @GetMapping("/top3")
    public List<Product> getTop3Products() {
        return productRepo.findAll(PageRequest.of(0, 3)).getContent();
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

}
