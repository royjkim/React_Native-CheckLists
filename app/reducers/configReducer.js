import types from '../actions/dataActions'
const initialState = {
  picker: 'all'
}

const chooseCategory = (state, action) => ({
  ...state,
  picker: action.chosenCategory
})

export default function configReducer(state = initialState, action) {
  const reducerMap = {
    [types.CHOOSE_CATEGORY]: chooseCategory
  }
  return reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state
}
