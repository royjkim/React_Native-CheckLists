import { ListView } from 'react-native'
import { createSelector } from 'reselect'
import Reactotron from 'reactotron-react-native'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const templates = state => state.templates
const instances = state => state.instances
const chosenTemplate = (state, chosenTemplate) => chosenTemplate

const chosenInstance = (state, chosenInstance) => {
  console.log(`chosenInstance - parameter : ${JSON.stringify(chosenInstance, null, 1)}`)
  return chosenInstance
}
const items = state => state.items
// const sideMenuVisible = state => state.sideMenuVisible
const templateCategories = state => state.templateCategories

// Below new
const make_get_dataSourceTemplates = () => createSelector(
  templates,
  templates => {
    console.log(`run - selector - make_get_dataSourceTemplates`)
    console.log(`selector - parameter - templates : ${JSON.stringify(templates, null, 1)}`)
    const temp_convertToArray = Object.values(templates)
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
          (tempResult.hasOwnProperty(value1.title) ? tempResult[value1.title] = tempResult[value1.title] + 1 : tempResult[value1.title] = 1)
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
  // (state, chosenTemplate) => {
  //   console.log(`Here - parameter - state : ${JSON.stringify(state, null, 1)}`)
  //   console.log(`Here - parameter - chosenTemplate : ${JSON.stringify(chosenTemplate, null, 1)}`)
  //   return state.instances
  // },
  // (state, chosenTemplate) => {
  //   console.log(`Here - parameter - chosenTemplate : ${JSON.stringify(chosenTemplate, null, 1)}`)
  //   return chosenTemplate
  // },
  instances,
  chosenTemplate,
  (instances, chosenTemplate) => {
    console.log(`run - selector - make_get_chosenTemplate_of_dataSourceInstances`)
    const temp_instances_of_chosenTemplate = Object.values(instances).filter(value => value.template == chosenTemplate.title)
    const temp_dataSource_instances = ds.cloneWithRows(temp_instances_of_chosenTemplate)
    return temp_dataSource_instances
  }
)

// const get_dataSourceInstances = createSelector(
//   instances,
//   instances => {
//     console.log(`run - selector - get_dataSourceInstances`)
//     const temp_dataSource_instances = ds.cloneWithRows(instances)
//     return temp_dataSource_instances
//   }
// )
//
// const get_dataSourceItemsOnEachTemplate = createSelector(
//   items,
//   items => {
//     console.log(`run - selector - get_dataSourceItemsOnEachTemplate`)
//     const temp_dataSource_items = ds.cloneWithRows(items)
//     return temp_dataSource_items
//   }
// )
//
// const get_dataSourceTemplateCategoryList = createSelector(
//   templateCategories,
//   templateCategories => {
//     console.log(`run - selector - get_dataSourceTemplateCategoryList`)
//     const temp_dataSource_templateCategories = ds.cloneWithRows(templateCategories)
//     return temp_dataSource_templateCategories
//   }
// )

const make_get_dataSourceItems_of_chosenInstance = () => createSelector(
  items,
  chosenInstance,
  (items, chosenInstance) => {
    console.log(`selector - parameter - chosenInstance : ${JSON.stringify(chosenInstance, null, 1)}`)
    let temp_items_for_dataSource = []
    chosenInstance.items.map(data => {
      console.log(`map - data : ${data}`)
      // temp_items_for_dataSource = temp_items_for_dataSource.concat(items[data])
      temp_items_for_dataSource = temp_items_for_dataSource.concat({
        ...items[data],
        status: false
      })
    })
    console.log(`temp_items_for_dataSource : ${JSON.stringify(temp_items_for_dataSource, null, 1)}`)
    // Object.values(items).filter(data => {
    //   // { id: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 }
    //   data.template == chosenInstance.template
    // })
    const temp_dataSource_items_of_chosenInstance = ds.cloneWithRows(temp_items_for_dataSource)
    return temp_dataSource_items_of_chosenInstance
  }
)

const make_get_badgeValueOfItemsOfChosenInstance = () => createSelector(
  instances,
  chosenTemplate,
  (instances, chosenTemplate) => {
    let temp_badgeValueOfItemsOfChosenInstance = {}
    // console.log(`selector - parameter - chosenTemplate : ${JSON.stringify(chosenTemplate, null, 1)}`)
    Object.values(instances).map(data => {
      if(data.template == chosenTemplate.title) {
        temp_badgeValueOfItemsOfChosenInstance[data.id] = data.items.length
        // temp_badgeValueOfItemsOfChosenInstance : {
        //  "Jack": 3,
        //  "Mike": 3
        // }
        // temp_badgeValueOfItemsOfChosenInstance : {
        //  "2": 3,
        //  "3": 3
        // }
        // (temp_badgeValueOfItemsOfChosenInstance.hasOwnProperty(data.id) ? temp_badgeValueOfItemsOfChosenInstance[data.id] = temp_badgeValueOfItemsOfChosenInstance[data.id] + 1 : temp_badgeValueOfItemsOfChosenInstance[data.id] = 1)
      }
    })
    // console.log(`temp_badgeValueOfItemsOfChosenInstance : ${JSON.stringify(temp_badgeValueOfItemsOfChosenInstance, null, 1)}`)
    return temp_badgeValueOfItemsOfChosenInstance
  }
)


const mySelectors = {
  // get_dataSourceTemplates,
  make_get_dataSourceTemplates,
  // get_dataSourceInstances,
  make_get_chosenTemplate_of_dataSourceInstances,
  // get_dataSourceItemsOnEachTemplate,
  // get_dataSourceTemplateCategoryList,
  make_get_badgeValueOfTemplates,
  make_get_badgeValueOfItemsOfChosenInstance,
  make_get_dataSourceItems_of_chosenInstance
}
export default mySelectors
