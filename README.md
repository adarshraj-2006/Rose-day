# Rose Day 🌹

A beautiful and modern web application to send love and roses to your special ones. Express your feelings with a touch of digital elegance.

## ✨ Features

- **Personalized Messages**: Send heartfelt messages along with virtual roses.
- **Modern Interface**: A stunning, responsive design with smooth animations.
- **Real-time Interaction**: seamless communication between frontend and backend.
- **Glassmorphism Design**: Premium look and feel using modern CSS techniques.

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (v18) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/) (built on [Radix UI](https://www.radix-ui.com/))
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **CORS**: Handles cross-origin requests for secure frontend-backend communication.
- **Environment Management**: [Dotenv](https://github.com/motdotla/dotenv)

## 📦 Key Packages

### Frontend Dependencies
- `lucide-react`: For beautiful, consistent iconography.
- `framer-motion`: For high-performance UI animations.
- `embla-carousel-react`: For smooth carousel experiences.
- `recharts`: For data visualization (if applicable).
- `sonner`: For elegant toast notifications.

### Backend Dependencies
- `express`: Fast, unopinionated web framework.
- `mongoose`: Elegant mongodb object modeling.
- `cors`: Middleware to enable Cross-Origin Resource Sharing.
- `nodemon`: (Development) Automatically restarts the server on changes.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account (or local installation)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adarshraj-2006/whispering-willow.git
   cd Rose_Day
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**:
   ```bash
   cd ../backend
   npm install
   npm run dev
   ```

### Environment Variables

#### Backend (`/backend/.env`)
Create a `.env` file in the backend directory and add your credentials:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## 📄 License
This project is licensed under the ISC License.

---
Created with ❤️ by [Adarsh Raj](https://github.com/adarshraj-2006)
