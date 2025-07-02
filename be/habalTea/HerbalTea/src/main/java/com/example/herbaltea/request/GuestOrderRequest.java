package com.example.herbaltea.request;

import com.example.herbaltea.dto.GuestOrderItemDTO;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class GuestOrderRequest {
    private String name;
    private String phone;
    private String address;
    private String note;
    private BigDecimal total;
    private List<GuestOrderItemDTO> items;
}
