# Job Portal

A modern, full-stack job portal application built with the MERN stack (MongoDB, Express, React, Node.js). 

## Features
- **User Authentication:** Secure JWT-based authentication.
- **Role-Based Access:** Support for both Student and Recruiter roles.
- **Student Profile:** Students can update their profile, skills, and upload resumes.
- **Recruiter Dashboard:** Recruiters can create companies, post jobs, and manage applicants.
- **Job Applications:** Seamless application process with real-time status tracking.
- **Media Storage:** Integrated with Cloudinary for secure profile picture and PDF resume hosting.

## Technology Stack
- **Frontend:** React, Vite, Tailwind CSS, Shadcn/UI, Redux Toolkit
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT
- **Services:** Cloudinary (Media Hosting)

## Getting Started

### Prerequisites
- Node.js installed
- A MongoDB database (e.g., MongoDB Atlas)
- A Cloudinary account for media hosting

### Installation

1. **Clone the repository (or extract files)**

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory based on the `.env.example` (or configure `MONGO_URI`, `SECRET_KEY`, and Cloudinary variables).
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`.
