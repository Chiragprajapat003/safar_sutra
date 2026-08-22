# 🪔 Safar-sutra (सफ़र-सूत्र) – Intelligent Sacred Yatra & Global Travel Planner

> **Safar-sutra** is an AI-powered, multi-city travel planning platform tailored for spiritual yatras, heritage journeys, and global adventures. It seamlessly combines real-time generative AI intelligence (Google Gemini & OpenAI), interactive day-by-day itinerary builders, visual budget tracking, and community trip sharing into a warm, harmonious aesthetic.

---

## 🌟 Short Title & Tagline Options

### Option 1 (Spiritual & Heritage Focus)
* **Title:** `Safar-sutra — AI-Powered Sacred Yatra & Heritage Travel Planner`
* **Tagline:** *Craft personalized pilgrimage corridors, temple darshan timelines, and cultural adventures powered by Google Gemini AI.*

### Option 2 (Modern All-in-One Travel)
* **Title:** `Safar-sutra — Next-Gen Multi-City Itinerary & Budget Manager`
* **Tagline:** *Discover destinations, build day-wise schedules, track expenses with interactive charts, and collaborate seamlessly.*

### Option 3 (Hackathon / Developer Showcase)
* **Title:** `Safar-sutra: Full-Stack AI Travel Ecosystem with Gemini API & Odoo Integration`
* **Tagline:** *A production-ready React + Vite, Express REST API, PostgreSQL, and Gemini generative AI travel companion.*

---

## 🧭 Project Overview & Vision

Modern travel planning—especially for multi-city spiritual circuits and heritage corridors (like Ayodhya, Varanasi, Rajasthan, and Assam)—is often fragmented across scattered notes, flight emails, and spreadsheets.

**Safar-sutra** solves this by unifying every phase of travel into one intuitive web platform:
1. **Explore & Discover**: Search cities, temple corridors, and curated activities filtered by region, cost index, and categories.
2. **Generative AI Itinerary Builder**: Real-time itinerary generation using **Google Gemini 1.5** with Aarti timings, Satvik dining, and logistics.
3. **Interactive Itinerary Builder**: Dynamic day-by-day stops constructor with drag-and-drop scheduling and activity management.
4. **Smart Financial Clarity**: Visual SVG Donut charts, category limits, average daily cost calculations, and overbudget warnings.
5. **Timeline & Calendar Flow**: Monthly calendar grid and vertical journey timelines for effortless scheduling.
6. **Community Collaboration**: One-click public shareable links with a *"Copy This Trip"* feature.

---

## 🎨 Design Philosophy & Aesthetic

* **Background:** Soft Warm Cream (`#FAF7F2` / `#FDFBF7`)
* **Primary Branding & Buttons:** Rich Earthy Walnut Brown (`#4A2E18` / `#3A2312`)
* **Accents & Highlights:** Warm Golden Amber (`#D4A373` / `#C88A4B` / `#E8C59A`)
* **Cards & Containers:** Crisp Pure White with subtle warm borders (`#EADBCE`)
* **Typography:** Playfair Display, Noto Sans Devanagari, and Inter.
* **Full-Screen Carousel:** High-definition rotating destination visuals from Ayodhya, Jaipur, Assam, and Andaman.

---

## 🛠️ Complete Feature Matrix (13 Core Screens)

| # | Feature / Screen | Key Functionality |
|---|---|---|
| 1 | **Auth & Carousel** | Full-screen rotating destination photography, Google OAuth 1-click login, and email/password authentication. |
| 2 | **Dashboard / Home Hub** | Central traveler hub with quick stats, upcoming yatras, budget progress, and AI recommendations. |
| 3 | **Create Trip Modal** | Start & end date picker, budget allocation, and cover photo selector. |
| 4 | **My Trips** | Filterable grid and list views of active, upcoming, planning, and completed itineraries. |
| 5 | **Itinerary Builder** | Day-by-day stop creator, city adder, and activity scheduler with real-time cost updates. |
| 6 | **Itinerary View** | Structured timeline and grouped summary views with duration, expense, and stop badges. |
| 7 | **City Search** | Dynamic destination search with region filters, popularity ratings, and "Add to Trip" buttons. |
| 8 | **Activity Search** | Curated experiences filtered by Spiritual, Heritage, Nature, Culture, and Dining categories. |
| 9 | **Trip Budget & Cost** | Interactive SVG Donut charts, category expense tracking, daily spend averages, and overbudget alerts. |
| 10 | **Calendar & Timeline** | Interactive monthly date matrix and vertical timeline flow with expandable day inspect panels. |
| 11 | **Public Share View** | Shareable public itinerary link with social sharing and a "Copy This Trip" cloning CTA. |
| 12 | **User Profile & Settings** | Editable user details, multi-language preferences (Hindi, English, Sanskrit), saved wishlists, and privacy controls. |
| 13 | **Admin & Analytics** | Platform adoption dashboard with trending destination rankings and traveler activity metrics. |

---

## 🤖 AI Travel Assistant ("Safar AI")

* **Live Interactive Chatbot**: Real-time queries for temple darshan rules, Aarti schedules, best travel seasons, and hidden scenic spots.
* **Generative Trip Builder**: Generates day-wise custom itineraries directly into the user's dashboard with budget estimations.
* **Dual Engine Support**: Powered by Google Gemini 1.5 Flash API with OpenAI GPT-4o fallback and custom key configuration.

---

## 💻 Tech Stack & Architecture

### Frontend
* **Framework:** React 18 + Vite (Tailwind CSS v4)
* **Routing:** React Router v6 (SPA with full history mode)
* **Icons:** Google Material Symbols Outlined
* **State Management:** React Context (`AuthContext`, `TripContext`)

### Backend
* **Runtime:** Node.js + Express.js
* **Database:** PostgreSQL (with migration scripts & seed data)
* **Authentication:** JWT & bcrypt
* **Integrations:** Google Gemini AI API + Odoo Sync Client

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/utkarshkumarsinghcg-cmyk/odoo-pulse.git
cd odoo-pulse

# Install Frontend dependencies
cd frontend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `frontend/` directory (or use `.env.example`):
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 🌐 One-Click Production Deployment

* **Vercel:** Fully configured via [`vercel.json`](file:///c:/Users/utkarsh%20kumar%20singh/OneDrive/Desktop/OddoXlde/vercel.json) for client-side routing.
* **Netlify:** Configured with [`frontend/public/_redirects`](file:///c:/Users/utkarsh%20kumar%20singh/OneDrive/Desktop/OddoXlde/frontend/public/_redirects).
