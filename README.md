# University Management System

A comprehensive University Management System Admin Pannel built with **Node.js** and **MySQL** that helps manage university operations efficiently, including student management, faculty management, course registration, and more.

## Features

- **User Roles:**
  - **Super-Admin:** Role Based access, Manage students, faculty, courses, and other administrative tasks.
  - **Faculty:** Manage class schedules, upload grades, and communicate with students.
  - **Students:** Register for courses, view grades, and interact with faculty.

- **Modules:**
  - **Student Management:** Add, update, view, and delete student information.
  - **Faculty Management:** Manage faculty records and assign courses.
  - **Course Management:** Create, update, and delete course information.
  - **Enrollment System:** Allow students to enroll in courses.
  - **Grading System:** Faculty can upload and manage grades for enrolled students.
  - **Authentication:** Secure login system with role-based access control.

## Technologies Used

- **Backend:** Node.js (Express.js framework)
- **Database:** MySQL
- **Authentication:** JSON Web Tokens (JWT) for secure authentication.
- **Frontend:** HTML, CSS, JavaScript.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/university-management-system.git
   cd university-management-system

## Set up the MySQL Database

1. **Create a database:**
   Create a database named `university_management` (or your preferred name).

2. **Import the provided SQL file:**
   ```bash
   mysql -u [username] -p university_management < database.sql
