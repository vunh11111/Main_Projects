import React, { useState } from 'react';
//import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer';
import './Home.css';
import "../../styles/base.css";
import ProductList from '../../components/ProductItem/ProductList';
//import { Link } from 'react-router-dom';
import allProducts from '../../data/Product/products'; // đường dẫn đúng tới file products.js

function Home() {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const category = queryParams.get('category') || 'Bim Bim';
  // const handleCategoryClick = (categoryName) => {
  //   navigate(`/?category=${categoryName}`);
  // };

  // const filteredProducts = products.filter((product) =>
  //   category === 'Tất cả' ? true : product.category === category
  // );
  const [category, setCategory] = useState('Bim Bim');

  const filteredProducts = allProducts.filter(product => {
    if (category === 'Bim Bim') return product.category === 'Bim Bim';
    if (category === 'Nước ngọt') return product.category === 'Nước ngọt';
    if (category === 'Bánh kẹo') return product.category === 'Bánh kẹo';
    return true;
  });

  return (
  <><Header />
    <div className="app__container">
      <div className="grid">
        <div className="grid__row app__content">
          <div className="grid__column-2">
            <nav className="category">
              <h3 className="category__heading">
                <i className="category__heading-icon fa-solid fa-list"></i>
                Danh mục
              </h3>
              {/* <ul className="category-list">
                  {['Bim Bim', 'Nước ngọt', 'Bánh kẹo'].map((cat) => (
                    <li
                      key={cat}
                      className={`category-item ${category === cat ? 'category-item--active' : ''}`}
                      onClick={() => handleCategoryClick(cat)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className="category-item__link">{cat}</span>
                    </li>
                  ))}
                </ul> */}
                <ul className="category-list">
                  <li className={`category-item ${category === 'Bim Bim' ? 'category-item--active' : ''}`}>
                    <a href="#" className="category-item__link" onClick={() => setCategory('Bim Bim')}>Bim Bim</a>
                  </li>
                  <li className={`category-item ${category === 'Nước ngọt' ? 'category-item--active' : ''}`}>
                    <a href="#" className="category-item__link" onClick={() => setCategory('Nước ngọt')}>Nước ngọt</a>
                  </li>
                  <li className={`category-item ${category === 'Bánh kẹo' ? 'category-item--active' : ''}`}>
                    <a href="#" className="category-item__link" onClick={() => setCategory('Bánh kẹo')}>Bánh kẹo</a>
                  </li>
                </ul>
            </nav>
          </div>
          <div className="grid__column-10">
            <div className="home-filter">
              <span className="home-filter__label">Sắp xếp theo</span>
              <button className="home-filter__btn btn">Phổ biến</button>
              <button className="home-filter__btn btn btn--primary">Mới nhất</button>
              {/* cái nào khi ấn chọn thì thêm btn--primary */}
              <button className="home-filter__btn btn">Bán chạy</button>
              <div className="select-input">
                <span className="select-input__label">Giá</span>
                <i className="select-input__icon fa-solid fa-angle-down"></i>
                {/* List options */}
                <ul className="select-input__list">
                  <li className="select-input__item">
                    <a href="#" className="select-input__link">Giá: Thấp đến cao</a>
                  </li>
                  <li className="select-input__item">
                    <a href="#" className="select-input__link">Giá: Cao đến thấp</a>
                  </li>
                </ul>
              </div>
              <div className="home-filter__page">
                <span className="home-filter__page-num">
                  <span className="home-filter__page-current">1</span> / <span className="home-filter__page-all">14</span>
                  <div className="home-filter__page-control">
                    <a href="#" className="home-filter__page-btn home-filter__page-btn--disabled">
                      <i className="home-filter__page-icon fa-solid fa-angle-left"></i>
                    </a>
                    <a href="#" className="home-filter__page-btn">
                      <i className="home-filter__page-icon fa-solid fa-angle-right"></i>
                    </a>
                  </div>
                </span>
              </div>
            </div>
            <div className="home-product">
               <ProductList products={filteredProducts} />
          /*code ở đây thiếu*/
            </div>
            {/* <ul className="pagination home-product__pagination">
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">
                  <i className="pagination-item__icon fa-solid fa-angle-left"></i>
                </a>
              </li>
              <li className="pagination-item pagination-item--active">
                <a href="#" className="pagination-item__link">1</a>
              </li>
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">2</a>
              </li>
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">3</a>
              </li>
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">...</a>
              </li>
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">14</a>
              </li>
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">
                  <i className="pagination-item__icon fa-solid fa-angle-right"></i>
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </div>
    <Footer /></>
  );
}

export default Home;