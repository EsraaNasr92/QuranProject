# Quran Verse Explorer

A React-based web application to explore **Quran chapters and verses** dynamically, using a backend API built with **Node.js + Express**.

This app allows users to:
- Browse all Quran chapters
- View detailed chapter information
- Mark chapters as **favorite** ⭐ (with local storage persistence)
- Explore verses by chapter (coming soon)

---

## Features

- Fetch Quran chapters from backend
- View detailed information for each chapter
- Add / Remove favorites (saved locally)
- Modern UI using Tailwind CSS
- Built with modular React components

---

## 🧠 Tech Stack

| Area | Technology |
|------|-------------|
| Frontend | React |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Backend | Node.js + Express |
| Data Source | Quran API Integration |

---

## Project Structure

QURANPROJECT/
│
├── backend/
│   ├── .env                     # Environment variables (API keys, tokens)
│   ├── main.js                  # Main script to run backend logic
│   ├── quranApi.js              # API handlers for Quran API
│   ├── server.js                # Express server setup and routes
│   ├── package.json             # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.jsx       # Navigation bar component
│   │   │   ├── SearchBar.jsx    # Search input for Quran verses
│   │   │   └── VersesByChapter.jsx # Fetch & display verses by chapter
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Display chapters + favorite toggle
│   │   │   ├── Search.jsx       # Search results page
│   │   │   ├── Login.jsx        # User login page
│   │   │   └── FavoritePage.jsx # Display user's favorite verses
│   │   │
│   │   ├── App.jsx              # Root app component
│   │   ├── index.js             # React entry point
│   │   ├── App.css, index.css   # Styling files
│   │   └── logo.svg             # Logo asset
│   │
│   ├── package.json             # Frontend dependencies
│
└── README.md                    # Project documentation

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

Make sure your backend (Node.js/Express) is running at: http://localhost:5000

Endpoints:
- `GET /chapters` → Returns list of Quran chapters
- `GET /chapters/:id?language=en` → Returns specific chapter details
- `GET /verses/by_chapter/:id` → Returns verses in that chapter

Example test:

```bash
curl http://localhost:5000/chapters


# Clone repository
git clone https://github.com/YOUR_USERNAME/QuranProject.git
cd QuranProject/frontend

# Install dependencies
npm install

# Run app
npm start



