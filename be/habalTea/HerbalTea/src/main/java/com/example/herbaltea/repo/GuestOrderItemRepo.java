package com.example.herbaltea.repo;

import com.example.herbaltea.dto.TopProductDTO;
import com.example.herbaltea.model.GuestOrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface GuestOrderItemRepo extends JpaRepository<GuestOrderItem, Integer> {
    @Query("SELECT new com.example.herbaltea.dto.TopProductDTO(p.name, SUM(CAST(oi.price AS double) * oi.quantity)) " +
            "FROM GuestOrderItem oi JOIN oi.product p " +
            "GROUP BY p.name " +
            "ORDER BY SUM(CAST(oi.price AS double) * oi.quantity) DESC limit 5")
    List<TopProductDTO> findTopProducts();


}
