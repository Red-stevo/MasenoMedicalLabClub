import {useParams} from "react-router-dom";
import {useEffect} from "react";
import "./../Styles/EventDataView.css";
import {fetchEvents} from "../../../../ReduxStorage/EventsStore/GetEvents.js";
import {useDispatch} from "react-redux";

const EventDataView = () => {
    const {eventId} = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchEvents());
    }, []);

    return (
        <div className={"images-view-page"}>
            <h2>Event data.</h2>
        </div>
    );
};

export default EventDataView;