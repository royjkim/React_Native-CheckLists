import types from './dataActions'

// const ADD_TEMPLATE = 'addNewTemplate',
//       MODIFY_TEMPLATE = 'modifyExistingTemplate',
//       DELETE_TEMPLATE = 'deleteExistingTemplate',
//       ADD_CUSTOMER = 'addCustomer',
//       DELETE_CUSTOMER = 'deleteCustomer',
//       MODIFY_CUSTOMER = 'modifyCustomer';
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

function internalAddCustomer() {

}

export function addCustomer(newData) {
  return {
    type: types.ADD_CUSTOMER,
    newData
  }
}

function internalDelCustomer() {

}

export function delCustomer() {
  return {
    type: types.DELETE_CUSTOMER
  }
}

function internalModifyCustomer() {

}

export function modifyCustomer() {
  return {
    type: types.MODIFY_CUSTOMER
  }
}
