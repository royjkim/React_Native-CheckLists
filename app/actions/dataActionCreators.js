import types from './dataActions';
import { AsyncStorage, Alert } from 'react-native';
import { cloneDeep } from 'lodash';

// Below is for after adding new template(including items), check if the uniqueId is overlapped or not.
const checkIdOverlapOrNot = (attr, lastId, newData, requestAction) => {

  const requestActionMapper = {
    addTemplate: (attr, lastId, newData) => newData.templateId > lastId[attr] ? newData : newData = {
      ...newData,
      templateId: newData.templateId + 1
    },
    addItem: (attr, lastId, newData) => {
      const tempData_min_itemID = parseInt(Object.values(newData).sort((data1, data2) => data1.itemId - data2.itemId)[0].itemId);
      if(tempData_min_itemID == lastId[attr] + 1) {
        return newData
      } else {
        let count = 0;
        for(let key in newData) {
          count++;
          const newItemId = lastId[attr] + count;
          newData[newItemId] = {
            ...newData[key],
            itemId: newItemId
          };
          delete newData[key]
        }
        return newData
      }
    },
    addTemplateCategory: (attr, lastId, newData) => {
      newData.templateCategoriesId = lastId[attr] + 1
      return newData
    },
    addItemsCustomized: (attr, lastId, newData) => newData[0].itemCustomizedId == lastId[attr] + 1 ? newData : newData.map((value, index) => {
      console.log('value : ', JSON.stringify(value, null, 1));
      value.itemCustomizedId = lastId[attr] + 1 + index
      return value
    })
  };

  return requestActionMapper.hasOwnProperty(requestAction) ? requestActionMapper[requestAction](attr, lastId, newData) : newData
}

const internal_addTemplate = (lastId, newData) => ({
  type: types.ADD_TEMPLATE,
  lastId,
  lastIndex: lastId.templates - 1 < 0 ? 0 : lastId.templates - 1,
  newData
})

export function addTemplate(lastId, newData) {
  // return {
  //   type: types.ADD_TEMPLATE,
  //   attr: 'templates',
  //   lastId,
  //   lastIndex: lastId.templates - 1 < 0 ? 0 : lastId.templates - 1,
  //   newData
  // }
  newData = checkIdOverlapOrNot('templates', lastId, newData, 'addTemplate');
  return dispatch => {
    dispatch(internal_addTemplate(lastId, newData));
    // dispatch(lastIdPlus('templates', lastId, newData));
    // dispatch(lastIdPlusMulti('templates', lastId, newData));
    dispatch(lastIdPlusOneByOne('templates', lastId, newData));
    // dispatch(addItem(lastId, newData));
    dispatch(addItemWhenAddTemplate(lastId, newData));
    dispatch(savelocal(false));
  }
}

const internal_modifyTemplate = (targetTemplateId, data) => ({
  type: types.MODIFY_TEMPLATE,
  targetTemplateId,
  data
})

export function modifyTemplate(targetTemplateId, data) {
  // return {
  //   type: types.MODIFY_TEMPLATE,
  //   targetTemplateId,
  //   data
  // }
  return dispatch => {
    dispatch(internal_modifyTemplate(targetTemplateId, data));
    dispatch(savelocal(false));
  }
}

const internal_delTemplate = targetData => ({
  type: types.DELETE_TEMPLATE,
  targetData
})

export function delTemplate(targetData) {
  // return {
  //   type: types.DELETE_TEMPLATE,
  //   targetData
  // }
  return (dispatch, getState) => {
    dispatch(delItemWhenDeleteTemplate(targetData));
    dispatch(delInstancesWhenDelTemplate(targetData));
    dispatch(internal_delTemplate(targetData));
    dispatch(savelocal(false));
  }
}

const addInstanceOnTemplate = (lastId, newData) => ({
  type: types.ADD_INSTANCE_ON_TEMPLATE,
  lastId,
  newData
})

const internalAddInstance = (lastId, newData) => ({
  type: types.ADD_INSTANCE,
  attr: 'instances',
  lastId,
  newData
  // newData: {
  //   ...newData,
  //   templateId: newData.template
  // }
})

export function addInstance(lastId, newData) {
  newData.templateId = newData.template;
  return (dispatch, getState) => {
    dispatch(internalAddInstance(lastId, newData));
    dispatch(addItemsCustomizedWhenAddInstance(lastId, newData, true));
    dispatch(addInstanceOnTemplate(lastId, newData));
    // const prevState = getState()
    //       newAddedItemsCustomized = prevState.normalizeReducer.entities.instances[newData.instanceId].items;
    // dispatch(addInstanceThenAddOnResult(lastId, newData, newAddedItemsCustomized));
    dispatch(lastIdPlus('instances', lastId, newData));
    dispatch(lastIdPlus('itemsCustomized', lastId, newData));
    dispatch(savelocal(false));
  }
};

const internal_addItemsCustomizedWhenAddInstance = (lastId, newData) => {
  return {
    // type: types.ADD_ITEMS_CUSTOMIZED,
    type: types.ADD_ITEMS_CUSTOMIZED_WHEN_ADD_INSTNACE,
    attr: 'itemsCustomized',
    lastId: lastId.itemsCustomized,
    newData
    // newAddedItemsCustomized
  }
}
// ADD_ITEMS_CUSTOMIZED_WHEN_ADD_INSTNACE = 'addItemsCustomizedWhenAddInstance',
export function addItemsCustomizedWhenAddInstance(lastId, newData, preventBoolean) {
  return dispatch => {
    dispatch(internal_addItemsCustomizedWhenAddInstance(lastId, newData));
    preventBoolean || dispatch(lastIdPlus('itemsCustomized', lastId, newData));
    dispatch(savelocal(false));
  }
  // return {
  //   type: types.ADD_ITEMS_CUSTOMIZED,
  //   attr: 'itemsCustomized',
  //   lastId: lastId.itemsCustomized,
  //   newData: {
  //     ...newData,
  //     templateId: newData.template
  //   },
  //   newAddedItemsCustomized
  // }
}

const internal_addItemsCustomized = (lastId, newData) => ({
  type: types.ADD_ITEMS_CUSTOMIZED,
  lastId: lastId.itemsCustomized,
  newData
})

export function addItemsCustomized(lastId, newData) {
  newData = checkIdOverlapOrNot('itemsCustomized', lastId, newData, 'addItemsCustomized');
  return (dispatch, getState) => {
    dispatch(internal_addItemsCustomized(lastId, newData));
    dispatch(lastIdPlusMulti('itemsCustomized', lastId, {
      items: [ ...newData ]
    }));
    dispatch(savelocal(false));
  }
}

// const checkOrderNumOverlapOrNot = (attr, lastId, requestAction,  prevState) => {
//
// }

export function delItemsCustomized(targetData) {
  return {
    type: types.DEL_ITEMS_CUSTOMIZED,
    targetData
  }
}

const internal_delInstance = targetData => ({
  type: types.DELETE_INSTANCE,
  targetData: {
    ...targetData,
    templateId: targetData.template
  }
});

export function delInstance(targetData) {
  // return {
  //   type: types.DELETE_INSTANCE,
  //   targetData
  // }
  return dispatch => {
    dispatch(internal_delInstance(targetData));
    dispatch(delItemsCustomized(targetData));
    // dispatch(delInstanceListByTemplateWhenDeleteInstance(targetData));
    dispatch(savelocal(false));
  }
}

const delInstancesWhenDelTemplate = targetData => ({
  type: types.DELETE_INSTANCE_WHEN_DELETE_TEMPLATE,
  targetData
})

const internal_modifyInstance = (targetInstanceId, data) => ({
  type: types.MODIFY_INSTANCE,
  targetInstanceId,
  data
})

export function modifyInstance(targetInstanceId, data) {
  // return {
  //   type: types.MODIFY_INSTANCE,
  //   targetInstanceId,
  //   data
  // }
  return dispatch => {
    dispatch(internal_modifyInstance(targetInstanceId, data));
    dispatch(savelocal(false));
  }
}

const internal_modifyItemsCustomized = targetData => ({
  type: types.MODIFY_ITEMS_CUSTOMIZED,
  targetData,
  targetInstanceId: Object.values(targetData).slice(0)[0].instanceId
})

export function modifyItemsCustomized(targetData) {
  // return {
  //   type: types.MODIFY_ITEMS_CUSTOMIZED,
  //   targetData,
  //   targetInstanceId: Object.values(targetData).slice(0)[0].instanceId
  // }
  return dispatch => {
    dispatch(internal_modifyItemsCustomized(targetData));
    dispatch(savelocal(false));
  }
}

const internal_changeStatusOfItemsCustomized = targetData => ({
  type: types.CHANGE_STATUS_OF_ITEMS_CUSTOMIZED,
  targetData
})

export function changeStatusOfItemsCustomized(targetData) {
  // return {
  //   type: types.CHANGE_STATUS_OF_ITEMS_CUSTOMIZED,
  //   targetData
  // }
  return dispatch => {
    dispatch(internal_changeStatusOfItemsCustomized(targetData));
    dispatch(savelocal(false));
  }
}

const internal_addItem = (lastId, newData, templateId) => ({
  type: types.ADD_ITEM,
  newData,
  lastId,
  // templateId: newData[0].templateId
  // templateId: newData instanceof Array ? newData[0].templateId : newData.templateId
  templateId,
})

export function addItem(lastId, newData, targetTemplateId) {
  newData = checkIdOverlapOrNot('items', lastId, newData, 'addItem');
  return dispatch => {
    dispatch(internal_addItem(lastId, newData, targetTemplateId));
    // dispatch(lastIdPlus('items', lastId, newData));
    // dispatch(lastIdPlusMulti('items', lastId, newData));
    dispatch(lastIdPlusMultiObject('items', lastId, newData));
    dispatch(savelocal(false));
  }
}

const internal_addItemWhenAddTemplate = (lastId, newData) => ({
  type: types.ADD_ITEM_WHEN_ADD_TEMPLATE,
  lastId,
  newData
})

const addItemWhenAddTemplate = (lastId, newData) => {
  return dispatch => {
    dispatch(internal_addItemWhenAddTemplate(lastId, newData));
    dispatch(lastIdPlusMulti('items', lastId, newData));
  };
}

function internal_modifyItem(data) {
  return {
    type: types.MODIFY_ITEM,
    data,
  }
}

export function modifyItem(data, templateId) {
  // delete data.length;
  return dispatch => {
    for(let key in data) {
      data[key] == '' && (delete data[key], dispatch(delItem(parseInt(key), parseInt(templateId))))
    }
    Object.keys(data).length > 0 && dispatch(internal_modifyItem(data));
    dispatch(savelocal(false));
  }
}

export function delItem(targetItemId, targetTemplateId) {
  // return {
  //   type: types.DEL_ITEM,
  //   attr: 'items',
  //   targetItemId,
  //   targetTemplateId
  // }
  return dispatch => {
    disaptch(() => ({
      type: types.DEL_ITEM,
      attr: 'items',
      targetItemId,
      targetTemplateId
    }));
    dispatch(savelocal(false));
  }
}

const delItemWhenDeleteTemplate = targetData => ({
  type: types.DEL_ITEM_MULTI_WHEN_DEL_TEMPLATE,
  targetData
})

const internal_addTemplateCategory = (lastId, newData) => ({
  type: types.ADD_TEMPLATE_CATEGORY,
  lastId,
  // lastIndex: lastId.templateCategories - 1 < 0 ? 0 : lastId.templateCategories - 1,
  newData
})

export function addTemplateCategory(lastId, newData) {
  newData = checkIdOverlapOrNot('templateCategories', lastId, newData, 'addTemplateCategory');
  return dispatch => {
    dispatch(internal_addTemplateCategory(lastId, newData));
    // dispatch(addItem(lastId, newData));
    // dispatch(lastIdPlus('templateCategories', lastId, newData));
    dispatch(lastIdPlusOneByOne('templateCategories', lastId, newData));
    dispatch(savelocal(false));
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

export function chooseCategory(__navigatorRouteID, pickerValue) {
  return {
    type: types.CHOOSE_CATEGORY,
    // chosenCategory
    __navigatorRouteID,
    pickerValue
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

const lastIdPlusMulti = (attr, lastId, newData) => ({
  type: types.LAST_ID_PLUS_MULTI,
  attr,
  lastId,
  newData
})

const lastIdPlusMultiObject = (attr, lastId, newData) => ({
  type: types.LAST_ID_PLUS_MULTI_OBJECT,
  attr,
  lastId,
  newData
})

const lastIdPlusOneByOne = (attr, lastId, newData) => ({
  type: types.LAST_ID_PLUS_ONE_BY_ONE,
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
let count = 0;
export function savelocal(alertNeedBoolean) {
  // return {
  //   type: types.SAVE_LOCAL
  // }
  return (dispatch, getState) => {
    const prevState = getState(),
          tempResult = cloneDeep(prevState.normalizeReducer);
    delete tempResult.searchBarText;
    delete tempResult.lastId;
    AsyncStorage.setItem('checklist', JSON.stringify(tempResult), alertNeedBoolean && Alert.alert(
      'Completed',
      'Save on local completed.',
      [
        { text: 'OK' }
      ]
    ));
    console.log('save completed - count : ', ++count);
  }
}

const internal_loadlocal = loadedState => ({
  type: types.LOAD_LOCAL,
  loadedState
})

export function loadlocal(alertNeedBoolean) {
  return async (dispatch, getState) => {
    const loadedState = await AsyncStorage.getItem('checklist')
                                .then(resolve => JSON.parse(resolve))
                                .catch(reject => console.log('error : ', reject));
    if(!loadedState) {
      alertNeedBoolean && Alert.alert(
        'Warning',
        'There is no data.',
        [
          { text: 'OK' }
        ]
      );
      return null;
    }
    dispatch(internal_loadlocal(loadedState));
    alertNeedBoolean && Alert.alert(
      'Completed',
      'Load data from local storage is completed.',
      [
        { text: 'OK' }
      ]
    )
    const prevState = getState();
    console.log('loadlocal - prevState : ', prevState)
    prevState.normalizeReducer.hasOwnProperty('result') && dispatch(findLastId(prevState.normalizeReducer.result));
  }
}

export function deleteAll() {
  Alert.alert(
    'Completed',
    'Delete Completed.',
    [
      { text: 'OK' }
    ]
  )
  return {
    type: types.DELETE_ALL
  }
}

export function deleteLocalStorage() {
  AsyncStorage.removeItem('checklist').then(resolve => Alert.alert(
    'Completed',
    'Data on local storage is deleted.',
    [
      { text: 'OK' }
    ]
  )).catch(error => console.log('error : ', error))
 return {
   type: types.DELETE_DATA_ON_LOCAL_STORAGE
 }
}
