import ContactCard, { ContactInfo } from "./contact";
import "./contact.scss";


export interface ContactListProps {
    contacts: ContactInfo[],
    pickedContact: string | null
    selectContact: (contactID: string) => void
}

export default function ContactList(props: ContactListProps): JSX.Element {

    const contacts: ContactInfo[] = props.contacts
    
    function contactClickHandler(contact: ContactInfo) {
        return function clickHandler() {
            props.selectContact(contact.id)
        }
    }

    //  TODO Up picked contact

    function isPicked(contact:ContactInfo) {
        if (props.pickedContact === null) {return false}
        return contact.id === props.pickedContact
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