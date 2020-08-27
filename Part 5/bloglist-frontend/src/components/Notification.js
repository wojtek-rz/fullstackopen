import React, { useState, useImperativeHandle } from 'react'
import styled from 'styled-components'

const succesColor = 'green'
const SuccesStyledDiv = styled.div`
  font-size: 1.4rem;
  padding: .5em;
  border: 2px solid ${succesColor};
  border-radius: 6px;
  color: ${succesColor};
  background-color: white;
  margin: .4em;
`
const errorColor = 'red'
const ErrorStyledDiv = styled(SuccesStyledDiv)`
  color: ${errorColor};
  border-color: ${errorColor};
`

const Notification = React.forwardRef((props, ref) => {
  const [succesMsg, setSuccesMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const setSuccesNotification = (msg) => {
    setSuccesMsg(msg)
    setTimeout(() => {setSuccesMsg('')}, 5000)
  }
  const setErrorNotification = (msg) => {
    setErrorMsg(msg)
    setTimeout(() => {setErrorMsg('')}, 5000)
  }

  useImperativeHandle(ref, () => {
    return ({
      setSuccesNotification,
      setErrorNotification,
    })
  })

  if (succesMsg) {
    return (
      <SuccesStyledDiv>{succesMsg}</SuccesStyledDiv>
    )
  } if (errorMsg) {
    return (
      <ErrorStyledDiv>{errorMsg}</ErrorStyledDiv>
    )
  }
})

Notification.displayName = 'Notification'

export default Notification