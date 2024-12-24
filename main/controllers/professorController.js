const db = require('../config/db')
const bcrypt = require('bcrypt')

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



module.exports = {AddProfessor,}