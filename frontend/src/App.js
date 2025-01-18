import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ItemList from './components/ItemList';
import MealList from './components/MealList';
import './App.css';
import AddItem from './components/AddItem';   
import EditItem from './components/EditItem';   
import Order from './components/OrderPage';
function App() {
    return (
        <Router>
            <div className="app-container">
                
                <Sidebar />
                
                <div className="content">
                    <Routes>
                        <Route path="/items" element={<ItemList />} />
                        <Route path="/" element={<MealList />} />
                        <Route path="/orders" element={<h1>Order Management</h1>} />
                        <Route path="/add-item" element={<AddItem />} />
                        <Route path="/items/edit/:id" element={<EditItem />} /> 
                        <Route path="/order" element={<Order />} />
                       
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
