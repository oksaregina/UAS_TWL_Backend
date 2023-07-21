const mongoose = require('mongoose');

// Definisikan skema untuk entitas pengguna
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Buat model berdasarkan skema pengguna
const UserModel = mongoose.model('User', userSchema);

// Ekspor model User
module.exports = UserModel;
