import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditItem.css';

function EditItem() {
    const { id } = useParams();  
    const [item, setItem] = useState({ name: '', price: '', photo: '' });
    const navigate = useNavigate();

    useEffect(() => {
        
        axios.get(`http://localhost:5000/api/items/${id}`)
            .then(res => setItem(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/items/${id}`, item)
            .then(() => {
                alert('Item updated successfully!');
                navigate('/items');  
            })
            .catch(err => console.error(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prevItem => ({ ...prevItem, [name]: value }));
    };

    return (
        <div>
            <h1>Edit Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={item.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Photo URL:</label>
                    <input
                        type="text"
                        name="photo"
                        value={item.photo}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditItem;
