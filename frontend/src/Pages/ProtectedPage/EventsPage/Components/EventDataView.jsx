import {useParams} from "react-router-dom";
import {useEffect} from "react";
import "./../Styles/EventDataView.css";
import {useDispatch, useSelector} from "react-redux";
import {getEventAsyncReducer} from "../../../../ReduxStorage/EventsStore/getEventSlice.js";
import Masonry from "react-masonry-css";

const EventDataView = () => {
    const {eventId} = useParams();
    const dispatch = useDispatch();
    const {eventName, eventDescription, eventDate, eventLocation, eventImages, status, errorMessage} =
        useSelector(state =>  state.eventReducer);


    useEffect(() => {
        dispatch(getEventAsyncReducer(eventId));
    }, []);

    return (
        <div className={"images-view-page"}>
            {status === "success" &&
                <>
                    <section className={"event-details"}>
                        <h2>{eventName}</h2>
                        <h3>Date : {eventDate}</h3>
                        <h3>Location : {eventLocation}</h3>
                        <h3>Description : </h3>
                        <p>{eventDescription}</p>
                    </section>
                    <div className={"images-section"}>
                        {eventImages.map(({imageUrl, imageId}) => (
                                <div className={"image-holder"} key={imageId}>
                                    <img src={imageUrl} alt={`img-${imageId}`}/>
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