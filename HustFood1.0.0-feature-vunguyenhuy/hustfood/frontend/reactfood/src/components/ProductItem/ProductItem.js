import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductItem.css";
import { updateAllCartItem, addCartItem } from "../../services/cartService";
import { getUser } from "../../services/userService";

const ProductItem = ({ product_id, name, price, url_img, description, queryToBack }) => {
  const navigate = useNavigate();

  const handleGetUser = async () => {
    try {
      const user = await getUser();
      return user;
    } catch (error) {
      throw error;
    };
  };

  const handleImageClick = () => {
    navigate(`/product?product_id=${product_id}&q=${queryToBack}`);
  }

  return (
    <div className="grid__column-2-4">
      <div className="home-product-item">
        <div
          key={product_id}
          className="home-product-item__img"
          style={{ backgroundImage: `url(${url_img})` }}
          onClick={() => handleImageClick()}
        ></div>
        <h4 className="home-product-item__name">{name}</h4>
        <div className="home-product-item__price">
          <span className="home-product-item__price-current">{price}đ</span>
        </div>
        <div className="home-product-item__description">
          <span className="home-product-item__description-text">
            {description}
          </span>
        </div>
        <button className="home-product-item__add-btn">
          Thêm
        </button>
      </div>
    </div>
  );
};

export default ProductItem;