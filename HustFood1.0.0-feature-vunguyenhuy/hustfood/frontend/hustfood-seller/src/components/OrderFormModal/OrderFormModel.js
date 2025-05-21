import React from 'react';
import './OrderFormModel.css';

const OrderFormModal = ({ show, onClose, order }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{order ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng mới'}</h2>
        <form className="order-form">
          {order && (
            <>
              <label>Mã đơn hàng:</label>
              <input
                type="text"
                name="order_id"
                value={order.order_id}
                disabled
              />
            </>
          )}

          <label>Mã khách hàng:</label>
          <input
            type="number"
            name="customer_id"
            placeholder="Nhập mã khách hàng"
            defaultValue={order ? order.customer_id : ''}
          />

          <label>Trạng thái:</label>
          <select name="status" defaultValue={order ? order.status : 'PENDING'}>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <label>Ghi chú:</label>
          <textarea
            name="note"
            placeholder="Ghi chú thêm (nếu có)"
            defaultValue={order ? order.note : ''}
          />

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
