// controllers/inventoryController.js

const InventoryItem = require('../models/InventoryItem');

exports.getAllItems = async (req, res) => {
    try {
        const items = await InventoryItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addItem = async (req, res) => {
    const item = new InventoryItem(req.body);
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedItem = await InventoryItem.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        await InventoryItem.findByIdAndDelete(id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
