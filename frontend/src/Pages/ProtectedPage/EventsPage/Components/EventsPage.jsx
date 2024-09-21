import "./../Styles/EventsPage.css";
import {Button, Card} from "react-bootstrap";
import {IoAddSharp} from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
const EventsPage = () => {
    const navigate = useNavigate();

    const handleAddEventClick = (event) => {
        event.preventDefault();

        navigate("/home/events/add");
    }

    useEffect(() => {

    }, []);

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

            <Button onClick={handleAddEventClick} className={"add-event"}><IoAddSharp /> Event</Button>
        </div>
    );
};

export default EventsPage;