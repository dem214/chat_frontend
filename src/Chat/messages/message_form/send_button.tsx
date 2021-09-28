interface SendButtonProps {
    clickHandler: () => void
}

export default function SendButton(props: SendButtonProps): JSX.Element {
    function clickHandler(event:React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        props.clickHandler()
    }
    return <button onClick={clickHandler}>Send!</button>
}