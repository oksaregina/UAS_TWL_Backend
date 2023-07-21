const jwt = require('jsonwebtoken'); //membuat  token untuk mengambil data //mengeksekusi

// Middleware otentikasi
exports.authenticateToken = (req, res, next) => { //req masukin data, merespon, selanjutnya
    try {
        const token = req.headers.authorization.split(' ')[1]; // Ekstrak token dari header Authorization
        const decoded = jwt.verify(token, 'Hakuna Matata'); // Verifikasi token menggunakan kunci rahasia

        // Lampirkan token yang terdekripsi ke objek permintaan (req)
        req.user = decoded.user;

        next(); // Lanjut ke middleware berikutnya
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Token tidak valid' });
    }
};
