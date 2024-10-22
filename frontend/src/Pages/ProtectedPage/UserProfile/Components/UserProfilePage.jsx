import "../Styles/UserProfilePage.css";
import {Card, Image} from "react-bootstrap";
import {FcAddImage} from "react-icons/fc";
import {LiaEdit} from "react-icons/lia";
import ProfileInformCollectionModal from "./ProfileInformCollectionModal.jsx";
const UserProfilePage = () => {
    return (
        <div className={"user-profile-page lato-regular"}>
            <div className={"image-profile-holder"}>
               <div className={"profile-image-background"}>
                   <FcAddImage className={"add-image-button"}/>
                   <Image  alt={"Profile image"}  roundedCircle className={"profile-image image-holder"}
                         src="https://res.cloudinary.com/de91mnunt/image/upload/v1728578611/events_images_folder/qy1gnamxtoc4hq0vcvcw.png"/>
               </div>
                <Card className={"profile-card"}>
                    <Card.Body className={"profile-card-body"}>
                        <Card.Title className={"user-name"}>Stephen Muiru</Card.Title>
                        <Card.Title className={"reg-no"}>C026-01-0931/2022</Card.Title>
                    </Card.Body>
                </Card>

                {/*Contact me display section*/}
                <div>
                    <div className={"contact-me-edit-holder"}>
                        <h5 className={"contact-me-header"}>Contact Me</h5>
                        <ProfileInformCollectionModal />
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
                    </div>
                </div>

                {/*User research display section*/}
                <div className={"research-section"}>
                    <div>
                        <h5 className={"research-header"}>My Research</h5>
                        <div>
                            <h5 className={"research-title"}>Title</h5>
                            <h5 className={"research-description"}>Description</h5>
                            <section className={"research-description-area"}>
                                Research short description.Research short description.Research short description.<br/>
                                Research short description.Research short description.Research short description.<br/>
                                Research short description.Research short description.Research short description.<br/>

                            </section>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;