# Backend Assignment - MERN Stack with Authentication & RBAC

A scalable REST API with JWT authentication, role-based access control, and a React frontend for task management.

## 🚀 Features

### Backend (Primary Focus)
- ✅ User registration & login with JWT authentication
- ✅ Password hashing using bcryptjs
- ✅ Role-based access control (User vs Admin)
- ✅ Complete CRUD API for Tasks entity
- ✅ API versioning (`/api/v1`)
- ✅ Input validation & sanitization
- ✅ Error handling with proper HTTP status codes
- ✅ Swagger API documentation
- ✅ MongoDB database with Mongoose ODM
- ✅ Security features (Helmet, CORS, Rate Limiting, XSS Protection)

### Frontend (Supportive)
- ✅ React.js application with modern UI
- ✅ Beautiful gradient backgrounds with images
- ✅ User registration & login UI with animations
- ✅ Protected dashboard with JWT authentication
- ✅ Complete task CRUD operations
- ✅ Error/success message handling
- ✅ Responsive design
- ✅ Smooth animations and hover effects
- ✅ Glassmorphism design elements
- ✅ Professional color scheme

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Backend Assignment"
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your settings:
# - MongoDB URI
# - JWT Secret
# - Port number

# Start development server
npm run dev

# Or start production server
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Swagger Documentation
Once the backend is running, access the interactive API documentation at:
```
http://localhost:5000/api-docs
```

### API Endpoints

#### Authentication (`/api/v1/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user profile (Protected)

#### Tasks (`/api/v1/tasks`)
- `GET /tasks` - Get all tasks with pagination (Protected)
- `POST /tasks` - Create new task (Protected)
- `GET /tasks/:id` - Get task by ID (Protected)
- `PUT /tasks/:id` - Update task (Protected)
- `DELETE /tasks/:id` - Delete task (Protected)
- `GET /tasks/stats` - Get task statistics (Admin only)

### Query Parameters
- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 👥 User Roles

- **User**: Can create, read, update, and delete their own tasks
- **Admin**: Can view all tasks and access statistics

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  isActive: Boolean,
  timestamps: true
}
```

### Task Model
```javascript
{
  title: String,
  description: String,
  status: String (enum: ['pending', 'in-progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  createdBy: ObjectId (ref: User),
  timestamps: true
}
```

## 🔒 Security Features

- **Helmet.js**: Sets security HTTP headers
- **CORS**: Configured for cross-origin requests
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Using express-validator
- **Data Sanitization**: Against NoSQL injection and XSS
- **Password Hashing**: Using bcryptjs
- **JWT**: Secure token-based authentication

## 📁 Project Structure

```
Backend Assignment/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   │   └── v1/          # Version 1 routes
│   │   ├── utils/           # Utility functions
│   │   ├── validators/      # Input validators
│   │   └── app.js           # Express app setup
│   ├── server.js            # Server entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Context providers
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   └── package.json
│
├── README.md
├── SCALABILITY.md
└── Dockerfile
```

## 🧪 Testing the Application

### 1. Register a New User
```bash
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### 2. Login
```bash
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Create a Task
```bash
POST http://localhost:5000/api/v1/tasks
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "title": "Complete assignment",
  "description": "Finish the backend assignment",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker
docker build -t backend-assignment .
docker run -p 5000:5000 backend-assignment
```

## ☁️ Cloud Deployment (Render & Vercel)

For deploying backend to Render and frontend to Vercel:
- 📖 **Detailed Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- ⚡ **Quick Reference**: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)

### Quick Start:
1. Backend → Render (with MongoDB Atlas)
2. Frontend → Vercel
3. Update CORS settings
4. Test the deployment

See the deployment guides for step-by-step instructions in Hindi.

## 🚀 Scalability Considerations

See [SCALABILITY.md](./SCALABILITY.md) for detailed notes on:
- Horizontal scaling strategies
- Caching implementation
- Load balancing
- Microservices architecture
- Database optimization

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/backend_assignment
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Backend Developer Intern Assignment

## 🙏 Acknowledgments

- Express.js for the robust web framework
- MongoDB for the flexible database
- React for the powerful frontend library
- JWT for secure authentication
