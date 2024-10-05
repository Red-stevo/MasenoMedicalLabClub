import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";

const UserDeleteModal = ({email, userId}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <FaTrash className={"user-delete"} onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <div className={"modal-image-deletion"}>
                    <Modal.Header closeButton>
                        <Modal.Title>DELETE {email}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are Sure You Want to Delete This user Permanently?</Modal.Body>
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