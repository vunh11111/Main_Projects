import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function CategoryPage() {
  const { categoryName } = useParams();

  return (
    <>
      <Header />
      <div className="app__container">
        <h2 style={{ padding: '16px' }}>Danh mục: {categoryName.replace('-', ' ')}</h2>
        {/* Có thể lọc sản phẩm theo categoryName tại đây */}
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
