import "../IndexPageStyles/IndexPageContactUs.css";
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import instagramIcon from "../IndexPageAssets/InstagramIcon.png";
import facebookIcon from "../IndexPageAssets/FacebookIcon.png";
import xIcon from "../IndexPageAssets/XIcon.png";
import linkedInIcon from "../IndexPageAssets/LinkedInIcon.png";
import whatsAppIcon from "../IndexPageAssets/whatsAppIcon.png";
import gmailIcon from "../IndexPageAssets/G+Icon.png";
import youtubeIcon from "../IndexPageAssets/YoutubeIcon.png";
import tiktokIcon from "../IndexPageAssets/TiktokIcon.png";
const IndexPageContactUs = () => {
    return (
        <div id={"contactUS"}>
            <h2 className={"contact-us-header"}>Contact US</h2>

            <div className={"icons-section"}>
                <div className={"left-icons"}>
                    <Link to={"https://www.instagram.com/maseno.mlssa?igsh=MW1iZWs4emJxZzdnag=="}
                    target={"_blank"} rel={"no-opener no-referrer"} className={"icon"}>
                        <Image src={instagramIcon} alt={"Instagram icon."} height={120} width={100}/>
                        <span>Follow Us</span>
                    </Link>

                    <Link to={"https://m.facebook.com/groups/487454420299782/?ref=share&mibextid=NSMWBT"}
                          target={"_blank"} rel={"no-opener no-referrer"} className={"icon"}>
                        <Image src={facebookIcon} alt={"facebook icon"} height={120} width={100}/>
                        <span>Follow Us</span>
                    </Link>

                    <Link to={"https://x.com/Maseno_MLSSA?t=pMaP4iNzKPwFhR8QDSyGOQ&s=09"}
                          target={"_blank"} rel={"no-opener no-referrer"}  className={"icon"}>
                        <Image src={xIcon} alt={"X Icon"} height={120} width={100}></Image>
                        <span>Follow Us</span>
                    </Link>

                    <Link to={"https://youtube.com/@maseno.mmlssa?si=y6OvCvptjsAK3wco"} target={"_blank"}
                          rel={"no-opener no-referrer"} className={"icon"}>
                        <Image src={youtubeIcon} alt={"Youtube Icon"} height={120} width={100}/>
                        <span>Subscribe</span>
                    </Link>
                </div>
                <div className={"right-icon"}>
                    <Link to={"https://www.tiktok.com/@maseno.mlssa?_t=8pZxwVCbnle&_r=1"} target={"_blank"}
                          rel={"no-opener no-referrer"} className={"icon"}>
                        <Image src={tiktokIcon} alt={"Tiktok icon"} height={120} width={100}/>
                        <span>Follow Us</span>
                    </Link>

                    <Link to={"https://chat.whatsapp.com/FfRnluR5acgHWeJhgBanY5"} target={"_blank"}
                          rel={"no-opener no-referrer"}  className={"icon"}>
                        <Image src={whatsAppIcon} alt={"WhatsApp Icon"} height={120} width={100}/>
                        <span>Message Us</span>
                    </Link>

                    <Link to={"https://www.linkedin.com/groups/9849659"} target={"_blank"}
                          rel={"no-opener no-referrer"}  className={"icon"}>
                        <Image src={linkedInIcon} alt={"LinkedIn icon"} height={120} width={100}/>
                        <span>Find Us</span>
                    </Link>

                    <Link to={"mailto:maseno.mlssa@gmail.com"} target={"_blank"} rel={"no-opener no-referrer"}
                          className={"icon"}>
                        <Image src={gmailIcon} alt={"gmail icon"} height={120} width={100}/>
                        <span>Email Us</span>
                    </Link>

                </div>
            </div>

        </div>
    );
};

export default IndexPageContactUs;