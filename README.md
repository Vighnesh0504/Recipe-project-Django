# Food Recipe Project

A full-stack web application with a Django backend and Next.js frontend.

## Project Structure
- `backend/`: Django project code (Django REST Framework).
- `frontend/`: Next.js 14 application (React, Tailwind CSS).

## Setup Instructions

### Backend
1. Navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment.
3. Install dependencies (request `requirements.txt` or install manually).
   ```bash
   pip install django djangorestframework django-cors-headers Pillow
   ```
4. Run migrations and start server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend
1. Navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## Features
- Search recipes.
- View detailed recipe information.
- Add, Edit, and Delete recipes (CRUD).
- Dark Mode UI.
