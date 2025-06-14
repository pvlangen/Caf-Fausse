from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from datetime import datetime, time
from models import Reservation
from datetime import datetime, timedelta, time


slot_bp = Blueprint('slot', __name__)
Session = None  # Will be set by init_slot_routes

def init_slot_routes(session_factory):
    global Session
    Session = session_factory

# Constants
MAX_BOOKINGS_PER_SLOT = 30
WEEKDAY_OPENING = time(17, 0)
WEEKDAY_CLOSING = time(23, 0)
SUNDAY_CLOSING = time(21, 0)
SLOT_DURATION_MINUTES = 60

@slot_bp.route("/", methods=["GET"])
def available_slots():
        session = Session()
        date_str = request.args.get("date")
        people_count_str = request.args.get("peopleCount")

        if not date_str:
            return jsonify({"error": "Missing 'date' parameter"}), 400

        try:
            target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

        try:
            extra_people = int(people_count_str) if people_count_str else 0
        except ValueError:
            return jsonify({"error": "Invalid 'peopleCount' parameter"}), 400

        try:
            slots = generate_timeslots_for_day(target_date)
            persons_count = count_reservations_per_slot(target_date, session)

            available_list = []
            for slot, max_capacity in slots.items():
                used = persons_count.get(slot, 0)
                if used + extra_people <= MAX_BOOKINGS_PER_SLOT:
                    available_list.append(slot)

            return jsonify(available_list), 200
        finally:
            session.close()

# Helper: generate all timeslots for a given day
def generate_timeslots_for_day(date: datetime.date) -> dict:
    is_sunday = date.weekday() == 6
    opening = WEEKDAY_OPENING
    closing = SUNDAY_CLOSING if is_sunday else WEEKDAY_CLOSING

    slots = {}
    current = datetime.combine(date, opening)

    while current.time() < closing:
        slots[current.strftime("%H:%M")] = MAX_BOOKINGS_PER_SLOT
        current += timedelta(minutes=SLOT_DURATION_MINUTES)

    return slots

# Helper: count how many people are reserved per slot
def count_reservations_per_slot(date: datetime.date, session) -> dict:
    session = Session()
    next_day = datetime.combine(date + timedelta(days=1), time(0, 0))
    day_start = datetime.combine(date, time(0, 0))

    reservations = session.query(Reservation).filter(
        Reservation.date >= day_start,
        Reservation.date < next_day
    ).all()

    slot_counts = {}
    for r in reservations:
        label = r.date.strftime("%H:%M")
        slot_counts[label] = slot_counts.get(label, 0) + r.persons

    return slot_counts