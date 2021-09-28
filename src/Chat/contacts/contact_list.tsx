import { useState } from "react";
import ContactCard, { ContactInfo } from "./contact";


export interface ContactListProps {
    contacts: ContactInfo[],
    selectContact: (contactID: string) => void
}

export default function ContactList(props: ContactListProps): JSX.Element {

    const contacts: ContactInfo[] = props.contacts

    const [pickedContact, changePickedContact] = useState<string|null>(null)
    
    function contactClickHandler(contact: ContactInfo) {
        return function clickHandler() {
            changePickedContact(prevContact => {return contact.id})
            props.selectContact(contact.id)
        }

    }

    //  TODO Up picked contact

    function isPicked(contact:ContactInfo) {
        return contact.id === pickedContact
    }

    return (
    <div>
        <h2>Contact List </h2>
        <ul>
            {contacts.map(contactInfo => {
                return <li key={contactInfo.id}>
                    <ContactCard
                        contact={contactInfo}
                        clickHandler={contactClickHandler(contactInfo)}
                        picked={isPicked(contactInfo)}
                    ></ContactCard>
                </li>
            })}
        </ul>
    </div>);
}