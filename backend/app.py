from flask_cors import CORS
from flask import Flask
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
from routes.routes import init_routes

# Database URL
DATABASE_URL = "postgresql+psycopg2://cafe_admin:Cafe%212024@localhost/db_fausse"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

app = Flask(__name__)
CORS(app)

# Initialize routes
init_routes(app, Session)

if __name__ == "__main__":
    app.run(port=8080, debug=True)
