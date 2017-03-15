import { ListView } from 'react-native'
import { createSelector } from 'reselect'
import Reactotron from 'reactotron-react-native'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

// const templateList = state => state.templateList
const templateList = state => state.templateList
const customerList = state => state.customerList
const itemsOnEachTemplate = state => state.itemsOnEachTemplate
const sideMenuVisible = state => state.sideMenuVisible
const templateCategoryList = state => state.templateCategoryList

const make_get_dataSourceTemplateList = () => createSelector(
  templateList,
  templateList => {
    console.log(`run - selector - make_get_dataSourceTemplateList`)
    const temp_dataSource_templateList = ds.cloneWithRows(templateList)
    return temp_dataSource_templateList
  }
)

const get_dataSourceTemplateList = createSelector(
  templateList,
  templateList => {
    console.log(`run - selector - get_dataSourceTemplateList`)
    const temp_dataSource_templateList = ds.cloneWithRows(templateList)
    return temp_dataSource_templateList
  }
)

const get_badgeValueOfTemplateList = createSelector(
  templateList,
  customerList,
  (templateList = [], customerList = []) => {
    // console.log(`selector - get_Badge - parameter - templateList : ${JSON.stringify(templateList, null, 2)}`)
    // console.log(`selector - get_Badge - parameter - customerList : ${JSON.stringify(customerList, null, 2)}`)
    let tempResult = {}
    templateList.map(value1 => {
      // console.log(`templateList.map() - value1 : ${JSON.stringify(value1, null, 2)}`)
      customerList.map(value2 => {
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


const make_get_badgeValueOfTemplateList = () => createSelector(
  templateList,
  customerList,
  (templateList = [], customerList = []) => {
    // console.log(`selector - get_Badge - parameter - templateList : ${JSON.stringify(templateList, null, 2)}`)
    // console.log(`selector - get_Badge - parameter - customerList : ${JSON.stringify(customerList, null, 2)}`)
    let tempResult = {}
    templateList.map(value1 => {
      // console.log(`templateList.map() - value1 : ${JSON.stringify(value1, null, 2)}`)
      customerList.map(value2 => {
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
    console.log(`run - selector - make_get_badgeValueOfTemplateList`)
    // console.log(`selector - get_Badge - tempResult : ${JSON.stringify(tempResult, null, 2)}`)
    return tempResult
    // selector - get_Badge - tempResult : {
    //   "GoingFishing": 1,
    //   "StayHome": 2
    // }
  }
)

const make_get_dataSourceCustomerList = () => createSelector(
  // customerList,
  [
    state => state.customerList,
    chosenTemplate => chosenTemplate
  ],
  (customerList, chosenTemplate = '') => {
    console.log(`run - selector - make_get_dataSourceCustomerList`)
    console.log(`run - selector - chosenTemplate : ${JSON.stringify(chosenTemplate, null, 2)}`)
    const temp_dataSource_customerList = ds.cloneWithRows(customerList)
    return temp_dataSource_customerList
  }
)

const get_dataSourceCustomerList = createSelector(
  customerList,
  customerList => {
    console.log(`run - selector - get_dataSourceCustomerList`)
    const temp_dataSource_customerList = ds.cloneWithRows(customerList)
    return temp_dataSource_customerList
  }
)

const get_dataSourceItemsOnEachTemplate = createSelector(
  [ itemsOnEachTemplate ],
  itemsOnEachTemplate => {
    console.log(`run - selector - get_dataSourceItemsOnEachTemplate`)
    const temp_dataSource_itemsOnEachTemplate = ds.cloneWithRows(itemsOnEachTemplate)
    return temp_dataSource_itemsOnEachTemplate
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
  // get_dataSourceCustomerList,
  make_get_dataSourceCustomerList,
  get_dataSourceItemsOnEachTemplate,
  get_dataSourceTemplateCategoryList,
  // get_badgeValueOfTemplateList,
  make_get_badgeValueOfTemplateList
}
export default mySelectors

// dataSourceTemplateList: ds.cloneWithRows(state.reducers.templateList),
// dataSourceTemplateListBadgeValue = state.reducers.customerList.filter((element, index, array) => index == array.findIndex(data => data.templateTitle == element.templateTitle))
// dataSourceCustomerList: ds.cloneWithRows(state.reducers.customerList),
// dataSourceItemsOnEachTemplate: ds.cloneWithRows(state.reducers.itemsOnEachTemplate),
// dataSourceTemplateCategoryList: ds.cloneWithRows(state.reducers.templateCategoryList)
//
// const initialState = {
//   templateList: [
//     { title: 'GoingFishing', category: 'Hobby' },
//     { title: 'GoOut', category: 'NormalDay' },
//     { title: 'StayHome', category: 'Relax'}
//   ],
//   customerList: [
//     { customerId: 1, customerName: 'Jack', templateTitle: 'GoingFishing'},
//     { customerId: 1, customerName: 'Jack', templateTitle: 'StayHome'},
//     { customerId: 2, customerName: 'Jimmy', templateTitle: 'StayHome'},
//     { customerId: 3, customerName: 'Mike', templateTitle: 'GoOut'},
//     { customerId: 4, customerName: 'Sam', templateTitle: 'GoOut'},
//   ],
//   itemsOnEachTemplate: [
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
