# Career & Leadership Club (CLC) Platform

A comprehensive, premium web application for managing university club activities, member engagements, and administrative tasks. Built with a modern tech stack to provide a seamless experience for both students and administrators.

## 🚀 Key Features

### 🏢 Admin Dashboard (Full CRUD)
*   **Content Management**: Create, edit, and delete Events, Contests, Job Circulars, and Notices.
*   **Dynamic Image Management**: Support for event banners and automatic previews.
*   **Advanced Rich Text Editor**: Integrated with `react-quill-new` for professional content formatting.

### 🎨 Design Lab (Built-in Design Tool)
*   **Poster Generator**: Create Facebook-sized posters for Contests, Winners, Hiring, and Teasers.
*   **QR Code Integration**: Automatically generate and embed QR codes for registration links.
*   **Letterhead Generator**: Write and download official club letters with professional headers and footers.
*   **One-Click Export**: High-quality PNG download support for all designs.

### 👥 Member & Registration Management
*   **Member Directory**: Searchable list of all club members with status indicators (Club Member vs. Pending).
*   **Activity Specific Lists**: View participants for specific events or contests separately.
*   **Simplified Join Flow**: Easy application process with flexible email requirements.

### 🏠 Dynamic Homepage
*   **Real-time News Ticker**: A scrolling timeline bar at the top showing the latest notices and events.
*   **Partner Showcase**: An automated, infinite-scrolling slider featuring collaboration partners.
*   **Modern UI/UX**: Premium aesthetics with dark mode support, glassmorphism, and Framer Motion animations.

### 🔐 Secure Authentication
*   **Role-Based Access Control**: Different permissions for Super Admins, Advisers, Wing Heads, and General Members.
*   **NextAuth Integration**: Secure login system with MongoDB session storage.

## 🛠️ Tech Stack

*   **Frontend**: Next.js 15+ (App Router), React 19, TypeScript
*   **Styling**: Vanilla CSS, Tailwind CSS (for layout), Framer Motion (animations)
*   **Backend**: Next.js API Routes (Serverless)
*   **Database**: MongoDB with Mongoose ODM
*   **Authentication**: NextAuth.js
*   **UI Components**: Lucide React, SweetAlert2, React Hot Toast
*   **Design Tools**: html-to-image (for design exports)

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/EasinArafatDeveloper/university-club-website.git
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root and add:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

5.  **Seeding Data (Optional)**:
    ```bash
    node scripts/seed.mjs
    ```

## 📄 License
This project is developed for the Career & Leadership Club. All rights reserved.

---
Developed with ❤️ by **Easin Arafat**
