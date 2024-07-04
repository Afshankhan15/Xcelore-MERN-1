const express = require("express");
const router = express.Router();

const userController = require('../Controllers/User.controller')

const {authMiddleware} = require('../Middleware/Auth.middleware')
const {adminMiddleware} = require('../Middleware/Admin.middleware')

router.post('/createUser', authMiddleware, adminMiddleware, userController.CreateUser);
router.get('/getUser', authMiddleware, adminMiddleware, userController.GetUsers);
router.put('/updateUser/:id', authMiddleware, adminMiddleware, userController.UpdateUser);
router.delete('/deleteUser/:id', authMiddleware, adminMiddleware, userController.DeleteUser);

module.exports = router;