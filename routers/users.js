const router = require('express').Router();
const usercontroller = require('../controllers/users');
const {getAllUsers,postUser,getUserById,deleteUser,updadteUser} = usercontroller;

router.get('/',getAllUsers);
router.get('/:id',getUserById);
router.post('/register',postUser);
router.delete('/:id',deleteUser);
router.put('/:id',updadteUser);

module.exports = router;
