# IT Virtual Library - MERN Stack Project

A full-stack MERN web application built for an Information Technology department to allow students to register, login, and upload academic resources like Notes, PDFs, Question Papers, and Lab Manuals.

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing.
- **Roles**: Student and Admin roles.
- **Student Dashboard**: View, search, filter, and download academic resources.
- **Upload System**: Students can upload resources with duplicate prevention based on subject code, resource type, and semester/year.
- **Admin Dashboard**: View platform analytics, manage users, and delete inappropriate resources.
- **Responsive UI**: Modern, clean, and responsive design using Tailwind CSS.

## Tech Stack

- **Frontend**: React.js (Vite), React Router, Axios, Tailwind CSS, Lucide React (Icons).
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Multer (Local file storage).

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local instance or MongoDB Atlas)

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Virtual\ Library
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Ensure you have your `.env` file set up in the `backend` directory (a sample has been provided in the codebase).
- Start the backend server:
```bash
npm run dev
```
*(The backend runs on `http://localhost:5000`)*

### 3. Frontend Setup
```bash
cd frontend
npm install
```
- Start the frontend development server:
```bash
npm run dev
```
*(The frontend runs on `http://localhost:5173` by default)*

## Folder Structure

Follows standard MERN stack architecture with separate `frontend` and `backend` directories.

### Backend
- `/models`: Mongoose schemas (User, Resource)
- `/controllers`: Request handlers
- `/routes`: API routes
- `/middleware`: Auth and Upload middlewares
- `/config`: Database configuration
- `/uploads`: Locally stored uploaded files

### Frontend
- `/src/components`: Reusable UI components
- `/src/pages`: Main application views
- `/src/context`: React Context for global state (Auth)
- `/src/api`: Axios configuration
- `/src/routes`: React Router configuration

## Deployment

For production deployment:
1. **Frontend**: Can be easily deployed to Vercel or Netlify.
2. **Backend**: Deploy to Render or Heroku.
   - **Important Note**: Render's free tier uses ephemeral storage. Uploaded files via Multer will be lost when the server restarts. For production, it is highly recommended to integrate **Cloudinary** or AWS S3 in `uploadMiddleware.js` instead of local storage.
3. **Database**: Use MongoDB Atlas.

## License
MIT
