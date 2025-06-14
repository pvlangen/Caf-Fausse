from flask import Blueprint, request, jsonify
import json
import os
import unicodedata
import re

menu_bp = Blueprint('menu', __name__)

MENU_FILE = "menu.json"

@menu_bp.route("/", methods=["GET"])
def get_menu():
    return jsonify(load_menu())

@menu_bp.route("/item", methods=["POST"])
def add_menu_item():
    data = request.get_json()
    category = data.get("category")
    item = data.get("item")

    if not category or not item or "title" not in item:
        return jsonify({"error": "Missing category or item title"}), 400

    menu = load_menu()
    menu.setdefault(category, [])

    new_id = slugify(item["title"])
    item["id"] = new_id

    if any(existing["id"] == new_id for existing in menu[category]):
        return jsonify({"error": f"Item '{item['title']}' already exists."}), 409

    menu[category].append(item)
    save_menu(menu)
    return jsonify({"message": "Item added", "id": new_id}), 201

@menu_bp.route("/item", methods=["DELETE"])
def delete_menu_item():
    data = request.get_json()
    category = data.get("category")
    item_id = data.get("id")

    if not category or not item_id:
        return jsonify({"error": "Missing category or id"}), 400

    menu = load_menu()
    if category not in menu:
        return jsonify({"error": "Invalid category"}), 400

    original_len = len(menu[category])
    menu[category] = [item for item in menu[category] if item["id"] != item_id]

    if len(menu[category]) == original_len:
        return jsonify({"error": "Item not found"}), 404

    save_menu(menu)
    return jsonify({"message": "Item deleted"}), 200

# Utility to convert titles into slug-style IDs
def slugify(title):
    title = unicodedata.normalize("NFKD", title).encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^\w\s-]", "", title).strip().lower().replace(" ", "-")

def load_menu():
    if os.path.exists(MENU_FILE):
        with open(MENU_FILE, "r") as f:
            return json.load(f)
    else:
        return {"intro": "", "starters": [], "main_courses": [], "desserts": [], "beverages": []}

def save_menu(menu):
    with open(MENU_FILE, "w") as f:
        json.dump(menu, f, indent=2)