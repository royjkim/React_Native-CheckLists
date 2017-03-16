import originaldataReducer from './originaldataReducer'
import entitiesReducer from './entitiesReducer'
import resultReducer from './resultReducer'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  originaldataReducer,
  entitiesReducer,
  resultReducer
})

export default reducer
