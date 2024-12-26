const db = require('../config/db')

const AddProfessor = async (req, res) => {
    const { name, address, mobile, dob, postcode, department, description, gender, country, state, city, weburl } = req.body;

    try {
        const insertquery = `
            INSERT INTO professors 
            (name, address, mobile, dob, postcode, department, description, gender, country, state, city, weburl) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [name, address, mobile, dob, postcode, department, description, gender, country, state, city, weburl]

        db.query(insertquery, values, (error, result) => {
            if (error) {
                console.error("Error inserting data:", error);
                return res.status(500).send("Error sending data to database.")
            }

            res.status(200).json({ success: true, message: "Professor added Successfully" })
        });
    } catch (error) {
        console.error("Error saving professor data", error)
        res.status(500).json({ success: false, message: "An internal server error occurred" });
    }
};

const AddstudentBasicInfo = async (req,res) =>{
    const { name, address, mobile, dob, postcode, department, description, gender, country, state, city, weburl } = req.body;

    try {
        const insertquery = `
            INSERT INTO students 
            (name, address, mobile, dob, postcode, department, description, gender, country, state, city, weburl) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [name, address, mobile, dob, postcode, department, description, gender, country, state, city, weburl]

        db.query(insertquery, values, (error, result) => {
            if (error) {
                console.error("Error inserting data:", error);
                return res.status(500).send("Error sending data to database.")
            }

            res.status(200).json({ success: true, message: "Student added Successfully" })
        });
    } catch (error) {
        console.error("Error saving student data", error)
        res.status(500).json({ success: false, message: "An internal server error occurred" });
    }
}

 const addcourses = async (req, res) => {
    const { coursename, department, startdate, duration, description, price, professor, year } = req.body;

    if (!coursename || !department || !startdate || !duration || !description || !price || !professor || !year) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const query = `INSERT INTO allcourses (coursename, department, startdate, duration, description, price, professor, year)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.execute(query, [coursename, department, startdate, duration, description, price, professor, year], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ success: false, message: "Database error." });
        }

        res.json({ success: true, message: "Course added successfully." });
    });
};

 const addlibraryassets = async (req,res) => {
      const {assetname, subject, department, type, price, year, status} = req.body;

      if(!assetname || !subject || !department || !type || !price || !year){
        return res.status(400).json({success: false, message: "All field are required"})
    }
     
    const query = `INSERT INTO libraryassets (assetname, subject, department, type, price, year, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.execute(query, [assetname, subject, department, type, price, year, status], (err, result) => {
        if(err){
            console.error("Error inserting data:", err);
            return res.status(500).json({success: false, message: "Database error."})
        }

        res.json({success:true, message: "Library add successfully"})
    });
 }

 const adddepartment = async (req, res) => {
    const { name, hod, email, phone, totalstudent, status } = req.body;
    // console.log(req.body)

    // Validate input fields
    if (!name || !hod || !email || !phone || !totalstudent || !status) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    }

    const query = `INSERT INTO alldepartments (name, hod, email, phone, totalstudent, status) VALUES (?, ?, ?, ?, ?, ?)`;

    db.execute(query, [name, hod, email, phone, totalstudent, status], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err); 
            return res.status(500).json({ success: false, message: "Database error" })
        }
        res.status(200).json({ success: true, message: "Department added successfully" })
    });
};




module.exports = {AddProfessor, AddstudentBasicInfo, addcourses, addlibraryassets, adddepartment, }