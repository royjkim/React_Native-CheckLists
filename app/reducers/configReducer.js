import types from '../actions/dataActions'

const chooseCategory = (state, action) => ({
  ...state,
  picker: action.chosenCategory
})

const navigatePopToTopRequest = (state, action) => ({
  ...state,
  [`navigatePopToTopRequest_${action.targetTab}`]: true
})

const navigateTabCountReset = (state, action) => {
  return {
    ...state,
    [`navigatePopToTopRequest_${action.targetTab}`]: false
  }
}

export default function configReducer(state, action) {
  const reducerMap = {
    [types.CHOOSE_CATEGORY]: chooseCategory,
    [types.NAVIGATE_POP_TO_TOP_REQUEST]: navigatePopToTopRequest,
    [types.NAVIGATE_TAB_COUNT_RESET]: navigateTabCountReset
  }
  return reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state
}
