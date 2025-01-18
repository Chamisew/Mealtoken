const express = require('express');
const router = express.Router();
const { getItems, addItem, deleteItemAndReorder, editItem, getItemById } = require('../controllers/itemController');
const itemController = require('../controllers/itemController');

router.get('/', getItems);
router.post('/', addItem);
router.delete('/:id', deleteItemAndReorder);
router.put('/:id', editItem);
router.get('/:id', getItemById);
module.exports = router;
