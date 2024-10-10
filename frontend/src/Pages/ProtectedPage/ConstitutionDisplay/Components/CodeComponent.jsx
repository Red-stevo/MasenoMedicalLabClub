

const CodeComponent = (props) => {
    return (
        <pre {...props.attributes}>
            <code>{...props.children}</code>
        </pre>
    );
};

export default CodeComponent;