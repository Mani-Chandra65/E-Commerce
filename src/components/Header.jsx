import React, { useState } from 'react';

const Header = ({ cartItemCount, onCartClick, onSearch, searchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleSearchInputChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(localSearchQuery);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">TechStore</h1>
          
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={localSearchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
            />
            <button 
              className="search-btn"
              onClick={() => onSearch(localSearchQuery)}
            >
              Search
            </button>
          </div>
          
          <div className="cart-container">
            <button className="cart-btn" onClick={onCartClick}>
              <span className="cart-icon">🛒</span>
              <span className="cart-count">{cartItemCount}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
