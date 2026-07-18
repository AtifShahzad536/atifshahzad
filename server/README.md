# Portfolio Backend API

A robust and secure backend API for a portfolio website, built with Node.js, Express, and MongoDB. This API provides endpoints for managing projects, handling contact form submissions, and user authentication.

## Features

- **Project Management**: CRUD operations for portfolio projects
- **Contact Form**: Secure handling of contact form submissions
- **Authentication**: JWT-based authentication system
- **Security**: Rate limiting, CORS, data sanitization, and more
- **File Uploads**: Support for project images and files
- **Email Notifications**: For contact form submissions and password resets

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, rate limiting, data sanitization
- **Logging**: Winston
- **Validation**: Express Validator
- **Email**: Nodemailer

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-backend.git
   cd portfolio-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the environment variables in `.env` with your configuration

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Email (for contact form and password resets)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=your_mailtrap_username
EMAIL_PASSWORD=your_mailtrap_password
EMAIL_FROM=Portfolio <noreply@yourdomain.com>

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/signup` - Register a new user (Admin only)
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/forgot-password` - Request password reset
- `PATCH /api/v1/auth/reset-password/:token` - Reset password
- `PATCH /api/v1/auth/update-password` - Update password (protected)

### Projects

- `GET /api/v1/projects` - Get all projects
- `GET /api/v1/projects/featured` - Get featured projects
- `GET /api/v1/projects/:id` - Get a single project
- `POST /api/v1/projects` - Create a new project (Admin only)
- `PATCH /api/v1/projects/:id` - Update a project (Admin only)
- `DELETE /api/v1/projects/:id` - Delete a project (Admin only)

### Contact

- `POST /api/v1/contact` - Submit contact form
- `GET /api/v1/contact` - Get all messages (Admin only)
- `GET /api/v1/contact/:id` - Get a single message (Admin only)
- `PATCH /api/v1/contact/:id` - Update message status (Admin only)
- `DELETE /api/v1/contact/:id` - Delete a message (Admin only)

## Development

### Running the server

```bash
# Development mode with hot-reload
npm run dev

# Production mode
npm start
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## Deployment

### Prerequisites
- MongoDB database (local or cloud)
- Node.js environment
- Environment variables set up

### Steps
1. Build the application:
   ```bash
   npm install --production
   ```

2. Start the server:
   ```bash
   npm start
   ```

### PM2 (Production Process Manager)

For production, it's recommended to use PM2 to keep the application running:

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start server.js --name "portfolio-api"

# Other useful PM2 commands
pm2 list              # List all processes
pm2 logs              # View logs
pm2 restart all       # Restart all processes
pm2 delete portfolio  # Stop and delete the application
```

## Security

- All passwords are hashed using bcrypt
- JWT tokens for authentication
- Rate limiting to prevent brute force attacks
- Data sanitization to prevent NoSQL injection
- Helmet for setting secure HTTP headers
- CORS enabled with secure defaults

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Winston](https://github.com/winstonjs/winston)

---

Built with ❤️ by [Your Name]
