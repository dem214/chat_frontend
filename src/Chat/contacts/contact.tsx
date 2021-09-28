import React from "react"

export interface ContactInfo {
    id: string,
    name: string,
}

export interface ContactProps {
    contact: ContactInfo,
    clickHandler: () => void,
    picked: boolean,
}

export default function ContactCard(props: ContactProps): JSX.Element {
    function clickHandler(event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        props.clickHandler()
    }
    const name = props.contact.name
    const picked = props.picked
    return <div
        onClick={event => clickHandler(event)}
        className={picked ? "PickedContact": ""}
    >
            {name}
    </div>
}