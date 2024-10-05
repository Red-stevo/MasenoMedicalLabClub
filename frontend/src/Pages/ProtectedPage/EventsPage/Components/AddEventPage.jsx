import {Button, FloatingLabel, Form, Spinner} from "react-bootstrap";
import "./../Styles/AddEventPage.css";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    clearErrorMessage,
    clearSuccessMessage,
    saveEvent,
    setUploadError
} from "../../../../ReduxStorage/EventsStore/saveEventReducer.js";
import dayjs from "dayjs";
import {uploadWidget} from "../../CommonJS/uploadWidget.js";
import {useNavigate} from "react-router-dom";


const AddEventPage = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const {successMessage, errorMessage, status} = useSelector(state => state.saveEventReducer);
    const navigate = useNavigate();


    useEffect(() => {
        if (errorMessage){
            setTimeout(() => {
                //clear the error message.
                dispatch(clearErrorMessage());
            }, 5000);

        }else if (successMessage)
            navigate("/home/events");

    }, [successMessage, errorMessage, status]);


    /*Dispatch action to save new event.*/
    const handleEventSubmit = (data) => {
        /*Convert the date to be compatible with java Instance object for date and time.*/
        const eventData = {...data, requestList:imageUrls,eventDate:dayjs(data.eventDate).toISOString() }

        /*dispatch saving action*/
        dispatch(saveEvent(eventData));

        /*reset the input fields.*/
        setImageUrls([]);
    };

    return (
        <Form className={"add-event-form"} onSubmit={handleSubmit(handleEventSubmit)} aria-disabled={true}>
            <Form.Group className={"event-title"}>
                <Form.Label>Events Title : </Form.Label>
                <input
                    disabled={status === "loading"}
                    required={true}
                    className={"input-field form-control"}
                    type={"text"}
                    {...register("eventName")}
                />
            </Form.Group>

            <Form.Group className={"event-title"}>
                <Form.Label>Event Date : </Form.Label>
                <input
                    disabled={status === "loading"}
                    required={true}
                    id={"date"}
                    className={"input-field form-control"}
                    type={"datetime-local"}
                    {...register("eventDate")}
                />
            </Form.Group>

            <Form.Group className={"event-title"}>
                <Form.Label>Event Location : </Form.Label>
                <input
                    disabled={status === "loading"}
                    required={true}
                    className={"input-field form-control"}
                    type={"text"}
                    {...register("eventLocation")}
                />
            </Form.Group>

            <FloatingLabel className={"event-description"} controlId="floatingTextarea" label="Event Decription">
                <input
                    disabled={status === "loading"}
                    required={true}
                    className={"input-field form-control"}
                    as="textarea"
                    placeholder="Event Description"
                    style={{ height: '150px' }}
                    {...register("eventDescription")}
                />
            </FloatingLabel>

            <Button disabled={status === "loading"} onClick={() => uploadWidget(setImageUrls)}
                    className={"upload-widget"}>
                Upload Images
            </Button>

            <Button type={"submit"} className={"upload-button"}>Post</Button>

            {status === "loading"&& <div className={"loading"}>
                <Spinner animation={"grow"} />
            </div>}

            {errorMessage && <div className={"error-message-animation"}>{errorMessage}</div>}

            {successMessage && <div className={"success-message-animation"}>{successMessage}</div>}
        </Form>
    );
};

export default AddEventPage;