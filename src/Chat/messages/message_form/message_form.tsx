import React, { useState } from "react";
import MessageTextbox from "./message_textbox";
import SendButton from "./send_button";

interface MessageFormProps {
    messageSend: (text: string) => void
}

export default function MessageForm(props: MessageFormProps): JSX.Element {

    const [text, changeText] = useState<string>('')

    function flushText(): void {
        changeText(prev => {return ''})
    }

    function submitHandler(event:React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        sendMessage(text)
        flushText();

    }

    function changeTextHandler(text:string): void {
        changeText(prevText => {return text})
    }

    function buttonSubmitHandler(): void {
        sendMessage(text)
        flushText();
    }

    function sendMessage(textValue: string): void {
        props.messageSend(textValue);
    }

    return <form onSubmit={submitHandler}>
        <MessageTextbox text={text} textChanged={changeTextHandler}></MessageTextbox>
        <SendButton clickHandler={buttonSubmitHandler}></SendButton>
        </form>

}