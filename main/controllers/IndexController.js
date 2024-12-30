const db = require("../config/db")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require('crypto');

//Signup
const signup = async (req, res) => {
  const { name, email, password, confirmpassword, role } = req.body;

  if (password !== confirmpassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error checking user existence:", err);
        return res.status(500).send("An internal server error occurred");
      }

      if (results.length > 0) {
        return res.status(400).send("User already exists");
      }

      // Generate a salt
      const salt = crypto.randomBytes(16).toString('hex');
      
      // Hash the password with the salt using SHA-256
      const hashedPassword = crypto
        .createHmac('sha256', salt)
        .update(password)
        .digest('hex');

      const insertQuery = "INSERT INTO users (name, email, password, salt, role) VALUES (?, ?, ?, ?, ?)";
      db.query(insertQuery, [name, email, hashedPassword, salt, role], (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).send("Error saving data to database");
        }

        // Generate JWT
        const token = jwt.sign({ email }, process.env.SECRET_KEY, {
          expiresIn: "10d",
        });

        res.cookie("jwt", token, { maxAge: 10 * 24 * 60 * 1000, httpOnly: true });

        res.redirect("/dashboard");
      });
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("An internal server error occurred");
  }
};

//Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error checking user:", err);
        return res.status(500).send("An internal server error occurred");
      }

      if (results.length === 0) {
        return res.status(400).send("User not found");
      }

      const user = results[0];
      const { password: storedPassword, salt } = user;

      // Hash the provided password with the stored salt
      const hashedPassword = crypto
        .createHmac('sha256', salt)
        .update(password)
        .digest('hex');

      // Compare the hashes
      if (hashedPassword !== storedPassword) {
        return res.status(400).send("Invalid credentials");
      }

      // Generate JWT
      const token = jwt.sign({ email }, process.env.SECRET_KEY, {
        expiresIn: "10d",
      });

      res.cookie("jwt", token, { maxAge: 10 * 24 * 60 * 1000, httpOnly: true });
      res.redirect("/dashboard");
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An internal server error occurred");
  }
};


//Check role
const checkrole = async (req, res) => {
  const { email } = req.body;

  const query = `SELECT name, role, access FROM users WHERE email = ?`;

  db.execute(query, [email], (err, results) => {
      if (err) {
          console.error('Database Query Error:', err);
          return res.status(500).json({ message: 'Database query error' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'User not found' });
      }

      const userName = results[0].name
      const userRole = results[0].role;
      const userAccess = results[0].access;
      return res.status(200).json({name: userName, role: userRole, access: userAccess });
  })
}


//Verify JWT
const verifyJwt = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "JWT token not provided",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [decoded.email],
      (err, result) => {
        if (err) {
          console.error("Database error:", err.message)
          return res.status(500).json({
            success: false,
            error: "Database error",
          });
        }

        const user = result[0]
        if (user) {
          return res.json({
            success: true,
            redirect: "/dashboard",
          });
        } else {
          return res.json({
            success: false,
            error: "User not found",
          });
        }
      }
    );
  } catch (error) {
    console.error("Error verifying JWT token:", error.message)
    return res.status(401).json({
      success: false,
      error: error.message,
    })
  }
}

//Generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

//Forget Password
const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" })
  }

  const otp = generateOtp();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    secureconnection: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  const mailOption = {
    from: '"ABC-BANK" <ABC-bank@gmail.com>',
    to: email,
    subject: "Your OTP for Password Reset",
    text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It is valid for 10 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOption)
    console.log(`OTP sent to ${email}: ${otp}`)

    const query = `
      INSERT INTO resetotp (email, otp)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE otp = VALUES(otp);
    `;

    db.query(query, [email, otp], (err) => {
      if (err) {
        console.error("Database error while storing OTP:", err)
        return res.status(500).json({ message: "Failed to store OTP", error: err })
      }
      res.status(200).json({ response: "OTP sent successfully" })
    });
  } catch (error) {
    console.error("Error Sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP", error })
  }
};

//Verifying OTP
const verifyingOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" })
  }

  const query = `SELECT otp FROM resetotp WHERE email = ?`;
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database error while verifying OTP:", err)
      return res.status(500).json({ message: "Failed to verify OTP", error: err })
    }

    const clientOtp = String(otp).trim()
    const dbOtp = String(results[0].otp).trim()

    if (clientOtp === dbOtp) {
      return res.status(200).json({
        message: "OTP Verified Successfully", redirect:'/dashboard',
      });
    } else {
      return res.status(400).json({ message: "Invalid OTP" })
    }
  })
}

//Reset Password
const resetpassword = async (req, res) => {
  const { newpassword, email } = req.body;

  if (!newpassword || !email) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  try {
    const salt = crypto.randomBytes(16).toString('hex');  // 16 bytes salt

    // Hash the new password with the salt
    const hashedPassword = crypto
      .createHmac('sha256', salt) 
      .update(newpassword)
      .digest('hex');

    const query = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
    db.query(query, [hashedPassword, salt, email], (err, results) => {
      if (err) {
        console.error("Database error while updating password:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to update password",
          error: err,
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      // Generate JWT token
      const token = jwt.sign({ email }, process.env.SECRET_KEY, {
        expiresIn: "10d",
      });

      // Send cookie and response in one go
      res.cookie("jwt", token, { maxAge: 10 * 24 * 60 * 1000, httpOnly: true });
      
      // Send final response only after setting the cookie
      res.json({
        success: true,
        message: "Password updated successfully.",
        redirect: "/dashboard",
      });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ success: false, message: "An internal server error occurred." });
  }
};

//Logout
  const logout = async (req,res) => {
        res.clearCookie("jwt")
        res.status(200).json({success: true, message: "Logout successful"})
  }


module.exports = {signup, login, verifyJwt, sendOtp, verifyingOtp, resetpassword, logout, checkrole};