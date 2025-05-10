// components/OrderFormModal/OrderFormModal.js
import React from 'react';
import './OrderFormModel.css';

const OrderFormModal = ({ show, onClose, order }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{order ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng mới'}</h2>
        <form className="order-form">
          <label>Khách hàng:</label>
          <input type="text" name="customer" placeholder="Nhập tên khách hàng" />

          <label>Sản phẩm:</label>
          <input type="text" name="product" placeholder="Tên sản phẩm" />

          <label>Tổng tiền:</label>
          <input type="number" name="total" placeholder="VNĐ" />

          <label>Trạng thái:</label>
          <select name="status">
            <option>Đang xử lý</option>
            <option>Đã hoàn tất</option>
            <option>Đã hủy</option>
          </select>

          <label>Thanh toán:</label>
          <select name="payment">
            <option>Chưa thanh toán</option>
            <option>Đã thanh toán</option>
          </select>

          <label>Ghi chú:</label>
          <textarea name="note" placeholder="Ghi chú thêm (nếu có)" />

          <div className="modal-actions">
            <button type="submit" className="btn-save">Lưu</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderFormModal;
