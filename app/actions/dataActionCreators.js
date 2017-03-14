import types from './dataActions'

// const ADD_TEMPLATE = 'addNewTemplate',
//       MODIFY_TEMPLATE = 'modifyExistingTemplate',
//       DELETE_TEMPLATE = 'deleteExistingTemplate',
//       CREATE_NEW_CUSTOMTER_DATA = 'creteNewCustomerData',
//       DELETE_CUSTOMER_DATA = 'deleteExistingCustomerData',
//       MODIFY_CUSTOMER_DATA = 'modifyExistingCustomerData';

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

function internalCreateNewCustomer() {

}

export function createNewCustomer() {
  return {
    type: types.CREATE_NEW_CUSTOMTER_DATA
  }
}

function internalDelCustomer() {

}

export function delCustomer() {
  return {
    type: types.DELETE_CUSTOMER_DATA
  }
}

function internalModifyCustomer() {

}

export function modifyCustomer() {
  return {
    type: types.MODIFY_CUSTOMER_DATA
  }
}
