import "./IndexPageStyles/IndexPage.css";
import IndexPageHeader from "./IndexPageHeader.jsx";
import IndexPageCarousel from "./IndexPageCarousel.jsx";
import IndexPageAboutUs from "./IndexPageAboutUs.jsx";
const IndexPage = () => {
    return (
        <div className={"index-page-sections"}>
            <div id={"index-header"}>
                <IndexPageHeader />
            </div>
            <div className={"index-body"} >
                <IndexPageCarousel />
                <IndexPageAboutUs />
            </div>
        </div>
    )
}

export default IndexPage;