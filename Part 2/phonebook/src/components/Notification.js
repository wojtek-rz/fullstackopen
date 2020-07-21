import React from 'react'

const Notification = ({ text, style }) => {
    if(style === 'red') style='notificationRed';
    if(style === 'green') style='notificationGreen';

    if (text === null) {
        return null
    }
    return (
        <div className={style}>
            {text}
        </div>
    )
}

export default Notification