// OrderManagement.js
import React, { useState, useEffect } from 'react';
import { getOrders } from '../../services/orderService';
//import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import OrderTable from '../../components/OrderTable/OrderTable';
import OrderFormModal from '../../components/OrderFormModal/OrderFormModel'; 
import OrderDetailModal from '../../components/OrderDetailModel/OrderDetailModel'; 
import '../../assets/ordersmana.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setShowFormModal(true);
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };
    const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="admin-page">
      <Navbar />
      <div className="main-content">
        <Header />
        <main>
          <section className="orders">
            <h2>Danh sách đơn hàng</h2>
            <button id="addOrderBtn" onClick={handleAddOrder}>Thêm đơn hàng</button>
          </section>
        </main>
      </div>
      <OrderTable 
        orders={orders} 
        onEdit={(order) => {
          setSelectedOrder(order);
          setShowFormModal(true);
        }}
        onView={(order) => {
          setSelectedOrder(order);
          setShowDetailModal(true);
        }}
      />
      <OrderFormModal
        show={showFormModal}
        onClose={() => setShowFormModal(false)}
        order={selectedOrder}
      />
      <OrderDetailModal
        show={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderManagement;
