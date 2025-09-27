import React, { useState } from 'react';
import CheckoutItem from './CheckoutItem.jsx';

const Checkout = ({ cartItems, total, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="checkout-view">
      <div className="checkout-container">
        <div className="checkout-header-section">
          <h2>Complete Your Order</h2>
          <p className="checkout-subtitle">Just a few more details and you're all set!</p>
        </div>
        
        <div className="checkout-content">
          <div className="checkout-form">
            <div className="form-section">
              <h3>Customer Information</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? 'error' : ''}`}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className={`form-control ${errors.phone ? 'error' : ''}`}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <textarea
                    name="address"
                    className={`form-control ${errors.address ? 'error' : ''}`}
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.address && <div className="error-message">{errors.address}</div>}
                </div>
                
                <button type="submit" className="btn btn--primary btn--full-width checkout-submit-btn">
                  Place Order • ${total.toFixed(2)}
                </button>
              </form>
            </div>
          </div>
          
          <div className="order-summary">
            <div className="summary-section">
              <h3>Order Summary</h3>
              <div className="checkout-items">
                {cartItems.map(item => (
                  <CheckoutItem key={item.id} item={item} />
                ))}
              </div>
              <div className="checkout-total">
                <div className="total-line">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="total-line">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="total-line final-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
