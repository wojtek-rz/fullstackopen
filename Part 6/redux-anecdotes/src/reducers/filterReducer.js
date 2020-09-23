const reducer = (state='', action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.data
    default:
      return state
  }
}

export const updateFilter = (updatedText) => {
  return {
    type: 'UPDATE',
    data: updatedText
  }
}

export default reducer