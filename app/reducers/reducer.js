import normalizeReducer from './normalizeReducer'
import configReducer from './configReducer'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  normalizeReducer,
  configReducer
})

export default reducer
