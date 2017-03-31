import types from '../actions/dataActions'
import entitiesReducer from './entitiesReducer'
import resultReducer from './resultReducer'
import searchBarReducer from './searchBarReducer'
import lastIdReducer from './lastIdReducer'

const initialState = {
  entities: {},
  result: {},
  searchBarText: {
    instanceList: '',
    itemsOfChosenTemplate: '',
    instancesOfChosenTemplate: '',
    itemsCustomizedAllInstances: '',
    templateList: '',
    itemList: '',
  },
  lastId: {
    instances: 0,
    items: 0,
    itemsCustomized: 0,
    templateCategories: 0,
    templates: 0
  }
}

export default function normalizeReducer(state = initialState, action) {
  return {
    entities: entitiesReducer(state.entities, action),
    result: resultReducer(state.result, action),
    searchBarText: searchBarReducer(state.searchBarText, action),
    lastId: lastIdReducer(state.lastId, action)
  }
}
