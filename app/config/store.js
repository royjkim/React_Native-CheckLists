import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import Reactotron from 'reactotron-react-native'
import reducer from '../reducers/reducer'

const logger = createLogger()

export default function initializeStore() {
  const store = Reactotron.createStore(reducer, compose(applyMiddleware(thunk, logger)))
  return store

}
