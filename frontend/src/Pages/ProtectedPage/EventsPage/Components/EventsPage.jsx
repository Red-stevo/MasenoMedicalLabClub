import "./../Styles/EventsPage.css";
import {Button, Card} from "react-bootstrap";
import {IoAddSharp} from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchEvents} from "../../../../ReduxStorage/EventsStore/GetEvents.js";
import imagePlaceHolder from "./../Assets/missingImageHolder.png";
import {random} from "../../CommonJS/Random.js";
const EventsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userEvents = useSelector((state) => state.events);


    /*handled redirection to the add userEvents page.*/
    const handleAddEventClick = (event) => {
        event.preventDefault();

        navigate("/home/events/add");
    }

    //get user userEvents when the page loads.
    useEffect(() => {
        dispatch(fetchEvents());
    }, []);


    return (
        <div className={"events-page"}>
            {userEvents.length > 0 && userEvents.map(({eventId, eventName, eventImages}) => {
                return (
                    <>
                        <Link to={`/home/events/${eventId}`} className={"events-card"} key={eventId}>
                            <Card className={"events-card"}>
                                <Card.Img variant="bottom"
                                       src={eventImages.length > 0 ?
                                           eventImages[random(eventImages.length)].imageUrl : imagePlaceHolder}
                                       height={250} width={250} alt={"Event Holder image"}/>
                                <Card.Body>
                                    <Card.Text>
                                        {eventName}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                        <br/>
                    </>
                )
            })} {/*This gives an error map not a method.*/}
            <Button onClick={handleAddEventClick} className={"add-event"}><IoAddSharp /> Event</Button>
        </div>
    );
};

export default EventsPage;