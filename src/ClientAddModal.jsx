import { Modal, Button } from 'react-bootstrap';


const ClientAddModal = ({
    showAddModal,
    makeAddModalAppear,
    clientName,
    setClientName,
    residency,
    setResidency,
    saveClient,
}) => {
    return (
        <>
            <Modal show={showAddModal} onHide={makeAddModalAppear}>
                <Modal.Header closeButton className='text-black font-semibold'>New Client</Modal.Header>
                <Modal.Body>
                    <input 
                        className="w-full p-2 border-2 rounded-lg border-info text-black placeholder:text-black bg-transparent" 
                        placeholder="Client Name" 
                        type="text" 
                        value={clientName} 
                        onChange={(e) => setClientName(e.target.value)}
                    />
                    <input 
                        className="w-full p-2 mt-2 border-2 rounded-lg border-info text-black placeholder:text-black bg-transparent" 
                        placeholder="Residency" 
                        type="text" 
                        value={residency} 
                        onChange={(e) => setResidency(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className='active:scale-50 btn btn-success' onClick={saveClient}>Save client</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default ClientAddModal;