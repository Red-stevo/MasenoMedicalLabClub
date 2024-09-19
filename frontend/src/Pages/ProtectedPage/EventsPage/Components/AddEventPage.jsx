import {Button, FloatingLabel, Form} from "react-bootstrap";
import "./../Styles/AddEventPage.css";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {saveEvent} from "../../../../ReduxStorage/EventsStore/saveEventReducer.js";


const AddEventPage = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();


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
    )


    /*Dispatch action to save new event.*/
    const handleEventSubmit = (data) => {
        const eventData = {...data, requestList:imageUrls}
        console.log(eventData);

        dispatch(saveEvent(eventData));

        setImageUrls([]);
    }

    return (
        <Form className={"add-event-form"} onSubmit={handleSubmit(handleEventSubmit)}>
            <Form.Group className={"event-title"}>
                <Form.Label>Events Title : </Form.Label>
                <input
                    className={"input-field form-control"}
                    type={"text"}
                    {...register("eventName")}
                />
            </Form.Group>

            <Form.Group className={"event-title"}>
                <Form.Label>Event Date : </Form.Label>
                <input
                    className={"input-field form-control"}
                    type={"datetime-local"}
                    {...register("eventDate")}
                />
            </Form.Group>

            <Form.Group className={"event-title"}>
                <Form.Label>Event Location : </Form.Label>
                <input
                    className={"input-field form-control"}
                    type={"text"}
                    {...register("eventLocation")}
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

            <Button onClick={uploadWidget} className={"upload-widget"}>Upload Images</Button>

            <Button type={"submit"} className={"upload-button"}>Post</Button>
        </Form>
    );
};

export default AddEventPage;