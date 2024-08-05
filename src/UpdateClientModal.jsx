import { Modal, Button } from 'react-bootstrap';

const UpdateClientModal = ({
    showUpdateModal,
    setShowUpdateModal,
    selectedClient,
    updateClient,
    setSelectedClient,
}) => {
    return (
        <>
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton className='text-black font-semibold'>Update Client Information</Modal.Header>
                <Modal.Body>
                    <input 
                        className="w-full p-2 border-2 rounded-lg border-info text-black placeholder:text-black bg-transparent" 
                        placeholder='Client Name' 
                        type='text' 
                        value={selectedClient.clientName} 
                        onChange={(e) => setSelectedClient((c)=>({...c, clientName : e.target.value}))}
                    />
                    <input 
                        className="w-full p-2 mt-2 border-2 rounded-lg border-info text-black placeholder:text-black bg-transparent" 
                        placeholder='Residency' 
                        type='text' 
                        value={selectedClient.residency} 
                        onChange={(e) => setSelectedClient((c)=>({...c, residency : e.target.value}))}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className='active:scale-50 btn btn-success' onClick={updateClient}>Save Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default UpdateClientModal;