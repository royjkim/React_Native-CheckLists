import types from '../actions/dataActions'
import entitiesReducer from './entitiesReducer'
import resultReducer from './resultReducer'
import searchBarReducer from './searchBarReducer'
import configReducer from './configReducer'

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
  }
}

export default function normalizeReducer(state = initialState, action) {
  return {
    entities: entitiesReducer(state.entities, action),
    result: resultReducer(state.result, action),
    searchBarText: searchBarReducer(state.searchBarText, action),
    configValue: configReducer(state.configValue, action)
  }
}
