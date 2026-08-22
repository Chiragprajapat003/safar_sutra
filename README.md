# 🌍 GlobeTrotter – Empowering Personalized Travel Planning

> **GlobeTrotter** is a personalized, intelligent, and collaborative travel planning platform designed to transform how individuals dream, design, and organize multi-city trips.

---

## 🧭 Overall Vision
The overarching vision for GlobeTrotter is to become an end-to-end travel planning tool that combines flexibility, interactivity, and community features. The platform aims to empower users to dream, design, and organize trips with ease:
*   **Explore** global destinations with interactive elements.
*   **Visualize** journeys through structured itineraries.
*   **Decide** cost-effectively with dynamic budget estimation tools.
*   **Share** plans and inspire others within a collaborative travel community.

---

## 🎯 Mission
Build a user-centric, responsive application that simplifies the complexity of planning multi-city travel. The solution focus is on:
1.  **Stop Management:** Intuitive tools to add/manage travel stops and durations.
2.  **Exploration:** Easily discover cities and activities of interest.
3.  **Financial Clarity:** Estimate trip budgets automatically.
4.  **Timeline & Plan Visualization:** Beautiful timelines and calendars.
5.  **Community Sharing:** Enable public or peer-to-peer itinerary sharing.

---

## ⚠️ Problem Statement
Modern multi-city travel planning is highly fragmented, forcing users to juggle spreadsheets, calendar apps, note-taking tools, and map routes. 

**GlobeTrotter** solves this by offering a unified, dynamic travel planner that:
*   Supports customized multi-city itineraries.
*   Maps dates, activities, and specific budgets per stop.
*   Uses a robust **relational database** to store complex travel data (user itineraries, stops, activities, estimated expenses).
*   Maintains user responsiveness via a dynamic user interface adapting to the user's trip flow.

---

## 🎨 Mockup & Design
Wireframes and user experience flows are mapped out in the Excalidraw mockup:
🔗 **[Excalidraw Mockup Link](https://link.excalidraw.com/l/65VNwvy7c4X/6CzbTgEeSr1)**

---

## 🛠️ Feature Breakdown

### 1. 🔐 Login / Signup Screen
*   **Purpose:** Authenticate users to securely manage personal travel plans.
*   **Key Functionality:** Email & password authentication, sign up validation, "Forgot Password" workflow.

### 2. 📊 Dashboard / Home Screen
*   **Purpose:** The central user hub for navigation, quick actions, and trip discovery.
*   **Key Functionality:** Welcome message, upcoming trip cards, “Plan New Trip” CTA, recommended destinations, and budget highlight summaries.

### 3. ➕ Create Trip Screen
*   **Purpose:** Form to initiate a new travel itinerary.
*   **Key Functionality:** Trip name, start & end dates, description field, and optional cover photo upload.

### 4. 🗂️ My Trips (Trip List) Screen
*   **Purpose:** Easily view and manage all active, upcoming, and past trips.
*   **Key Functionality:** Grid/list of trip cards showing date range, destination count, with actions to View, Edit, or Delete.

### 5. 🏗️ Itinerary Builder Screen
*   **Purpose:** Day-by-day city and stop constructor.
*   **Key Functionality:** "Add Stop" button, city and travel date selection, drag-and-drop ordering, and direct activity assignment.

### 6. 📅 Itinerary View Screen
*   **Purpose:** Read-only and structured summary of the completed plan.
*   **Key Functionality:** Day-wise chronological layout, city-grouped headers, activity blocks with times and costs, and a view mode toggle (Calendar vs. List view).

### 7. 🔍 City Search
*   **Purpose:** Discover and include cities in itineraries based on metadata.
*   **Key Functionality:** Country/region filtering, search bar, list of cities displaying cost index and popularity, and an "Add to Trip" action.

### 8. 🎭 Activity Search
*   **Purpose:** Browse and add curated experiences to stops.
*   **Key Functionality:** Interest-based categorization (sightseeing, food tours, adventure), cost/duration filtering, and detail drawers with images.

### 9. 💰 Trip Budget & Cost Breakdown Screen
*   **Purpose:** Visual financial tracker to prevent overspending.
*   **Key Functionality:** Cost breakdowns categorized by transport, accommodation, activities, and meals. Features interactive pie/bar charts, daily average spend, and alerts for overbudget days.

### 10. 🗓️ Trip Calendar / Timeline Screen
*   **Purpose:** Highly visual timeline representation of trip flow.
*   **Key Functionality:** Calendar UI, expandable daily views, drag-to-reorder activities, and inline editing.

### 11. 🔗 Shared / Public Itinerary View Screen
*   **Purpose:** Read-only web page to share itineraries with the community.
*   **Key Functionality:** Public unique URL, social sharing buttons, itinerary highlights, and a "Copy Trip" button allowing other users to duplicate the itinerary to their dashboard.

### 12. 👤 User Profile / Settings Screen
*   **Purpose:** User account management and preferences.
*   **Key Functionality:** Edit name/email/avatar, language selection, saved destinations list, and account deletion options.

### 13. 📈 Admin / Analytics Dashboard *(Optional)*
*   **Purpose:** Monitor platform adoption and travel trends.
*   **Key Functionality:** Interactive charts showing popular destinations, total trips created, user engagement stats, and simple user management tools.

---

## 🗄️ Relational Database Schema Concept

Below is a proposed relational structure to handle the application's complex travel data:

```mermaid
erDiagram
    USER ||--o{ TRIP : creates
    TRIP ||--|{ STOP : contains
    STOP ||--o{ ACTIVITY_SELECTION : schedules
    STOP ||--o{ EXPENSE : incurs
    ACTIVITY_SELECTION }|--|| ACTIVITY : references
    TRIP ||--o{ SHARE_LINK : generates
    
    USER {
        int id PK
        string name
        string email
        string password_hash
        string avatar_url
    }
    
    TRIP {
        int id PK
        int user_id FK
        string name
        date start_date
        date end_date
        text description
        string cover_image
    }
    
    STOP {
        int id PK
        int trip_id FK
        string city_name
        int sequence_order
        date arrival_date
        date departure_date
    }
    
    ACTIVITY {
        int id PK
        string name
        string category
        float estimated_cost
        string city_name
    }
    
    ACTIVITY_SELECTION {
        int id PK
        int stop_id FK
        int activity_id FK
        time scheduled_time
        float custom_cost
    }
    
    EXPENSE {
        int id PK
        int stop_id FK
        string category "transport | stay | meals | other"
        float amount
        string description
    }
    
    SHARE_LINK {
        int id PK
        int trip_id FK
        string token UNIQUE
        boolean is_active
    }
```

---

## ⚙️ Development & Setup
*(This section will be populated once the technical framework is initialized).*

### Prerequisites
*   Python 3.10+ / Node.js (depending on technology stack selection)
*   PostgreSQL / SQLite
*   Git

### Quick Start
1.  Clone the repository:
    ```bash
    git clone https://github.com/Chiragprajapat003/odoo-pulse.git
    cd odoo-pulse
    ```
2.  Install dependencies and start the local environment.
