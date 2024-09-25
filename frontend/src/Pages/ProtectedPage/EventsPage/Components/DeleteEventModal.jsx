import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import "./../Styles/DeleteImageModel.css";

const DeleteEventModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className={"delete-button"} onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <div className={"modal-image-deletion"}>
                    <Modal.Header closeButton>
                        <Modal.Title>DELETE EVENT</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are You Sure You Want To Delete The Event?</Modal.Body>
                    <Modal.Footer>
                        <Button className={"cancel-button"} onClick={handleClose}>
                            CANCEL
                        </Button>
                        <Button className={"confirm-delete"} onClick={handleClose}>
                            CONFIRM DELETION
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </>);
};

export default DeleteEventModal;