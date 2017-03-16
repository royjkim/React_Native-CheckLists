import { ListView } from 'react-native'
import { createSelector } from 'reselect'
import Reactotron from 'reactotron-react-native'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const templateList = state => state.entities.templateList
const instanceList = state => state.entities.instanceList
const chosenTemplate = (state, chosenTemplate) => chosenTemplate
const items = state => state.entities.items
// const sideMenuVisible = state => state.sideMenuVisible
const templateCategoryList = state => state.entities.templateCategoryList

// this.normalizedData : {
//   "entities": {
//     "templateList": {
//       "1": {
//         "id": 1,
//         "title": "GoingFishing",
//         "category": "Hobby"
//       },
//     },
//     "instanceList": {
//       "1": {
//         "id": 1,
//         "name": "Jack",
//         "template": "GoingFishing"
//       },
//     },
//     "items": {
//       "1": {
//         "id": 1,
//         "desc": "Wear life vest",
//         "template": "GoingFishing",
//         "orderNum": 5
//       },
//     },
//     "templateCategoryList": {
//       "1": {
//         "id": 1,
//         "title": "Hobby"
//       },
//   },

// Below new
const make_get_dataSourceTemplateList = () => createSelector(
  templateList,
  templateList => {
    console.log(`run - selector - make_get_dataSourceTemplateList`)
    const temp_convertToArray = Object.values(templateList)
    const temp_dataSource_templateList = ds.cloneWithRows(temp_convertToArray)
    return temp_dataSource_templateList
  }
)

// const get_dataSourceTemplateList = createSelector(
//   templateList,
//   templateList => {
//     console.log(`run - selector - get_dataSourceTemplateList`)
//     const temp_dataSource_templateList = ds.cloneWithRows(templateList)
//     return temp_dataSource_templateList
//   }
// )

const get_badgeValueOfTemplateList = createSelector(
  templateList,
  instanceList,
  (templateList = [], instanceList = []) => {
    // console.log(`selector - get_Badge - parameter - templateList : ${JSON.stringify(templateList, null, 2)}`)
    // console.log(`selector - get_Badge - parameter - instanceList : ${JSON.stringify(instanceList, null, 2)}`)
    let tempResult = {}
    templateList.map(value1 => {
      // console.log(`templateList.map() - value1 : ${JSON.stringify(value1, null, 2)}`)
      instanceList.map(value2 => {
        // console.log(`value1.title : ${value1.title}, value2.templateTitle : ${value2.templateTitle}`)
        if(value1.title == value2.templateTitle) {
          if(tempResult[value1.title] == null) {
            tempResult[value1.title] = 1
          } else {
            tempResult[value1.title] = tempResult[value1.title] + 1
          }
        }
      })
    })
    console.log(`run - selector - get_badgeValueOfTemplateList`)
    // console.log(`selector - get_Badge - tempResult : ${JSON.stringify(tempResult, null, 2)}`)
    return tempResult
    // selector - get_Badge - tempResult : {
    //   "GoingFishing": 1,
    //   "StayHome": 2
    // }
  }
)

// Below new
const make_get_badgeValueOfTemplateList = () => createSelector(
  templateList,
  instanceList,
  (templateList = [], instanceList = []) => {
    // console.log(`selector - get_Badge - parameter - templateList : ${JSON.stringify(templateList, null, 2)}`)
    // console.log(`selector - get_Badge - parameter - instanceList : ${JSON.stringify(instanceList, null, 2)}`)
    let tempResult = {}
    Object.values(templateList).map(value1 => {
      Object.values(instanceList).map(value2 => {
        // console.log(`selector - badge - value1 : ${JSON.stringify(value1, null, 1)}`)
        // console.log(`selector - badge - value2 : ${JSON.stringify(value2, null, 1)}`)
        console.log(`value1.title : ${value1.title}, value2.template : ${value2.template}`)
        if(value1.title == value2.template) {
          if(tempResult[value1.title]) {
            tempResult[value1.title] = tempResult[value1.title] + 1
          } else {
            tempResult[value1.title] = 1
          }
        }
      })
    })
    console.log(`run - selector - make_get_badgeValueOfTemplateList`)
    // console.log(`selector - get_Badge - tempResult : ${JSON.stringify(tempResult, null, 2)}`)
    return tempResult
    // selector - get_Badge - tempResult : {
    //   "GoingFishing": 1,
    //   "StayHome": 2
    // }
  }
)

// Below New
const make_get_chosenTemplate_of_dataSourceInstanceList = () => createSelector(
  [
    instanceList,
    chosenTemplate
  ],
  (instanceList, chosenTemplate) => {
    console.log(`run - selector - make_get_chosenTemplate_of_dataSourceInstanceList`)
    const temp_instanceList_of_chosenTemplate = Object.values(instanceList).filter(value => value.template == chosenTemplate)
    const temp_dataSource_instanceList = ds.cloneWithRows(temp_instanceList_of_chosenTemplate)
    return temp_dataSource_instanceList
  }
)

//     "instanceList": {
//       "1": {
//         "id": 1,
//         "name": "Jack",
//         "template": "GoingFishing"
//       },
//     },

// const make_get_badgeValueOfinstanceList = createSelector(
//   instanceList,
//   instanceList => {
//     console.log(`run - selector - make_get_badgeValueOfinstanceList`)
//     const temp_get_badgeValueOfinstanceList =
//   }
// )

//   instanceList: [
//     { id: 1, name: 'Jack', template: 'GoingFishing'},
//     { id: 1, name: 'Jack', template: 'StayHome'},
//     { id: 2, name: 'Jimmy', template: 'StayHome'},
//     { id: 3, name: 'Mike', template: 'BeforeGoOutHome'},
//     { id: 4, name: 'Sam', template: 'BeforeGoOutHome'},
//   ],


const get_dataSourceInstanceList = createSelector(
  instanceList,
  instanceList => {
    console.log(`run - selector - get_dataSourceInstanceList`)
    const temp_dataSource_instanceList = ds.cloneWithRows(instanceList)
    return temp_dataSource_instanceList
  }
)

const get_dataSourceItemsOnEachTemplate = createSelector(
  [ items ],
  items => {
    console.log(`run - selector - get_dataSourceItemsOnEachTemplate`)
    const temp_dataSource_items = ds.cloneWithRows(items)
    return temp_dataSource_items
  }
)

const get_dataSourceTemplateCategoryList = createSelector(
  [ templateCategoryList ],
  templateCategoryList => {
    console.log(`run - selector - get_dataSourceTemplateCategoryList`)
    const temp_dataSource_templateCategoryList = ds.cloneWithRows(templateCategoryList)
    return temp_dataSource_templateCategoryList
  }
)

const mySelectors = {
  // get_dataSourceTemplateList,
  make_get_dataSourceTemplateList,
  // get_dataSourceInstanceList,
  make_get_chosenTemplate_of_dataSourceInstanceList,
  get_dataSourceItemsOnEachTemplate,
  get_dataSourceTemplateCategoryList,
  // get_badgeValueOfTemplateList,
  make_get_badgeValueOfTemplateList
}
export default mySelectors

// dataSourceTemplateList: ds.cloneWithRows(state.reducers.templateList),
// dataSourceTemplateListBadgeValue = state.reducers.instanceList.filter((element, index, array) => index == array.findIndex(data => data.templateTitle == element.templateTitle))
// dataSourceInstanceList: ds.cloneWithRows(state.reducers.instanceList),
// dataSourceItemsOnEachTemplate: ds.cloneWithRows(state.reducers.items),
// dataSourceTemplateCategoryList: ds.cloneWithRows(state.reducers.templateCategoryList)
//
// const initialState = {
//   templateList: [
//     { title: 'GoingFishing', category: 'Hobby' },
//     { title: 'GoOut', category: 'NormalDay' },
//     { title: 'StayHome', category: 'Relax'}
//   ],
//   instanceList: [
//     { customerId: 1, customerName: 'Jack', templateTitle: 'GoingFishing'},
//     { customerId: 1, customerName: 'Jack', templateTitle: 'StayHome'},
//     { customerId: 2, customerName: 'Jimmy', templateTitle: 'StayHome'},
//     { customerId: 3, customerName: 'Mike', templateTitle: 'GoOut'},
//     { customerId: 4, customerName: 'Sam', templateTitle: 'GoOut'},
//   ],
//   items: [
//     { itemDesc: 'Wear life vest', template: 'GoingFishing', orderNum: 5 },
//     { itemDesc: 'Wathing TV', template: 'StayHome', orderNum: 1  },
//     { itemDesc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
//     { itemDesc: 'Close Door', template: 'GoOut', orderNum: 10 },
//     { itemDesc: 'Open Door', template: 'GoOut', orderNum: 8 },
//   ],
//   sideMenuVisible: false,
//   templateCategoryList: [
//     { title: 'rowing', icon: 'rowing' },
//     { title: 'call', icon: 'call' },
//   ]
// }
