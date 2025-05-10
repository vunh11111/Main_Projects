// components/ProductFormModal/ProductFormModal.js
import React from 'react';
import './ProductFormModal.css';
import ProductForm from '../ProductForm/ProductForm';

const ProductFormModal = ({ show, onClose, onSubmit, editingProduct }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h2>
        <ProductForm
          onSubmit={onSubmit}
          editingProduct={editingProduct}
          onCancel={onClose} // truyền hàm Hủy
        />
        <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
                Hủy
            </button>
        </div>

      </div>
    </div>
  );
};

export default ProductFormModal;
