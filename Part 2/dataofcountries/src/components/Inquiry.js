import React from 'react'

const Inquiry = ({ inquiry, handleInquiryChange }) => {
    return (
        <div>
            <label htmlFor="inquiry">find countries </label>
            <input
                id="inquiry"
                value={inquiry}
                onChange={handleInquiryChange}
            />
        </div>
    )
}

export default Inquiry