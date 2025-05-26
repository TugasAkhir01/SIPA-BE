const db = require('../config/db');

exports.getAllUsers = (callback) => {
    db.query('SELECT id, nip, nama, email, role, password, photo FROM users', callback);
};

exports.getUserById = (id, callback) => {
    db.query('SELECT id, nip, nama, email, role, password, photo FROM users WHERE id = ?', [id], callback);
};

exports.createUser = (data, callback) => {
    const query = `INSERT INTO users (nip, nama, email, password, role, photo) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [data.nip, data.nama, data.email, data.password, data.role, data.photo], callback);
};

exports.updateUser = (id, data, callback) => {
    const query = `UPDATE users SET nip = ?, nama = ?, email = ?, role = ?, photo = ? WHERE id = ?`;
    db.query(query, [data.nip, data.nama, data.email, data.role, data.photo, id], callback);
};

exports.updateUserWithoutPhoto = (id, data, callback) => {
    const query = `UPDATE users SET nip = ?, nama = ?, email = ?, role = ? password = ? WHERE id = ?`;
    db.query(query, [data.nip, data.nama, data.email, data.role, data.password, id], callback);
};

exports.deleteUser = (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
};

exports.customQuery = (query, values, callback) => {
    db.query(query, values, callback);
};