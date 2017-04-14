import types from '../actions/dataActions';
import entitiesReducer from './entitiesReducer';
import resultReducer from './resultReducer';
import searchBarReducer from './searchBarReducer';
import lastIdReducer from './lastIdReducer';

const initialState = {
  entities: {
    instances: {},
    items: {},
    itemsCustomized: {},
    templateCategories: {},
    templates: {}
  },
  result: {
    instances: {},
    items: {},
    itemsCustomized: {},
    templateCategories: {},
    templates: {}
  },
  searchBarText: {
    instanceList: '',
    itemsOfChosenTemplate: '',
    instancesOfChosenTemplate: '',
    itemsCustomizedAllInstances: '',
    templateList: '',
    itemList: '',
  },
  lastId: {
    instances: 0,
    items: 0,
    itemsCustomized: 0,
    templateCategories: 0,
    templates: 0
  }
}

export default function normalizeReducer(state = initialState, action) {
  const reducerMapper = {
    [types.DELETE_ALL]: () => initialState,
    [types.LOAD_LOCAL]: (state, action) => ({
      ...state,
      ...action.loadedState
    }),
    [types.DELETE_DATA_ON_LOCAL_STORAGE]: state => state
  //   [types.LOAD_LOCAL]: async state => {
  //     try {
  //       let tempResult;
  //       await AsyncStorage.getItem('checklist')
  //         .then(resolve => {
  //           // console.log('resolve : ', resolve);
  //           // console.log('parse - resolve : ', JSON.parse(resolve));
  //           tempResult = JSON.parse(resolve);
  //           console.log('tempResult : ', tempResult);
  //           return tempResult => tempResult
  //           // return () => tempResult
  //           // return tempResult
  //         }, reject => console.log('error : ', reject))
  //       // await AsyncStorage.getItem('checklist', (error, result) => error ? console.log('error : ', error) : tempResult = JSON.parse(result))
  //       // await AsyncStorage.getItem('checklist')
  //       //   .then(data => {
  //       //     console.log('before - parse - data : ', JSON.parse(data));
  //       //     tempResult = JSON.parse(data);
  //       //     // tempResult = (() => JSON.parse(data))();
  //       //     console.log('tempResult : ', tempResult)
  //       //     console.log('typeof tempResult : ', typeof tempResult);
  //       //     Alert.alert(
  //       //       'Completed',
  //       //       'Load from local completed.',
  //       //       [
  //       //         // { text: 'OK', onPress: () => () => tempResult }
  //       //         { text: 'OK' }
  //       //       ]
  //       //     );
  //       //   });
  //       // console.log('tempResult : ', tempResult)
  //       // console.log('typeof tempResult : ', typeof tempResult);
  //       // Alert.alert(
  //       //   'Completed',
  //       //   'Load from local completed.',
  //       //   [
  //       //     { text: 'OK' }
  //       //   ]
  //       // );
  //       // return tempResult => tempResult
  //     } catch(e) {
  //       console.log('error : ', e)
  //     }
  //     // setTimeout(tempResult => tempResult => {
  //     //   console.log('setTimeout')
  //     //   return tempResult
  //     // }, 6000);
  //     // setTimeout(() => () => tempResult, 6000);
  //   },
  };
  // // return {
  // //   entities: entitiesReducer(state.entities, action),
  // //   result: resultReducer(state.result, action),
  // //   searchBarText: searchBarReducer(state.searchBarText, action),
  // //   lastId: lastIdReducer(state.lastId, action)
  // // }
  return reducerMapper.hasOwnProperty(action.type) ? reducerMapper[action.type](state, action) : {
    entities: entitiesReducer(state.entities, action),
    result: resultReducer(state.result, action),
    searchBarText: searchBarReducer(state.searchBarText, action),
    lastId: lastIdReducer(state.lastId, action)
  }
}
