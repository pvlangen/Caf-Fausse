from .newsletter import newsletter_bp, init_newsletter_routes
from .reservation import reservation_bp, init_reservation_routes
from .available_slots import slot_bp, init_slot_routes
from .menu import menu_bp


def init_routes(app, Session):
    init_newsletter_routes(Session)
    init_reservation_routes(Session)
    init_slot_routes(Session)
    app.register_blueprint(newsletter_bp, url_prefix='/subscribers')
    app.register_blueprint(reservation_bp, url_prefix='/reservations')
    app.register_blueprint(slot_bp, url_prefix='/available-slots')
    app.register_blueprint(menu_bp, url_prefix='/menu')