# 📘 My Jawaaf - LMS Backend

A scalable and modular backend for a Learning Management System (LMS), built using **Node.js**, **Express**, **TypeScript**, and **MongoDB**. This project supports secure user authentication, course management, lesson handling, and enrollment functionalities — with complete RESTful API structure and email verification system.

![Node.js](https://img.shields.io/badge/Node.js-16.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict--Mode-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)

---

## 🚀 Features

- ✅ **JWT Authentication** (HTTP-only cookies)
- ✅ **User Roles & Authorization** (Admin/User)
- ✅ **Email Verification & Password Reset**
- ✅ **Course & Lesson CRUD APIs**
- ✅ **Enrollment API** (Users can enroll in courses)
- ✅ **MVC Folder Structure**
- ✅ **Validation using Custom Middlewares**
- ✅ **Public & Protected Routes**
- ✅ **TypeScript Strict Typing**

---

## 📁 Folder Structure

```bash
BACKEND/
│
├── config/                 # App & DB configuration
│   └── app.ts
│   └── dbConnect.ts
│
├── controller/            # All route controllers
│   ├── authController/
│   ├── categoryController/
│   ├── courseController/
│   ├── lessonController/
│   ├── enrollmentController/
│   └── userController/
│
├── middleware/            # Validations and permissions
│   ├── courseValidation/
│   ├── userValidation/
│   └── allowRole.ts
│
├── model/                 # Mongoose schemas
│   ├── userSchema.ts
│   ├── courseSchema.ts
│   └── ...
│
├── email/                 # Email logic
│   ├── sendEmailVerification.ts
│   └── emailTemplates.ts
│
├── routes/                # API route definitions
│   ├── publicRoute.ts
│   ├── authRouter.ts
│   └── ...
│
├── .env                   # Environment variables
├── package.json
└── tsconfig.json
```

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose
- **Security:** JWT, Bcrypt, Cookies
- **Validation:** Custom Middlewares
- **Email:** Nodemailer with templates

---

## 🔐 Authentication

- Signup / Login
- Email Verification via Token
- Password Reset via Email
- Access Token via Cookie
- Role-Based Access (Admin/User)

---

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/rajansharma001/myjawaaf.git
cd myjawaaf

# Install dependencies
npm install

# Create .env file
cp .env.example .env  # (or create manually)

# Start development server
npm run dev
```

---

## 🔑 .env Example

```
PORT=8000
MONGO_URI=mongodb://localhost:27017/myjawaaf
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.yourprovider.com
EMAIL_USER=your@email.com
EMAIL_PASS=yourpassword
CLIENT_URL=http://localhost:3000
```

---

## 📬 API Endpoints (Examples)

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/auth/signup` | Register a new user     |
| POST   | `/api/auth/signin` | Login user              |
| GET    | `/api/courses/`    | Get all courses         |
| POST   | `/api/courses/`    | Create a course (admin) |
| POST   | `/api/lessons/`    | Add a lesson            |
| POST   | `/api/enroll/`     | Enroll in a course      |

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📫 Contact

- 💻 Portfolio: [https://rajansharma.info.np](https://rajansharma.info.np)
- 📧 Email: [email.rajan001@gmail.com](mailto:email.rajan001@gmail.com)
- 🐱 GitHub: [@rajansharma001](https://github.com/rajansharma001)

---

## ⭐ License

This project is open source and free to use.
