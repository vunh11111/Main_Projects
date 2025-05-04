package com.hustfood.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "category_id", insertable = false, updatable = false)
    @JsonBackReference
    private Category category;

    @Column(name = "category_id", nullable = false)
    private Long categoryId;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer stock = 0;

    @Column(columnDefinition = "DECIMAL(3,2) DEFAULT 0.0")
    private BigDecimal rating = BigDecimal.ZERO;

    @Column(name = "sold_quantity", columnDefinition = "INT DEFAULT 0")
    private Integer soldQuantity = 0;

    @Column(name = "image_url")
    private String imageUrl;
        /*
        @OneToMany(mappedBy = "productId")
        private List<OrderDetail> orderDetails;

        @OneToMany(mappedBy = "productId")
        private List<Inventory> inventories;
         */
    }
