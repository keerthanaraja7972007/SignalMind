import { useState, useContext } from "react";
import { TrafficContext } from "../../context/TrafficContext";

function AICommander() {

  const {
    junctions,
    incidents,
  } = useContext(TrafficContext);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = () => {

    const q = question.toLowerCase().trim();

    // Question about busiest junction
    if (q.includes("busiest") || q.includes("congested") || q.includes("heavy traffic")) {

      const busiest =
        [...junctions].sort(
          (a,b)=>b.load-a.load
        )[0];

      setAnswer(
        `🚦 ${busiest.name} is currently the busiest junction with ${busiest.load}% traffic load.`
      );

      return;
    }

    // Question about incidents
    if (q.includes("incident") || q.includes("accident") || q.includes("emergency")) {

      setAnswer(
        `🚨 There are currently ${incidents.length} active incidents in the city.`
      );

      return;
    }

    // Question about specific junction - Guindy
    if (q.includes("guindy")) {

      const guindy =
        junctions.find(j=>j.name.includes("Guindy"));

      if (guindy) {
        setAnswer(
          `📍 Guindy Junction currently has ${guindy.load}% traffic with an average speed of ${guindy.averageSpeed} km/h.`
        );
      } else {
        setAnswer(`📍 Guindy Junction data not available.`);
      }

      return;
    }

    // Question about overall traffic status
    if (q.includes("traffic") || q.includes("status") || q.includes("condition")) {

      const avg =
        Math.round(
          junctions.reduce(
            (s,j)=>s+j.load,
            0
          )/junctions.length
        );

      const maxSpeed = Math.max(...junctions.map(j => j.averageSpeed));

      setAnswer(
        `🚗 Traffic Status Update

Average Load: ${avg}%
Total Junctions: ${junctions.length}
Active Incidents: ${incidents.length}
Max Speed: ${maxSpeed} km/h

Traffic is being optimized by AI for smooth flow.`
      );

      return;
    }

    // Question about report
    if (q.includes("report") || q.includes("summary") || q.includes("overview")) {

      const avg =
        Math.round(
          junctions.reduce(
            (s,j)=>s+j.load,
            0
          )/junctions.length
        );

      setAnswer(
        `📊 Daily Report

Average Load: ${avg}%
Active Incidents: ${incidents.length}
Total Junctions: ${junctions.length}

AI is successfully redistributing traffic across the network.`
      );

      return;
    }

    // Question about average speed
    if (q.includes("speed") || q.includes("average") || q.includes("fast")) {

      const avgSpeed = 
        Math.round(
          junctions.reduce(
            (s,j)=>s+j.averageSpeed,
            0
          )/junctions.length
        );

      setAnswer(
        `⚡ Average Speed Across City: ${avgSpeed} km/h

The network is operating at optimal speed to reduce congestion.`
      );

      return;
    }

    // Question about junction count or junctions
    if (q.includes("how many") || q.includes("total") || q.includes("junction")) {

      setAnswer(
        `🗺️ Total Junctions in Network: ${junctions.length}

All junctions are being monitored and optimized for traffic flow.`
      );

      return;
    }

    // Help or greeting
    if (q.includes("help") || q.includes("what can")) {

      setAnswer(
        `👋 Hello! I'm your AI Traffic Commander. I can help you with:

• Ask about the BUSIEST junction
• Check INCIDENTS/ACCIDENTS
• Traffic STATUS or CONDITION
• Average SPEED across city
• Daily REPORT or SUMMARY
• HOW MANY junctions
• Specific junction info (e.g., GUINDY)

What would you like to know?`
      );

      return;
    }

    // General greetings and pleasantries
    if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {

      setAnswer(
        `👋 Hello! Welcome to SignalMind - Your Smart Traffic Management System. 

How can I assist you today? Feel free to ask me about traffic, junctions, or just chat!`
      );

      return;
    }

    if (q.includes("how are you") || q.includes("how do you do")) {

      setAnswer(
        `😊 I'm doing great! Thanks for asking. I'm here to help you manage and optimize traffic flow. How's the traffic looking today?`
      );

      return;
    }

    if (q.includes("thank") || q.includes("thanks") || q.includes("appreciate")) {

      setAnswer(
        `🙏 You're welcome! I'm here to help anytime. Feel free to ask me more about your traffic network.`
      );

      return;
    }

    // Questions about the system
    if (q.includes("what are you") || q.includes("who are you")) {

      setAnswer(
        `🤖 I'm SignalMind's AI Commander - an intelligent traffic management assistant. I analyze traffic patterns, incidents, and help optimize flow across your city's junction network. Ask me anything about traffic!`
      );

      return;
    }

    if (q.includes("what is this") || q.includes("what is signalmind")) {

      setAnswer(
        `🚦 SignalMind is an AI-powered Smart Traffic Management System that:

• Monitors traffic patterns in real-time
• Detects and manages incidents
• Optimizes traffic flow
• Provides intelligent recommendations
• Helps emergency vehicles navigate
• Analyzes traffic statistics

I'm here to help you get the best insights!`
      );

      return;
    }

    // Time/activity related
    if (q.includes("working") || q.includes("operating")) {

      setAnswer(
        `✅ Yes! SignalMind is fully operational and monitoring the traffic network in real-time. All systems are running smoothly.`
      );

      return;
    }

    if (q.includes("bye") || q.includes("goodbye") || q.includes("see you")) {

      setAnswer(
        `👋 Goodbye! Thanks for using SignalMind. Stay safe on the roads!`
      );

      return;
    }

    // General conversational responses
    setAnswer(
      `🤖 That's interesting! While I'm specialized in traffic management, I'm happy to chat. However, for the best assistance, try asking me about:

• 🚦 Traffic conditions and status
• 🚨 Incidents and accidents
• ⚡ Average speed and performance
• 📊 Daily reports
• 🗺️ Junction information

Feel free to ask anything traffic-related!`
    );

  };

  return (

<div className="rounded-3xl bg-slate-800 border border-slate-700 shadow-xl p-8">

<h2 className="text-3xl font-bold text-white mb-6">
🤖 AI Commander
</h2>

<input
type="text"
value={question}
onChange={(e)=>setQuestion(e.target.value)}
placeholder="Ask anything about the city..."
className="
w-full
rounded-xl
bg-slate-900
border
border-slate-700
text-white
px-5
py-4
outline-none
"
/>

<button
onClick={askAI}
className="
mt-5
bg-cyan-600
hover:bg-cyan-700
px-8
py-3
rounded-xl
font-semibold
text-white
transition
"
>

Ask AI

</button>

<div className="
mt-8
rounded-xl
bg-slate-900
border
border-slate-700
p-6
min-h-[120px]
text-slate-200
whitespace-pre-line
">

{answer || "AI response will appear here..."}

</div>

</div>

  );
}

export default AICommander;