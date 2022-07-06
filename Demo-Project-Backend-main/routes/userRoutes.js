const express = require('express')
const passport = require('passport')
const debug = require('debug')('userRoutes')

const validateRequest = require('../validation/validator')
const validationSchema = require('../validation/schemas/userSchema')
const { isAuth, isLocal, isTeacher, isStudent } = require('../middlewares/auth')
const userUpdateValidationSchema = require('../validation/schemas/userUpdateSchema')

const {
  create,
  getProfile,
  update,
  deleteTeacher,
  login,
  tokenRegenerator,
  logout,
  changePassword,
  deleteStudent,
} = require('../controllers/userController')

const router = express.Router()

// @routes /api/users
// Register user
router.post('/register', validateRequest(validationSchema), create)

// Get single user
router.get('/me', isAuth, getProfile)

// Update user
router.patch('/me', isAuth, validateRequest(userUpdateValidationSchema), update)

// Delete user=>teacher
router.delete('/me', isTeacher, deleteTeacher)

//Delete user=>student
router.delete('/student/me', isStudent, deleteStudent)

// Login
router.post('/login', isLocal, login)

// generates refresh token
router.post('/refresh', tokenRegenerator)

// logout
router.post('/logout', isAuth, logout)

// Change user password
router.post('/change-password', isAuth, changePassword)
module.exports = router
