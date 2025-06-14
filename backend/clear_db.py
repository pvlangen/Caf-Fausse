# clear_db.py

from models import Session, Customer, Reservation

def clear_database():
    session = Session()
    try:
        # Eerst Reservations verwijderen (foreign key afhankelijk van customers)
        session.query(Reservation).delete()
        session.query(Customer).delete()
        session.commit()
        print("✅ Database entries succesvol verwijderd.")
    except Exception as e:
        session.rollback()
        print(f"❌ Fout bij leegmaken database: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    clear_database()