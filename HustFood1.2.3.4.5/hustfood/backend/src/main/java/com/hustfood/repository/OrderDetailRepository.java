package com.hustfood.repository;

import com.hustfood.dto.ProductSalesDTO;
import com.hustfood.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    @Query("SELECT od FROM OrderDetail od WHERE od.orderId = :orderId")
    List<OrderDetail> findByOrderId(Long orderId);

    @Query("SELECT od FROM OrderDetail od WHERE od.productId = :productId")
    List<OrderDetail> findByProductId(Long productId);

    @Query("""
    SELECT COALESCE(SUM(od.totalPrice), 0)
    FROM OrderDetail od
    JOIN od.order o
    JOIN od.product p
    WHERE o.status <> com.hustfood.entity.Order.Status.CANCELLED
      AND (p.category_id_combo = 3 OR p.category_id_combo = 4)
""")
    BigDecimal getComboRevenue();

    @Query("""
    SELECT new com.hustfood.dto.ProductSalesDTO(
        p.name,
        SUM(od.quantity),
        SUM(od.totalPrice)
    )
    FROM OrderDetail od
    JOIN od.product p
    GROUP BY p.productId, p.name
""")
    List<ProductSalesDTO> getProductSalesReport();

    @Query("SELECT COALESCE(SUM(od.quantity), 0) FROM OrderDetail od")
    Long getTotalQuantitySold();
}
