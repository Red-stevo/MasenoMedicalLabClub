import "./../Styles/UserProfilePage.css";
import {Card, Image} from "react-bootstrap";
import {FcAddImage} from "react-icons/fc";
import {LiaEdit} from "react-icons/lia";
const UserProfilePage = () => {
    return (
        <div className={"user-profile-page lato-regular"}>
            <div className={"image-profile-holder"}>
               <div className={"profile-image-background"}>
                   <FcAddImage className={"add-image-button"}/>
                   <Image  alt={"Profile image"}  roundedCircle className={"profile-image image-holder"}
                           src="https://res.cloudinary.com/de91mnunt/image/upload/v1728578611/events_images_folder/qy1gnamxtoc4hq0vcvcw.png"/>
               </div>
                <div>
                    <Card className={"profile-card"}>
                        <Card.Body className={"profile-card-body"}>
                            <Card.Title className={"user-name"}>Stephen Muiru</Card.Title>
                            <Card.Title className={"reg-no"}>C026-01-0931/2022</Card.Title>
                        </Card.Body>
                    </Card>

                    <div>
                        <div className={"contact-me-edit-holder"}>
                            <h5 className={"contact-me-header"}>Contact Me</h5><LiaEdit className={"edit-icon"}/>
                        </div>
                        <div className={"contact-me-body"}>
                            <div className={"contact-me-image-holder"}>
                                <Image variant="top" className={"image-holder contact-image"}
                                       src="https://res.cloudinary.com/de91mnunt/image/upload/v1728578611/events_images_folder/qy1gnamxtoc4hq0vcvcw.png"/>
                                <h6>WhatsApp</h6>
                            </div>
                            <div className={"contact-me-image-holder"}>
                                <Image variant="top" className={"image-holder contact-image"}
                                       src="https://res.cloudinary.com/de91mnunt/image/upload/v1728578611/events_images_folder/qy1gnamxtoc4hq0vcvcw.png"/>
                                <h6>WhatsApp</h6>
                            </div>
                            <div className={"contact-me-image-holder"}>
                                <Image variant="top" className={"image-holder contact-image"}
                                       src="https://res.cloudinary.com/de91mnunt/image/upload/v1728578611/events_images_folder/qy1gnamxtoc4hq0vcvcw.png"/>
                                <h6>WhatsApp</h6>
                            </div>
                            <div className={"contact-me-image-holder"}>
                                <Image variant="top" className={"image-holder contact-image"}
                                       src="https://res.cloudinary.com/de91mnunt/image/upload/v1728578611/events_images_folder/qy1gnamxtoc4hq0vcvcw.png"/>
                                <h6>WhatsApp</h6>
                            </div>
                            <div className={"contact-me-image-holder"}>
                                <Image variant="top" className={"image-holder contact-image"}
                                       src="https://res.cloudinary.com/de91mnunt/image/upload/v1728578611/events_images_folder/qy1gnamxtoc4hq0vcvcw.png"/>
                                <h6>WhatsApp</h6>
                            </div>
                            <div className={"contact-me-image-holder"}>
                                <Image variant="top" className={"image-holder contact-image"}
                                       src="https://res.cloudinary.com/de91mnunt/image/upload/v1728578611/events_images_folder/qy1gnamxtoc4hq0vcvcw.png"/>
                                <h6>WhatsApp</h6>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserProfilePage;