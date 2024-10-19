import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {LiaEdit} from "react-icons/lia";
import {FloatingLabel, Form} from "react-bootstrap";



const ProfileInformCollectionModal =   () =>  {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <LiaEdit className={"edit-icon"} onClick={handleShow}/>
            <Modal size={"lg"} show={show} onHide={handleClose} backdrop="static" keyboard={false} scrollable={true}>
                <Modal.Header className={"profile-modal-title"} closeButton>
                    <Modal.Title className={'update-title'} >Update Profile</Modal.Title>
                </Modal.Header >
                <Modal.Body>
                   <Form>
                       <Form.Group>
                           <Form.Label htmlFor={'profile-username'}>First Name : </Form.Label>
                           <input className={"form-control"}/>
                       </Form.Group>
                       <Form.Group>
                           <Form.Label htmlFor={'profile-username'}>Second Name : </Form.Label>
                           <input className={"form-control"}/>
                       </Form.Group>
                       <Form.Group>
                           <Form.Label htmlFor={'profile-username'}>Admission No. : </Form.Label>
                           <input className={"form-control"}/>
                       </Form.Group>
                       <FloatingLabel className={"event-description"} controlId="floatingTextarea" label="Event Decription">
                           <input required={true} as="textarea" placeholder="Research Description"
                                  style={{ height: '150px' }} className={"research-description"}
                           />
                       </FloatingLabel>
                   </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  className={'cancel-profile-changes'} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className={'save-profile-changes'} >Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProfileInformCollectionModal;