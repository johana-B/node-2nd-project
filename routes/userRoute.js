const express = require('express');

const router = express.Router();

const { authenticateUser, autorizedUser } = require('../middleware/authentication')

const { getAllUsers,
    getCurrentUser,
    getSingleUser,
    updateUser,
    updateUserPassword
} = require('../controller/userController');

router.route('/allUsers').get(authenticateUser, autorizedUser('admin', 'institution'), getAllUsers);

router.route('/showCurrentUser').get(authenticateUser, getCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

router.route('/:id').get(authenticateUser, autorizedUser('admin', 'institution'), getSingleUser);

module.exports = router;