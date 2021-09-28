import { useState } from "react"
import { ContactInfo } from "./contacts/contact"
import ContactList from "./contacts/contact_list"
import { Message } from "./messages/message"
import MessagesBox from "./messages/messages_box"
import {v4 as uuid4} from "uuid"

interface StoredDialog {
    id: string,
    participantID: string,
    dialog: Message[],
}


function getDialog(id: string | null): Message[] | null {
    let dialog: Message[] = []
    if (id === '1') {
        
    }
    switch (id) {
        case '1':
            dialog = [
                {
                    id: '2',
                    text: 'yolo'
                },
                {
                    id: '3',
                    text: 'bolo'
                }
            ]
            break;
        case '2':
            dialog = [
                {
                    id: '4',
                    text: 'foo'
                },
                {
                    id: '5',
                    text: 'bar'
                }
            ]
            break;
    
        default:
            return null
    }
    return dialog
    
}

export default function Chat(): JSX.Element {
    const contacts: ContactInfo[] = [
        {
            id: '1',
            name: 'vasya'
        },
        {
            id: '2',
            name: 'petya'
        }
    ]
    const [selectedContact, changeSelectedContact] = useState<string | null>(null)
    const [savedDialogs, changeSavedDialog] = useState<StoredDialog[]>([
        {
            id: '1',
            participantID: '1',
            dialog: [
                {
                    id: '1',
                    text: 'foo'
                }
            ]
        },
        {
            id: '2',
            participantID: '2',
            dialog: [
                {
                    id: '2',
                    text: 'bar'
                }
            ]
        }
    ])

    function selectContact(contactID:string): void {
        changeSelectedContact(prev => {return contactID})
    }

    function messageSend(text:string): void {
        const uuid = uuid4()
        const active_dialog = getDialog(selectedContact)
        if (active_dialog !== null) {
            active_dialog.push({id: uuid, text: text})
        } 
        console.log(active_dialog)

    }

    function getSelectedDialog(contactID: string): Message[] | null {
        savedDialogs.forEach(savedDialog => {
            if (savedDialog.participantID == selectedContact) {
                return savedDialog.dialog
            }
        });
        return null
    }
    
    // TODO rethink your entire life
    const activeDialog: Message[] | null = selectedContact === null? null: getSelectedDialog(selectedContact)

    return (
    <div>
        <h1>This is chat app</h1>
        <ContactList contacts={contacts} selectContact={selectContact}></ContactList>
        <MessagesBox dialog={activeDialog} messageSend={messageSend}></MessagesBox>
    </div>
    )

}