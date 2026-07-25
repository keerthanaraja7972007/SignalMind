import os
import requests
from dotenv import load_dotenv

load_dotenv()

TOMTOM_API_KEY = os.getenv("TOMTOM_API_KEY")

print("TomTom Key:", TOMTOM_API_KEY)


def get_live_traffic(latitude: float, longitude: float):

    url = (
        "https://api.tomtom.com/traffic/services/4/"
        "flowSegmentData/absolute/10/json"
    )

    params = {
        "key": TOMTOM_API_KEY,
        "point": f"{latitude},{longitude}",
    }

    try:
        response = requests.get(
            url,
            params=params,
            timeout=10,
        )

        response.raise_for_status()

        data = response.json()["flowSegmentData"]

        return {
            "currentSpeed": data["currentSpeed"],
            "freeFlowSpeed": data["freeFlowSpeed"],
            "currentTravelTime": data["currentTravelTime"],
            "freeFlowTravelTime": data["freeFlowTravelTime"],
            "confidence": data["confidence"],
            "roadClosure": data["roadClosure"],
        }

    except Exception as e:
        print("TomTom ERROR:", e)
        raise