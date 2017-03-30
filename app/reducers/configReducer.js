import types from '../actions/dataActions'

const chooseCategory = (state, action) => ({
  ...state,
  picker: action.chosenCategory
})

const navigatePopToTopRequest = (state, action) => ({
  ...state,
  navigatePopToTopRequest: {
    ...state.navigatePopToTopRequest,
    [action.targetTab]: action.status
  }
})

const navigatePrevent = (state, action) => {
  let tempResult = {
    ...state,
    navigatePrevent: {
      ...state.navigatePrevent,
      [action.__navigatorRouteID]: action.status
    }
  }
  !action.status ? delete tempResult.navigatePrevent[action.__navigatorRouteID] : null
  return tempResult
}

const triedNavigateWhenPrevented = (state, action) => {
  let tempResult = {
    ...state,
    triedNavigateWhenPrevented: {
      ...state.triedNavigateWhenPrevented,
      [action.__navigatorRouteID]: action.status
    }
  }
  !action.status ? delete tempResult.triedNavigateWhenPrevented[action.__navigatorRouteID] : null
  return tempResult
}


export default function configReducer(state, action) {
  const reducerMap = {
    [types.CHOOSE_CATEGORY]: chooseCategory,
    [types.NAVIGATE_POP_TO_TOP_REQUEST]: navigatePopToTopRequest,
    [types.NAVIGATE_PREVENT]: navigatePrevent,
    [types.TRIED_NAVIGATE_WHEN_PREVENTED]: triedNavigateWhenPrevented
  }
  return reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state
}
