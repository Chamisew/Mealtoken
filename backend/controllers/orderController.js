const Order = require('../models/orderModel');
const { v4: uuidv4 } = require('uuid');  //v4 method use for generate unique orderId
const Item = require('../models/itemModel');

const createOrder = async (req, res) => {
  try {
    const items  = req.body.items; 
    const orderId = uuidv4();
    const itemIds = items.map(item => item.itemId);
    
  
    const dbItems = await Item.find({ _id: { $in: itemIds } });
    console.log("DB items ===>", dbItems);

    const orderItems = items.map(item => {
      const dbItem = dbItems.find((dbItem) => {
        return dbItem._id.toString() === item.itemId; 
      });
      if (!dbItem) throw new Error(`Item with ID ${item.itemId} not found`);
      return {
        itemId: dbItem._id, 
        quantity: item.quantity,
      };
    });

    const totalPrice = orderItems.reduce((total, orderItem) => {
      const dbItem = dbItems.find(dbItem => dbItem._id.toString() === orderItem.itemId.toString());
      return total + dbItem.price * orderItem.quantity;
    }, 0);

    const order = { orderId, items: orderItems, totalPrice };
    console.log("Order creating", order);
    const newOrder = new Order(order);
    await newOrder.save();
    console.log("Order created", order);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("failed to create order", error);
    res.status(500).json({ message: "failed to create order" });
  }
};


const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.itemId', 'name price'); 
    res.json(orders); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const deletedOrder = await Order.findOneAndDelete({ orderId });
  
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ message: 'Order successfully deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
 

module.exports = { createOrder, getOrders , deleteOrder};
