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

const navigatePrevent = (state, action) => {
  let tempResult = {
    ...state,
    navigatePrevent: {
     [action.routeTitle]: action.status
    }
  }
  if(!action.status) {
    delete tempResult.navigatePrevent[action.routeTitle]
  }
  console.log(`configReducer - tempResult : `, tempResult)
  return tempResult
  // return {
  //   ...state,
  //   navigatePrevent: {
  //     [action.routeTitle]: action.status
  //   }
  // }
}

const triedNavigateWhenPrevented = (state, action) => {
  if(!action.status) {
    return {
      ...state,
      triedNavigateWhenPrevented: ''
    }
  } else {
    return {
      ...state,
      triedNavigateWhenPrevented: action.routeTitle
    }
  }
}


export default function configReducer(state, action) {
  const reducerMap = {
    [types.CHOOSE_CATEGORY]: chooseCategory,
    [types.NAVIGATE_POP_TO_TOP_REQUEST]: navigatePopToTopRequest,
    [types.NAVIGATE_TAB_COUNT_RESET]: navigateTabCountReset,
    [types.NAVIGATE_PREVENT]: navigatePrevent,
    [types.TRIED_NAVIGATE_WHEN_PREVENTED]: triedNavigateWhenPrevented
  }
  return reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state
}
