import React from 'react';
import './index.css';
import './css/cart.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CartPage from './components/checkout/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import ItemDetails from './components/Item';
import Header from './components/Header';

function App() {
  return (
    <div class="wrapper">
    <Header />
    <Router>
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
				<Route path="/items" element={<ItemDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
