import { ListView } from 'react-native'
import { createSelector } from 'reselect'
import Reactotron from 'reactotron-react-native'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const templates = state => state.templates
const instances = state => state.instances
const chosenTemplate = (state, chosenTemplate) => chosenTemplate
const items = state => state.items
// const sideMenuVisible = state => state.sideMenuVisible
const templateCategories = state => state.templateCategories

// this.normalizedData : {
//   "entities": {
//     "templates": {
//       "1": {
//         "id": 1,
//         "title": "GoingFishing",
//         "category": "Hobby"
//       },
//     },
//     "instances": {
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
//     "templateCategories": {
//       "1": {
//         "id": 1,
//         "title": "Hobby"
//       },
//   },

// Below new
const make_get_dataSourceTemplates = () => createSelector(
  templates,
  templates => {
    console.log(`run - selector - make_get_dataSourceTemplates`)
    const temp_convertToArray = Object.values(templates)
    console.log(`temp_convertToArray : ${JSON.stringify(temp_convertToArray, null, 1)}`)
    const temp_dataSource_templates = ds.cloneWithRows(temp_convertToArray)
    return temp_dataSource_templates
  }
)

// const get_dataSourceTemplates = createSelector(
//   templates,
//   templates => {
//     console.log(`run - selector - get_dataSourceTemplates`)
//     const temp_dataSource_templates = ds.cloneWithRows(templates)
//     return temp_dataSource_templates
//   }
// )

const get_badgeValueOfTemplates = createSelector(
  templates,
  instances,
  (templates = [], instances = []) => {
    // console.log(`selector - get_Badge - parameter - templates : ${JSON.stringify(templates, null, 2)}`)
    // console.log(`selector - get_Badge - parameter - instances : ${JSON.stringify(instances, null, 2)}`)
    let tempResult = {}
    templates.map(value1 => {
      // console.log(`templates.map() - value1 : ${JSON.stringify(value1, null, 2)}`)
      instances.map(value2 => {
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
    console.log(`run - selector - get_badgeValueOfTemplates`)
    // console.log(`selector - get_Badge - tempResult : ${JSON.stringify(tempResult, null, 2)}`)
    return tempResult
    // selector - get_Badge - tempResult : {
    //   "GoingFishing": 1,
    //   "StayHome": 2
    // }
  }
)

// Below new
const make_get_badgeValueOfTemplates = () => createSelector(
  templates,
  instances,
  (templates = [], instances = []) => {
    // console.log(`selector - get_Badge - parameter - templates : ${JSON.stringify(templates, null, 2)}`)
    // console.log(`selector - get_Badge - parameter - instances : ${JSON.stringify(instances, null, 2)}`)
    let tempResult = {}
    Object.values(templates).map(value1 => {
      Object.values(instances).map(value2 => {
        // console.log(`selector - badge - value1 : ${JSON.stringify(value1, null, 1)}`)
        // console.log(`selector - badge - value2 : ${JSON.stringify(value2, null, 1)}`)
        // console.log(`value1.title : ${value1.title}, value2.template : ${value2.template}`)
        if(value1.title == value2.template) {
          if(tempResult[value1.title]) {
            tempResult[value1.title] = tempResult[value1.title] + 1
          } else {
            tempResult[value1.title] = 1
          }
        }
      })
    })
    console.log(`run - selector - make_get_badgeValueOfTemplates`)
    // console.log(`selector - get_Badge - tempResult : ${JSON.stringify(tempResult, null, 2)}`)
    return tempResult
    // selector - get_Badge - tempResult : {
    //   "GoingFishing": 1,
    //   "StayHome": 2
    // }
  }
)

// Below New
const make_get_chosenTemplate_of_dataSourceInstances = () => createSelector(
  [
    instances,
    chosenTemplate
  ],
  (instances, chosenTemplate) => {
    console.log(`run - selector - make_get_chosenTemplate_of_dataSourceInstances`)
    const temp_instances_of_chosenTemplate = Object.values(instances).filter(value => value.template == chosenTemplate)
    const temp_dataSource_instances = ds.cloneWithRows(temp_instances_of_chosenTemplate)
    return temp_dataSource_instances
  }
)

//     "instances": {
//       "1": {
//         "id": 1,
//         "name": "Jack",
//         "template": "GoingFishing"
//       },
//     },

// const make_get_badgeValueOfinstances = createSelector(
//   instances,
//   instances => {
//     console.log(`run - selector - make_get_badgeValueOfinstances`)
//     const temp_get_badgeValueOfinstances =
//   }
// )

//   instances: [
//     { id: 1, name: 'Jack', template: 'GoingFishing'},
//     { id: 1, name: 'Jack', template: 'StayHome'},
//     { id: 2, name: 'Jimmy', template: 'StayHome'},
//     { id: 3, name: 'Mike', template: 'BeforeGoOutHome'},
//     { id: 4, name: 'Sam', template: 'BeforeGoOutHome'},
//   ],


const get_dataSourceInstances = createSelector(
  instances,
  instances => {
    console.log(`run - selector - get_dataSourceInstances`)
    const temp_dataSource_instances = ds.cloneWithRows(instances)
    return temp_dataSource_instances
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
  [ templateCategories ],
  templateCategories => {
    console.log(`run - selector - get_dataSourceTemplateCategoryList`)
    const temp_dataSource_templateCategories = ds.cloneWithRows(templateCategories)
    return temp_dataSource_templateCategories
  }
)

const mySelectors = {
  // get_dataSourceTemplates,
  make_get_dataSourceTemplates,
  // get_dataSourceInstances,
  make_get_chosenTemplate_of_dataSourceInstances,
  get_dataSourceItemsOnEachTemplate,
  get_dataSourceTemplateCategoryList,
  // get_badgeValueOfTemplates,
  make_get_badgeValueOfTemplates
}
export default mySelectors

// dataSourceTemplates: ds.cloneWithRows(state.reducers.templates),
// dataSourceTemplatesBadgeValue = state.reducers.instances.filter((element, index, array) => index == array.findIndex(data => data.templateTitle == element.templateTitle))
// dataSourceInstances: ds.cloneWithRows(state.reducers.instances),
// dataSourceItemsOnEachTemplate: ds.cloneWithRows(state.reducers.items),
// dataSourceTemplateCategoryList: ds.cloneWithRows(state.reducers.templateCategories)
//
// const initialState = {
//   templates: [
//     { title: 'GoingFishing', category: 'Hobby' },
//     { title: 'GoOut', category: 'NormalDay' },
//     { title: 'StayHome', category: 'Relax'}
//   ],
//   instances: [
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
//   templateCategories: [
//     { title: 'rowing', icon: 'rowing' },
//     { title: 'call', icon: 'call' },
//   ]
// }
