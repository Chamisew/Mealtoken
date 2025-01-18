import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderPage.css';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    
    axios.get('http://localhost:5000/api/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleDelete = (orderId) => {
    axios.delete(`http://localhost:5000/api/orders/${orderId}`)
      .then(() => {
        setOrders(orders.filter(order => order.orderId !== orderId));
      })
      .catch((error) => {
        console.error('Error deleting order:', error);
      });
  };

  return (
    <div className="order-list">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul>
          {orders.map((order) => {
            const orderDate = new Date(order.orderDate);
            const formattedDate = orderDate.toLocaleDateString();
            const formattedTime = orderDate.toLocaleTimeString();

            return (
              <li key={order.orderId}>
                <p>Order Date: {formattedDate}</p>
                <p>Order Time: {formattedTime}</p>
                <p>Total Price: RS. {order.totalPrice}</p>

                

                <button onClick={() => handleDelete(order.orderId)}>Cancel Order</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default OrderPage;
