import {Button, FloatingLabel, Form} from "react-bootstrap";
import "./../Styles/AddEventPage.css";
import {useForm} from "react-hook-form";
import {useState} from "react";

const AddEventPage = () => {
    const [eventImages, setEventImages] = useState([]);
    const {register, handleSubmit} = useForm();

    const handleEventSubmit = (data) => {
        const eventData = {...data, eventImages};
        console.log(eventData);
    }

    const handleImageAddition = (e) => {
        const file = Array.from(e.target.files);
        setEventImages([...eventImages, file]);
    }


    return (
        <Form className={"add-event-form"} onSubmit={handleSubmit(handleEventSubmit)}>
            <Form.Group className={"event-title"}>
                <Form.Label>Events Title : </Form.Label>
                <input
                    className={"input-field form-control"}
                    type={"text"}
                    {...register("eventTitle")}
                />
            </Form.Group>

            <FloatingLabel className={"event-description"} controlId="floatingTextarea" label="Event Decription">
                <input
                    className={"input-field form-control"}
                    as="textarea"
                    placeholder="Event Description"
                    style={{ height: '150px' }}
                    {...register("eventDescription")}
                />
            </FloatingLabel>

            <Form.Group>
                <Form.Label>Event Images : </Form.Label>
                <input
                    className={"form-control input-field"}
                    type={"file"}
                    multiple={true}
                    onChange={handleImageAddition}
                />
            </Form.Group>

            <Button type={"submit"} className={"upload-button"}>Post</Button>
        </Form>
    );
};

export default AddEventPage;