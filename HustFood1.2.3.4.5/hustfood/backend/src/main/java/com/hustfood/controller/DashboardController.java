package com.hustfood.controller;

import com.hustfood.dto.ProductSalesDTO;
import com.hustfood.service.OrderService;
import com.hustfood.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/total-revenue")
    public ResponseEntity<Map<String, BigDecimal>> getTotalRevenue(HttpServletRequest request) {
        Long userId = jwtUtil.getUserIdFromRequest(request); // dùng để xác thực token

        if (userId == null) {
            return ResponseEntity.status(401).build(); // Unauthorized nếu không có token hợp lệ
        }

        BigDecimal totalRevenue = orderService.getTotalRevenue();

        Map<String, BigDecimal> response = new HashMap<>();
        response.put("totalRevenue", totalRevenue);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/cancelled-orders")
    public ResponseEntity<?> getCancelledOrders(HttpServletRequest request) {
        Long userId = jwtUtil.getUserIdFromRequest(request);
        if (userId == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Map<String, Object> result = orderService.getCancelledOrdersStats();
        return ResponseEntity.ok(result);
    }
    @GetMapping("/combo-revenue")
    public ResponseEntity<?> getComboRevenue(HttpServletRequest request) {
        Long userId = jwtUtil.getUserIdFromRequest(request);
        if (userId == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        BigDecimal comboRevenue = orderService.getComboRevenue();
        Map<String, BigDecimal> response = new HashMap<>();
        response.put("comboRevenue", comboRevenue);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/product-sales")
    public ResponseEntity<?> getProductSales(HttpServletRequest request) {
        Long userId = jwtUtil.getUserIdFromRequest(request);
        if (userId == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        List<ProductSalesDTO> sales = orderService.getProductSalesReport();
        return ResponseEntity.ok(sales);
    }

}
