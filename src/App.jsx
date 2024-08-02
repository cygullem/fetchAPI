import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function App() {
    const [client, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [clientName, setClientName] = useState("");
    const [residency, setResidency] = useState("");
    const makeAddModalAppear = () => setShowAddModal(!showAddModal);


    const getClients = async () => {
        const response = await fetch("http://localhost:5241/api/ClientApi/GetClients");
        const result = await response.json()
        setClients(result);
        setLoading(false);
    }

    const saveClient = async () => {
        const dataToSend = {
            "clientName": clientName,
            "residency": residency,
        }
        const response = await fetch(
            "http://localhost:5241/api/ClientApi/saveclient",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            }
        );
        getClients();
        makeAddModalAppear();
    }

    const DeleteClient = async (id) => {

        const response = await fetch(
            "http://localhost:5241/api/ClientApi/deleteclient?Id="+id,
            {
                method: "DELETE",
            }
        );
        getClients();
    }

    useEffect(() => {
        getClients();
    }, []);

    if (loading) return <center><h1 className="text-3xl font-semibold">Loading...</h1></center>

    return (
        <>
            <Modal show={showAddModal} onHide={makeAddModalAppear}>
                <Modal.Header closeButton>New Client</Modal.Header>
                <Modal.Body>
                    <input className="w-full p-2 border-info" placeholder="Client Name" type="text" value={clientName} onChange={(e) => setClientName(e.target.value)}/>
                    <input className="w-full p-2 mt-2 border-info" placeholder="Residency" type="text" value={residency} onChange={(e) => setResidency(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={saveClient}>Save client</Button>
                </Modal.Footer>
            </Modal>

            <h1 className="text-5xl font-semibold mb-4">CLIENTS</h1>
            <Button onClick={makeAddModalAppear}>Add Client</Button>
            <ul className="gridContainer list-none grid grid-cols-2 gap-4 overflow-auto w-full mt-2">
                {
                    client.map((c) =>
                        <li key={c.id} className="text-3xl font-semibold">
                            <div className="flex flex-row p-3 rounded-lg bg-gray-400 mt-2 gap-1">
                                <div className="bg-slate-700 text-yellow-300 p-8 rounded-lg text-center">{c.clientName}</div>
                                <div className="bg-gray-500 p-2 rounded-lg flex-1 text-center">{c.residency}</div> <br />
                                <button className="bg-green-700 p-2 rounded-lg text-white flex-1 text-center">UPDATE</button>
                                <button className="bg-red-500 p-2 rounded-lg text-white flex-1 text-center" onClick={()=>DeleteClient(c.id)}>DELETE</button>
                            </div>
                        </li> 
                    )
                }
            </ul>
        </>
    );
}

export default App;