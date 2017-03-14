import types from '../actions/navigationActions'

const initialState = {
  routeStack: [],
  lastRoute: {}
}

// routeStack = [
//   {
//     passProps: {
//       leftButton: {
//         title: '',
//         component: ,
//       },
//       rightButton: {
//         title: '',
//         component: ,
//       },
//     },
//   title: ,
//   component: ,
//   sideMenuVisible: false
//   }
// ],
// lastRoute : {
//     passProps: {
//       leftButton: '',
//       rightButton: ''
//     },
//   title: ,
//   component: ,
//   sideMenuVisible: false
//   }


// const PUSH_ROUTE = 'pushRoute',
//       POP_ROUTE = 'popRoute',
//       SIDE_MENU_VISIBLE = 'sideMenuVisible';

const pushRoute = (state, action) => ({
  routeStack: [
    ...state.routeStack,
    action.newRoute
  ],
  lastRoute: action.newRoute
})
const popRoute = (state, action) => {
  return {
    routeStack: [
      ...state.routeStack.slice(0, state.routeStack.length - 1)
    ],
    lastRoute: state.routeStack.slice(-2)[0]
  }
}

// const sideMenuVisible = (state, action) => ({
//   routeStack: [
//     ...state.routeStack,
//     sideMenuVisible: !state.routeStack.sideMenuVisible
//   ]
// })

export default function navigationReducer(state = initialState, action) {
  const reducerMap = {
    [types.PUSH_ROUTE]: pushRoute,
    [types.POP_ROUTE]: popRoute,
    // [types.SIDE_MENU_VISIBLE]: sideMenuVisible
  }
  const handler = reducerMap[action.type]
  return (typeof handler == 'function' ? handler(state, action) : state)
}
