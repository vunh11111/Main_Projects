// src/components/Orders/OrderDetailModal.js
import React from 'react';

function OrderDetailModal({ isOpen, order, onClose }) {
  if (!isOpen || !order) return null;

  return (
    <div className="modal show">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <h3>Chi tiết đơn hàng</h3>
        <div id="orderDetails">
          <p><strong>Mã đơn hàng:</strong> {order.order_id}</p>
          <p><strong>Khách hàng:</strong> {order.customer}</p>
          <p><strong>Sản phẩm:</strong> {order.product}</p>
          <p><strong>Tổng tiền:</strong> {order.total} VNĐ</p>
          <p><strong>Trạng thái:</strong> {order.status}</p>
          <p><strong>Thanh toán:</strong> {order.payment}</p>
          <p><strong>Ghi chú:</strong> {order.notes}</p>
        </div>
        <div className="actions">
          <button onClick={() => alert('Đang xuất hóa đơn...')}>Xuất hóa đơn</button>
          <button onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailModal;
