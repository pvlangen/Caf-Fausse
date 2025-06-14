# Café Fausse Project

This project consists of a React frontend and a Flask backend, providing a complete web application for Café Fausse.

## Prerequisites

- Python 3.x
- Node.js and npm
- PostgreSQL (or your preferred database)

## Backend Setup

1. **Create a Virtual Environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   ```

2. **Install Backend Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Database Configuration:**

   - Ensure PostgreSQL is installed and running.
   - Create a database for the project:

     ```sql
     CREATE DATABASE cafe_fausse;
     ```

   - Update the database URL in your configuration file (e.g., `config.py` or environment variables):

     ```
     DATABASE_URL=postgresql+psycopg2://username:password@localhost/cafe_fausse
     ```

4. **Run Database Migrations:**

   If using Alembic for migrations:

   ```bash
   alembic upgrade head
   ```

5. **Run the Backend Application:**

   ```bash
   python app.py
   ```

   The server will start on `http://127.0.0.1:5000/`.

## Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```bash
   cd frontend
   ```

2. **Install Frontend Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Frontend Application:**

   ```bash
   npm start
   ```

   The React app will start on `http://localhost:3000/`.

## Deployment

- Ensure all environment variables are set correctly for production.
- Use a process manager like `pm2` for Node.js and `gunicorn` for Flask in production.
- Configure a reverse proxy (e.g., Nginx) to manage requests to the frontend and backend.

## API Endpoints

- `GET /`: Returns a JSON response with a "Hello from Flask!" message

## Additional Notes

- Ensure CORS is configured correctly for cross-origin requests between the frontend and backend.
- Regularly update dependencies to patch security vulnerabilities. 