const User = require('../models/user');

exports.createAccount = async (req, res) => {
    const { fullname, phone_number, email, password, role, position } = req.body;
    try {
        const user = new User({ fullname, phone_number, email, password, role, position });
        await user.save();
        res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllAccounts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10, you can adjust it as needed
    const skip = (page - 1) * limit;

    try {
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        const users = await User.find()
            .skip(skip)
            .limit(limit);

        res.json({
            users,
            currentPage: page,
            totalPages
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getAccountById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAccount = async (req, res) => {
    const { id } = req.params;
    const { fullname, phone_number, email, password, role, position } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { fullname, phone_number, email, password, role, position }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
