import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MealList.css';

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then((response) => setMeals(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addToCart = (mealId) => {
    const mealToAdd = meals.find(meal => meal._id === mealId);
    const existingMeal = cart.find(meal => meal._id === mealId);
    if (existingMeal) {
      setCart(cart.map(meal => 
        meal._id === mealId 
        ? { ...meal, quantity: meal.quantity + 1 } 
        : meal
      ));
    } else {
      setCart([...cart, { ...mealToAdd, quantity: 1 }]);
    }
  };

  const removeFromCart = (mealId) => {
    const existingMeal = cart.find(meal => meal._id === mealId);
    if (existingMeal && existingMeal.quantity > 1) {
      setCart(cart.map(meal => 
        meal._id === mealId 
        ? { ...meal, quantity: meal.quantity - 1 } 
        : meal
      ));
    } else if (existingMeal && existingMeal.quantity === 1) {
     
      setCart(cart.filter(meal => meal._id !== mealId));
    }
  };

  const handleConfirmOrder = () => {
    const orderDetails = {
      items: cart.map(meal => ({
        itemId: meal._id,
        quantity: meal.quantity,
      })),
    };

    
    axios.post('http://localhost:5000/api/orders', orderDetails)
      .then(response => {
        console.log('Order successfully placed:', response.data);
        setOrderDetails(response.data);  
        setOrderSuccess(true);
      })
      .catch(error => {
        console.error('Error placing the order:', error);
      });
  };

  return (
    <div className="meal-list">
      <h1>Meals</h1>
      <div className="meals-container">
        {meals.map((meal) => (
          <div key={meal._id} className="meal-card">
            <img src={meal.photo} alt={meal.name} style={{ width: '100px', height: '100px' }} />
            <h3>{meal.name}</h3>
            <p>RS. {meal.price}</p>
            <div className="cart-actions">
              <button onClick={() => addToCart(meal._id)}>+</button>
              
              <button 
                onClick={() => removeFromCart(meal._id)} 
                disabled={!cart.some(item => item._id === meal._id)}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Your Cart</h2>
        <ul>
          {cart.map((meal, index) => (
            <li key={index}>
              {meal.name} - RS. {meal.price} x {meal.quantity}
            </li>
          ))}
        </ul>
        <p>Total Price: RS. {cart.reduce((total, meal) => total + (meal.price * meal.quantity), 0)}</p>
        <button onClick={handleConfirmOrder}>Confirm Order</button>
      </div>

      
      {orderSuccess && (
        <div className="order-success">
          <p>Your order has been successfully placed!</p>
          <p>Total Price: RS. {orderDetails?.totalPrice}</p>
        </div>
      )}
    </div>
  );
};

export default MealList;
