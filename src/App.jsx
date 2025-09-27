import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import ProductList from './components/ProductList.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Checkout from './components/Checkout.jsx';
import SuccessView from './components/SuccessView.jsx';
import CartModal from './components/CartModal.jsx';
import { PRODUCTS } from './data/products.js';
import './App.css';

function App() {
  const [products] = useState(PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('productList');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  // Add to cart handler
  const handleAddToCart = (productId, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Update cart item quantity
  const handleUpdateCartQuantity = (productId, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  // Remove from cart
  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Show product detail
  const showProductDetail = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setCurrentView('productDetail');
    }
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  // Handle checkout form submission
  const handleCheckoutSubmit = (customerData) => {
    // Process order (in a real app, this would make an API call)
    console.log('Order placed:', { customerData, items: cart, total: getCartTotal() });
    
    // Clear cart and show success
    setCart([]);
    setCurrentView('success');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'productDetail':
        return (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() => setCurrentView('productList')}
          />
        );
      case 'checkout':
        return (
          <Checkout
            cartItems={cart}
            total={getCartTotal()}
            onSubmit={handleCheckoutSubmit}
            onBack={() => setCurrentView('productList')}
          />
        );
      case 'success':
        return (
          <SuccessView onContinueShopping={() => setCurrentView('productList')} />
        );
      default:
        return (
          <ProductList
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            onViewDetails={showProductDetail}
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        );
    }
  };

  return (
    <div className="App">
      {/* Show header only for non-checkout views or show a minimal checkout header */}
      {currentView !== 'checkout' ? (
        <Header
          cartItemCount={getCartItemCount()}
          onCartClick={() => setIsCartModalOpen(true)}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
      ) : (
        <header className="checkout-header">
          <div className="container">
            <div className="checkout-header-content">
              <h1 className="logo">TechStore</h1>
              <button className="back-to-shop-btn" onClick={() => setCurrentView('productList')}>
                ← Back to Shopping
              </button>
            </div>
          </div>
        </header>
      )}
      
      <main className={`main-content ${currentView === 'checkout' ? 'checkout-page' : ''}`}>
        {currentView === 'checkout' || currentView === 'success' ? (
          // Full-width checkout and success pages
          renderCurrentView()
        ) : (
          // Contained view for other pages
          <div className="container">
            {renderCurrentView()}
          </div>
        )}
      </main>

      {isCartModalOpen && (
        <CartModal
          items={cart}
          total={getCartTotal()}
          onClose={() => setIsCartModalOpen(false)}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onCheckout={() => {
            setCurrentView('checkout');
            setIsCartModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
