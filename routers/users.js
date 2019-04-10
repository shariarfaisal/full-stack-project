const router = require('express').Router();
const usercontroller = require('../controllers/users');
const loginMiddleware = require('../middleware/login');
const userProfileController = require('../controllers/userProfile');
const {userInfoByUserName,allUserProfile} = userProfileController;
const {getAllUsers,postUser,getUserById,deleteUser,updateUser,login} = usercontroller;

// router.get('/',loginMiddleware,getAllUsers);
router.get('/',getAllUsers);
router.get('/:id',getUserById);
router.post('/register',postUser);
router.delete('/:id',deleteUser);
router.put('/:id',updateUser);
router.post('/login',login);
router.get('/profile/:userName',userInfoByUserName);
router.get('/friends/all',allUserProfile);
module.exports = router;
