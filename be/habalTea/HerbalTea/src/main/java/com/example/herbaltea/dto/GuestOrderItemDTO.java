package com.example.herbaltea.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class GuestOrderItemDTO {
    private Integer productId;
    private Integer quantity;
    private BigDecimal price;
}
