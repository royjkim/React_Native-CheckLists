import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import Reactotron from 'reactotron-react-native'
import reducer from '../reducers/reducer'
import { normalizedDataInput, findLastId } from '../actions/dataActionCreators'

import HomeContainer from '../home/homeContainer'
import normalizeStore from './normalizeStore'

const logger = createLogger();

export default function initializeStore() {
  const store = Reactotron.createStore(reducer, compose(applyMiddleware(thunk, logger)))
  console.log('module.hot : ', module.hot)
  if(module.hot) {
    console.log('module.hot is True')
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/reducer')
      store.replaceReducer(nextRootReducer)
    })
  }
  let initialData = {
    templates: [],
    items: [],
    instances: [],
    itemsCustomized: [],
    templateCategories: []
  };
  initialData = normalizeStore.addOriginalTemplate(initialData,
    {
      templateId: 1,
      title: 'GoingFishing',
      category: 'Hobby',
      items: [
        { itemId: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
        { itemId: 6, desc: 'Open Door', template: 'GoingFishing', orderNum: 8 }
      ],
      instances: [
        { instanceId: 1 },
      ]
    },
    {
      templateId: 2,
      title: 'BeforeGoOutHome',
      category: 'NormalDay',
      items: [
        { itemId: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 },
        { itemId: 7, desc: 'Watching TV', template: 'BeforeGoOutHome', orderNum: 3  },
      ],
      instances: [
        { instanceId: 3 },
      ]
    },
    {
      templateId: 3,
      title: 'StayHome',
      category: 'Relax',
      items: [
        { itemId: 8, desc: 'Open Door', template: 'StayHome', orderNum: 8 },
        { itemId: 9, desc: 'Get on the boat', template: 'StayHome', orderNum: 1 },
      ],
      instances: [
        { instanceId: 2 },
        { instanceId: 4 }
      ]
    }
  )

  initialData = normalizeStore.addOriginalInstance(initialData,
    {
      instanceId: 1,
      name: 'Jack',
      // template: 'GoingFishing',
      // templateId: 1,
      template: { templateId: 1, additionalInfo: 'addable' },
      items: [
        { itemCustomizedId: 1, desc: 'Get on the boat' },
        { itemCustomizedId: 2, desc: 'Wear life vest' },
        { itemCustomizedId: 3, desc: 'Watching TV'  }
      ]
    },
    {
      instanceId: 2,
      name: 'Jack',
      // template: 'StayHome',
      // templateId: 3,
      template: { templateId: 3, additionalInfo: 'addable' },
      items: [
        { itemCustomizedId: 4, desc: 'Close Door' },
        { itemCustomizedId: 5, desc: 'Open Door' },
        { itemCustomizedId: 6, desc: 'Watching TV'  }
      ]
    },
    {
      instanceId: 3,
      name: 'Mike',
      // template: 'BeforeGoOutHome',
      // templateId: 2,
      template: { templateId: 2, additionalInfo: 'addable' },
      items: [
        { itemCustomizedId: 7, desc: 'Close Door' },
        { itemCustomizedId: 8, desc: 'Open Door' }
      ]
    },
    {
      instanceId: 4,
      name: 'Mike',
      // template: 'StayHome',
      // templateId: 3,
      template: { templateId: 3, additionalInfo: 'addable' },
      items: [
        { itemCustomizedId: 9, desc: 'Close Door' },
        { itemCustomizedId: 10, desc: 'Watching TV'  },
        { itemCustomizedId: 11, desc: 'Open Door' }
      ]
    }
  )

  initialData = normalizeStore.addItem(initialData,
    { itemId: 1, desc: 'Wear life vest', templateId: 1, orderNum: 5 },
    { itemId: 2, desc: 'Watching TV', templateId: 3, orderNum: 1  },
    { itemId: 3, desc: 'Get on the boat', templateId: 1, orderNum: 1 },
    { itemId: 4, desc: 'Close Door', templateId: 2, orderNum: 10 },
    { itemId: 5, desc: 'Open Door', templateId: 2, orderNum: 8 },
    { itemId: 5, desc: 'Open Door', templateId: 2, orderNum: 8 },
    { itemId: 6, desc: 'Open Door', templateId: 1, orderNum: 8 },
    { itemId: 7, desc: 'Watching TV', templateId: 2, orderNum: 3  },
    { itemId: 8, desc: 'Open Door', templateId: 3, orderNum: 8 },
    { itemId: 9, desc: 'Get on the boat', templateId: 3, orderNum: 1 },
  )

  initialData = normalizeStore.addCategory(initialData,
    { id: 1, title: 'Hobby' },
    { id: 2, title: 'NormalDay' },
    { id: 3, title: 'Relax' },
    { id: 4, title: 'testHobby' },
    { id: 5, title: 'testNormalDay' },
    { id: 6, title: 'testRelax' },
    { id: 7, title: 'aaaaTest' }
  )

  initialData = normalizeStore.addItemsCustomized(initialData,
    { itemCustomizedId: 1, itemId: 3, instanceId: 1, desc: 'Get on the boat', orderNum: 3, status: false },
    { itemCustomizedId: 2, itemId: 1, instanceId: 1, desc: 'Wear life vest', orderNum: 2, status: false },
    { itemCustomizedId: 3, itemId: 2, instanceId: 1, desc: 'Watching TV', orderNum: 1, status: false },
    { itemCustomizedId: 4, itemId: 4, instanceId: 2, desc: 'Close Door', orderNum: 10, status: false },
    { itemCustomizedId: 5, itemId: 5, instanceId: 2, desc: 'Open Door', orderNum: 8, status: true },
    { itemCustomizedId: 6, itemId: 2, instanceId: 2, desc: 'Watching TV', orderNum: 1, status: false },
    { itemCustomizedId: 7, itemId: 4, instanceId: 3, desc: 'Close Door', orderNum: 4, status: true },
    { itemCustomizedId: 8, itemId: 5, instanceId: 3, desc: 'Open Door', orderNum: 3, status: false },
    { itemCustomizedId: 9, itemId: 4, instanceId: 4, desc: 'Close Door', orderNum: 3, status: true },
    { itemCustomizedId: 10, itemId: 2, instanceId: 4, desc: 'Watching TV', orderNum: 1, status: true },
    { itemCustomizedId: 11, itemId: 5, instanceId: 4, desc: 'Open Door', orderNum: 2, status: false }
  )

  // setTimeout(() => store.dispatch(my_normalize()), 4000)

  // console.log('Before normalize - initialData : ', initialData)
  initialData = normalizeStore.my_normalize(initialData)
  // console.log(`After normalize - initialData : ', ${JSON.stringify(initialData, null, 1)}`)
  console.log('After normalize - initialData : ', initialData)

  store.dispatch(normalizedDataInput(initialData))
  const tempResult = store.getState()
  // console.log(`tempResult : `, tempResult)
  store.dispatch(findLastId(tempResult.normalizeReducer.result))
  // console.log(`store.getState() : ${JSON.stringify(store.getState(), null, 1)}`)
  // console.log(`store.getState() : `, store.getState())
  return store
}
