package com.example.herbaltea.controller.Guest;

import com.example.herbaltea.dto.LoginDto;
import com.example.herbaltea.model.Admin;
import com.example.herbaltea.repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AdminRepo adminRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto request) {
        for (Admin admin : adminRepo.findAll()) {
            if (admin.getUsername().equals(request.getUsername()) && admin.getPassword().equals(request.getPassword())) {
                return ResponseEntity.ok(Map.of("message", "Đăng nhập thành công", "admin", admin));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Tên đăng nhập hoặc mật khẩu không chính xác"));

    }
}
