const router = require('express').Router();
const { userModelValidator } = require('../validators/user-validator');

const {
  getUserInfo,
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', getUserById);

router.patch('/me', userModelValidator, updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
