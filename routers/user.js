const router = require('express').Router();
const userController = require('../controllers/user');

router.post('/register',userController.postUser);
router.post('/login',userController.loginUser);
module.exports = router;
