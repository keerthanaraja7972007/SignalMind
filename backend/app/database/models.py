from sqlalchemy import Column, Integer, String
from app.database.database import Base


# --------------------------------------------------
# Junction Table
# --------------------------------------------------

class Junction(Base):
    __tablename__ = "junctions"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    load = Column(Integer)

    averageSpeed = Column(Integer)

    greenTime = Column(Integer)

    latitude = Column(String)

    longitude = Column(String)

    neighbors = Column(String)


# --------------------------------------------------
# Incident Table
# --------------------------------------------------

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    location = Column(String)

    severity = Column(String)

    description = Column(String)

    status = Column(String)


# --------------------------------------------------
# Negotiation Table
# --------------------------------------------------

class Negotiation(Base):

    __tablename__ = "negotiations"

    id = Column(Integer, primary_key=True, index=True)

    fromJunction = Column(String)

    toJunction = Column(String)

    reason = Column(String)

    currentLoad = Column(Integer)

    neighborLoad = Column(Integer)

    request = Column(String)

    status = Column(String)

    expectedImprovement = Column(String)

    greenTimeChange = Column(String)

    time = Column(String)


# --------------------------------------------------
# Dashboard Statistics Table
# --------------------------------------------------

class Stat(Base):
    __tablename__ = "stats"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    value = Column(String)

    icon = Column(String)