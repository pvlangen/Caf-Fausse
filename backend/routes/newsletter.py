from flask import request, jsonify, Blueprint
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models import Customer
import json

newsletter_bp = Blueprint('newsletter', __name__)

newsletter_bp = Blueprint('newsletter', __name__)
Session = None  # Will be set by init_newsletter_routes

def init_newsletter_routes(session_factory):
    global Session
    Session = session_factory

@newsletter_bp.route("/", methods=["POST", "OPTIONS"])
def subscribe_newsletter():
    session = Session()
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = json.loads(request.get_data())
    except Exception as e:
        return jsonify({"error": "Invalid JSON", "details": str(e)}), 400

    if not data:
        return jsonify({"error": "No data received"}), 400

    required_fields = ["name", "email"]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    try:
        existing_customer = session.query(Customer).filter_by(email=data["email"]).first()
        if existing_customer:
            return jsonify({"error": "This email address is already subscribed."}), 409

        customer = Customer(name=data["name"], email=data["email"])
        session.add(customer)
        session.commit()
        return jsonify({"message": "✅ Subscription successful!"}), 201
    except IntegrityError:
        session.rollback()
        return jsonify({"error": "An error occurred while saving the subscription."}), 400
    finally:
        session.close()

@newsletter_bp.route("/", methods=["GET"])
def get_subscribers():
    session = Session()
    try:
        customers = session.query(Customer).all()
        result = [{"id": c.id, "name": c.name, "email": c.email} for c in customers]
        return jsonify(result), 200
    finally:
        session.close()