import types from '../actions/dataActions'
import entitiesReducer from './entitiesReducer'
import resultReducer from './resultReducer'
import searchBarReducer from './searchBarReducer'
import configReducer from './configReducer'
import lastIdReducer from './lastIdReducer'

const initialState = {
  entities: {},
  result: {},
  searchBarText: {
    searchBarTextInstanceList: '',
    searchBarTextItemsOfChosenTemplate: '',
    searchBarTextInstancesOfChosenTemplate: '',
    searchBarTextItemsCustomizedAllInstances: '',
    searchBarTextTemplateList: '',
    searchBarTextItemList: '',
  },
  configValue: {
    picker: 'all',
    navigatePopToTopRequest_home: false,
    navigatePopToTopRequest_templateList: false,
    navigatePopToTopRequest_itemList: false,
    navigatePopToTopRequest_settings: false
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
    configValue: configReducer(state.configValue, action),
    lastId: lastIdReducer(state.lastId, action)
  }
}
