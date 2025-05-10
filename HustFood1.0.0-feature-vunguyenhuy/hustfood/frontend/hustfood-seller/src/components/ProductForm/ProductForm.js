import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, editingProduct, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    extraCosts: '',
    type: 'Món gà rán',
    description: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', price: '', extraCosts: '', type: 'Món gà rán', description: '' });
  };

  return (
    <form className="product_form" onSubmit={handleSubmit}>
      <label>
        Tên sản phẩm:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>

      <label>
        Giá bán:
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </label>

      <label>
        Các chi phí khác:
        <input type="number" name="extraCosts" value={formData.extraCosts} onChange={handleChange} />
      </label>

      <label>
        Loại:
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="Món gà rán">Món gà rán</option>
          <option value="Burger và cơm">Burger và cơm</option>
          <option value="Thức ăn nhẹ">Thức ăn nhẹ</option>
          <option value="Tráng miệng">Tráng miệng</option>
          <option value="Đồ uống">Đồ uống</option>
        </select>
      </label>

      <label>
        Mô tả:
        <textarea
          name="description"
          rows="5"
          maxLength="500"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <div className="product_actions">
        <button type="submit">{editingProduct ? 'Cập nhật' : 'Thêm'}</button>
        {editingProduct && <button type="button" onClick={onCancel}>Hủy</button>}
      </div>
    </form>
  );
};

export default ProductForm;
