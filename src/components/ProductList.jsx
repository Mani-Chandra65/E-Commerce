import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductList = ({ 
  products, 
  onAddToCart, 
  onViewDetails, 
  onSearch, 
  onCategoryFilter, 
  searchQuery, 
  selectedCategory 
}) => {
  const handleCategoryChange = (e) => {
    onCategoryFilter(e.target.value);
  };

  return (
    <div id="productListView" className="view active">
      <div className="section-header">
        <h2>Our Products</h2>
        <div className="filters">
          <select 
            className="form-control filter-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Wearables">Wearables</option>
            <option value="Accessories">Accessories</option>
            <option value="Health">Health</option>
            <option value="Office">Office</option>
          </select>
        </div>
      </div>
      
      <div className="product-grid">
        {products.length === 0 ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '2rem', 
            color: '#666' 
          }}>
            No products found matching your criteria.
          </div>
        ) : (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
