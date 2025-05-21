package com.hustfood.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonManagedReference // quản lý serialization cho quan hệ với User
    private User user;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "total_price", precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED') DEFAULT 'PENDING'")
    private Status status = Status.PENDING;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference // quản lý serialization cho quan hệ với OrderDetail
    private List<OrderDetail> orderDetails;

    public enum Status {
        PENDING, CONFIRMED, SHIPPED, CANCELLED
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", userId=" + userId +
                ", totalPrice=" + totalPrice +
                ", status=" + status +
                '}';
    }
}
