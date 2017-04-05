import types from './dataActions'

function internalAddNewTemplate() {

}

export function addNewTemplate(lastId, newData) {
  return {
    type: types.ADD_TEMPLATE,
    attr: 'templates',
    lastId,
    lastIndex: lastId.templates - 1 < 0 ? 0 : lastId.templates - 1,
    newData
  }
}

export function modifyTemplate(targetTemplateId, data) {
  return {
    type: types.MODIFY_TEMPLATE,
    targetTemplateId,
    data
  }
}

function internalDeleTemplate() {

}

export function delTemplate() {
  return {
    type: types.DELETE_TEMPLATE
  }
}

export function addInstance(lastId, newData) {
  // return {
  //   type: types.ADD_INSTANCE,
  //   attr: 'instances',
  //   lastId,
  //   newData,
  //   templateId: newData.template
  // }
  return (dispatch, getState) => {
    dispatch(internalAddInstance(lastId, newData));
    const prevState = getState();
    dispatch(addItemsCustomized(lastId, newData, prevState.normalizeReducer.entities.instances[newData.instanceId].items));
    dispatch(lastIdPlus('instances', lastId, newData));
  }
};

const internalAddInstance = (lastId, newData) => ({
  type: types.ADD_INSTANCE,
  attr: 'instances',
  lastId,
  newData,
  templateId: newData.template
})

export function addItemsCustomized(lastId, newData, newAddedItemsCustomized) {
  return {
    type: types.ADD_ITEMS_CUSTOMIZED,
    attr: 'itemsCustomized',
    lastId: lastId.itemsCustomized,
    newData,
    newAddedItemsCustomized
  }
}

function internal_delInstance() {

}

export function delInstance() {
  return {
    type: types.DELETE_INSTANCE
  }
}

function internal_modifyInstance() {

}

export function modifyInstance(targetInstanceId, data) {
  return {
    type: types.MODIFY_INSTANCE,
    targetInstanceId,
    data
  }
}

export function modifyItemsCustomized(targetData) {
  return {
    type: types.MODIFY_ITEMS_CUSTOMIZED,
    targetData
  }
}

export function addItem(lastId, newData) {
  console.log('actionCreators - addItem - parameter - newData : ', newData)
  return {
    type: types.ADD_ITEM,
    newData,
    attr: 'items',
    lastId,
    templateId: newData[0].templateId
  }
}

function internal_modifyItem(data) {
  return {
    type: types.MODIFY_ITEM,
    data,
  }
}

export function modifyItem(data, templateId) {
  console.log('actionCreators - parameter - data : ', data);
  console.log('actionCreators - parameter - templateId : ', templateId);
  delete data.length;
  return dispatch => {
    for(let key in data) {
      data[key] == '' && (delete data[key], dispatch(delItem(parseInt(key), parseInt(templateId))), console.log(`del request - key : ${key}, templateId : ${templateId}`))
    }
    dispatch(internal_modifyItem(data));
  }
}

export function delItem(targetItemId, targetTemplateId) {
  return {
    type: types.DEL_ITEM,
    attr: 'items',
    targetItemId,
    targetTemplateId
  }
}

const internal_addTemplateCategory = (lastId, newData) => ({
  type: types.ADD_TEMPLATE_CATEGORY,
  // attr: 'templateCategories',
  lastId,
  lastIndex: lastId - 1 < 0 ? 0 : lastId - 1,
  newData,
})

export function addTemplateCategory(lastId, newData) {
  return dispatch => {
    dispatch(internal_addTemplateCategory(lastId, newData));
    dispatch(lastIdPlus('templateCategories', lastId, newData));
  }
  // return {
  //   type: types.ADD_TEMPLATE_CATEGORY,
  //   attr: 'templateCategories',
  //   lastId,
  //   lastIndex: lastId - 1 < 0 ? 0 : lastId - 1,
  //   newData,
  // }
}

export function normalizedDataInput(data) {
  return {
    type: types.INITIATE_NORMALIZED_DATA_INPUT,
    data
  }
}

export function searchBarText(searchText, attr) {
  return {
    type: types.SEARCHBAR_TEXT,
    attr,
    searchText
  }
}

export function chooseCategory(chosenCategory) {
  return {
    type: types.CHOOSE_CATEGORY,
    chosenCategory
  }
}

export function navigatePopToTopRequest(targetTab, statusBoolean) {
  return {
    type: types.NAVIGATE_POP_TO_TOP_REQUEST,
    targetTab,
    status: statusBoolean
  }
}

export function findLastId(result) {
  return {
    type: types.FIND_LAST_ID,
    result
  }
}

const lastIdPlus = (attr, lastId, newData) => ({
  type: types.LAST_ID_PLUS,
  attr,
  lastId,
  newData
})

export function navigatePrevent(__navigatorRouteID, statusBoolean) {
  return {
    type: types.NAVIGATE_PREVENT,
    __navigatorRouteID,
    status: statusBoolean
  }
}

export function triedNavigateWhenPrevented(__navigatorRouteID, statusBoolean) {
  return {
    type: types.TRIED_NAVIGATE_WHEN_PREVENTED,
    __navigatorRouteID,
    status: statusBoolean
  }
}
