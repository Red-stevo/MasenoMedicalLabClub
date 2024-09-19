import {Button, FloatingLabel, Form, Spinner} from "react-bootstrap";
import "./../Styles/AddEventPage.css";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearErrorMessage, saveEvent} from "../../../../ReduxStorage/EventsStore/saveEventReducer.js";
import dayjs from "dayjs";


const AddEventPage = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const {successMessage, errorMessage, status} = useSelector(state => state.saveEventReducer);


    useEffect(() => {

        if (errorMessage){
            setTimeout(() => {
                //clear the error message.
                dispatch(clearErrorMessage());
            }, 6000)
        }else if (successMessage){

        }
    }, [successMessage, errorMessage]);

    /*Cloudinary upload widget setup.*/
    const uploadWidget = () => window.cloudinary.openUploadWidget(
        {
            cloudName:"de91mnunt",
            uploadPreset:"MasenoMedLabClub",
            sources:["local", "camera", "url"],
            multiple:true,
            maxFiles: 20,
            folder: "events_images_folder",
            resourceType: "image",
            cropping: false,
            showUploadMoreButton: true,
        },
        (error, result) => {
            if (error){
                console.log("Error Occurred ", error)
            }else if (result.event === "success"){
                console.log(result);
                setImageUrls((urls) =>[...urls,
                    {url: result.info.secure_url, imageId:result.info.public_id}]);
            }
        }
    );


    /*Dispatch action to save new event.*/
    const handleEventSubmit = (data) => {
        /*Convert the date to be compatible with java Instance object for date and time.*/
        const date = dayjs(data.eventDate).toISOString();

        const eventData = {...data, requestList:imageUrls,eventDate:date }

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

            <Button disabled={status === "loading"} onClick={uploadWidget} className={"upload-widget"}>
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