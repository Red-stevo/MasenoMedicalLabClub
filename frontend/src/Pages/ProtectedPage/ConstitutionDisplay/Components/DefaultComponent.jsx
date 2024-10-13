
const DefaultComponent = (props) => {
    return (
        <p {...props.attributes}>{...props.children}</p>
    );
};

export default DefaultComponent;