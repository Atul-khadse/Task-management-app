const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create default admin user if not exists
const createDefaultAdmin = async () => {
    const admin = await Admin.findOne({ email: 'admin@gmail.com' });
    if (!admin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const newAdmin = new Admin({ email: 'admin@gmail.com', password: hashedPassword });
        await newAdmin.save();
    }
};
createDefaultAdmin();

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
