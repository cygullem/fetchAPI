import './styles/main.css';
import { Toaster, toast } from 'sonner';
import React, { useState, useEffect } from "react";
import ClientAddModal from './ClientAddModal'
import UpdateClientModal from './UpdateClientModal';
import { NavLink } from 'react-router-dom';

function App() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const [clientName, setClientName] = useState("");
    const [residency, setResidency] = useState("");

    const [selectedClientId, setSelectedClientId] = useState(0);
    const [selectedClient, setSelectedClient] = useState({ id: 0, clientName: "", residency: "" })
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const makeAddModalAppear = () => setShowAddModal(!showAddModal);
    const makeUpdateModalAppear = () => setShowUpdateModal(!showUpdateModal);


    const getClients = async () => {
        try {
            const response = await fetch("http://localhost:5241/api/ClientApi/GetClients");
            const result = await response.json();
            setClients(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const getClient = async (id) => {
        const response = await fetch(
            "http://localhost:5241/api/ClientApi/GetClient?id=" + id
        );
        const result = await response.json()
        setSelectedClient(result)
        makeUpdateModalAppear();
    }

    const saveClient = async () => {
        const dataToSend = {
            clientName,
            residency,
        };
        try {
            const response = await fetch("http://localhost:5241/api/ClientApi/saveclient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
            if (response.ok) {
                await getClients();
                makeAddModalAppear();
                toast.success('Client saved successfully!');
            } else {
                toast.error('Failed to save client.');
            }
        } catch (error) {
            console.error("Error saving client:", error);
        }
    };

    const updateClient = async () => {

        const response = await fetch(
            "http://localhost:5241/api/ClientApi/updateclient?id=" + selectedClientId,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(selectedClient)
            }
        );
        if (response.ok) {
            toast.success('Client updated successfully!');
        } else {
            toast.error('Failed to update client.');
        }
        getClients();
        makeUpdateModalAppear();
    }

    const deleteClient = async (id) => {
        if (confirm("U sure to delete this?") == true) {
            try {
                const response = await fetch(`http://localhost:5241/api/ClientApi/deleteclient?Id=${id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    await getClients();
                    toast.success('Client deleted successfully!');
                } else {
                    toast.error('Failed to delete client.');
                }
            } catch (error) {
                console.error("Error deleting client:", error);
            }
        } else {
            return;
        }
    };

    useEffect(() => {
        getClients();
    }, []);

    if (loading) return <center className='h-full w-full flex items-center justify-center'><h1 className="text-3xl font-semibold">Loading...</h1></center>;

    return (
        <>
            <ClientAddModal
                showAddModal={showAddModal}
                makeAddModalAppear={makeAddModalAppear}
                clientName={clientName}
                setClientName={setClientName}
                residency={residency}
                setResidency={setResidency}
                saveClient={saveClient}
            />

            <UpdateClientModal
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                selectedClient={selectedClient}
                updateClient={updateClient}
                setSelectedClient={setSelectedClient}
            />

            <h1 className="text-5xl font-semibold mb-4 w-full text-center">CLIENTS</h1>
            <div className="w-full mb-4 flex justify-end">
                <button className="btn btn-warning active:scale-50" onClick={makeAddModalAppear}>
                    <i className="fa-solid fa-user-plus mr-2"></i>
                    Add Client
                </button>
            </div>

            <div className="tableContainer w-full rounded-lg">
                <table className="tableCont w-full rounded-xl bg-slate-900">
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
                            clients.map((c) =>
                                <tr key={c.id} className="text-xl font-semibold hover:bg-slate-600">
                                    <td className="text-center">{c.id}</td>
                                    <td className="text-center text-gray-400">{c.clientName}</td>
                                    <td className="text-center">{c.residency}</td>
                                    <td className="flex h-full p-3 gap-2 items-center justify-center">
                                        <NavLink to={"/client/"+c.id} className={"btn btn-success active:scale-50"}><i className="fa-solid fa-eye text-white"></i></NavLink>
                                        <button className="btn btn-warning active:scale-50" onClick={() => { getClient(c.id); setSelectedClientId(c.id) }}><i className="fa-solid fa-user-pen text-white"></i></button>
                                        <button className="btn btn-danger active:scale-50" onClick={() => deleteClient(c.id)}><i className="fa-solid fa-trash-can text-white"></i></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <Toaster expand={true} richColors position='bottom-right' className='mr-8' />
        </>
    );
}

export default App;
