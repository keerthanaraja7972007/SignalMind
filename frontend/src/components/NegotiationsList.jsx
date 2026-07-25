import React, { useState, useEffect } from 'react';
import { getNegotiations, createNegotiation } from '../api/client';

export default function NegotiationsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    getNegotiations()
      .then(setItems)
      .catch((err) => console.error("Error fetching:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    try {
      const newItem = await createNegotiation({
        fromJunction: "Kathipara Junction",
        toJunction: "Guindy Junction",
        request: "Increase Green Time",
        status: "Approved",
        impact: "18% Queue Reduction",
      });
      setItems((prev) => [...prev, newItem]);
    } catch (err) {
      alert(`Failed to save: ${err.message}`);
    }
  };

  if (loading) return <p>Loading negotiations...</p>;

  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>Active Negotiations ({items.length})</h2>
      <button onClick={handleAdd} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Submit Sample Negotiation
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={item.id || index} style={{ margin: '8px 0' }}>
            <strong>{item.fromJunction} ➔ {item.toJunction}</strong>: {item.request} ({item.status})
          </li>
        ))}
      </ul>
    </div>
  );
}