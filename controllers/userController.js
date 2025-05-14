const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.getUsers = (req, res) => {
    User.getAllUsers((err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mengambil data', error: err });
        res.json(results);
    });
};

exports.getUser = (req, res) => {
    const id = req.params.id;
    User.getUserById(id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mengambil data', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.json(results[0]);
    });
};

exports.createUser = async (req, res) => {
    const { nip, nama, email, password, role, photo } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { nip, nama, email, password: hashedPassword, role, photo };

    User.createUser(userData, (err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal membuat user', error: err });
        res.status(201).json({ message: 'User berhasil dibuat', userId: results.insertId });
    });
};

exports.updateUser = (req, res) => {
    const id = req.params.id;
    const { nip, nama, email, role, photo } = req.body;

    const userData = { nip, nama, email, role, photo };
    User.updateUser(id, userData, (err) => {
        if (err) return res.status(500).json({ message: 'Gagal update user', error: err });
        res.json({ message: 'User berhasil diupdate' });
    });
};

exports.updateUserWithoutPhoto = async (req, res) => {
    const id = req.params.id;
    const { nip, nama, email, password, role } = req.body;

    let userData = { nip, nama, email, role };

    if (password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            userData.password = hashedPassword;
        } catch (error) {
            return res.status(500).json({ message: 'Gagal mengenkripsi password', error });
        }
    }

    const updateCallback = (err) => {
        if (err) return res.status(500).json({ message: 'Gagal update user', error: err });
        res.json({ message: 'User berhasil diupdate tanpa foto' });
    };

    if (userData.password) {
        const query = `UPDATE users SET nip = ?, nama = ?, email = ?, password = ?, role = ? WHERE id = ?`;
        const values = [userData.nip, userData.nama, userData.email, userData.password, userData.role, id];
        User.customQuery(query, values, updateCallback);
    } else {
        User.updateUserWithoutPhoto(id, userData, updateCallback);
    }
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.deleteUser(id, (err) => {
        if (err) return res.status(500).json({ message: 'Gagal menghapus user', error: err });
        res.json({ message: 'User berhasil dihapus' });
    });
};

exports.customQuery = (query, values, callback) => {
    db.query(query, values, callback);
};
