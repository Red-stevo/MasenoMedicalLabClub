import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {LiaEdit} from "react-icons/lia";
import {FloatingLabel, Form} from "react-bootstrap";
import ContactMeModal from "./ContactMeModal.jsx";



const ProfileInformCollectionModal =   () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <LiaEdit className={"edit-icon"} onClick={handleShow}/>
            <Modal size={"lg"} show={show} onHide={handleClose} backdrop="static" keyboard={false} scrollable={true}>
                <Modal.Header className={"profile-modal-title"} closeButton>
                    <Modal.Title className={'update-title'}>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor={'profile-first-name'}>First Name : </Form.Label>
                            <input id={"profile-first-name"} className={"form-control"}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor={'profile-second-name'}>Second Name : </Form.Label>
                            <input id={"profile-second-name"} className={"form-control"}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor={'profile-reg-no'}>Admission NO : </Form.Label>
                            <input id={"profile-reg-no"} className={"form-control"}/>
                        </Form.Group>
                        <div>
                            <div className="form-group">
                                <label className={"form-label"} htmlFor="research-description">
                                    Research Description :
                                </label>
                                <textarea id={"research-description"} placeholder="Research Description"
                                          style={{height: '150px'}} className="form-control accordion-text-font"/>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={'cancel-profile-changes'} onClick={handleClose}>
                        Cancel
                    </Button>
                   {/* <Button className={'save-profile-changes'}>Save</Button>*/}
                    <ContactMeModal first={handleClose} />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProfileInformCollectionModal;