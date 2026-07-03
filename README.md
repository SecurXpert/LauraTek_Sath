# LauraTek User Portal - End-to-End Project Flow

Welcome to the **LauraTek User Portal** repository! This document provides a comprehensive overview of the project's architecture, key features, and end-to-end user flow.

## 🚀 Project Overview

The LauraTek User Portal is a modern, high-performance Learning Management System (LMS) built for students, professionals, and guest users. It offers a rich, interactive educational experience featuring online courses, live classes, an integrated code compiler, assessments, and comprehensive profile management.

The application is split into three main experiences:
1. **Public / Marketing Pages**: Accessible to everyone (Home, Courses, About, Contact).
2. **Student Portal (Authenticated)**: A feature-rich dashboard for enrolled students.
3. **Guest Portal**: A specialized, sandboxed environment for trial users to explore courses and tools.

## 🛠️ Technology Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Framer Motion (for animations)
- **UI Components**: Shadcn UI (built on Radix UI)
- **Routing**: React Router DOM (v6)
- **State Management & Data Fetching**: TanStack React Query (`@tanstack/react-query`)
- **Backend / BaaS**: Firebase & Custom Backend APIs (Axios)
- **Key Integrations**: 
  - `react-ace` (In-browser Code Editor)
  - `chart.js` / `recharts` (Analytics & Dashboards)
  - `react-hook-form` + `zod` (Form handling & validation)

---

## 🔄 End-to-End Project Flow

The application follows a structured routing architecture managed in `src/App.tsx`. Here is the end-to-end flow for different user types:

### 1. Public & Marketing Flow
When a user visits the platform, they are greeted by the public-facing pages.
* **Landing Page (`/`)**: Hero section, featured courses, testimonials, and platform overview.
* **Discovery**: Users can explore available programs via `/courses`, `/bootcamp`, and read about the company via `/about`.
* **Support**: Users can reach out via `/contact-us` or view the `/support`, `/terms`, and `/privacy` pages.
* **Authentication (`/login`)**: Users authenticate to enter the Student Portal.

### 2. Authenticated Student Flow (`/dashboard/*`)
Once logged in, students gain access to their personalized dashboard, which serves as the central hub for their learning journey.
* **Dashboard Home (`/dashboard`)**: Overview of progress, upcoming classes, and recent activity.
* **Learning & Courses**:
  - `/dashboard/courses` or `/mycourses`: View enrolled courses.
  - `/course/:id`: Detailed view of a specific course syllabus and curriculum.
  - `/dashboard/materials/:id`: Access course materials, PDFs, and resources.
  - `/dashboard/liveclasses`: Join scheduled live sessions.
* **Practice & Assessment**:
  - `/dashboard/compiler`: An integrated IDE (Ace Editor) to write and run code directly in the browser.
  - `/dashboard/assessments` & `/dashboard/exams`: Take scheduled tests and submit assignments.
  - `/quiz/:id`: Interactive quiz-taking interface.
  - `/dashboard/results`: View exam and quiz results.
* **Career & Profile**:
  - `/dashboard/resume`: Resume builder tool.
  - `/jobs`: Job board and placement opportunities.
  - `/dashboard/certificates`: View and download earned certificates.
  - `/dashboard/profile` & `/settings`: Manage user details, passwords, and preferences.
* **Tracking**:
  - `/dashboard/attendance`: Track attendance for live classes.
  - `/dashboard/calendar`: View upcoming schedules and deadlines.

### 3. Guest Portal Flow (`/guest/*`)
To allow prospective students to experience the platform without full commitment, a dedicated Guest Portal is available.
* **Guest Layout (`/guest`)**: A specialized layout and sidebar for trial users.
* **Guest Dashboard**: A restricted version of the main dashboard.
* **Exploration**: 
  - `/guest/courses`: Browse available courses.
  - `/guest/course/:id`: View course details as a guest.
* **Trial Features**:
  - `/guest/compiler`: Sandbox coding environment.
  - `/guest/quizzes` & `/guest/quiz-results`: Take sample quizzes and view detailed results.
  - `/guest/attendance`, `/guest/enrollments`, `/guest/certificates`: Read-only or trial views of student features.

---

## 📂 Project Structure

```
Laura_Userside/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── assets/             # Internal assets
│   ├── components/         # Reusable UI components (Shadcn UI, Cards, Forms)
│   │   ├── ui/             # Granular UI elements
│   │   └── ...             # Feature-specific components (calendar, compiler, etc.)
│   ├── Guest/              # Dedicated module for the Guest Portal
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions (e.g., tailwind merge)
│   ├── pages/              # Top-level route components (Home, Login, CourseDetail)
│   ├── services/
│   │   └── api/            # API configurations (Axios instances, standardized endpoints)
│   ├── App.tsx             # Main routing configuration
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and Tailwind directives
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── vite.config.ts          # Vite build configuration
```

## 🔌 API & State Management
* **Centralized API**: All backend communication routes through a centralized configuration located at `src/services/api/api.ts`. It exports a standardized `VITE_API_URL` to ensure consistent backend connectivity across all environments.
* **Data Fetching**: The app heavily utilizes **React Query** to fetch, cache, and synchronize server state efficiently, minimizing redundant network requests and improving UI responsiveness.

## 🚀 How to Run the Project Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Ensure you have the required `.env` file containing variables like `VITE_API_URL` and Firebase configuration keys (if applicable).

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The app will typically be available at `http://localhost:5173`.

4. **Build for Production**:
   ```bash
   npm run build
   ```
