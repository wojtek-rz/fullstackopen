import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector(data => data.notification.text)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notif ? '' : 'none'
  }
  return (
    <div style={style}>
      {(notif)}
    </div>
  )
}

export default Notification