import "../Styles/ConstitutionEditor.css";
import {useState} from "react";
import {Editable, Slate, withReact} from "slate-react";
import {createEditor} from "slate";

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]
const ConstitutionEditor = () => {
    const [editor] = useState(() => withReact(createEditor()));

    return (
        <div className={"constitution-editor-page"}>
            <Slate editor={editor} initialValue={initialValue}>
                <Editable />
            </Slate>
        </div>
    );
};

export default ConstitutionEditor;