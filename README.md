# 📚 MyJawaaf – Backend (API)

The **MyJawaaf API** powers the e-learning platform with robust backend services including user authentication, course management, enrollments, and secure file handling. Built with **Node.js**, **TypeScript**, **Express**, and **MongoDB**.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- JWT-based authentication via HTTP-only cookies
- Role-based access control (Admin / Student)
- Protected routes and secure middleware

### 📚 Courses & Categories

- CRUD operations for categories & courses
- Multiple lesson support per course
- Thumbnail/image upload support

### 👥 User Features

- User registration and login
- Enroll in free and paid courses
- Upload and verify payment receipts
- Access personal enrollments and progress

### 🛠 Miscellaneous

- Search endpoints
- Multilingual tagging support
- Consistent error handling and API responses

---

## 📦 Tech Stack

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Multer (for file uploads)
- JSON Web Tokens (Auth)
- dotenv for environment variables

---

## 📁 Folder Structure

```
/src
├── controllers      # Route logic
├── models           # Mongoose schemas
├── routes           # API endpoints
├── middleware       # Auth & error middleware
├── config           # DB, JWT config, app entry
│   └── app.ts       # App entry point
├── uploads          # Image & receipt uploads
└── server.ts        # (Optional server runner)
```

---

## ⚙️ Getting Started

```bash
# Clone the repository
git clone https://github.com/rajansharma001/myjawaaf-backend.git
cd myjawaaf-backend

# Install dependencies
npm install
```

### 🔐 Create `.env` file

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/myjawaaf
JWT_SECRET=your_jwt_secret
UPLOAD_DIR=uploads/
```

### 🚀 Start the server

```bash
npm run build     # Compile TypeScript
npm start         # Start production server
npm run dev       # Dev mode with ts-node-dev
```

---

## 📡 API Endpoints (Sample)

### Auth

- `POST /auth/register` – Register new user
- `POST /auth/login` – Login & set JWT cookie
- `GET /auth/me` – Get logged-in user

### Categories & Courses

- `GET/POST/PUT/DELETE /categories`
- `GET/POST/PUT/DELETE /courses`
- `GET /courses/:id` – Course details

### Enrollments

- `POST /courses/:id/enroll`
- `GET /users/:id/enrollments`

---

## ✅ Testing

🚧 _Integration tests and Postman collection coming soon._

---

## 👨‍💻 Author

**Rajan Sharma**  
Full Stack Developer  
📬 email.rajan001@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/rajan-sharma-280764337/)

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome!  
Please open an issue or submit a PR.

---

## ⭐ Star If You Like

If you found this project helpful, give it a ⭐ on GitHub and share it with others!
