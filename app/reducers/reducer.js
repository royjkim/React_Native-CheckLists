import dataReducer from './dataReducer'
import navigationReducer from './navigationReducer'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  dataReducer,
  navigationReducer
})

export default reducer
