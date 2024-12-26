const express = require('express')
const router = express.Router()
const { signup, login, verifyJwt, sendOtp, verifyingOtp, resetpassword, logout} = require('../controllers/IndexController')
const {AddProfessor, AddstudentBasicInfo, addcourses, addlibraryassets, adddepartment} = require('../controllers/adminController')

// Rendering Page
router.get('/', (req,res) => {
    res.render('index')
})

router.get('/signup', (req,res) => {
    res.render('signup')
})

router.get('/dashboard', (req,res) => {
    res.render('dashboard')
})

router.get('/forgotpassword', (req,res) => {
    res.render('forgotpassword')
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

router.get('/analytics', (req,res) => {
    res.render("analytics")
})

router.get('/area-charts', (req,res) => {
    res.render('area-charts')
})

router.get('/bar-charts', (req,res) => {
    res.render('bar-charts')
})

router.get('/basic-form-element', (req,res) => {
    res.render('basic-form-element')
})

router.get('/buttons', (req,res) => {
    res.render('buttons')
})

router.get('/c3', (req,res) => {
    res.render('c3')
})

router.get('/code-editor', (req,res) => {
    res.render('code-editor')
})
router.get('/course-info', (req,res) => {
    res.render('course-info')
})

router.get('/course-payment', (req,res) => {
    res.render('course-payment')
})

router.get('/data-maps', (req,res) => {
    res.render('data-maps')
})

router.get('/data-table', (req,res) => {
    res.render('data-table')
})

router.get('/departments', (req,res) => {
    res.render('departments')
})

router.get('/dual-list-box', (req,res) => {
    res.render('dual-list-box')
})
router.get('/buttons', (req,res) => {
    res.render('buttons')
})

router.get('/edit-course', (req,res) => {
    res.render('edit-course')
})
router.get('/edit-deparment', (req,res) => {
    res.render('edit-deparment')
})

router.get('/edit-library-assets', (req,res) => {
    res.render('edit-library-assets')
})

router.get('/edit-professor', (req,res) => {
    res.render('edit-professor')
})

router.get('/edit-student', (req,res) => {
    res.render('edit-student')
})

router.get('/events', (req,res) => {
    res.render('events')
})

router.get('/google-map', (req,res) => {
    res.render('google-map')
})

router.get('/images-cropper', (req,res) => {
    res.render('images-cropper')
})

router.get('/index-1', (req,res) => {
    res.render('index-1')
})

router.get('/index-2', (req,res) => {
    res.render('index-2')
})

router.get('/library-assets', (req,res) => {
    res.render('library-assets')
})

router.get('/line-charts', (req,res) => {
    res.render('line-charts')
})

router.get('/lock', (req,res) => {
    res.render('lock')
})

router.get('/mailbox-compose', (req,res) => {
    res.render('mailbox-compose')
})

router.get('/mailbox-view', (req,res) => {
    res.render('mailbox-view')
})

router.get('/mailbox', (req,res) => {
    res.render('mailbox')
})

router.get('/modals', (req,res) => {
    res.render('modals')
})

router.get('/multi-upload', (req,res) => {
    res.render('multi-upload')
})

router.get('/notifications', (req,res) => {
    res.render('notifications')
})

router.get('/password-meter', (req,res) => {
    res.render('password-meter')
})

router.get('/password-recovery', (req,res) => {
    res.render('password-recovery')
})

router.get('/pdf-viewer', (req,res) => {
    res.render('pdf-viewer')
})

router.get('/peity', (req,res) => {
    res.render('peity')
})

router.get('/preloader', (req,res) => {
    res.render('preloader')
})

router.get('/professor-profile', (req,res) => {
    res.render('professor-profile')
})

// router.get('/register', (req,res) => {
//     res.render('register')
// })

router.get('/round-chart', (req,res) => {
    res.render('round-chart')
})

router.get('/sparkline', (req,res) => {
    res.render('sparkline')
})

router.get('/static-table', (req,res) => {
    res.render('static-table')
})

router.get('/student-profile', (req,res) => {
    res.render('student-profile')
})

router.get('/tabs', (req,res) => {
    res.render('tabs')
})

router.get('/tinymc', (req,res) => {
    res.render('tinymc')
})

router.get('/tree-view', (req,res) => {
    res.render('tree-view')
})

router.get('/widgets', (req,res) => {
    res.render('widgets')
})

router.get('/x-editable', (req,res) => {
    res.render('x-editable')
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

//Router to Logout
router.post('/logout', logout)

//Router to Add Professor info
router.post('/AddProfessor', AddProfessor)

//Router to Add Student info
router.post('/AddstudentBasicInfo',AddstudentBasicInfo)

//Router to Add Course
router.post('/addcourses',addcourses)

//Router to Add Library assets
router.post('/addlibraryassets',addlibraryassets)

////Router to Add Department
router.post('/adddepartment', adddepartment)





module.exports = router;