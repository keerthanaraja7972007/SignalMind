import random
from datetime import datetime


def calculate_load(
    current_speed: int,
    free_speed: int,
    road_closure: bool = False,
):
    """
    AI-based Traffic Load Prediction
    Returns congestion percentage (10–100)
    """

    # Prevent division by zero
    if free_speed <= 0:
        return random.randint(40, 70)

    # ---------------------------------
    # Base congestion from TomTom speeds
    # ---------------------------------
    congestion = (
        (free_speed - current_speed) / free_speed
    ) * 100

    # ---------------------------------
    # Time-of-day prediction
    # ---------------------------------
    hour = datetime.now().hour

    if 7 <= hour <= 10:
        # Morning rush
        congestion += 35

    elif 12 <= hour <= 14:
        # Lunch traffic
        congestion += 15

    elif 16 <= hour <= 20:
        # Evening rush
        congestion += 40

    elif 22 <= hour or hour <= 5:
        # Late night
        congestion -= 10

    # ---------------------------------
    # Road closure
    # ---------------------------------
    if road_closure:
        congestion += 25

    # ---------------------------------
    # AI random fluctuations
    # ---------------------------------
    congestion += random.randint(-5, 15)

    # ---------------------------------
    # Clamp between 10 and 100
    # ---------------------------------
    congestion = max(10, min(100, int(congestion)))

    return congestion