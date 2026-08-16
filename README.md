# 💼 Maatrshri Technologies (MSTP) — Client Web Platform & CMS

A full-stack corporate web application and custom Content Management System (CMS) designed and engineered for **Maatrshri Technologies**. 

This project was built from the ground up to provide the client with a high-performance, modern corporate presence alongside an intuitive, secure administrative dashboard to manage real-time site content, job applications, consultation bookings, and client inquiries.

---

## 📌 Project Overview & Scope of Work

As the lead full-stack developer for this client project, I was responsible for end-to-end architecture, UI/UX implementation, API design, database modeling, and deployment preparation.

### 🎯 Key Deliverables for the Client
1. **Interactive Client Facing Web Portal**:
   - High-performance, mobile-first design with smooth micro-animations and accessibility standards.
   - Dynamic service showcases, case studies, and interactive hero sliders.
   - Self-service career portal allowing candidates to browse openings and apply with validation and duplicate prevention.
   - Consultation booking engine and contact workflows.
2. **Automated Notification System**:
   - Integrated SMTP email dispatch (`Nodemailer`) for real-time lead alerts and applicant tracking directly to the client's administrative team.
3. **Custom Content Management System (CMS & Admin Panel)**:
   - Secure, token-based (`JWT`) administrative dashboard.
   - Comprehensive CRUD capabilities for services, portfolio items, team members, and testimonials.
   - Live management of candidate applications and consultation inquiries.
   - Site-wide branding and dynamic content controls.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS3 Design System (CSS Variables, Flexbox/Grid, fluid typography, dark/light theme awareness)

### Backend & Database
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Security & Auth**: JSON Web Tokens (JWT), `bcryptjs` password hashing, CORS security
- **Email Service**: [Nodemailer](https://nodemailer.com/) (Automated transactional notifications)

---

## 📁 Repository Structure

```text
MSTP-Website/
├── client/                      # React Frontend application
│   ├── public/                  # Static assets & branding
│   ├── src/
│   │   ├── assets/              # Client media, logos & illustrations
│   │   ├── components/          # Reusable UI components (Navbar, Footer, Modals, etc.)
│   │   ├── data/                # Static fallbacks & constants
│   │   ├── pages/               # Application views
│   │   │   ├── admin/           # Admin Dashboard & CMS sub-modules
│   │   │   ├── Home.jsx         # Landing page with interactive slider
│   │   │   ├── About.jsx        # Company profile & mission
│   │   │   ├── Careers.jsx      # Dynamic job listings
│   │   │   ├── ApplyForm.jsx    # Candidate application workflow
│   │   │   ├── BookConsultation # Consultation booking page
│   │   │   ├── Portfolio.jsx    # Project showcase
│   │   │   ├── CaseStudy.jsx    # Client case study viewer
│   │   │   ├── Contact.jsx      # Inquiry & contact form
│   │   │   └── PrivacyPage.jsx  # Legal & privacy policies
│   │   ├── App.jsx              # Routes and layout wrappers
│   │   ├── main.jsx             # React entry point
│   │   └── apiConfig.js         # Backend API environment resolver
│   ├── package.json
│   └── vite.config.js
├── server/                      # Express Backend & REST API
│   ├── middleware/              # Authentication & payload validation
│   ├── models/                  # Mongoose data schemas (Admin, Career, Application, etc.)
│   ├── routes/                  # RESTful API endpoints
│   ├── seedData.js              # Initial database seeder
│   ├── index.js                 # Express server & MongoDB connection
│   └── package.json
├── package.json                 # Root script runner for concurrent dev
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) instance (Local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/aaditya-01-28/MSTP-Website.git
cd MSTP-Website
```

### 2. Environment Configuration
Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_smtp_sender_email@gmail.com
EMAIL_PASS=your_smtp_app_password
```

### 3. Installation
Install root, client, and server dependencies:
```bash
# Install root orchestration tools
npm install

# Install client packages
cd client && npm install

# Install server packages
cd ../server && npm install
cd ..
```

### 4. Run Locally
Run both client and server concurrently:
```bash
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## ⚡ Available NPM Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Vite frontend and Express backend concurrently for development. |
| `npm run build` | Compiles production assets for client and installs server dependencies. |
| `npm run start` | Boots the production backend server. |

---

## 🔌 API Endpoints Summary

### Public Client Endpoints
- `GET /api/content/services` — Fetch list of company services
- `GET /api/content/careers` — Fetch open job positions
- `POST /api/content/applications` — Submit candidate applications with resumes
- `POST /api/content/consultations` — Submit consultation requests
- `POST /api/content/contacts` — Submit contact messages
- `GET /api/content/portfolio` — Fetch case studies and portfolio items
- `GET /api/content/testimonials` — Fetch client reviews

### Admin & CMS Endpoints (Protected)
- `POST /api/admin/login` — Administrator authentication
- `PUT /api/content/settings` — Update site branding, logos & metadata
- `POST /api/content/services` — Add / edit service items
- `GET /api/admin/applications` — View candidate submissions & resume links

---

## 👨‍💻 Developer & Credits

- **Developer**: Aaditya ([@aaditya-01-28](https://github.com/aaditya-01-28))
- **Client**: Maatrshri Technologies & Services
- **Status**: Completed & Delivered
