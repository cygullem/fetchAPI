import React, { useState, useEffect } from "react";

function App() {
  const [client, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const getClients = async () => {
    const response = await fetch("http://localhost:5241/api/ClientApi/GetClients");
    const result = await response.json()
    setClients(result);
    setLoading(false);
  }

  useEffect(() => {
    getClients();
  }, []);

  if (loading) return <center><h1 className="text-3xl font-semibold">Loading...</h1></center>

  return (
    <>
     <h1 className="text-5xl font-semibold mb-4">CLIENTS</h1>
      <ul className="gridContainer list-none grid grid-cols-2 gap-4 overflow-auto w-full">
        {
          client.map((c) =>
            <li key={c.id} className="text-3xl font-semibold">
              <div className="flex flex-row p-8 rounded-lg bg-gray-400 mt-2 gap-1">
                <div className="bg-slate-700 text-yellow-300 p-8 rounded-lg">{c.clientName}</div>
                <div className="bg-gray-500 p-8 rounded-lg flex-1">{c.residency}</div>
              </div>
            </li> 
          )
        }
      </ul>
    </>
  );
}

export default App;