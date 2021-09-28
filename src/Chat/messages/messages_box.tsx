import MessageCard, {Message} from "./message"
import MessageForm from "./message_form/message_form"

interface MessagesBoxProps {
    dialog: Message[] | null
    messageSend: (text: string) => void
}

export default function MessagesBox(props: MessagesBoxProps): JSX.Element {
    const dialog = props.dialog
    const messagesElement: JSX.Element = <h2>Messages</h2>
    if (dialog === null) {
        return <div>
            {messagesElement}
            <p>Start the dialog!</p>
            </div>
    }
    
    return <div>
            {messagesElement}
            { dialog.map(message => {
                    return <li key={message.id}>
                        <MessageCard content={message}></MessageCard>
                    </li>
            })}
            <MessageForm messageSend={props.messageSend}></MessageForm>   
            </div>
}