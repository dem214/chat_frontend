interface MessageProps{
    content: Message
}

export interface Message{
    id: string
    text: string
}

export default function MessageCard(props: MessageProps) {
    const message = props.content
    return <p>{message.text}</p>
}