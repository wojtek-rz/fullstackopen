const reducer = (state = { text: '', counter: 0 }, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'SET_NOTIF':
      return {
        counter: state.counter + 1,
        text: action.data
      }
    case 'CLEAR':
      if (state.counter - 1 > 0)
        return {
          ...state,
          counter: state.counter - 1,
        }
      else return {
        text: '',
        counter: 0,
      }
    default:
      return state
  }
}

export const setNotification = (message, duration) => {
  return async dispatch => {
    setTimeout(() => dispatch({
       type: 'CLEAR'
    }), duration*1000)
    dispatch({
      type: 'SET_NOTIF',
      data: message,
    })
  }
}

export default reducer