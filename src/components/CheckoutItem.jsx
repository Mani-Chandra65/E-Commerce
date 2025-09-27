import React from 'react';

const CheckoutItem = ({ item }) => {
  return (
    <div className="checkout-item">
      <div className="checkout-item-name">
        {item.name} ({item.quantity}x)
      </div>
      <div className="checkout-item-price">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CheckoutItem;
