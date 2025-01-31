import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Registration from './RegisterPage';
import ShopShelf from './ShopShelf';
import CartPage from './CartPage.tsx';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ShopShelf />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/Login" element={<Login />} />
                <Route  path="/cart" element={<CartPage />} />
            </Routes>
        </Router>
    );
};

export default App;
// xeq