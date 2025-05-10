import React, { useState } from 'react';
//import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import ProdProductTable from '../../components/ProdProductTable/ProdProductTable'; 
import ProductForm from '../../components/ProductForm/ProductForm';
// import Modal from '../../components/Modal/Modal';
import ProductFormModal from '../../components/ProductFormModel/ProductFormModel';
import '../../assets/prodmana.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddOrUpdate = (product) => {
    if (editingProduct) {
      setProducts(products.map(p => (p === editingProduct ? product : p)));
      setEditingProduct(null);
    } else {
      setProducts([...products, product]);
    }
    setShowModal(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (product) => {
    setProducts(products.filter(p => p !== product));
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="main-content">
        <Header />
        <main>
          <section className="product-management">
            <div className="products_header">
              <h2>Danh sách sản phẩm</h2>
              <button
                className="add-button"
                onClick={() => {
                  setEditingProduct(null);
                  setShowModal(true);
                }}
              >
                Thêm sản phẩm
              </button>
            </div>
            <ProdProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
          </section>
        </main>
      </div>

      <ProductFormModal
        show={showModal}
        onClose={() => {
        setShowModal(false);
        setEditingProduct(null);
        }}
        onSubmit={handleAddOrUpdate}
        editingProduct={editingProduct}
      />
    </div>
  );
};

export default ProductManagement;
