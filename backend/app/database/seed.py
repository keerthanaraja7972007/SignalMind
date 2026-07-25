from app.database.database import SessionLocal
from app.database.models import (
    Junction,
    Stat,
    Incident,
    Negotiation,
)

db = SessionLocal()

# Prevent duplicate inserts
if db.query(Junction).count() == 0:

    junctions = [

        Junction(
            name="Kathipara Junction",
            load=85,
            averageSpeed=28,
            greenTime=42,
            latitude="13.0402",
            longitude="80.2118",
            neighbors="2,5",
        ),

        Junction(
            name="Guindy Junction",
            load=65,
            averageSpeed=38,
            greenTime=30,
            latitude="13.0100",
            longitude="80.2200",
            neighbors="1,4",
        ),

        Junction(
            name="Anna Nagar Roundabout",
            load=55,
            averageSpeed=44,
            greenTime=28,
            latitude="13.0850",
            longitude="80.2101",
            neighbors="4,6",
        ),

        Junction(
            name="T Nagar Intersection",
            load=72,
            averageSpeed=32,
            greenTime=35,
            latitude="13.0418",
            longitude="80.2337",
            neighbors="2,3,5",
        ),

        Junction(
            name="Koyambedu Junction",
            load=80,
            averageSpeed=30,
            greenTime=40,
            latitude="13.0693",
            longitude="80.1948",
            neighbors="1,4,6",
        ),

        Junction(
            name="Velachery Junction",
            load=68,
            averageSpeed=36,
            greenTime=33,
            latitude="12.9758",
            longitude="80.2212",
            neighbors="3,5",
        ),

    ]

    db.add_all(junctions)

# -------------------------------------------------------

if db.query(Stat).count() == 0:

    stats = [

        Stat(
            title="Traffic Load",
            value="71%",
            icon="traffic",
        ),

        Stat(
            title="Average Speed",
            value="36 km/h",
            icon="speed",
        ),

        Stat(
            title="Active Incidents",
            value="4",
            icon="warning",
        ),

        Stat(
            title="AI Negotiations",
            value="243",
            icon="brain",
        ),

    ]

    db.add_all(stats)

db.commit()

print("✅ Database Seeded Successfully")