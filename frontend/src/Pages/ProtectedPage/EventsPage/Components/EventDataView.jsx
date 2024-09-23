import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./../Styles/EventDataView.css";
import {useDispatch, useSelector} from "react-redux";
import {getEventAsyncReducer} from "../../../../ReduxStorage/EventsStore/getEventSlice.js";
import {Button, Dropdown, DropdownButton, FloatingLabel, Form, Image} from "react-bootstrap";
import {SlArrowDown} from "react-icons/sl";
import DeleteImageModel from "./DeleteImageModel.jsx";
import {FaAd, FaPlus} from "react-icons/fa";
import {useForm} from "react-hook-form";
import DeleteEventModal from "./DeleteEventModal.jsx";

const EventDataView = () => {
    const {eventName, eventDescription, eventDate, eventLocation, eventImages, status, errorMessage}
        = useSelector(state =>  state.eventReducer);
    const {eventId} = useParams();
    const dispatch = useDispatch();
    const [updates, setUpdates] = useState(false);
    const [zoomImage, setZoomImage] = useState(null);
    const  userRole = useSelector(state => state.loginReducer.userRole);
    const {register, handleSubmit, reset} = useForm();
    const [structuredDate , setStructuredDate] = useState({});

    useEffect(() => {
        const convertToLocalDateTimeFormat = (isoDateString) => {
            const date = new Date(isoDateString);

            // Pad the month, day, hours, and minutes with leading zeros if needed
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            // Return the formatted string suitable for input[type="datetime-local"]
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        }


        if (eventDate && eventLocation && eventName && eventDescription){
            reset(
                {
                    eventName:eventName,
                    eventDescription:eventDescription,
                    eventDate:convertToLocalDateTimeFormat(eventDate),
                    eventLocation:eventLocation
                }
            );
        }

        setStructuredDate(structureDateFormat(eventDate));
    }, [reset, eventDate, eventLocation, eventName, eventDescription]);

    const handleEventUpdate = (data) => {

    }

    const structureDateFormat = (date) => {
        const newDate = new Date(date);

        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const day = String(newDate.getDate()).padStart(2, '0');
        const hours = String(newDate.getHours()).padStart(2, '0');
        const minutes = String(newDate.getMinutes()).padStart(2, '0');

        return {date:`${year}-${month}-${day}` , time:`${hours}:${minutes}`}

    }


    useEffect(() => {
        dispatch(getEventAsyncReducer(eventId));
    }, []);

    return (
        <div className={"images-view-page"}>
            {status === "success" &&
                <>
                {updates ? userRole === "ADMIN" &&<><Form onSubmit={handleSubmit(handleEventUpdate)} className={"update-form"} >
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
                    <Button className={"plus-images"}><FaPlus /> Images</Button>
                </> :

                    <section className={"event-details"}>
                        <div className={"event-details-shiny-effect"}>
                            { userRole === "ADMIN" &&
                            <DropdownButton className={"edit-dropdown"} title={<SlArrowDown className={"edit-arrow"} />}>
                                <Dropdown.Item onClick={() => setUpdates(prevState => !prevState)}>Edit
                                </Dropdown.Item>
                                <Dropdown.Item><DeleteEventModal /></Dropdown.Item>
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
            </>}
        </div>
    );
};

export default EventDataView;