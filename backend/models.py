# models.py

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import datetime

# Database URL
DATABASE_URL = "postgresql+psycopg2://cafe_admin:Cafe%212024@localhost/db_fausse"

# Basis ORM-model
Base = declarative_base()

# Customer tabel
class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    phone = Column(String, nullable=True)  

# Reservation tabel
class Reservation(Base):
    __tablename__ = 'reservations'
    id = Column(Integer, primary_key=True)
    customer_id = Column(Integer, ForeignKey('customers.id'), nullable=False)
    date = Column(DateTime, nullable=False)
    persons = Column(Integer, nullable=False)
    comment = Column(String, nullable=True)
    table_number = Column(Integer, nullable=False)

# Engine en sessie
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

if __name__ == "__main__":
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    print("✅ Database en tabellen aangemaakt.")
