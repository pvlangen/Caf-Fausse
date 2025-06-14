from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from models import Customer, Reservation
from datetime import datetime
import random
import json

reservation_bp = Blueprint('reservation', __name__) 
Session = None  # Will be set by init_reservation_routes

def init_reservation_routes(session_factory):
    global Session
    Session = session_factory

MAX_BOOKINGS_PER_SLOT = 30

@reservation_bp.route("/", methods=["GET", "OPTIONS"])
def get_reservations():
    if request.method == "OPTIONS":
        return "", 200
    session = Session()
    try:
        reservations = session.query(Reservation).all()
        result = []
        for r in reservations:
            customer = session.query(Customer).filter_by(id=r.customer_id).first()
            result.append({
                "id": r.id,
                "name": customer.name if customer else "Unknown",
                "email": customer.email if customer else "Unknown",
                "date": r.date.isoformat(),
                "persons": r.persons,
                "comment": r.comment,
                "table_number": r.table_number
            })
        return jsonify(result), 200
    finally:
        session.close()

@reservation_bp.route("/", methods=["POST", "OPTIONS"])
def make_reservation():
        if request.method == "OPTIONS":
            return "", 200

        try:
            raw_data = request.get_data()
            print(">>> Raw request data:", raw_data)
            data = json.loads(raw_data)
            print(">>> Parsed JSON:", data)
        except Exception as e:
            print(">>> JSON parsing failed:", str(e))
            return jsonify({"error": "Invalid JSON", "details": str(e)}), 400

        if not data:
            return jsonify({"error": "No data received"}), 400

        required_fields = ["name", "email", "date", "persons", "phone"]
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        try:
            date = datetime.fromisoformat(data["date"].replace('Z', '+00:00'))
        except ValueError:
            return jsonify({"error": "Invalid date format. Use ISO format (YYYY-MM-DDTHH:MM:SS)"}), 400

        session = Session()
        try:
            customer = session.query(Customer).filter_by(email=data["email"]).first()
            if not customer:
                customer = Customer(name=data["name"], email=data["email"], phone=data["phone"])
                session.add(customer)
                session.flush()
            else:
                existing = session.query(Reservation).filter_by(
                    customer_id=customer.id,
                    date=date
                ).first()
                if existing:
                    print(">>> Duplicate reservation detected.")
                    return jsonify({
                        "error": "You already have a reservation for this date and time.",
                        "details": {
                            "date": existing.date.isoformat(),
                            "persons": existing.persons,
                            "comment": existing.comment
                        }
                    }), 409

            existing_slot_reservations = session.query(Reservation).filter(
                Reservation.date == date
            ).all()

            table_number = assign_table_number(existing_slot_reservations)

            reservation = Reservation(
                customer_id=customer.id,
                date=date,
                persons=data["persons"],
                comment=data.get("comment", None),
                table_number=table_number
            )
            session.add(reservation)
            session.commit()
            print(">>> Reservation saved.")
            return jsonify({"message": "✅ Reservation successful!"}), 201

        except Exception as e:
            session.rollback()
            print(">>> Error during reservation save:", str(e))
            return jsonify({"error": str(e)}), 400
        finally:
            session.close()

# Helper: assign a random free table
def assign_table_number(reservations: list) -> int:
    used = {r.table_number for r in reservations if r.table_number is not None}
    free = [i for i in range(1, MAX_BOOKINGS_PER_SLOT + 1) if i not in used]
    if not free:
        raise Exception("No available tables for this timeslot")
    return random.choice(free)

