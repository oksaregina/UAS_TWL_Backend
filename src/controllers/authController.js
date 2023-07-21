//implementasi
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

// Registrasi pengguna
exports.registerUser = async (req, res) => {
    const { username, password, email, fullname } = req.body;

    try {
        // Periksa apakah pengguna sudah ada
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username Telah digunakan' });
        }

        // Enkripsi kata sandi
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat pengguna baru
        const newUser = new UserModel({
            fullname,
            email,
            username,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: 'Registrasi Berhasil' });
    } catch (error) {
        res.status(500).json({ message: 'Registrasi Gagal' });
    }
};

// Login pengguna
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Periksa apakah pengguna ada
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User Tidak Ditemukan' });
        }

        // Periksa apakah pengguna ada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Password Salah' });
        }

        // Membuat token JWT
        const token = jwt.sign({ Id: user._id, username: user.username }, "Hakuna Matata", {
            expiresIn: '1h', // Mengatur waktu kedaluwarsa token // Set token expiration time
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};

// Dapatkan data pengguna berdasarkan id
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { _id, email, fullname, username } = user;
        res.json({ _id, username, email, fullname });
    } catch (error) {
        res.status(500).json({ message: 'Error getting user data' });
    }
};


// Edit data pengguna
exports.editUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, fullname } = req.body;

    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username telah digunakan' });
        }
        // Temukan pengguna berdasarkan id
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Perbarui data pengguna
        user.username = username;
        user.email = email;
        user.fullname = fullname;
        await user.save();

        res.json({ message: 'User data updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user data' });
    }
};

// Perbarui data pengguna
exports.checkTokenValidity = (req, res) => {
    res.json({ valid: true });
};
