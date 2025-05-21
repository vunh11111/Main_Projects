package com.hustfood.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private Category category;

    @Column(name = "category_id", nullable = false)
    private Long categoryId;

    @Column(name = "category_id_combo", nullable = false)
    private Long category_id_combo;

    @Column(name = "category_id_uu_dai", nullable = false)
    private Long category_id_uu_dai;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer stock = 0;


    @Column(name = "sold_quantity", columnDefinition = "INT DEFAULT 0")
    private Integer soldQuantity = 0;

    @Column(name = "url_img")
    private String urlImg;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @JsonIgnore  
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Inventory> inventories;
}
