const Item = require('../models/itemModel');

exports.getItems = async (req, res) => {
    const items = await Item.find();
    res.json(items);
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id); 
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item); 
    } catch (err) {
        console.error('Error fetching item:', err);
        res.status(500).json({ message: 'Error fetching item', error: err });
    }
};

exports.addItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json({ message: 'Item added' });
    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ message: 'Error adding item', error: err });
    }
};


exports.deleteItemAndReorder = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        const remainingItems = await Item.find().sort({ name: 1 }); 

        let updatedItems = remainingItems.map((item, index) => {
            item.id = index + 1; 
            return item.save(); 
        });

        await Promise.all(updatedItems);
        res.json({ message: 'Item deleted and IDs re-sequenced' });

    } catch (err) {
        console.error('Error deleting item and re-sequencing:', err);
        res.status(500).json({ message: 'Error deleting item and re-sequencing', error: err });
    }
};


exports.editItem = async (req, res) => {
    const { id } = req.params;  
    const updatedData = req.body;  
    try {
        const updatedItem = await Item.findByIdAndUpdate(id, updatedData, { new: true });  
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item updated', item: updatedItem });
    } catch (err) {
        console.error('Error updating item:', err);
        res.status(500).json({ message: 'Error updating item', error: err });
    }
};
