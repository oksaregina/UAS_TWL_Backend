const express = require('express');
const router = express.Router();
const { loggerMiddleware } = require('./middleware/middleware');
const { authenticateToken } = require('./middleware/authMiddleware');

const {
  getAllMahasiswa,
  createMahasiswa,
  deleteMahasiswa,
  editMahasiswa,
} = require('./controllers/mahasiswaController');
const { 
  registerUser, 
  loginUser,
  checkTokenValidity,
  getUserById,
  editUser
} = require('./controllers/authController');


// Middleware
router.use(loggerMiddleware);


// Mahasiswa routes
router.get('/mahasiswa',authenticateToken , getAllMahasiswa); //  authen untuk memverifikasi token get untuk mengambil daftar mahasiswa dari database
router.post('/mahasiswa',authenticateToken , createMahasiswa);  //  authen untuk memverifikasi token post untuk membuat entitas mahasiswa baru
router.delete('/mahasiswa/:id',authenticateToken , deleteMahasiswa);  //  authen untuk memverifikasi token delet untuk menghapus entitas mahasiswa berdasarkan id
router.put('/mahasiswa/:id',authenticateToken , editMahasiswa);//  authen untuk memverifikasi token put untuk memperbaharui data entitas mahasiswa berdasarkan id


// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Check token validity route
router.post('/check-token', authenticateToken, checkTokenValidity);

// Get user manipulation
router.get('/user/:id', authenticateToken, getUserById);
router.put('/user/:id', authenticateToken, editUser)

// Export the router
module.exports = router;

