import "./../Styles/UserProfilePage.css";
import {Card, Image} from "react-bootstrap";
import {FcAddImage} from "react-icons/fc";
const UserProfilePage = () => {
    return (
        <div className={"user-profile-page"}>
            <div className={"image-profile-holder"}>
               <div className={"profile-image-background"}>
                   <FcAddImage className={"add-image-button"}/>
                   <Image  alt={"Profile image"}  roundedCircle className={"profile-image image-holder"}
                           src="https://res.cloudinary.com/de91mnunt/image/upload/v1728578611/events_images_folder/qy1gnamxtoc4hq0vcvcw.png"/>
               </div>
                <Card className={"profile-card"}>
                    <Card.Body className={"profile-card-body"}>
                        <Card.Title className={"user-name"}>Stephen Muiru</Card.Title>
                        <Card.Text>
                            <h5>Contact Me</h5>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        </div>
    );
};

export default UserProfilePage;