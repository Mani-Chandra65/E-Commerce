import React, { useState } from 'react';

const ProductDetail = ({ product, onAddToCart, onBack }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    onAddToCart(product.id, quantity);
  };

  return (
    <div id="productDetailView" className="view">
      <button className="btn btn--secondary mb-8" onClick={onBack}>
        ← Back to Products
      </button>
      
      <div className="product-detail">
        <div className="product-detail-image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-detail-image"
          />
        </div>
        
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="product-detail-price">${product.price.toFixed(2)}</div>
          <p className="product-detail-description">{product.longDescription}</p>
          
          <div className="product-specifications">
            <h3>Specifications</h3>
            <ul className="specifications-list">
              {product.specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
          
          <div className="quantity-selector">
            <button 
              className="quantity-btn" 
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <div className="quantity-display">{quantity}</div>
            <button 
              className="quantity-btn" 
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
          
          <button
            className="btn btn--primary btn--full-width"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? `Add ${quantity} to Cart` : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
