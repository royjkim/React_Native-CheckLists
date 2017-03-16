import types from './dataActions'

// const ADD_TEMPLATE = 'addNewTemplate',
//       MODIFY_TEMPLATE = 'modifyExistingTemplate',
//       DELETE_TEMPLATE = 'deleteExistingTemplate',
//       ADD_INSTANCE = 'addInstance',
//       DELETE_INSTANCE = 'deleteInstance',
//       MODIFY_INSTANCE = 'modifyInstance';
//       MY_NORMALIZE = 'my_normalize',
//       ORIGINAL_DATA_ADD_TEMPLATE = 'addOriginalTemplate',
//       ORIGINAL_DATA_ADD_INSTANCE = 'addOriginalInstance';

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

export function modifyInstance() {
  return {
    type: types.MODIFY_INSTANCE
  }
}

export function my_normalize() {
  return {
    type: types.MY_NORMALIZE
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
