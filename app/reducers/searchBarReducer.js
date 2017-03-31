import types from '../actions/dataActions'

export default function searchBarReducer(state, action) {
  const reducerMap = {
    [types.SEARCHBAR_TEXT]: (state, action) => ({
      ...state,
      [action.attr]: action.searchText
    })
  }
  return reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state
}
