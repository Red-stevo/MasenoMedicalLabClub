import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./../Styles/EventDataView.css";
import {useDispatch, useSelector} from "react-redux";
import {getEventAsyncReducer} from "../../../../ReduxStorage/EventsStore/getEventSlice.js";
import {Button, Dropdown, DropdownButton, FloatingLabel, Form, Image} from "react-bootstrap";
import {SlArrowDown} from "react-icons/sl";
import DeleteImageModel from "./DeleteImageModel.jsx";
import {FaPlus} from "react-icons/fa";
import {useForm} from "react-hook-form";
import DeleteEventModal from "./DeleteEventModal.jsx";
import {structureDateFormat} from "../../CommonJS/structureDateFormat.js";
import {convertToLocalDateTimeFormat} from "../../CommonJS/convertToLocalDateTimeFormat.js";
import {uploadWidget} from "../../CommonJS/uploadWidget.js";
import {clearErrorMessage, updateEventReducer} from "../../../../ReduxStorage/EventsStore/saveEventReducer.js";
import dayjs from "dayjs";

const EventDataView = () => {
    const {eventName, eventDescription, eventDate, eventLocation, eventImages, status, errorMessage
    } = useSelector(state =>  state.eventReducer);
    const {register, handleSubmit, reset
    } = useForm();
    const {eventId} = useParams();
    const dispatch = useDispatch();
    const [updates, setUpdates] = useState(false);
    const [zoomImage, setZoomImage] = useState(null);
    const  userRole = useSelector(state => state.loginReducer.userRole);
    const [structuredDate , setStructuredDate] = useState({});
    const [imageUrls, setImageUrls] = useState([]);
    const updateSuccess = useSelector(state => state.saveEventReducer.successMessage);

    useEffect(() => {

        /*Set all field values to be updated.*/
        if (eventDate && eventLocation && eventName && eventDescription) {
            reset({
                eventName: eventName,
                eventDescription: eventDescription,
                eventDate: convertToLocalDateTimeFormat(eventDate),
                eventLocation: eventLocation});
        }

        setStructuredDate(structureDateFormat(eventDate));
    }, [reset, eventDate, eventLocation, eventName, eventDescription]);

    /*reload page on successful event update*/
    useEffect(() => {
        if (updateSuccess === "event updated successfully"){
            window.location.reload();
        }
    }, [updateSuccess]);



    /*Handle sending updates to the server.*/
    const handleEventUpdate = (data) => {
        console.error("updated data",data);
        const putData={...data, requestList:imageUrls, eventId, eventDate:dayjs(data.eventDate).toISOString()};
        console.error("updated data",putData);
        dispatch(updateEventReducer(putData));

        setImageUrls([]);
    }

    /*Get event details whe thr component mounts.*/
    useEffect(() => {
        dispatch(getEventAsyncReducer(eventId));
    }, []);

    /*clear the errorMessage*/
    useEffect(() => {
        if(errorMessage){
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 600)
        }
    }, []);

    return (
        <div className={"images-view-page"}>
            {status === "success" ?
                <>
                {updates ? userRole === "ADMIN" &&<>
                    <Form onSubmit={handleSubmit(handleEventUpdate)} className={"update-form"} >
                        <Form.Group>
                            <Form.Label className={"form-label"} htmlFor={"eventName"}>Event Name : </Form.Label>
                            <input className={"form-control"} id={"eventName"} {...register("eventName")}  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label  className={"form-label"} htmlFor={"eventDate"}>Event Date : </Form.Label>
                            <input className={"form-control"}
                                   id={"eventDate"}
                                   type={"datetime-local"}
                                   {...register("eventDate")}  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={"form-label"} htmlFor={"eventLocation"}>Event Location : </Form.Label>
                            <input className={"form-control"}
                                   id={"eventLocation"}
                                   {...register("eventLocation")} />
                        </Form.Group>
                    <FloatingLabel className={"description-text-area"} controlId="floatingTextarea" label="Event Decription">
                        <input
                            required={true}
                            id={"eventDescription"}
                            className={"form-control"}
                            as="textarea"
                            placeholder="Event Description"
                            style={{ height: '150px' }}
                            {...register("eventDescription")}
                        />
                    </FloatingLabel>
                            <Button type={"submit"} className={"update-button"}>Update</Button>
                    </Form>

                    <Button onClick={() => uploadWidget(setImageUrls)} className={"plus-images"}><FaPlus /> Images</Button>
                </> :

                    <section className={"event-details"}>
                        <div className={"event-details-shiny-effect"}>
                            { userRole === "ADMIN" &&
                            <DropdownButton className={"edit-dropdown"} title={<SlArrowDown className={"edit-arrow"} />}>
                                <Dropdown.Item className={"edit-event"}
                                               onClick={() => setUpdates(prevState => !prevState)}>Edit
                                </Dropdown.Item>
                                <Dropdown.Item className={"delete-event"}><DeleteEventModal /></Dropdown.Item>
                            </DropdownButton>}
                            <h2 className={"display-event-name"}>{eventName}</h2>
                            <div className={"location-date-holder"}>
                                <h3 className={"display-event-date"}>
                                    Date : {structuredDate.date} Time : {structuredDate.time}</h3>
                                <h3 className={"display-event-location"}>Location : {eventLocation}</h3>
                            </div>
                            <h3 className={"display-event-description-title"}>Description : </h3>
                            <p className={"display-event-description-text"}>{eventDescription}</p>
                        </div>
                    </section>
                }
                    <div className={"images-section"}>
                        {eventImages.map(({imageUrl, imageId}) => (
                                <div className={"image-delete"} key={imageId}>
                                    {userRole === "ADMIN" && updates && <DeleteImageModel/>}
                                    <Image src={imageUrl} alt={`img-${imageId}`}
                                        className={zoomImage === imageId ? "zoomed-image" : "image-holder"}
                                    onClick={() => setZoomImage(zoomImage ? null : imageId)}/>
                                </div>
                            )
                        )}
                    </div>
                </> : errorMessage && <div className={"error-message-animation"}>{errorMessage}</div>
            }
        </div>
    );
};

export default EventDataView;