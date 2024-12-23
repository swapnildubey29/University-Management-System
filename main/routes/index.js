const express = require('express')
const router = express.Router()
const { signup, login, verifyJwt, sendOtp, verifyingOtp, resetpassword} = require('../controllers/IndexController')

// Rendering Homepage
router.get('/', (req,res) => {
    res.render('index')
})

// Rendering Signup page
router.get('/signup', (req,res) => {
    res.render('signup')
})

// Rendering Dashboard page
router.get('/dashboard', (req,res) => {
    res.render('dashboard')
})

// Rendering Forget password page
router.get('/forgotpassword', (req,res) => {
    res.render('forgotpassword')
})

router.get('/index-1', (req,res) => {
    res.render('index-1')
})

router.get('/index-2', (req,res) => {
    res.render('index-2')
})

router.get('/404', (req,res) => {
    res.render('404')
})

router.get('/500', (req,res) => {
    res.render('500')
})

router.get('/accordion', (req,res) => {
    res.render('accordion')
})

router.get('/add-course', (req,res) => {
    res.render('add-course')
})

router.get('/add-department', (req,res) => {
    res.render('add-department')
})

router.get('/add-library-assets', (req,res) => {
    res.render('add-library-assets')
})

router.get('/add-professor', (req,res) => {
    res.render('add-professor')
})

router.get('/add-student', (req,res) => {
    res.render('add-student')
})

router.get('/alerts', (req,res) => {
    res.render('alerts')
})

router.get('/advance-form-element', (req,res) => {
    res.render('advance-form-element')
})

router.get('/all-courses', (req,res) => {
    res.render('all-courses')
})

router.get('/all-professors', (req,res) => {
    res.render('all-professors')
})

router.get('/all-students', (req,res) => {
    res.render('all-students')
})



// -----------------------------------------------------------------------------------------------------------------------------------------------

// Route to Create new user.
router.post('/signup',signup)

// Route to Login
router.post('/login',login)

//Route to verfyJwt
router.post('/verifyJwt',verifyJwt)

//Router to Send OTP
router.post('/sendOtp',sendOtp)

//Router to Verify OTP
router.post('/verifyingOtp',verifyingOtp)

//Router to Reset password
router.post('/resetpassword', resetpassword)


module.exports = router