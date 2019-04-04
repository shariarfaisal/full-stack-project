const router = require('express').Router();
const userController = require('../controllers/user');

router.post('/register',userController.postUser);

module.exports = router;
