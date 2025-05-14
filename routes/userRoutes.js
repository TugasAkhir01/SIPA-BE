const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, userController.getUsers);
router.get('/:id', verifyToken, userController.getUser);
router.post('/', verifyToken, userController.createUser);
router.put('/:id', verifyToken, userController.updateUser);
router.put('/update-without-photo/:id', userController.updateUserWithoutPhoto);
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;
