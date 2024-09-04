import {Carousel} from "react-bootstrap";

const IndexPageCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item interval={1000}>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    );
};

export default IndexPageCarousel;