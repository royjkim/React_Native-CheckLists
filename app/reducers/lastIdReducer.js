import types from '../actions/dataActions'
export default function lastIdReducer(state, action) {
  const reducerMapper = {
    [types.FIND_LAST_ID]: (state, action) => ({
      instances: action.result.instances.slice(-1)[0],
      items: action.result.items.slice(-1)[0],
      itemsCustomized: action.result.itemsCustomized.slice(-1)[0],
      templateCategories: action.result.templateCategories.slice(-1)[0],
      templates: action.result.templates.slice(-1)[0]
    })
  }
  return reducerMapper.hasOwnProperty(action.type) ? reducerMapper[action.type](state, action) : state
}
