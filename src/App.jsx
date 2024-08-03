import './styles/main.css'
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
        const result = await response.json();
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
            {/*---------------- Add Client Modal ----------------*/}
            <Modal show={showAddModal} onHide={makeAddModalAppear}>
                <Modal.Header closeButton className='text-black font-semibold'>New Client</Modal.Header>
                <Modal.Body>
                    <input className="w-full p-2 border-2 rounded-lg border-info text-black placeholder:text-black bg-transparent" placeholder="Client Name" type="text" value={clientName} onChange={(e) => setClientName(e.target.value)}/>
                    <input className="w-full p-2 mt-2 border-2 rounded-lg border-info text-black placeholder:text-black bg-transparent" placeholder="Residency" type="text" value={residency} onChange={(e) => setResidency(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='active:scale-50 btn btn-success' onClick={saveClient}>Save client</Button>
                </Modal.Footer>
            </Modal>

            <h1 className="text-5xl font-semibold mb-4 w-full text-center">CLIENTS</h1>
            <div className="w-full mb-4 flex justify-end">
                <button className="btn btn-warning active:scale-50" onClick={makeAddModalAppear}>
                    <i class="fa-solid fa-user-plus mr-2"></i>
                    Add Client
                </button>
            </div>

            <table className="tableCont w-full rounded-xl overflow-auto bg-slate-900">
                <thead>
                    <tr className="text-white">
                        <th className="p-2 text-center">ID</th>
                        <th className="p-2 text-center">Client Name</th>
                        <th className="p-2 text-center">Residency</th>
                        <th className="p-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        client.map((c) =>
                            <tr key={c.id} className="text-xl font-semibold hover:bg-slate-600">
                                <td className="text-center">{c.id}</td>
                                <td className="text-center text-gray-400">{c.clientName}</td>
                                <td className="text-center">{c.residency}</td>
                                <td className="flex h-full p-3 gap-2 items-center justify-center">
                                    <button className="btn btn-warning active:scale-50" onClick={makeAddModalAppear}><i class="fa-solid fa-user-pen text-white"></i></button>
                                    <button className="btn btn-danger active:scale-50" onClick={() => DeleteClient(c.id)}><i class="fa-solid fa-trash-can text-white"></i></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default App;
