import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";

const UserDeleteModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <FaTrash className={"user-delete"} onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <div className={"modal-image-deletion"}>
                    <Modal.Header closeButton>
                        <Modal.Title>DELETE USER</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are You Sure You Want To Delete This User?</Modal.Body>
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

export default UserDeleteModal;