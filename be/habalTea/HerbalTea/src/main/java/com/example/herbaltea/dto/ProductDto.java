package com.example.herbaltea.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private String name;
    private String imageUrl;
    private BigDecimal price;
    private String description;
    private String ingredient;
    private String uses;
    private String use;

}
