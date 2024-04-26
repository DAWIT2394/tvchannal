

const Account = require('../models/Account');

exports.createAccount = async (req, res) => {
    const { username, password, email, role } = req.body;
    try {
        const account = new Account({ username, password, email, role });
        await account.save();
        res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAccountById = async (req, res) => {
    const { id } = req.params;
    try {
        const account = await Account.findById(id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json(account);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAccount = async (req, res) => {
    const { id } = req.params;
    const { username, password, email, role } = req.body;
    try {
        const updatedAccount = await Account.findByIdAndUpdate(id, { username, password, email, role }, { new: true });
        res.json(updatedAccount);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
        await Account.findByIdAndDelete(id);
        res.json({ message: 'Account deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
