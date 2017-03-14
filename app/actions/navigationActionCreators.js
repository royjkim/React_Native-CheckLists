import types from './navigationActions'

// const PUSH_ROUTE = 'pushRoute',
//       POP_ROUTE = 'popRoute',
//       SIDE_MENU_VISIBLE = 'sideMenuVisible';

// routeStack = [
//   {
//     passProps: {
//       leftButton: '',
//       rightButton: ''
//     },
//   title: ,
//   component: ,
//   sideMenuVisible: false
//   }
// ]

export function pushRoute(newRoute) {
  return {
    type: types.PUSH_ROUTE,
    newRoute
  }
}

export function popRoute() {
  return {
    type: types.POP_ROUTE,
  }
}

export function sideMenuVisible(status) {
  return {
    type: types.SIDE_MENU_VISIBLE,
    status
  }
}
