import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import './History.css';
import { getAllOrders } from '../../services/orderSevice';

const History = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await getAllOrders(token);
                    setOrders(response.data);
            } catch (error) {
                const errorData = error.response?.data;
                setError({
                    response: {
                        data: {
                            message: errorData?.message || 'Có lỗi xảy ra, vui lòng thử lại'
                        }
                    }
                });
            }
        };
        fetchOrders();
    }, []);
    
    if (error) {
        return (
            <div className="error-message">
                <p>{error.response.data.message}</p>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Header />
            <div className="history-page">
                <ProfileSidebar />
                <div className="history-content">
                    <div className="history-container">
                        <div className="orders-list">
                            {orders.map((order) => (
                                <div className="order-card" key={order.orderId}>
                                    <div className="order-header">
                                        <h2>ID : 00{order.orderId}</h2>
                                    </div>
                                    <div className="order-items">
                                        <div className="item-header">
                                            <span className="col name">Tên sản phẩm</span>
                                            <span className="col quantity">Số lượng</span>
                                            <span className="col price">Thành tiền</span>
                                        </div>
                                        {order.products.map((product, index) => (
                                            <div className="item-details" key={index}>
                                                <span className="col name">{product.name}</span>
                                                <span className="col quantity">{product.quantity}</span>
                                                <span className="col price">{product.price.toLocaleString('vi-VN')}đ</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="order-total">
                                        <span>Tổng cộng:</span>
                                        <span className="total-amount">{order.totalPrice.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default History;
