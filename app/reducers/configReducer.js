import types from '../actions/dataActions'

const chooseCategory = (state, action) => {
  let tempData_picker = {
    ...state.picker,
    [action.__navigatorRouteID]: action.pickerValue
  };
  (action.pickerValue == 'all' && tempData_picker.hasOwnProperty(action.__navigatorRouteID)) && delete tempData_picker[action.__navigatorRouteID];
  return {
    ...state,
    // picker: action.chosenCategory
    picker: {
      // ...state.picker,
      // [action.__navigatorRouteID]: action.pickerValue
      ...tempData_picker
    }
  }
}

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

const initialState = {
  // picker: 'all',
  picker: {},
  navigatePopToTopRequest: {
    home: false,
    templateList: false,
    itemList: false,
    settings: false
  },
  navigatePrevent: {},
  triedNavigateWhenPrevented: {}
}

export default function configReducer(state = initialState, action) {
  const reducerMap = {
    [types.CHOOSE_CATEGORY]: chooseCategory,
    [types.NAVIGATE_POP_TO_TOP_REQUEST]: navigatePopToTopRequest,
    [types.NAVIGATE_PREVENT]: navigatePrevent,
    [types.TRIED_NAVIGATE_WHEN_PREVENTED]: triedNavigateWhenPrevented
  }
  return reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state
}
