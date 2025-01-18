import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddItem.css';

function AddItem({ setItems }) {
    const [form, setForm] = useState({ name: '', price: '', photo: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.price || isNaN(form.price)) {
            setError('Please provide valid name and price.');
            return;
        }

        axios.post('http://localhost:5000/api/items', form)
        .then((response) => {
            
            axios.get('http://localhost:5000/api/items')
                .then((response) => {
                    
                    setItems(response.data);
                })
                .catch((err) => {
                    console.error('Error fetching items after add:', err);
                });

            alert('Item added successfully');
            setForm({ name: '', price: '', photo: '' });
            setError('');
            navigate('/items'); 
        })
            .catch(err => {
                console.error(err);
                setError('Failed to add item. Please try again.');
            });
    };

    return (
        <form onSubmit={handleSubmit} className="add-item-form">
            <h1>Add Item</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <label>Name:</label>
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
            />
            <label>Price:</label>
            <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
            />
            <label>Photo URL:</label>
            <input
                name="photo"
                type="text"
                value={form.photo}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default AddItem;
