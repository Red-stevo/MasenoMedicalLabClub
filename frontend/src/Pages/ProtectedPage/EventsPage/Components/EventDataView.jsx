import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./../Styles/EventDataView.css";
import {useDispatch, useSelector} from "react-redux";
import {getEventAsyncReducer} from "../../../../ReduxStorage/EventsStore/getEventSlice.js";
import {Dropdown, DropdownButton, Form, Image} from "react-bootstrap";
import {SlArrowDown} from "react-icons/sl";
import {GoTrash} from "react-icons/go";
import DeleteImageModel from "./DeleteImageModel.jsx";

const EventDataView = () => {
    const {eventId} = useParams();
    const dispatch = useDispatch();
    const {eventName, eventDescription, eventDate, eventLocation, eventImages, status, errorMessage} = useSelector(state =>  state.eventReducer);
    const [updates, setUpdates] = useState(false);
    const [zoomImage, setZoomImage] = useState(null);
    const  userRole = useSelector(state => state.loginReducer.userRole);
    const  [deleteImage, setDeleteImage] = useState(false);


    useEffect(() => {
        dispatch(getEventAsyncReducer(eventId));
    }, []);

    return (
        <div className={"images-view-page"}>
            {status === "success" &&
                <>
                {updates ? <Form >
                        <Form.Group>
                            <Form.Label>Event Name : </Form.Label>
                            <input className={"form-control"}  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event Date : </Form.Label>
                            <input className={"form-control"}  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event Location : </Form.Label>
                            <input className={"form-control"}  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event Description : </Form.Label>
                            <input className={"form-control"}  />
                        </Form.Group>
                    </Form> :

                    <section className={"event-details"}>
                        <div className={"event-details-shiny-effect"}>
                            { userRole === "ADMIN" &&
                            <DropdownButton className={"edit-dropdown"} title={<SlArrowDown className={"edit-arrow"} />}>
                                <Dropdown.Item>Edit</Dropdown.Item>
                                <Dropdown.Item>Delete</Dropdown.Item>
                            </DropdownButton>}
                            <h2 className={"display-event-name"}>{eventName}</h2>
                            <div className={"location-date-holder"}>
                                <h3 className={"display-event-date"}>Date : {eventDate}</h3>
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
                                   <DeleteImageModel />
                                    <Image src={imageUrl} alt={`img-${imageId}`}
                                        className={zoomImage === imageId ? "zoomed-image" : "image-holder"}
                                    onClick={() => setZoomImage(zoomImage ? null : imageId)}/>
                                </div>
                            )
                        )}
                    </div>
            </>
}
        </div>
    );
};

export default EventDataView;