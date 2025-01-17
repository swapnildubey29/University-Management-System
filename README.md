# University Management System

This project is a backend system for managing various entities in a university, including professors, students, courses, library assets, and departments. It provides endpoints to add, edit, and retrieve details of professors, students, courses, and other entities, with support for file uploads.

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

To install and run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/university-management-system.git
    cd university-management-system
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the database (MySQL):
    - Create a MySQL database and configure the connection settings in `config/db.js`.

4. Start the server:
    ```bash
    npm start
    ```

The server will run on `http://localhost:3000`.

## Endpoints

### 1. Add Professor
- **Route**: `POST /add-professor`
- **Request Body**: 
    ```json
    {
      "name": "John Doe",
      "address": "123 Main St",
      "mobile": "1234567890",
      "dob": "1990-01-01",
      "postcode": "12345",
      "department": "Computer Science",
      "description": "Experienced professor",
      "gender": "Male",
      "country": "USA",
      "state": "California",
      "city": "Los Angeles",
      "weburl": "http://johndoe.com",
      "image": "image.jpg"
    }
    ```

### 2. Add Student
- **Route**: `POST /add-student`
- **Request Body**: 
    ```json
    {
      "name": "Jane Smith",
      "address": "456 Another St",
      "mobile": "0987654321",
      "dob": "2000-05-15",
      "postcode": "67890",
      "department": "Physics",
      "description": "Physics major",
      "gender": "Female",
      "country": "USA",
      "state": "California",
      "city": "San Francisco",
      "weburl": "http://janesmith.com"
    }
    ```

### 3. Add Course
- **Route**: `POST /add-course`
- **Request Body**: 
    ```json
    {
      "coursename": "Introduction to Computer Science",
      "department": "Computer Science",
      "startdate": "2025-02-01",
      "duration": "3 months",
      "description": "Basic course on CS",
      "price": "$100",
      "professor": "John Doe",
      "year": "2025"
    }
    ```

### 4. Edit Professor Information
- **Route**: `PUT /edit-professor`
- **Request Body**: 
    ```json
    {
      "name": "John Doe",
      "address": "123 Main St",
      "mobile": "1234567890",
      "dob": "1990-01-01",
      "postcode": "12345",
      "department": "Computer Science",
      "description": "Updated description",
      "gender": "Male",
      "country": "USA",
      "state": "California",
      "city": "Los Angeles",
      "weburl": "http://johndoe.com"
    }
    ```

### 5. Edit Student Information
- **Route**: `PUT /edit-student`
- **Request Body**: 
    ```json
    {
      "name": "Jane Smith",
      "address": "456 Another St",
      "mobile": "0987654321",
      "dob": "2000-05-15",
      "postcode": "67890",
      "department": "Physics",
      "description": "Updated description",
      "gender": "Female",
      "country": "USA",
      "state": "California",
      "city": "San Francisco",
      "weburl": "http://janesmith.com"
    }
    ```

### 6. Get All Professors
- **Route**: `GET /get-all-professors`
- **Response**: 
    ```json
    [
      {
        "name": "John Doe",
        "address": "123 Main St",
        "mobile": "1234567890",
        "dob": "1990-01-01",
        "postcode": "12345",
        "department": "Computer Science",
        "description": "Experienced professor",
        "gender": "Male",
        "country": "USA",
        "state": "California",
        "city": "Los Angeles",
        "weburl": "http://johndoe.com"
      }
    ]
    ```

## Contributing

Feel free to fork the repository and submit pull requests to contribute to this project. Please follow standard best practices for coding and documentation.

## License

This project is licensed under the MIT License.

---

**Note**: Replace `swapnildubey29` in the clone command with your actual GitHub username and ensure the relevant API documentation matches your project setup.
