import "./../Styles/EventsPage.css";
import {Button, Card} from "react-bootstrap";
import {IoAddSharp} from "react-icons/io5";
const EventsPage = () => {
    return (
        <div className={"events-page"}>
            <Card className={"events-card"}>
                <Card.Img variant="top" src="holder.js/80px80"/>
                <Card.Body>
                    <Card.Text>
                        Some quick bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <Card className={"events-card"}>
                <Card.Img variant="top" src="holder.js/100px180"/>
                <Card.Body>
                    <Card.Text>
                        Some quick bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <Card className={"events-card"}>
                <Card.Img variant="top" src="holder.js/100px180"/>
                <Card.Body>
                    <Card.Text>
                        Some quick bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <Card className={"events-card"}>
                <Card.Img variant="top" src="holder.js/80px80"/>
                <Card.Body>
                    <Card.Text>
                        Some quick bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <Card className={"events-card"}>
                <Card.Img variant="top" src="holder.js/100px180"/>
                <Card.Body>
                    <Card.Text>
                        Some quick bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <Card className={"events-card"}>
                <Card.Img variant="top" src="holder.js/100px180"/>
                <Card.Body>
                    <Card.Text>
                        Some quick bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Button className={"add-event"}><IoAddSharp /> Event</Button>
        </div>
    );
};

export default EventsPage;