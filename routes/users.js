const router = require('express').Router();
const { profileUpdateValidation } = require('../middlewares/validation');

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', profileUpdateValidation, updateProfile);

module.exports = router;
