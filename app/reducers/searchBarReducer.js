import types from '../actions/dataActions'

const searchBarTextInstanceList = (state, action) => ({
  ...state,
  searchBarTextInstanceList: action.searchBarText
})

const searchBarTextItemsOfChosenTemplate = (state, action) => ({
  ...state,
  searchBarTextItemsOfChosenTemplate: action.searchBarText
})

const searchBarTextInstancesOfChosenTemplate = (state, action) => ({
  ...state,
  searchBarTextInstancesOfChosenTemplate: action.searchBarText
})

const searchBarTextItemsCustomizedAllInstances = (state, action) => ({
  ...state,
  searchBarTextItemsCustomizedAllInstances: action.searchBarText
})

const searchBarTextTemplateList = (state, action) => ({
  ...state,
  searchBarTextTemplateList: action.searchBarText
})

const searchBarTextItemList = (state, action) => ({
  ...state,
  searchBarTextItemList: action.searchBarText
})

export default function searchBarReducer(state, action) {
  const reducerMap = {
    [types.SEARCHBAR_TEXT_INSTANCE_LIST]: searchBarTextInstanceList,
    [types.SEARCHBAR_TEXT_ITEMS_OF_CHOSEN_TEMPLATE]: searchBarTextItemsOfChosenTemplate,
    [types.SEARCHBAR_TEXT_INSTANCES_OF_CHOSEN_TEMPLATE]: searchBarTextInstancesOfChosenTemplate,
    [types.SEARCHBAR_TEXT_ITEMS_CUSTOMIZED_ALL_INSTANCES]: searchBarTextItemsCustomizedAllInstances,
    [types.SEARCHBAR_TEXT_TEMPLATE_LIST]: searchBarTextTemplateList,
    [types.SEARCHBAR_TEXT_ITEM_LIST]: searchBarTextItemList
  }
  return reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state
}
