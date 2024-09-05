import {Carousel, Image} from "react-bootstrap";
import "./IndexPageStyles/IndexPageCarousel.css"

const IndexPageCarousel = () => {
    return (
        <Carousel id={"image-holder"}>
            <Carousel.Item interval={1000}>
                <Image alt={"Meseno Med Lab Science Index Page Image."}/>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default IndexPageCarousel;