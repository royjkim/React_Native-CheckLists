import types from '../actions/dataActions'

const initialState = {
  templateList: [],
  customerList: [],
  itemsOnEachTemplate: [],
  sideMenuVisible: false,
  templateCategoryList: []
}

// const ADD_TEMPLATE = 'addNewTemplate',
//       MODIFY_TEMPLATE = 'modifyExistingTemplate',
//       DELETE_TEMPLATE = 'deleteExistingTemplate',
//       CREATE_NEW_CUSTOMTER_DATA = 'creteNewCustomerData',
//       DELETE_CUSTOMER_DATA = 'deleteExistingCustomerData',
//       MODIFY_CUSTOMER_DATA = 'modifyExistingCustomerData';

// templateList: [
//   { title: 'GoingFishing1', category: 'Hobby' },
//   { title: 'GoOut', category: 'NormalDay' }
// ],
// customersList: [
//   { customerName: 'Jack1', templateTitle: 'GoingFishing1'},
//   { customerName: 'Jack2', templateTitle: 'GoingFishing1'},
//   { customerName: 'Jack3', templateTitle: 'GoingFishing1'},
//   { customerName: 'Mike', templateTitle: 'GoOut'},
//   { customerName: 'Sam', templateTitle: 'GoOut'},
// ],
//
// items: [
//   'Wear life vest',
//   'Get on the boat'
// ],
// categoryListModalVisible: false,
// categoryList: [
//   { title: 'rowing', icon: 'rowing' },
//   { title: 'call', icon: 'call' }
// ],

const addNewTemplate = (state, action) => ({
  ...state,
  templateList: [
    ...state.templateList,
    action.newData
  ]
})

const addCustomer = (state, action) => ({
  ...state,
  customerList: [
    ...state.customerList,
    action.newData
  ]
})

export default function dataReducer(state = initialState, action) {
  const reducerMap = {
    [types.ADD_TEMPLATE]: addNewTemplate,
    [types.MODIFY_TEMPLATE]: ({
      ...state,
    }),
    [types.DELETE_TEMPLATE]: ({
      ...state,
    }),
    [types.ADD_CUSTOMER]: addCustomer,
    [types.DELETE_CUSTOMER]: ({
      ...state,
    }),
    [types.MODIFY_CUSTOMER]: ({
      ...state
    })
  }
  const handler = reducerMap[action.type]
  return (typeof handler == 'function' ? handler(state, action) : state)
}
