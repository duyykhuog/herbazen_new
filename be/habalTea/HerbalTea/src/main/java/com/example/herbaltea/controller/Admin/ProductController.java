package com.example.herbaltea.controller.Admin;

import com.example.herbaltea.dto.ProductDto;
import com.example.herbaltea.model.Product;
import com.example.herbaltea.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ProductController {
    @Autowired
    private ProductRepo traRepo;

    @GetMapping("/api/admin/products")
    public List<Product> getAll() {
        return traRepo.findAll();
    }

    @GetMapping("/api/admin/products/{id}")
    public ResponseEntity<Product> getById(@PathVariable Integer id) {
        Optional<Product> tra = traRepo.findById(id);
        return tra.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/api/admin/products")
    public ResponseEntity<Product> create(@RequestBody Product tra) {
        Product saved = traRepo.save(tra);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/products/{id}")
    public ResponseEntity<Product> update(@PathVariable Integer id, @RequestBody ProductDto traRequest) {
        Optional<Product> optional = traRepo.findById(id);
        if (optional.isPresent()) {
            Product tra = optional.get();
            tra.setName(traRequest.getName());
            tra.setDescription(traRequest.getDescription());
            tra.setPrice(traRequest.getPrice());
            tra.setImageUrl(traRequest.getImageUrl());
            tra.setIngredient(traRequest.getIngredient());
            tra.setUses(traRequest.getUses());
            tra.setUse(traRequest.getUse());
            return ResponseEntity.ok(traRepo.save(tra));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/api/admin/products/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (traRepo.existsById(id)) {
            traRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/admin/products/search")
    public List<Product> search(@RequestParam String keyword) {
        return traRepo.findByNameContainingIgnoreCase(keyword);
    }
}
