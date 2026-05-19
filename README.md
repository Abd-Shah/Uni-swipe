# 🎓 UniSwipe

UniSwipe is a Tinder-style university discovery platform that helps students explore, save, filter, and compare universities using an intelligent recommendation engine.

## Features

- **Swipe-Based Discovery**
  - Browse universities through a Tinder-style card interface
  - Swipe right to save, left to skip
  - Stacked card animations using Framer Motion

- **Saved Universities**
  - Store universities you’re interested in
  - Persistent saved state using localStorage
  - Select multiple universities for comparison

- **Filtering Features**
  - Search by university name, country, city, program, or tag
  - Filter by country
  - Toggle co-op universities only

- **Intelligent Recommendation Engine**
  - Compare selected universities using weighted scoring logic
  - Generates recommendations for:
    - 🏆 Best Overall
    - 💰 Best for Budget
    - 🚀 Best for Career/Co-op
    - 🌍 Best Global Ranking

- **Expanded Dataset**
  - 30 universities
  - 150+ programs across computing, engineering, analytics, AI, cybersecurity, and related fields

- **FastAPI Backend**
  - Separate backend with 14 REST API endpoints
  - Indexed university lookup for efficient retrieval
  - Program index for faster program-based filtering
  - API specification and UML documentation included

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Frontend Storage:** localStorage
- **Backend:** FastAPI, Python
- **Recommendation Logic:** Rule-based scoring engine

## Frontend Setup

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Open API docs:

```text
http://127.0.0.1:8000/docs
```

## Documentation

- `docs/API_SPEC.md`
- `docs/UML.md`

## Status

MVP complete with frontend, saved-state flow, filters, comparison engine, FastAPI backend, API docs, and UML documentation.

## Author

Abdullah Shah
