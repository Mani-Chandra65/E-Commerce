import React from 'react';

const SuccessView = ({ onContinueShopping }) => {
  return (
    <div className="success-view">
      <div className="success-container">
        <div className="success-content">
          <div className="success-icon">✅</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. Your order has been received and will be processed shortly.</p>
          <button className="btn btn--primary" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessView;
