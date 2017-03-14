import { ListView } from 'react-native'
import { createSelector } from 'reselect'
import Reactotron from 'reactotron-react-native'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const templateList = state => state.templateList
const customerList = state => state.customerList
const itemsOnEachTemplate = state => state.itemsOnEachTemplate
const sideMenuVisible = state => state.sideMenuVisible
const templateCategoryList = state => state.templateCategoryList

const get_dataSourceTemplateList = createSelector(
  [ templateList ],
  templateList => {
    Reactotron.log(`selector - get_dataSourceTemplateList`)
    const temp_dataSource_templateList = ds.cloneWithRows(templateList)
    return temp_dataSource_templateList
  }
)

// export const get_BadgeValueOfTemplateList = createSelector(
//
// )

const get_dataSourceCustomerList = createSelector(
  [ customerList ],
  customerList => {
    Reactotron.log(`selector - get_dataSourceCustomerList`)
    const temp_dataSource_customerList = ds.cloneWithRows(customerList)
    return temp_dataSource_customerList
  }
)

const get_dataSourceItemsOnEachTemplate = createSelector(
  [ itemsOnEachTemplate ],
  itemsOnEachTemplate => {
    Reactotron.log(`selector - get_dataSourceItemsOnEachTemplate`)
    const temp_dataSource_itemsOnEachTemplate = ds.cloneWithRows(itemsOnEachTemplate)
    return temp_dataSource_itemsOnEachTemplate
  }
)

const get_dataSourceTemplateCategoryList = createSelector(
  [ templateCategoryList ],
  templateCategoryList => {
    Reactotron.log(`selector - get_dataSourceTemplateCategoryList`)
    const temp_dataSource_templateCategoryList = ds.cloneWithRows(templateCategoryList)
    return temp_dataSource_templateCategoryList
  }
)

const mySelectors = {
  get_dataSourceTemplateList,
  get_dataSourceCustomerList,
  get_dataSourceItemsOnEachTemplate,
  get_dataSourceTemplateCategoryList
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
