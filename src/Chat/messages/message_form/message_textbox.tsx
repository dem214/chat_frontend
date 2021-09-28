import React from "react";

interface MessageTextboxProps {
    text: string
    textChanged: (text: string) => void
}

export default function MessageTextbox(props:MessageTextboxProps): JSX.Element {
    function onChageHandler(event:React.ChangeEvent<HTMLTextAreaElement>) {
        props.textChanged(event.target.value)
    }
    return <textarea name="" id="" onChange={onChageHandler} value={props.text}></textarea>
}