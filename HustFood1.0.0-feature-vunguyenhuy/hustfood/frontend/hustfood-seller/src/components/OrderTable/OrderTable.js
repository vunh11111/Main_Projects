import React from 'react';

const OrderTable = ({ orders = [], onEdit, onView }) => {
  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Khách hàng</th>
            <th>Sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Thanh toán</th>
            <th>Ghi chú</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.map((order, index) => (
            <tr key={index}>
              <td>{order.order_id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
              <td>{order.payment}</td>
              <td>{order.notes}</td>
              <td>
                <button onClick={() => onEdit(order)}>Sửa</button>
                <button onClick={() => onView(order)}>Chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
