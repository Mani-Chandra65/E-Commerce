import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click event
    if (!product.inStock) return;

    setIsAdding(true);
    onAddToCart(product.id);

    // Show success feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleCardClick = () => {
    onViewDetails(product.id);
  };

  return (
    <div 
      className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}
      data-product-id={product.id}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image" 
        loading="lazy"
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            style={isAdding ? { background: '#28a745' } : {}}
          >
            {isAdding ? 'Added!' : (product.inStock ? 'Add to Cart' : 'Out of Stock')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
