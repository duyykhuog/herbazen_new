package com.example.herbaltea.controller;// ChatProxyController.java
import com.example.herbaltea.dto.ChatbotRequest;
import com.example.herbaltea.dto.ChatbotResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*") // Tùy chỉnh nếu cần
public class ChatProxyController {

    private final RestTemplate restTemplate = new RestTemplate();

    // URL của chatbot expose qua ngrok (cập nhật theo phiên bản thật)
    @Value("${chatbot.api.url}")
    private String chatbotApiUrl;

    @PostMapping
    public ResponseEntity<String> chatWithBot(@RequestBody ChatbotRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ChatbotRequest> httpRequest = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<ChatbotResponse> response = restTemplate.postForEntity(
                    chatbotApiUrl + "/v1/chat", httpRequest, ChatbotResponse.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok(response.getBody().getResponse());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Lỗi từ chatbot server");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi kết nối chatbot: " + e.getMessage());
        }
    }
}