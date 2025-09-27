import React from 'react';
import CartItem from './CartItem.jsx';

const CartModal = ({ 
  items, 
  total, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart, 
  onCheckout 
}) => {
  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal-backdrop') {
      onClose();
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    onCheckout();
  };

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={handleBackdropClick}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Shopping Cart</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="cart-items">
              {items.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <div className="cart-actions">
            <button 
              className="btn btn--secondary" 
              onClick={onClearCart}
              disabled={items.length === 0}
            >
              Clear Cart
            </button>
            <button 
              className="btn btn--primary" 
              onClick={handleCheckout}
              disabled={items.length === 0}
              style={{ display: items.length === 0 ? 'none' : 'inline-flex' }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
