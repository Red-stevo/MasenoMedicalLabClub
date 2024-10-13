import "../Styles/ConstitutionEditor.css";
import {useState} from "react";
import {Editable, Slate, withReact} from "slate-react";
import {createEditor, Editor, Transforms, Element} from "slate";
import CodeComponent from "./CodeComponent.jsx";
import DefaultComponent from "./DefaultComponent.jsx";

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]
const ConstitutionEditor = () => {
    const [editor] = useState(() => withReact(createEditor()));

    const handleKeyDown = (event) => {
        if (event.key === '`' && event.ctrlKey){
            event.preventDefault();

            //check if type of the block of code.
            const [match] = Editor.nodes(editor, {
                match: n => n.type === 'code',
            })

            Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'code'}, //toggle
                { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
            )
        }

    }

    const renderElement = (props) => {
        switch (props.element.type){
            case 'code':
                return <CodeComponent {...props}/>
            default:
                return <DefaultComponent {...props} />
        }
    }


    return (
        <div className={"constitution-editor-page"}>
            <Slate editor={editor} initialValue={initialValue}>
                <Editable onKeyDown={handleKeyDown} renderElement={renderElement}/>
            </Slate>
        </div>
    );
};

export default ConstitutionEditor;