const db = require('./orderdb'); // file này chứa kết nối mysql2

exports.getAllOrders = (req, res) => {
  const query = `
    SELECT o.*, u.full_name 
    FROM orders o 
    LEFT JOIN users u ON o.user_id = u.user_id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng", error: err });
    res.json(results);
  });
};

exports.createOrder = (req, res) => {
  const { user_id, status, total_price } = req.body;
  const query = `INSERT INTO orders (user_id, status, total_price) VALUES (?, ?, ?)`;
  db.query(query, [user_id, status, total_price], (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi khi thêm đơn hàng", error: err });
    res.json({ order_id: result.insertId });
  });
};

exports.updateOrder = (req, res) => {
  const { id } = req.params;
  const { user_id, status, total_price } = req.body;
  const query = `UPDATE orders SET user_id = ?, status = ?, total_price = ? WHERE order_id = ?`;
  db.query(query, [user_id, status, total_price, id], (err) => {
    if (err) return res.status(500).json({ message: "Lỗi khi cập nhật đơn hàng", error: err });
    res.json({ message: 'Cập nhật thành công' });
  });
};

exports.deleteOrder = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM orders WHERE order_id = ?`;
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ message: "Lỗi khi xóa đơn hàng", error: err });
    res.json({ message: 'Xóa thành công' });
  });
};
