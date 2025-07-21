# 🏆 Leaderboard Dashboard

A full-stack, responsive web application for managing and viewing a leaderboard with user point claims, ranking highlights, pagination, and dark mode support.

## 🔗 Live Demo

- **Frontend (Netlify)**: [View Live](https://reward-leaderboard.netlify.app/)
- **Backend (Render)**: [API Endpoint](https://leaderboard-yous.onrender.com)

---

## 📁 Project Structure

### Frontend (`/client`)
client/
├── public/
├── src/
│ ├── components/ # Reusable UI components
│ ├── assets/ # Static assets like images
│ ├── constant.js # Shared constants like BASE_URL
│ └── App.jsx
├── index.html
└── main.jsx

### Backend (`/server`)
server/
├── controllers/ # Logic for routes
├── models/ # Mongoose models (if using MongoDB)
├── routes/ # Express route handlers
├── middleware/ # Auth, error handling etc.
├── uploads/ # Uploaded user images
├── server.js # Entry point
└── .env

## ✨ Features

- 🎖️ Displays top 3 users with animated trophy icons
- 🧑 Select user with live search dropdown
- 🪙 Claim reward points with animations
- ⬛ Light/Dark mode toggle
- 📊 Paginated leaderboard with dynamic navigation
- 🖼️ Image upload and fallback handling
- 💻 Fully responsive for all device sizes

## 🔧 Tech Stack

| Frontend  | Backend   | Other Tools     |
|-----------|-----------|-----------------|
| React     | Node.js   | Render (API)    |
| Tailwind  | Express   | Netlify (UI)    |
| Axios     | MongoDb   |                 | 

<img width="1900" height="902" alt="image" src="https://github.com/user-attachments/assets/71e640b6-36b5-4944-b1d1-93f4977d665a" />

<img width="1895" height="904" alt="image" src="https://github.com/user-attachments/assets/57139c17-a88e-4a61-83cb-6b7b8a10f845" />

