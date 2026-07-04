<div align="center">
  
# 🚀 Modern MERN Job Portal

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)

A beautiful, full-stack Job Portal application built with the **MERN** stack (MongoDB, Express, React, Node.js). Designed with a sleek Dark Mode UI and powerful features for both Job Seekers and Recruiters.

</div>

<br />

## ✨ Key Features

This platform provides two dedicated experiences based on user roles:

### 🎓 For Students (Job Seekers)
* **Smart Search & Filtering:** Find jobs easily by title, location, or industry.
* **Dynamic Profiles:** Build a professional profile by adding skills, bio, and uploading a PDF resume.
* **One-Click Applications:** Apply to jobs seamlessly with a single click.
* **Application Tracking:** View all your applied jobs and monitor their status (Pending / Accepted / Rejected) in real-time.

### 🏢 For Recruiters (Employers)
* **Company Management:** Create and manage company profiles, complete with Cloudinary-hosted logos.
* **Job Posting:** Easily publish open roles with details like salary, job type, and required experience.
* **Applicant Tracking System (ATS):** View a detailed table of all students who applied to your jobs. Review their resumes and update their application status instantly.

### 🔒 Core System Features
* **Secure Authentication:** Complete Login/Signup flow secured with JWT (JSON Web Tokens) and bcrypt password hashing.
* **Cloud Storage:** Integrated with Cloudinary for fast, secure storage of user profile pictures, company logos, and PDF resumes.
* **Modern UI/UX:** Built with Tailwind CSS, Framer Motion for animations, and Shadcn/UI for accessible, beautiful components. Includes a fully responsive Dark Mode!

---

## 💻 Technology Stack

| Frontend | Backend | Database & Storage |
| :--- | :--- | :--- |
| React (Vite) | Node.js | MongoDB Atlas |
| Tailwind CSS | Express.js | Mongoose |
| Redux Toolkit | JWT Auth | Cloudinary (Media) |
| Shadcn / UI | BcryptJS | |
| Framer Motion | Multer | |

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `backend/.env` file:

```env
PORT=8000
MONGO_URI=mongodb://username:password@cluster.mongodb.net/jobportal?...
SECRET_KEY=your_super_secret_jwt_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Srijansingh011/job-portal.git
cd job-portal
```

### 2. Setup the Backend
Open a terminal and navigate to the backend folder:
```bash
cd backend
npm install
npm run dev
```
*(The backend server will start on `http://localhost:8000`)*

### 3. Setup the Frontend
Open a **new** terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
npm run dev
```
*(The frontend application will start on `http://localhost:5173`)*

<br />

<div align="center">
  <i>Built with ❤️ using the MERN Stack</i>
</div>
