# Food Recipe Project

A modern, full-stack web application for managing food recipes. Built with a robust Django backend and a dynamic Next.js frontend, this project demonstrates a clean separation of concerns and a responsive, dark-mode-first user interface.

## 🏗️ Architecture

The project follows a **Client-Server Architecture**:

-   **Backend (API Provider)**: Built with Django and Django REST Framework. It serves as the single source of truth, managing the SQLite database, handling business logic, and serving media files. It exposes a RESTful API consumed by the frontend.
-   **Frontend (Consumer)**: Built with Next.js (App Router). It is a Single Page Application (SPA) experience that fetches data from the backend APIs. It handles all UI/UX interactions, including the dark mode theme, search, and modal-based CRUD operations.

```mermaid
graph LR
    User[User via Browser] <-->|HTTP/JSON| Frontend[Next.js Frontend\n(Port 3000)]
    Frontend <-->|REST API| Backend[Django Backend\n(Port 8000)]
    Backend <-->|SQL| DB[(SQLite Database)]
```

## 🛠️ Tech Stack

### Backend
-   **Language**: Python 3.14
-   **Framework**: Django 6.0.1
-   **API Toolkit**: Django REST Framework (DRF) 3.16
-   **Database**: SQLite (Default)
-   **Utilities**: Pillow (Image Processing), django-cors-headers

### Frontend
-   **Framework**: Next.js 14.2 (App Router)
-   **Library**: React 18
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Linting**: ESLint

## 📚 API Documentation

The backend exposes the following REST API endpoints at `http://127.0.0.1:8000/api/recipes/`.

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/recipes/` | Retrieve a list of all recipes. | N/A |
| **GET** | `/api/recipes/?search={query}` | Search recipes by name. | N/A |
| **POST** | `/api/recipes/` | Create a new recipe. | `multipart/form-data`: `recipe_name`, `ingredients`, `recipe`, `image` |
| **GET** | `/api/recipes/<id>/` | Retrieve details of a specific recipe. | N/A |
| **PUT** | `/api/recipes/<id>/` | Update a recipe (Partial updates allowed). | `multipart/form-data` (fields to update) |
| **DELETE** | `/api/recipes/<id>/` | Delete a specific recipe. | N/A |

## 🚀 Setup & Run Instructions

### Prerequisites
-   Python 3.10+
-   Node.js 18+

### 1. Backend Setup
Navigate to the `backend` folder:
```bash
cd backend
```

Install dependencies:
```bash
pip install django djangorestframework django-cors-headers Pillow
```

Run migrations and start the server:
```bash
python manage.py migrate
python manage.py runserver
```
The server will start at `http://127.0.0.1:8000`.

### 2. Frontend Setup
Navigate to the `frontend` folder:
```bash
cd frontend
```

Install Node requirements:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

## 🎨 Features
-   **Dark Mode UI**: Sleek, modern interface designed for visual appeal.
-   **Search Functionality**: Real-time filtering of recipes.
-   **CRUD Operations**:
    -   **Create**: Add new recipes with images.
    -   **Read**: View detailed instructions in a modal.
    -   **Update**: Edit recipe details seamlessly.
    -   **Delete**: Remove recipes with confirmation.
-   **Responsive Design**: Optimized for desktops and tablets.
