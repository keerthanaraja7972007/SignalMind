
<div align="center">

# 🚦 SignalMind

### AI-Powered Multi-Agent Traffic Signal Negotiation & Intelligent Traffic Coordination System

**Negotiating Traffic Before Congestion Materializes.**

<p>
  <img src="https://img.shields.io/badge/AI-Multi--Agent-8B5CF6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
</p>

<p>
  <img src="https://img.shields.io/badge/Traffic%20Data-TomTom-DF1B12?style=flat-square" />
  <img src="https://img.shields.io/badge/Maps-OpenStreetMap-7EBC6F?style=flat-square" />
  <img src="https://img.shields.io/badge/Communication-WebSockets-purple?style=flat-square" />
</p>

**Think Together. Coordinate Smarter. Move Better.**

</div>

---

## 🌐 Overview

Urban traffic congestion is a growing challenge in rapidly developing cities. Traditional traffic signal systems often operate independently, without considering the traffic conditions of neighboring intersections.

What if traffic junctions could communicate, negotiate, and coordinate their decisions?

**SignalMind** explores this idea through a Multi-Agent-Inspired Traffic Coordination System.

It represents individual traffic junctions as interconnected decision-making agents that monitor traffic conditions, identify congestion, evaluate neighboring junctions, and negotiate signal-time adjustments.

By combining live traffic information, modular AI decision-making, traffic simulation, incident monitoring, and intelligent route recommendations, SignalMind provides a centralized platform for smarter urban mobility.

The platform also offers a commuter interface that helps users compare alternative routes based on traffic and incident conditions.

### 🎯 Our Mission

To transform isolated traffic signals into an interconnected network of intelligent junctions that collaborate to improve traffic distribution and support efficient urban transportation.

---

## 🚨 The Problem

Conventional traffic management systems face several challenges:

- **Independent Signal Operations:** Junctions often operate without considering neighboring traffic conditions.
- **Uneven Traffic Distribution:** One intersection may experience severe congestion while nearby junctions remain comparatively less congested.
- **Reactive Management:** Traffic adjustments may occur only after congestion becomes significant.
- **Limited Coordination:** Interconnected junctions lack an effective negotiation mechanism.
- **Unexpected Disruptions:** Accidents, breakdowns, road construction, and weather conditions affect traffic movement.
- **Inefficient Route Selection:** Commuters may struggle to identify better routes during changing traffic conditions.

SignalMind addresses these challenges by introducing coordinated traffic analysis and junction-to-junction negotiation.

---

## 💡 Our Solution

SignalMind introduces a modular, multi-agent-inspired architecture where specialized agents collaborate to make traffic coordination decisions.

### 🔄 How SignalMind Works

| Stage | Operation | Description |
|---|---|---|
| 01 | 📡 Monitor | Collect traffic information from connected junctions. |
| 02 | 🧠 Analyze | Identify congested junctions. |
| 03 | 🔗 Connect | Evaluate neighboring junction conditions. |
| 04 | 🤝 Negotiate | Generate signal-time adjustment proposals. |
| 05 | ⚖️ Evaluate | Approve or reject proposals using decision rules. |
| 06 | 🚦 Redistribute | Simulate traffic redistribution when approved. |
| 07 | 📝 Record | Store negotiation outcomes and decision history. |
| 08 | 🗺️ Recommend | Suggest congestion-aware alternative routes. |

The result is a coordinated traffic intelligence platform that continuously evaluates changing road conditions.

---

## 🧠 Multi-Agent Architecture

The core of SignalMind is its specialized agent architecture.

Each agent is responsible for a particular traffic management function.

### 1. Traffic Analysis Agent

`trafficAnalysis.js`

- Analyzes traffic loads across available junctions.
- Identifies the most congested junction.
- Selects overloaded junctions for further evaluation.

**Core Function:** `findCongestedJunction()`

### 2. Junction Coordination Agent

`junctionAgent.js`

- Identifies neighboring junctions.
- Evaluates neighboring traffic conditions.
- Finds the least congested neighboring junction.
- Identifies potential coordination targets.

**Core Function:** `findBestNeighbor()`

### 3. Negotiation Agent

`negotiationEngine.js`

- Evaluates proposed traffic coordination.
- Checks whether neighboring junctions can accommodate additional traffic.
- Approves or rejects signal-time adjustment proposals.
- Generates decision explanations.

**Decision Rules:**

| Condition | Outcome |
|---|---|
| No suitable neighboring junction | Rejected |
| Neighbor traffic load below 70% | Approved |
| Neighbor traffic load 70% or higher | Rejected |

An approved frontend proposal currently adds 8 seconds of green signal time.

### 4. Traffic Redistribution Agent

`redistributeTraffic.js`

- Applies simulated traffic redistribution.
- Updates source and target junction loads.
- Adjusts simulated green signal duration.
- Updates average vehicle speed values.

**Illustrative Simulation Adjustments:**

| Parameter | Source Junction | Target Junction |
|---|---:|---:|
| Traffic Load | -15% | +15% |
| Green Time | -5 sec | +8 sec |
| Average Speed | +6 km/h | -5 km/h |

These values demonstrate the coordination workflow and are not measured real-world improvements.

### 5. Incident Detection Agent

`incidentAgent.js`

- Generates simulated traffic incidents.
- Associates incidents with junctions.
- Assigns incident categories and severity.
- Records incident timestamps.

**Supported Incident Categories:**

- 🚗 Accidents
- 🔧 Vehicle Breakdowns
- 🚧 Road Construction
- 🌧️ Heavy Rain
- 🎉 Festival Traffic
- 🏫 School Zone Congestion

The current prototype uses probabilistic incident simulation, with a 35% chance of generating an incident during an incident-check cycle.

### 6. AI Orchestration Engine

`aiOrchestrator.js`

The orchestration engine coordinates the specialized agent modules.

**Execution Pipeline:**

Traffic Analysis  
↓  
Junction Coordination  
↓  
Negotiation  
↓  
Decision Evaluation  
↓  
Traffic Redistribution  
↓  
Updated Traffic Information

The modular design separates analysis, coordination, negotiation, and redistribution responsibilities.

---

## ✨ Key Features

### 🚦 1. Intelligent Traffic Signal Management

- Traffic-load-based signal timing.
- Congestion monitoring.
- Adaptive signal-time recommendations.
- Junction-level traffic evaluation.

**Backend Signal Timing Rules:**

| Traffic Load | Green Signal Duration |
|---|---:|
| 80% and above | 45 seconds |
| 60% – 79% | 40 seconds |
| 40% – 59% | 35 seconds |
| Below 40% | 30 seconds |

### 🤝 2. Junction-to-Junction Negotiation

Instead of treating every intersection independently, SignalMind evaluates neighboring traffic conditions before generating a signal adjustment proposal.

**Example:**

| Parameter | Junction A | Junction B |
|---|---:|---:|
| Traffic Load | 85% | 45% |
| Status | Highly Congested | Less Congested |

The system identifies Junction A as overloaded and evaluates Junction B as a potential coordination target.

Since Junction B has a traffic load below the negotiation threshold, the proposal is approved.

The system then simulates traffic redistribution and records the decision.

### 📡 3. Live Traffic Integration

Powered by the **TomTom Traffic API**.

Retrieves:

- Current vehicle speed.
- Free-flow vehicle speed.
- Current travel time.
- Free-flow travel time.
- Traffic confidence.
- Road closure information.

**Traffic Congestion Calculation:**

```python
Congestion = (
    (Free_Flow_Speed - Current_Speed)
    / Free_Flow_Speed
) * 100
```

The backend also considers time-of-day conditions, road closures, and simulated traffic fluctuations.

### 🗺️ 4. Intelligent Commuter Route Recommendation

The Smart Commuter module helps users compare alternative routes.

**Features:**

- Source and destination selection.
- Multiple predefined route alternatives.
- Traffic congestion evaluation.
- Average speed analysis.
- Incident consideration.
- Estimated travel time.
- Route confidence score.
- Interactive map visualization.
- Better Route Found notifications.

**Route Evaluation Formula:**

```text
Route Score =
    (Jam Score × 0.45)
  + (Travel Time × 0.8)
  + (Incident Count × 8)
  + (Signal Count × 2)
```

A lower score indicates a more favorable route according to the current scoring model.

The current implementation uses three predefined route templates: Route A, Route B, and Route C.

Users can accept an alternative route, ignore the recommendation, or continue with their selected route.

### 🚨 5. Incident Monitoring

Provides visibility into simulated traffic disruptions.

Each incident contains:

- Incident ID.
- Junction ID.
- Junction name.
- Incident category.
- Severity.
- Timestamp.

Incident information is incorporated into traffic monitoring and commuter route evaluation.

### 📊 6. Intelligent Traffic Dashboard

A centralized monitoring interface featuring:

| Dashboard Module | Functionality |
|---|---|
| Traffic Statistics | Average traffic load and vehicle speed |
| Live Traffic Map | Geographical junction visualization |
| AI Negotiation Feed | Recent negotiation activities |
| Traffic Analytics | Traffic load and speed comparisons |
| Decision Timeline | Agent execution activities |
| Decision History | Approved and rejected decisions |
| Junction Registry | Structured junction information |

### ⚡ 7. Real-Time Communication

SignalMind uses WebSockets to communicate traffic information between the backend and frontend.

**Communication Flow:**

1. Frontend establishes a WebSocket connection.
2. Backend accepts the connection.
3. Dashboard information is retrieved.
4. Updated information is broadcast to connected clients.
5. React Context processes incoming messages.
6. Dashboard components display the latest available information.

The backend broadcasts dashboard updates approximately every two seconds.

---

## 🏙️ Traffic Network — Chennai

SignalMind demonstrates its traffic coordination architecture using six major Chennai junctions.

| ID | Junction |
|---|---|
| 01 | Kathipara Junction |
| 02 | Guindy Junction |
| 03 | Anna Nagar Roundabout |
| 04 | T Nagar Intersection |
| 05 | Koyambedu Junction |
| 06 | Velachery Junction |

Each junction maintains:

- Unique Junction ID.
- Junction Name.
- Traffic Load.
- Average Speed.
- Green Signal Time.
- Latitude and Longitude.
- Neighboring Junction IDs.

The interconnected network enables the system to evaluate potential coordination decisions between neighboring intersections.

---

## 🏗️ System Architecture

SignalMind follows a full-stack architecture combining a React frontend, FastAPI backend, PostgreSQL database, external traffic data, and modular decision-making services.

```text
                   SIGNALMIND
                        |
          +-------------+-------------+
          |                           |
          v                           v
    REACT FRONTEND                TOMTOM API
          |                           |
          |                      LIVE TRAFFIC
          |                           |
          +-------------+-------------+
                        |
                        v
                 FASTAPI BACKEND
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
     TRAFFIC        INCIDENT      DATABASE
     ENGINE          MODULE      (POSTGRESQL)
          |             |             |
          +-------------+-------------+
                        |
                        v
                AI ORCHESTRATION
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
       TRAFFIC       JUNCTION     NEGOTIATION
       ANALYSIS     COORDINATION     AGENT
          |             |             |
          +-------------+-------------+
                        |
                        v
               TRAFFIC REDISTRIBUTION
                        |
                        v
                  DECISION ENGINE
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
       DATABASE     WEBSOCKETS    ROUTE ENGINE
          |             |             |
          +-------------+-------------+
                        |
                        v
                 REACT DASHBOARD
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
       LIVE MAP     ANALYTICS     COMMUTER
                               RECOMMENDATIONS
```

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI |
| JavaScript | Application logic |
| Vite | Development and build tooling |
| Tailwind CSS 4 | Styling |
| React Router 7 | Navigation |
| Framer Motion | Animations |
| Lucide React | Icons |
| React Leaflet | Interactive maps |
| Leaflet | Map rendering |
| Recharts | Data visualization |
| React CountUp | Animated statistics |

### Backend

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| FastAPI | REST API framework |
| Uvicorn | ASGI server |
| SQLAlchemy | ORM |
| PostgreSQL | Relational database |
| Pydantic | Data validation |
| Requests | API communication |
| Python-dotenv | Environment configuration |
| WebSockets | Real-time communication |

### External Services

- **TomTom Traffic API** — Traffic flow information.
- **OpenStreetMap** — Map tiles and geographical visualization.

### Development Tools

- Visual Studio Code
- Git and GitHub
- npm
- Python Virtual Environment

---

## 🗄️ Database Architecture

SignalMind uses PostgreSQL for persistent data storage and SQLAlchemy for database operations.

### Database Models

**Junctions**

Stores junction details, traffic loads, average speeds, green signal durations, geographical coordinates, and neighboring junction relationships.

**Incidents**

Stores incident locations, severity, descriptions, and status.

**Negotiations**

Stores source and target junctions, traffic loads, requested actions, approval status, expected improvement, signal-time adjustments, and timestamps.

**Stats**

Stores dashboard statistics such as traffic load, speed, and other monitoring metrics.

---

## ⚡ Backend API Endpoints

SignalMind exposes REST API endpoints using FastAPI.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend health endpoint |
| GET | `/stats` | Retrieve traffic statistics |
| GET | `/junctions/` | Retrieve junctions |
| PUT | `/junctions/{junction_id}` | Update junction information |
| GET | `/incidents/` | Retrieve incidents |
| GET | `/negotiations/` | Retrieve negotiation records |
| POST | `/negotiations/` | Create a negotiation |
| GET | `/tomtom/all` | Retrieve configured junction traffic |
| WebSocket | `/ws/` | Real-time dashboard updates |

**Interactive API Documentation:**

`http://localhost:8000/docs`

---

## 📂 Project Structure

```text
SignalMind/
│
├── backend/
│   ├── app/
│   │   ├── data/
│   │   ├── database/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── websocket/
│   │   └── main.py
│   │
│   ├── traffic_scheduler.py
│   ├── requirements.txt
│   └── test.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── ai/
│   │   │   ├── commuter/
│   │   │   ├── dashboard/
│   │   │   ├── home/
│   │   │   ├── incidents/
│   │   │   ├── layout/
│   │   │   └── map/
│   │   │
│   │   ├── context/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── vercel.json
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to run SignalMind locally.

### Prerequisites

Make sure you have installed:

- Node.js and npm.
- Python 3.10 or later.
- PostgreSQL.
- Git.
- TomTom API key.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd SignalMind-main
```

### 2. Set Up the Backend

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure PostgreSQL

Create a database named:

```sql
CREATE DATABASE signalmind;
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
TOMTOM_API_KEY=your_tomtom_api_key
DATABASE_URL=postgresql://username:password@localhost:5432/signalmind
```

Replace the placeholder values with your actual credentials.

**Important:** Never commit API keys, passwords, or database credentials to GitHub.

### 5. Initialize the Database

```bash
python -m app.database.seed
```

### 6. Start the Backend Server

```bash
uvicorn app.main:app --reload
```

Backend:

`http://localhost:8000`

API Documentation:

`http://localhost:8000/docs`

### 7. Set Up the Frontend

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file if you need to override the default API configuration:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws/
```

### 8. Start the Frontend

```bash
npm run dev
```

Open the Vite development URL, normally:

`http://localhost:5173`

🎉 **SignalMind is now running locally!**

---

## 🧮 Algorithms & Decision-Making

SignalMind combines rule-based decision-making, traffic analysis, and simulation techniques.

| Algorithm / Technique | Purpose |
|---|---|
| Maximum Traffic Load Selection | Identify the most congested junction |
| Minimum Neighbor Load Selection | Find a less congested neighboring junction |
| Rule-Based Negotiation | Approve or reject coordination proposals |
| Traffic Redistribution Simulation | Demonstrate traffic load adjustments |
| Speed-Based Congestion Calculation | Estimate traffic congestion |
| Time-of-Day Adjustment | Account for peak-hour conditions |
| Weighted Route Scoring | Compare alternative routes |
| Probabilistic Incident Simulation | Generate demonstration incidents |
| Periodic Traffic Scheduling | Process traffic information continuously |

**Implementation Note:** The current repository implements modular rule-based AI logic and simulation. It does not currently include a trained deep-learning model, reinforcement-learning model, or LLM-based autonomous agent.

---

## 🌟 What Makes SignalMind Different?

| Conventional Traffic Systems | SignalMind |
|---|---|
| Independent junction operations | Interconnected junction coordination |
| Isolated signal decisions | Neighbor-aware signal recommendations |
| Reactive traffic monitoring | Continuous traffic analysis |
| Limited negotiation capabilities | Explicit junction negotiation workflow |
| Limited decision transparency | Decision timeline and history |
| Static route selection | Traffic-aware route comparison |
| Separate monitoring interfaces | Centralized traffic intelligence dashboard |

**Our Core Innovation:** Moving from isolated traffic signal management toward coordinated, negotiation-based traffic intelligence.

---

## 🔮 Future Enhancements

SignalMind provides a foundation for more advanced intelligent transportation systems.

### 🧠 Advanced Multi-Agent Intelligence

- Autonomous junction agents.
- Distributed negotiation protocols.
- Cooperative decision-making.
- Reinforcement learning for adaptive signal control.

### 📈 Predictive Traffic Analytics

- Historical traffic data integration.
- Congestion forecasting.
- Traffic pattern analysis.
- SUMO-based traffic simulation.

### 🚨 Advanced Incident Management

- Real-time accident feeds.
- Computer vision-based incident detection.
- Automated road blockage alerts.
- Incident severity prediction.

### 🗺️ Intelligent Route Optimization

- Real road-network routing.
- Graph-based shortest-path algorithms.
- Dynamic road closure consideration.
- Improved travel-time prediction.

### 🚑 Emergency Vehicle Coordination

- Ambulance priority corridors.
- Emergency vehicle route optimization.
- Coordinated signal recommendations.
- Emergency response notifications.

### 🏙️ Smart City Integration

- IoT-based traffic sensors.
- Intelligent traffic infrastructure.
- Large-scale city traffic simulations.
- Multi-city traffic coordination.

---

## 📊 Project Impact

SignalMind aims to support smarter urban mobility through:

- Better coordination between interconnected traffic junctions.
- More informed traffic distribution decisions.
- Adaptive traffic signal recommendations.
- Improved visibility into traffic incidents.
- Congestion-aware commuter route comparisons.
- Transparent traffic negotiation decisions.
- A scalable foundation for intelligent transportation systems.

These are intended benefits; real-world congestion and travel-time improvements have not yet been established through field measurements.

---

## 🔐 Security Considerations

- Store sensitive credentials in environment variables.
- Never expose backend API keys through frontend code.
- Configure production CORS restrictions.
- Use secure WebSocket connections in production.
- Implement authentication and authorization for administrative operations.
- Validate incoming API requests.
- Protect database connections.
- Exclude virtual environments, build outputs, and sensitive files from version control.

---

## 👩‍💻 Project Information

| Attribute | Details |
|---|---|
| Project Name | SignalMind |
| Domain | Artificial Intelligence & Smart Cities |
| Subdomain | Intelligent Transportation Systems |
| Architecture | Multi-Agent-Inspired Coordination |
| Frontend | React 19 |
| Backend | Python & FastAPI |
| Database | PostgreSQL |
| Traffic Provider | TomTom Traffic API |
| Communication | WebSockets |
| Mapping | Leaflet & OpenStreetMap |
| Demonstration Location | Chennai, Tamil Nadu, India |

---

## 💜 Conclusion

SignalMind explores a smarter approach to urban traffic management by introducing communication, coordination, and negotiation between interconnected traffic junctions.

Instead of treating traffic signals as isolated control points, SignalMind models them as cooperating entities that analyze traffic conditions, evaluate neighboring junctions, and generate intelligent signal-time adjustment recommendations.

Through its modular agent architecture, live traffic integration, negotiation engine, incident monitoring, commuter route recommendations, and centralized analytics dashboard, SignalMind demonstrates a foundation for more intelligent and coordinated urban transportation.

**The ultimate vision is simple:**

Transform isolated traffic signals into an intelligent network where junctions coordinate decisions for smoother urban mobility.

---

<div align="center">

# 🚦 SignalMind

### Think Together. Coordinate Smarter. Move Better.

**Building the Next Generation of Intelligent Traffic Coordination.**

💜 *Smarter Junctions. Better Journeys. Connected Cities.*

</div>
