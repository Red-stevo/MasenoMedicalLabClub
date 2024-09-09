import "./IndexPageStyles/IndexPageContactUs.css";
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import instagramIcon from "./IndexPageAssets/InstagramIcon.png";
import facebookIcon from "./IndexPageAssets/FacebookIcon.png";
import xIcon from "./IndexPageAssets/XIcon.png";
import linkedInIcon from "./IndexPageAssets/LinkedInIcon.png";
import whatsAppIcon from "./IndexPageAssets/whatsAppIcon.png";
import gmailIcon from "./IndexPageAssets/G+Icon.png";
const IndexPageContactUs = () => {
    return (
        <div id={"contactUS"}>
            <h2 className={"contact-us-header"}>Contact US</h2>

            <div className={"icons-section"}>
                <div className={"left-icons"}>
                    <Link to={"https://www.instagram.com/maseno.mlssa?igsh=MW1iZWs4emJxZzdnag=="}
                    target={"_blank"} rel={"no-opener no-referrer"} className={"icon"}>
                        <Image src={instagramIcon} alt={"Instagram icon."} height={150} width={150}/>
                        <span>Follow Us on Instagram</span>
                    </Link>

                    <Link to={"https://m.facebook.com/groups/487454420299782/?ref=share&mibextid=NSMWBT"}
                          target={"_blank"} rel={"no-opener no-referrer"} className={"icon"}>
                        <Image src={facebookIcon} alt={"facebook icon"} height={150} width={150}/>
                        <span>Follow Us on Facebook</span>
                    </Link>

                    <Link to={"https://x.com/Maseno_MLSSA?t=pMaP4iNzKPwFhR8QDSyGOQ&s=09"}
                          target={"_blank"} rel={"no-opener no-referrer"}  className={"icon"}>
                        <Image src={xIcon} alt={"X Icon"} height={150} width={150}></Image>
                        <span>Follow Us on X</span>
                    </Link>
                </div>
                <div className={"right-icon"}>
                    <Link to={"https://www.linkedin.com/groups/9849659"} target={"_blank"}
                          rel={"no-opener no-referrer"}  className={"icon"}>
                        <Image src={linkedInIcon} alt={"LinkedIn icon"} height={150} width={150}/>
                        <span>Find Us on LinkedIn</span>
                    </Link>

                    <Link to={"https://chat.whatsapp.com/FfRnluR5acgHWeJhgBanY5"} target={"_blank"}
                          rel={"no-opener no-referrer"}  className={"icon"}>
                        <Image src={whatsAppIcon} alt={"WhatsApp Icon"} height={150} width={150}/>
                        <span>Contact Us via WhatsApp</span>
                    </Link>

                    <Link to={"mailto:maseno.mlssa@gmail.com"} target={"_blank"} rel={"no-opener no-referrer"}
                          className={"icon"}>
                        <Image src={gmailIcon} alt={"gmail icon"} height={150} width={150}/>
                        <span>Email Us at Gmail</span>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default IndexPageContactUs;