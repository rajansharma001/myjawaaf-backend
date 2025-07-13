# MyJawaaf – Backend (API)

The **MyJawaaf API** is the server-side component powering the MyJawaaf e-learning platform. Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**, it handles everything from user authentication to course management and enrollment workflows.

---

## 🚀 Features

### Authentication & Authorization

- 🔐 JWT-based authentication via HTTP-only cookies
- 🔒 Role-based access control (Admin vs. Student)
- Protected routes and middleware for secure operations

### Courses & Categories

- 📂 CRUD for course categories
- 🎓 CRUD for courses with support for multiple lessons
- 🖼 Image uploads for course thumbnails

### User Features

- ✅ User registration & login
- 🧭 Enroll in free and paid courses
  - Payment receipt upload and verification
- 📋 Retrieve user-specific enrollments and course data

### Miscellaneous

- 🔁 Search endpoints
- 🌐 Multilingual support (via language tags)
- 💬 Toast notifications via frontend integration
- 📄 Detailed error handling and consistent API responses

---

## 📦 Tech Stack

- **Node.js** + **Express**
- Written in **TypeScript**
- **MongoDB** with Mongoose ODM
- Secure authentication with **JSON Web Tokens**
- File handling via **Multer**
- Environment variable management with **dotenv**

---

## 📁 Folder Structure

```
/src
├── /controllers      # Route handlers
├── /models           # Mongoose schemas
├── /routes           # Express routers
├── /middleware       # Auth, role checks, error handlers
├── /uploads          # Uploaded images and receipts
├── /config           # Config related (DB, JWT)
└── server.ts         # Entry point
```

---

## ⚙️ Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/rajansharma001/myjawaaf.git
   cd myjawaaf
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/myjawaaf
   JWT_SECRET=your_jwt_secret_here
   UPLOAD_DIR=uploads/
   ```

4. **Run the server**

   ```bash
   npm run build     # Compile TypeScript
   npm start         # Run the compiled server
   ```

   Or for development:

   ```bash
   npm run dev       # Runs with ts-node-dev for live reload
   ```

5. **API Endpoints**
   - `POST /auth/register` – Register a new user
   - `POST /auth/login` – Login and set JWT cookie
   - `GET /auth/me` – Retrieve current user
   - `GET /categories`, `POST /categories`, `PUT /categories/:id`, `DELETE /categories/:id`
   - `GET /courses`, `POST /courses`, `PUT /courses/:id`, `DELETE /courses/:id`
   - `GET /courses/:id`, `POST /courses/:id/enroll`, `GET /users/:id/enrollments`

---

## 📋 Testing

> _Coming soon:_ Integration tests, Postman collection, and CI pipeline

---

## 👨‍💻 Author

**Rajan Sharma**  
Full Stack Developer  
📬 [email.rajan001@gmail.com](mailto:email.rajan001@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/rajan-sharma-280764337/)

---

## 🌟 Contributing

Contributions, suggestions, and improvements are welcome! Please open an issue or submit a PR.

---

## ⭐ If you find this useful...

Please ⭐ **Star the repo**, share it with others, and feel free to provide feedback!
