import types from './dataActions'

function internalAddNewTemplate() {

}

export function addNewTemplate(lastId, newData) {
  return {
    type: types.ADD_TEMPLATE,
    attr: 'templates',
    lastId,
    lastIndex: lastId - 1 < 0 ? 0 : lastId - 1,
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

export function addTemplateCategory(lastId, newData) {
  return {
    type: types.ADD_TEMPLATE_CATEGORY,
    attr: 'templateCategories',
    lastId,
    lastIndex: lastId - 1 < 0 ? 0 : lastId - 1,
    newData,
  }
}

// export function addOriginalTemplate(newData) {
//   return {
//     type: types.ORIGINAL_DATA_ADD_TEMPLATE,
//     newData
//   }
// }

// export function addOriginalInstance(newData) {
//   return {
//     type: types.ORIGINAL_DATA_ADD_INSTANCE,
//     newData
//   }
// }

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

export function chooseCategory(chosenCategory) {
  return {
    type: types.CHOOSE_CATEGORY,
    chosenCategory
  }
}

export function navigatePopToTopRequest(targetTab) {
  return {
    type: types.NAVIGATE_POP_TO_TOP_REQUEST,
    targetTab
  }
}

export function navigateTabCountPlus(targetTab) {
  return {
    type: types.NAVIGATE_TAB_COUNT_PLUS,
    targetTab
  }
}

export function navigateTabCountReset(targetTab) {
  return {
    type: types.NAVIGATE_TAB_COUNT_RESET,
    targetTab
  }
}


export function findLastId(result) {
  return {
    type: types.FIND_LAST_ID,
    result
  }
}

const lastIdPlus = (attr, lastId) => ({
  type: types.LAST_ID_PLUS,
  attr,
  lastId
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
