const db = require('../config/db')

// Add details.

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


// Edit Details

const editprofessorinfo = async (req, res) => {
    const {name, address, mobile, dob, postcode, department, description, gender, country, state, city, weburl} = req.body;
       
    if (!mobile) {
        return res.status(400).json({ message: "Mobile number is required to update professor info." });
    }

    const checkQuery = `SELECT * FROM professors WHERE mobile = ?`;

    db.query(checkQuery, [mobile], (err, results) => {
        if (err) {
            console.error("Error checking professor existence:", err);
            return res.status(500).json({ message: "An error occurred while checking professor existence.", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No professor found with the provided mobile number." });
        }

        const updateQuery = `UPDATE professors SET 
                name = ?, 
                address = ?, 
                dob = ?, 
                postcode = ?,  
                department = ?, 
                description = ?, 
                gender = ?, 
                country = ?, 
                state = ?, 
                city = ?, 
                weburl = ?
            WHERE mobile = ?
        `;

        db.query(updateQuery, [
            name, address, dob, postcode, department,
            description, gender, country, state, city, weburl, mobile
        ], (updateErr, updateResult) => {
            if (updateErr) {
                console.error("Error updating professor info:", updateErr);
                return res.status(500).json({ message: "An error occurred while updating professor info.", error: updateErr });
            }

            return res.status(200).json({ message: "Professor info updated successfully." });
        });
    });
};

const editstudentinfo = async (req, res) => {
    const {name, address, mobile, dob, postcode, department, description, gender, country, state, city, weburl} = req.body;
       
    if (!mobile) {
        return res.status(400).json({ message: "Mobile number is required to update students info." });
    }

    const checkQuery = `SELECT * FROM students WHERE mobile = ?`;

    db.query(checkQuery, [mobile], (err, results) => {
        if (err) {
            console.error("Error checking students existence:", err);
            return res.status(500).json({ message: "An error occurred while checking students existence.", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No professor found with the provided mobile number." });
        }

        const updateQuery = `UPDATE students SET 
                name = ?, 
                address = ?, 
                dob = ?, 
                postcode = ?,  
                department = ?, 
                description = ?, 
                gender = ?, 
                country = ?, 
                state = ?, 
                city = ?, 
                weburl = ?
            WHERE mobile = ?
        `;

        db.query(updateQuery, [
            name, address, dob, postcode, department,
            description, gender, country, state, city, weburl, mobile
        ], (updateErr, updateResult) => {
            if (updateErr) {
                console.error("Error updating Student info:", updateErr);
                return res.status(500).json({ message: "An error occurred while updating Student info.", error: updateErr });
            }

            return res.status(200).json({ message: "Student info updated successfully." });
        });
    });
};
  

const editcourse = async (req, res) => {
    const { coursename, department, startdate, duration, description, price, professor, year } = req.body;

    if (!coursename || !department || !startdate || !duration || !description || !price || !professor || !year) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const parsedYear = parseInt(year, 10);
    if (isNaN(parsedYear)) {
        return res.status(400).json({ message: "Invalid year value. It must be a number." });
    }

    const numericPrice = parseFloat(price.replace('$', ''));
    if (isNaN(numericPrice)) {
        return res.status(400).json({ message: "Invalid price value." });
    }

    const formattedStartDate = new Date(startdate).toISOString().split('T')[0];

    const query = `
        UPDATE allcourses SET
            coursename = ?,
            department = ?,
            startdate = ?,
            duration = ?,
            description = ?,
            price = ?,
            professor = ?,
            year = ?
        WHERE coursename = ?
    `;

    db.query(
        query,
        [coursename, department, formattedStartDate, duration, description, numericPrice, professor, parsedYear, coursename],
        (err, result) => {
            if (err) {
                console.error("Error updating course info:", err);
                return res.status(500).json({ message: "An error occurred while updating course info.", error: err });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Course not found or no changes made." });
            }

            return res.redirect('/edit-course');
        }
    );
};




module.exports = {AddProfessor, AddstudentBasicInfo, addcourses, addlibraryassets, adddepartment, editprofessorinfo, editstudentinfo, editcourse }