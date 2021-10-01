import { useMemo, useState } from "react"
import { ContactInfo } from "./contacts/contact"
import ContactList from "./contacts/contact_list"
import { Message } from "./messages/message"
import MessagesBox from "./messages/messages_box"
import {v4 as uuid4} from "uuid"

interface StoredDialogs {
    dialogs: StoredDialog[],
    pickedDialog: string | null
}


interface StoredDialog {
    id: string,
    participant: Participant
    messages: Message[],
}

interface Participant {
    id: string,
    name: string,
}

const initDialogs: StoredDialogs = {
    dialogs: [
        {
            id: '11',
            participant: {
                id: '1',
                name: 'vasya'
            },
            messages: [
                {
                    id: '1',
                    text: 'foo'
                }
            ]
        },
        {
            id: '22',
            participant: {
                id: '2',
                name: 'petya'
            },
            messages: [
                {
                    id: '2',
                    text: 'bar'
                }
            ]
        }
    ],
    pickedDialog: null,
}


export default function Chat(): JSX.Element {

    const isDialogPicked = (dialog: StoredDialog, pickedId: string | null): boolean => {
        return pickedId !== null && dialog.id === pickedId
    }

    const getContacts = (): ContactInfo[] => {
        let cntcts: ContactInfo[] = []
        savedDialogs.dialogs.forEach(dialog => {
            cntcts.push({
                id: dialog.participant.id,
                name: dialog.participant.name,
            })
        });
        return cntcts;
    }

    function selectContact(contactID:string): void {
        changeSavedDialog(prev => ({...prev, pickedDialog: getDialog(contactID)}))
        // changePickedContact(prev => {return getPickedContact()})
        // changeMessages(prev => {return getPickedMessages(savedDialogs.dialogs, savedDialogs.pickedDialog)})
    }


    function getDialog(contactId:string): string {
        let resp: string = ''
        savedDialogs.dialogs.forEach((dialog) => {
            if (dialog.participant.id === contactId) {
                resp = dialog.id
            }
        })
        return resp
    }

    const [savedDialogs, changeSavedDialog] = useState<StoredDialogs>(initDialogs)
    const [contacts, changeContacts] = useState<ContactInfo[]>(getContacts())

    const pickedContact = useMemo(
        () => {
            let resp: string | null = null
            savedDialogs.dialogs.forEach(dialog => {
                if (isDialogPicked(dialog, savedDialogs.pickedDialog)) {
                    resp = dialog.participant.id
                }
            });
            return resp;
        },
        [savedDialogs.pickedDialog, savedDialogs.dialogs]
    )

    const messages = useMemo(() => {
        let resp: Message[] = []
        savedDialogs.dialogs.forEach((dialog) => {
            if (isDialogPicked(dialog, savedDialogs.pickedDialog)) {
                resp = dialog.messages;
            }
        });
        return resp
    }, [savedDialogs.dialogs, savedDialogs.pickedDialog])

    function messageSend(text:string): void {
        const uuid = uuid4()
        const active_dialog = savedDialogs.pickedDialog
        changeSavedDialog(prev => {
            return {...prev, dialogs: prev.dialogs.map((dialog) => {
                if (isDialogPicked(dialog, active_dialog)) {
                    dialog.messages.push({
                        id: uuid,
                        text: text
                    })
                }
                return dialog
            })}
        })

    }    

    return (
    <div>
        <h1>This is chat app</h1>
        <ContactList contacts={contacts} pickedContact={pickedContact} selectContact={selectContact}></ContactList>
        <MessagesBox dialog={messages} messageSend={messageSend}></MessagesBox>
    </div>
    )
}