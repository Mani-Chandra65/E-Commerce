import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (change) => {
    onUpdateQuantity(item.id, change);
  };

  const handleRemove = () => {
    onRemoveItem(item.id);
  };

  return (
    <div className="cart-item" data-item-id={item.id}>
      <img 
        src={item.image} 
        alt={item.name} 
        className="cart-item-image"
      />
      <div className="cart-item-info">
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-price">${item.price.toFixed(2)} each</div>
      </div>
      <div className="cart-item-controls">
        <button 
          className="quantity-btn" 
          onClick={() => handleQuantityChange(-1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <div className="cart-item-quantity">{item.quantity}</div>
        <button 
          className="quantity-btn" 
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
        <button className="remove-item-btn" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
