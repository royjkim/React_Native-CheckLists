import types from '../actions/actions'

const initialState = {
  templateList: [
    { title: 'GoingFishing', category: 'Hobby' },
    { title: 'GoOut', category: 'NormalDay' },
    { title: 'StayHome', category: 'Relax'}
  ],
  customerList: [
    { CustomerName: 'Jack1', templateTitle: 'GoingFishing'},
    { CustomerName: 'Jack2', templateTitle: 'StayHome'},
    { CustomerName: 'Jack3', templateTitle: 'StayHome'},
    { CustomerName: 'Mike', templateTitle: 'GoOut'},
    { CustomerName: 'Sam', templateTitle: 'GoOut'},
  ],
  itemsOnEachTemplate: [
    { itemDesc: 'Wear life vest', template: 'GoingFishing', orderNum: 5 },
    { itemDesc: 'Wathing TV', template: 'StayHome', orderNum: 1  },
    { itemDesc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
    { itemDesc: 'Close Door', template: 'GoOut', orderNum: 10 },
    { itemDesc: 'Open Door', template: 'GoOut', orderNum: 8 },
  ],
  sideMenuVisible: false,
  templateCategoryList: [
    { title: 'rowing', icon: 'rowing' },
    { title: 'call', icon: 'call' },
  ]
}

// const ADD_TEMPLATE = 'addNewTemplate',
//       MODIFY_TEMPLATE = 'modifyExistingTemplate',
//       DELETE_TEMPLATE = 'deleteExistingTemplate',
//       CREATE_NEW_CUSTOMTER_DATA = 'creteNewCustomerData',
//       DELETE_CUSTOMER_DATA = 'deleteExistingCustomerData',
//       MODIFY_CUSTOMER_DATA = 'modifyExistingCustomerData';


export default function reducer(state = initialState, action) {
  const reducerMap = {
    [types.ADD_TEMPLATE]: ({
      ...state,
    }),
    [types.MODIFY_TEMPLATE]: ({
      ...state,
    }),
    [types.DELETE_TEMPLATE]: ({
      ...state,
    }),
    [types.CREATE_NEW_CUSTOMTER_DATA]: ({
      ...state,
    }),
    [types.DELETE_CUSTOMER_DATA]: ({
      ...state,
    }),
    [types.MODIFY_CUSTOMER_DATA]: ({
      ...state
    })
  }
  const handler = reducerMap[action.type]
  return (typeof handler == 'function' ? handler : state)
}

// templateList: [
//   { title: 'GoingFishing1', category: 'Hobby' },
//   { title: 'GoOut', category: 'NormalDay' }
// ],
// customersList: [
//   { CustomerName: 'Jack1', templateTitle: 'GoingFishing1'},
//   { CustomerName: 'Jack2', templateTitle: 'GoingFishing1'},
//   { CustomerName: 'Jack3', templateTitle: 'GoingFishing1'},
//   { CustomerName: 'Mike', templateTitle: 'GoOut'},
//   { CustomerName: 'Sam', templateTitle: 'GoOut'},
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
