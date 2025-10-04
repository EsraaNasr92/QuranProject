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
frontend/
│
├── src/
│ ├── components/
│ │ └── VersesByChapter.jsx # Fetch verses by chapter
│ ├── pages/
│ │ └── Home.jsx # Display chapters + favorite toggle
│ ├── App.jsx # App entry point
│ └── main.jsx # React DOM render
│
└── package.json


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
git clone https://github.com/YOUR_USERNAME/quran-verse-explorer.git
cd quran-verse-explorer/frontend

# Install dependencies
npm install

# Run app
npm start



