# 🏥 Medical Record Dashboard

A full-stack Medical Record Dashboard built with **ASP.NET Core** (backend) and **Next.js** (frontend), supporting **session-based authentication**, PostgreSQL database integration, and a clean UI for managing user profiles.

---

## 🚀 Features

- ✅ User Registration with Session-Based Authentication  
- 🔒 Session Handling with `.AspNetCore.Session` Cookie  
- 📦 PostgreSQL Integration using Entity Framework Core  
- 🌐 Fully CORS-Compatible for Local Development  
- 🧪 Clean folder structure, RESTful APIs  
- 📈 Ready to expand with more medical dashboard features

---

## 🛠️ Tech Stack

| Frontend            | Backend             | Database     |
|---------------------|---------------------|--------------|
| Next.js | ASP.NET Core Web API | PostgreSQL   |
| TypeScript, Tailwind CSS | Entity Framework Core | pgAdmin (optional) |

---

## 📁 Folder Structure

Medical-Record-Dashboard/
├── HFilesBackend/ # ASP.NET Core Backend
│ ├── Controllers/ # API Controllers
│ ├── Models/ # EF Core Models
│ ├── Data/ # DbContext
│ ├── Migrations/ # EF Core Migrations
│ └── Program.cs # Main entry point
├── hfiles-frontend/ # Next.js Frontend
│ └── app/signup/page.tsx # Registration Page
├── README.md

### Clone the Repo

```bash
git clone https://github.com/pratiksury10/Medical-Record-Dashboard.git
cd Medical-Record-Dashboard

### Backend Setup

cd HFilesBackend
dotnet restore
dotnet ef database update
dotnet run

Runs on: http://localhost:5112/

Sessions are enabled via builder.Services.AddSession() in Program.cs

### Frontend Setup

cd hfiles-frontend
npm install
npm run dev

Runs on: http://localhost:3000/

Make sure your frontend uses { withCredentials: true } for session API calls

🔐 Session-Based Auth Flow
User submits registration data

Server registers user and stores their session via HttpContext.Session.SetString()

.AspNetCore.Session cookie is set in browser

📬 API Endpoints

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/api/register`         | Register + Create Session |
| GET    | `/api/register/session` | Get active session data   |
| GET    | `/api/userprofile`      | List all users            |

