const mongoose = require('mongoose');

// Definisikan skema untuk entitas mahasiswa
const mahasiswaSchema = new mongoose.Schema({
  NIM: {
    type: Number,
    required: true,
    unique: true
  },

  Nama: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  alamat: {
    type: String,
    required: true
  }
});

// Buat model berdasarkan skema mahasiswa
const MahasiswaModel = mongoose.model('Mahasiswa', mahasiswaSchema);

// Ekspor model Mahasiswa
module.exports = MahasiswaModel;
