import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Meal Pot</h2>
            <nav>
                <ul>
                    <li><Link to="/">Meals</Link></li>

                    <li><Link to="/items">Items</Link></li>
                    
                    <li><Link to="/Order">Orders</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
