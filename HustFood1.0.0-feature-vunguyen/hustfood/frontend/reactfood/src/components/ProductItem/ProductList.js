import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  return (
    <div className="grid__row">
      {products.map((product, index) => (
        <ProductItem key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
