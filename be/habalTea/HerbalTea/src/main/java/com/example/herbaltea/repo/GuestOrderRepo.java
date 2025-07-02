package com.example.herbaltea.repo;

import com.example.herbaltea.model.GuestOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface GuestOrderRepo extends JpaRepository<GuestOrder, Integer> {

    List<GuestOrder> findByStatus(Integer status);
    Integer countByStatus(Integer status);

//    @Query("SELECT COALESCE(SUM(o.total), 0) FROM GuestOrder o WHERE o.status = 3 AND o.createDate BETWEEN :start AND :end")
//    BigDecimal totalByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime  end);
//
//    @Query("SELECT COUNT(o) FROM GuestOrder o WHERE o.status = 3 AND o.createDate BETWEEN :start AND :end")
//    int countSuccessOrdersByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime  end);
//
//    @Query("SELECT COALESCE(SUM(i.quantity), 0) FROM GuestOrder o JOIN o.items i WHERE o.status = 3 AND o.createDate BETWEEN :start AND :end")
//    int countSoldProductsByDateRange(@Param("start") LocalDateTime  start, @Param("end") LocalDateTime  end);

    @Query("SELECT SUM(o.total) FROM GuestOrder o WHERE YEAR(o.createDate) = :year AND MONTH(o.createDate) = :month")
    Double sumRevenueByMonth(@Param("year") int year, @Param("month") int month);

    @Query("SELECT COUNT(o) FROM GuestOrder o WHERE YEAR(o.createDate) = :year AND MONTH(o.createDate) = :month")
    Long countOrdersByMonth(@Param("year") int year, @Param("month") int month);

    @Query("SELECT SUM(oi.quantity) FROM GuestOrderItem oi WHERE YEAR(oi.order.createDate) = :year AND MONTH(oi.order.createDate) = :month")
    Long countProductsSoldByMonth(@Param("year") int year, @Param("month") int month);


}
