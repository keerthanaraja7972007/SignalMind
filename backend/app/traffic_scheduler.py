import asyncio
import random
from datetime import datetime

from app.database.database import SessionLocal
from app.database.models import Junction, Negotiation

from app.services.tomtom_service import get_live_traffic
from app.services.traffic_engine import calculate_load

last_pair = None
last_source = -1
# -----------------------------
# AI Reason Pool
# -----------------------------
REASONS = [
    "High congestion detected",
    "Traffic imbalance",
    "Queue length increasing",
    "Peak hour congestion",
    "Neighbour traffic is lower",
    "Traffic flow optimization",
]

# -----------------------------
# AI Improvement Pool
# -----------------------------
IMPROVEMENTS = [
    "12% Queue Reduction",
    "18% Queue Reduction",
    "Average delay reduced by 2 min",
    "Travel time improved by 8%",
    "Reduced waiting time",
    "Traffic flow stabilized",
]


async def traffic_scheduler():

    while True:

        db = SessionLocal()

        try:

            junctions = db.query(Junction).all()

            if len(junctions) < 2:
                await asyncio.sleep(10)
                continue

            # ------------------------------------------
            # STEP 1 : Update Traffic using TomTom
            # ------------------------------------------
            for junction in junctions:

                try:
                    traffic = await asyncio.to_thread(
                        get_live_traffic,
                        float(junction.latitude),
                        float(junction.longitude)
                    )

                    junction.averageSpeed = traffic["currentSpeed"]

                    junction.load = calculate_load(
                        traffic["currentSpeed"],
                        traffic["freeFlowSpeed"],
                        traffic["roadClosure"],
                    )
                except Exception as e:
                    print(f"Error getting traffic for junction {junction.id}: {e}")
                    continue

                # AI Green Time
                if junction.load >= 80:
                    junction.greenTime = 45

                elif junction.load >= 60:
                    junction.greenTime = 40

                elif junction.load >= 40:
                    junction.greenTime = 35

                else:
                    junction.greenTime = 30

            db.commit()

            # ------------------------------------------
            # STEP 2 : Choose Busy Junction
            # ------------------------------------------
            busy = sorted(
                [j for j in junctions if j.load >= 30],
                key=lambda j: j.id
            )

            if not busy:
                await asyncio.sleep(10)
                continue

            global last_source

            current_index = 0

            for i, j in enumerate(busy):

                if j.id > last_source:

                    current_index = i
                    break

            source = busy[current_index]

            last_source = source.id

            if current_index == len(busy) - 1:
                last_source = -1

            # ------------------------------------------
            # STEP 3 : Find Neighbours
            # ------------------------------------------
            neighbours = []

            if source.neighbors:

                for n in source.neighbors.split(","):

                    neighbour = (
                        db.query(Junction)
                        .filter(Junction.id == int(n))
                        .first()
                    )

                    if neighbour:
                        neighbours.append(neighbour)

            if len(neighbours) == 0:
                await asyncio.sleep(10)
                continue

            # ------------------------------------------
            # STEP 4 : Select Least Congested Neighbour
            # ------------------------------------------
            target = random.choice(neighbours)

            global last_pair

            while (
                last_pair == (source.id, target.id)
                and len(neighbours) > 1
            ):
                target = random.choice(neighbours)

            last_pair = (source.id, target.id)

            difference = source.load - target.load

            # ------------------------------------------
            # STEP 5 : AI Decision
            # ------------------------------------------
            if difference >= 30:

                request = "Increase Green Time"

                green_change = "+8 sec"

                status = "Approved"

            elif difference >= 15:

                request = "Increase Green Time"

                green_change = "+5 sec"

                status = "Approved"

            else:

                request = "Maintain Current Timing"

                green_change = "0 sec"

                status = "Rejected"

            negotiation = Negotiation(

                fromJunction=source.name,

                toJunction=target.name,

                reason=random.choice(REASONS),

                currentLoad=source.load,

                neighborLoad=target.load,

                request=request,

                greenTimeChange=green_change,

                status=status,

                expectedImprovement=random.choice(IMPROVEMENTS),

                time=datetime.now().strftime("%I:%M %p"),
            )

            db.add(negotiation)

            db.commit()

            print(
                f"🤝 {source.name} ({source.load}%) -> "
                f"{target.name} ({target.load}%)"
            )

        except Exception as e:

            print("Scheduler Error:", e)

        finally:

            db.close()

        # Update every 10 seconds
        await asyncio.sleep(10)