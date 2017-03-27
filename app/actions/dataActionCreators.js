import types from './dataActions'

function internalAddNewTemplate() {

}

export function addNewTemplate(newData) {
  return {
    type: types.ADD_TEMPLATE,
    newData
  }
}

function internalModifyTemplate() {

}

export function modifyTemplate() {
  return {
    type: types.MODIFY_TEMPLATE
  }
}

function internalDeleTemplate() {

}

export function delTemplate() {
  return {
    type: types.DELETE_TEMPLATE
  }
}

function internal_addInstance() {

}

export function addInstance(newData) {
  return {
    type: types.ADD_INSTANCE,
    newData
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

export function modifyInstance(targetData) {
  console.log(`actionCreators - modifyInstance - targetInstance : ${JSON.stringify(targetInstance, null, 1)}`)
  return {
    type: types.MODIFY_INSTANCE
  }
}

export function modifyItemsCustomized(targetData) {
  return {
    type: types.MODIFY_ITEMS_CUSTOMIZED,
    targetData
  }
}

export function addOriginalTemplate(newData) {
  return {
    type: types.ORIGINAL_DATA_ADD_TEMPLATE,
    newData
  }
}

export function addOriginalInstance(newData) {
  return {
    type: types.ORIGINAL_DATA_ADD_INSTANCE,
    newData
  }
}

export function normalizedDataInput(data) {
  return {
    type: types.INITIATE_NORMALIZED_DATA_INPUT,
    data
  }
}

export function searchBarTextInstanceList(searchBarText) {
  return {
    type: types.SEARCHBAR_TEXT_INSTANCE_LIST,
    searchBarText
  }
}

export function searchBarTextItemsOfChosenTemplate(searchBarText) {
  return {
    type: types.SEARCHBAR_TEXT_ITEMS_OF_CHOSEN_TEMPLATE,
    searchBarText
  }
}

export function searchBarTextInstancesOfChosenTemplate(searchBarText) {
  return {
    type: types.SEARCHBAR_TEXT_INSTANCES_OF_CHOSEN_TEMPLATE,
    searchBarText
  }
}


export function searchBarTextItemsCustomizedAllInstances(searchBarText) {
  return {
    type: types.SEARCHBAR_TEXT_ITEMS_CUSTOMIZED_ALL_INSTANCES,
    searchBarText
  }
}

export function searchBarTextTemplateList(searchBarText) {
  return {
    type: types.SEARCHBAR_TEXT_TEMPLATE_LIST,
    searchBarText
  }
}

export function searchBarTextItemList(searchBarText) {
  return {
    type: types.SEARCHBAR_TEXT_ITEM_LIST,
    searchBarText
  }
}
