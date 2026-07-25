from fastapi import APIRouter
from app.services.tomtom_service import get_live_traffic
from app.services.traffic_engine import calculate_load

router = APIRouter()

JUNCTIONS = [
    {
        "id": 1,
        "name": "Kathipara Junction",
        "lat": 13.0402,
        "lon": 80.2118,
    },
    {
        "id": 2,
        "name": "Guindy Junction",
        "lat": 13.0105,
        "lon": 80.2209,
    },
    {
        "id": 3,
        "name": "Anna Nagar Roundabout",
        "lat": 13.0878,
        "lon": 80.2102,
    },
    {
        "id": 4,
        "name": "T Nagar Intersection",
        "lat": 13.0418,
        "lon": 80.2337,
    },
    {
        "id": 5,
        "name": "Koyambedu Junction",
        "lat": 13.0697,
        "lon": 80.1947,
    },
    {
        "id": 6,
        "name": "Velachery Junction",
        "lat": 12.9791,
        "lon": 80.2206,
    },
]


@router.get("/all")
def live_all():

    result = []

    for junction in JUNCTIONS:

        traffic = get_live_traffic(
            junction["lat"],
            junction["lon"],
        )

        load = calculate_load(
            traffic["currentSpeed"],
            traffic["freeFlowSpeed"],
            traffic["roadClosure"],
        )


        result.append({
            **junction,
            **traffic,
            "load": load,
        })

    return result