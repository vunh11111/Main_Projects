import React from "react";
import "./OrderDetailModel.css";

const OrderDetailModal = ({ order, details, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="modal-overlay-v2">
      <div className="modal-v2">
        <h2>Chi tiết đơn hàng #{order.order_id}</h2>
        <table>
          <thead>
            <tr>
              <th>Mã SP</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item) => (
              <tr key={item.orderdetail_id}>
                <td>{item.orderdetail_id}</td>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString()}đ</td>
                <td>{item.total.toLocaleString()}đ</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default OrderDetailModal;