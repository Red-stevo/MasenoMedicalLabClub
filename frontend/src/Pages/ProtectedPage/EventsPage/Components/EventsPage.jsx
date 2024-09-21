import "./../Styles/EventsPage.css";
import {Button, Card} from "react-bootstrap";
import {IoAddSharp} from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import getEvents, {fetchEvents} from "../../../../ReduxStorage/EventsStore/GetEvents.js";
const EventsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events);
    /*handled redirection to the add events page.*/
    const handleAddEventClick = (event) => {
        event.preventDefault();

        navigate("/home/events/add");
    }

    //get user events when the page loads.
    useEffect(() => {
        dispatch(fetchEvents());
    }, [1]);


    return (
        <div className={"events-page"}>
            <Link to={"#"} className={"events-card"}>
                <Card className={"events-card"}>
                    <Card.Img variant="top" src="holder.js/80px80"/>
                    <Card.Body>
                        <Card.Text>
                            Some quick bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
            <br/>

            <Button onClick={handleAddEventClick} className={"add-event"}><IoAddSharp /> Event</Button>
        </div>
    );
};

export default EventsPage;