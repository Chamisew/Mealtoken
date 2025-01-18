import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ItemList.css';
import AddItem from './AddItem';

function ItemList() {
    const [items, setItems] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const navigate = useNavigate();

    
    useEffect(() => {
        axios.get('http://localhost:5000/api/items')
            .then(res => setItems(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this item?');

        if (confirmed) {
            axios.delete(`http://localhost:5000/api/items/${id}`)
                .then(() => {
                    
                    axios.get('http://localhost:5000/api/items')
                        .then(res => setItems(res.data))
                        .catch(err => console.error(err));
    
                    alert('Item deleted successfully');
                })
                .catch(err => console.error(err));
        }
    };

    const handleEdit = (id) => {
        navigate(`/items/edit/${id}`);
    };

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    return (
        <div className="item-list">
            <h1>Item List</h1>
            <button className="add-item-button" onClick={toggleAddForm}>
                {showAddForm ? 'Close Add Item' : '+ Add New Item'}
            </button>
            {showAddForm && <AddItem setItems={setItems} />}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Photo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item._id}>
                            <td>{(index + 1).toString().padStart(3, '0')}</td> 
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                                <img src={item.photo} alt={item.name} className="item-photo" />
                            </td>
                            <td>
                                <button className="edit-button" onClick={() => handleEdit(item._id)}>✏️ Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ItemList;
