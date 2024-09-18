import {FloatingLabel, Form} from "react-bootstrap";
import "./../Styles/AddEventPage.css";

const AddEventPage = () => {
    return (
        <Form className={"add-event-form"}>
            <Form.Group>
                <Form.Label>Events Title : </Form.Label>
                <Form.Control type={"text"} />
            </Form.Group>

            <FloatingLabel controlId="floatingTextarea" label="Event Decription">
                <Form.Control
                    as="textarea"
                    placeholder="Event Description"
                    style={{ height: '100px' }}
                />
            </FloatingLabel>

            <Form.Group>
                <Form.Label>Event Images : </Form.Label>
                <Form.Control type={"file"} />
            </Form.Group>
        </Form>
    );
};

export default AddEventPage;