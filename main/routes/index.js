const express = require('express')
const multer = require('multer')
const router = express.Router()
const uuidv4 = require('uuid').v4;
const path = require('path')
const { signup, login, verifyJwt, sendOtp, verifyingOtp, resetpassword, logout, checkrole} = require('../controllers/IndexController')
const {AddProfessor, AddstudentBasicInfo, addcourses, addlibraryassets,
     adddepartment, editprofessorinfo, editstudentinfo, editcourse,editlibraryasset,
      editdepartment, getAllprofessor, getAllstudent, getAllCourses, getAllLibraryAssets,
      getAllDepartments, getAllusers, updateUserRole, getAlladmin, updateadminaccess} = require('../controllers/adminController')

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
router.get('/edit-department', (req,res) => {
    res.render('edit-department')
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

router.get('/alluser', (req,res) => {
    res.render('alluser')
})

router.get('/adminaccess', (req,res) => {
    res.render('adminaccess')
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

//Router to Add Department
router.post('/adddepartment', adddepartment)

//Router to edit Professor info
router.post('/editprofessorinfo', editprofessorinfo)

//Router to edit Student info
router.post('/editstudentinfo', editstudentinfo)

//Router to edit Course details
router.post('/editcourse',editcourse)

//Router to edit library assets details
router.post('/editlibraryasset',editlibraryasset)

//Router to edit department
router.post('/editdepartment',editdepartment)

// Router to get user role.
router.post('/checkrole', checkrole)

// Router to update user role.
router.post('/updateUserRole', updateUserRole)

// Router to update admin access.
router.post('/updateadminaccess', updateadminaccess)

// Storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`);
    },
});

// Multer instance
const upload = multer({ storage });

// Serve uploaded files statically
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Endpoint for adding a professor
router.post('/AddProfessor', upload.single('image'), AddProfessor);




//---------------------------------------------------------------------------------------------------------------------------------------------------
// Router to get all professor
router.get('/getAllprofessor',getAllprofessor)

// Router to get all student
router.get('/getAllstudent',getAllstudent)

// Router to get all student
router.get('/getAllCourses',getAllCourses)

// Router to get all library assets
router.get('/getAllLibraryAssets',getAllLibraryAssets)

// Router to get all department
router.get('/getAllDepartments',getAllDepartments)

// Router to get all users
router.get('/getAllusers',getAllusers)

// Router to get all admin
router.get('/getAlladmin',getAlladmin)

module.exports = router;