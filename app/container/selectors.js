import { ListView } from 'react-native'
import { createSelector, defaultMemoize } from 'reselect'
import Reactotron from 'reactotron-react-native'

const ds = new ListView.DataSource(
  {
    getSectionHeaderData: (dataBlob, sectionId) => dataBlob[sectionId],
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  }
)

const templates = state => state.templates
const instances = state => state.instances
const chosenTemplate = (state, chosenTemplate) => chosenTemplate

const chosenInstance = (state, chosenInstance) => chosenInstance
const items = state => state.items
const itemsCustomized = state => state.itemsCustomized
// const sideMenuVisible = state => state.sideMenuVisible
const templateCategories = state => state.templateCategories

// Below new
const make_get_dataSourceTemplates = () => createSelector(
  templates,
  templates => {
    console.log(`run - selector - make_get_dataSourceTemplates - ${Math.random()}`)
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
    console.log(`run - selector - make_get_badgeValueOfTemplates - ${Math.random()}`)
    Object.values(instances).map(value => {
      // console.log(`value.template ${value.template}`);
      (tempResult.hasOwnProperty(templates[value.template].templateId) ? tempResult[templates[value.template].templateId] = tempResult[templates[value.template].templateId] + 1 : tempResult[templates[value.template].templateId] = 1)
    })
    // console.log(`selector - get_Badge - tempResult : ${JSON.stringify(tempResult, null, 2)}`)
    return tempResult
    // selector - get_Badge - tempResult : {
    //   "1": 1,
    //   "2": 1,
    //   "3": 2
    // }
  }
)

const make_get_chosenTemplate_of_dataSourceInstancesOfChosenTemplate = () => createSelector(
  data => data,
  instancesOfChosenTemplate => {
    console.log(`run - selector - make_get_chosenTemplate_of_dataSourceInstancesOfChosenTemplate - ${Math.random()}`)
    const temp_dataSource_instances = ds.cloneWithRows(instancesOfChosenTemplate)
    return temp_dataSource_instances
  }
)
const make_get_instancesOfChosenTemplate = () => createSelector(
  instances,
  chosenTemplate,
  (instances, chosenTemplate) => {
    // console.log(`chosenTemplate : ${JSON.stringify(chosenTemplate, null, 1)}`)
    console.log(`run - selector - make_get_chosenTemplate_of_dataSourceInstancesOfChosenTemplate - ${Math.random()}`)
    return Object.values(instances).filter(value => value.template == chosenTemplate.templateId)
  }
)

// const make_get_chosenTemplate_of_dataSourceInstancesOfChosenTemplate = () => createSelector(
//   // (state, chosenTemplate) => {
//   //   console.log(`Here - parameter - state : ${JSON.stringify(state, null, 1)}`)
//   //   console.log(`Here - parameter - chosenTemplate : ${JSON.stringify(chosenTemplate, null, 1)}`)
//   //   return state.instances
//   // },
//   // (state, chosenTemplate) => {
//   //   console.log(`Here - parameter - chosenTemplate : ${JSON.stringify(chosenTemplate, null, 1)}`)
//   //   return chosenTemplate
//   // },
//   instances,
//   chosenTemplate,
//   (instances, chosenTemplate) => {
//     // console.log(`chosenTemplate : ${JSON.stringify(chosenTemplate, null, 1)}`)
//     console.log(`run - selector - make_get_chosenTemplate_of_dataSourceInstancesOfChosenTemplate - ${Math.random()}`)
//     const temp_instances_of_chosenTemplate = Object.values(instances).filter(value => value.template == chosenTemplate.templateId)
//     // temp_instances_of_chosenTemplate = Object.values(instances).map(value => {
//     //   if(value.template == chosenTemplate.templateId) {
//     //
//     //   }
//     // })
//     // console.log(`temp_instances_of_chosenTemplate : ${JSON.stringify(temp_instances_of_chosenTemplate, null, 1)}`)
//     const temp_dataSource_instances = ds.cloneWithRows(temp_instances_of_chosenTemplate)
//     return temp_dataSource_instances
//   }
// )

// const get_dataSourceInstancesOfChosenTemplate = createSelector(
//   instances,
//   instances => {
//     console.log(`run - selector - get_dataSourceInstancesOfChosenTemplate`)
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

const make_get_ItemsCustomizedOfChosenInstance = () => createSelector(
  itemsCustomized,
  chosenInstance,
  (itemsCustomized, chosenInstance) => {
    console.log(`run - selector - make_get_ItemsCustomizedOfChosenInstance - ${Math.random()}`)
    // console.log('itemsCustomized : ', itemsCustomized)
    // console.log('chosenInstance : ', chosenInstance)
    let temp_itemsCustomized = []
    chosenInstance.items.map(data => {
      temp_itemsCustomized = temp_itemsCustomized.concat({
        ...itemsCustomized[data]
      })
      temp_itemsCustomized.sort((data1, data2) => data1.orderNum - data2.orderNum)
    })
    return temp_itemsCustomized
  }
)

const make_get_dataSourceItemsOfChosenInstance = () => createSelector(
  data => data,
  itemsCustomizedOfChosenInstance => {
    console.log(`run - selector - make_get_dataSourceItemsOfChosenInstance - ${Math.random()}`)
    const temp_dataSource_itemsCustomized_of_chosenInstance = ds.cloneWithRows(itemsCustomizedOfChosenInstance)
    return temp_dataSource_itemsCustomized_of_chosenInstance
  }
)
// const make_get_dataSourceItemsOfChosenInstance = () => createSelector(
//   itemsCustomized,
//   chosenInstance,
//   (itemsCustomized, chosenInstance) => {
//     // console.log(`selector - parameter - itemsCustomized : ${JSON.stringify(itemsCustomized, null, 1)}`)
//     // console.log(`selector - parameter - chosenInstance : ${JSON.stringify(chosenInstance, null, 1)}`)
//     console.log(`run - selector - make_get_dataSourceItemsOfChosenInstance`)
//     let temp_itemsCustomized_for_dataSource = []
//     chosenInstance.items.map(data => {
//       // "chosenInstance": {
//       //    "id": 4,
//       //    "name": "Mike",
//       //    "template": "StayHome",
//       //    "items": [
//       //     9,
//       //     10,
//       //     11
//       //    ]
//       //   }
//       // console.log(`itemsCustomized[data] : ${JSON.stringify(itemsCustomized[data], null, 1)}`)
//       // itemsCustomized[data] : {
//       //  "itemCustomizedId": 9,
//       //  "desc": "Close Door",
//       //  "itemId": 4,
//       //  "instanceId": 4,
//       //  "orderNum": 3,
//       //  "status": true
//       // }
//       // temp_items_for_dataSource = temp_items_for_dataSource.concat(items[data])
//       temp_itemsCustomized_for_dataSource = temp_itemsCustomized_for_dataSource.concat({
//         ...itemsCustomized[data]
//       })
//     })
//     temp_itemsCustomized_for_dataSource.sort((data1, data2) => data1.orderNum - data2.orderNum)
//     // console.log(`temp_itemsCustomized_for_dataSource : ${JSON.stringify(temp_itemsCustomized_for_dataSource, null, 1)}`)
//     const temp_dataSource_itemsCustomized_of_chosenInstance = ds.cloneWithRows(temp_itemsCustomized_for_dataSource)
//     return temp_dataSource_itemsCustomized_of_chosenInstance
//   }
// )
const make_get_badgeValueOfItemsOfEachInstanceOfChosenTemplate = () => createSelector(
  itemsCustomized => itemsCustomized,
  (itemsCustomized, instancesOfChosenTemplate) => instancesOfChosenTemplate,
  (itemsCustomized, instancesOfChosenTemplate) => {
  const tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate = make_get_itemsCustomizedOfEachInstanceOfChosenTemplate()(itemsCustomized, instancesOfChosenTemplate)
  console.log(`run - selector - make_get_itemsCustomizedOfEachInstanceOfChosenTemplate - ${Math.random()}`)
  // console.log('tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate : ', tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate)
  let temp_itemsCustomizedOfEachInstanceOfChosenTemplate_for_badgeValueOfCompletedOrNot = {}

  for(let key in tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate) {
    temp_itemsCustomizedOfEachInstanceOfChosenTemplate_for_badgeValueOfCompletedOrNot[key] = {
      total: Object.values(tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate[key]).length,
      completed: Object.values(tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate[key]).filter(value => value.status == true).length,
      uncompleted: Object.values(tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate[key]).filter(value => value.status == false).length
    }
  }
  // console.log('temp_itemsCustomizedOfEachInstanceOfChosenTemplate_for_badgeValueOfCompletedOrNot : ', temp_itemsCustomizedOfEachInstanceOfChosenTemplate_for_badgeValueOfCompletedOrNot)
  return temp_itemsCustomizedOfEachInstanceOfChosenTemplate_for_badgeValueOfCompletedOrNot
  }
)
// const make_get_badgeValueOfItemsOfEachInstanceOfChosenTemplate = () => createSelector(
//   instances,
//   chosenTemplate,
//   (instances, chosenTemplate) => {
//     console.log(`run - selector - make_get_badgeValueOfItemsOfEachInstanceOfChosenTemplate - ${Math.random()}`)
//     let temp_badgeValueOfItemsOfEachInstanceOfChosenTemplate = {}
//     // console.log(`selector - parameter - chosenTemplate : ${JSON.stringify(chosenTemplate, null, 1)}`)
//     Object.values(instances).map(data => {
//       temp_badgeValueOfItemsOfEachInstanceOfChosenTemplate[data.instanceId] = data.items.length
//     })
//     // console.log(`temp_badgeValueOfItemsOfEachInstanceOfChosenTemplate : ${JSON.stringify(temp_badgeValueOfItemsOfEachInstanceOfChosenTemplate, null, 1)}`)
//     return temp_badgeValueOfItemsOfEachInstanceOfChosenTemplate
//   }
// )

// make_get_itemsCustomizedOfEachInstanceOfChosenTemplate(stateProps.state.itemsCustomized, stateProps.state.instancesOfChosenTemplate),

const make_get_itemsCustomizedOfEachInstanceOfChosenTemplate = () => createSelector(
  itemsCustomized => itemsCustomized,
  (itemsCustomized, instancesOfChosenTemplate) => instancesOfChosenTemplate,
  (itemsCustomized, instancesOfChosenTemplate) => {
    // console.log('selector - itemsCustomized : ', itemsCustomized)
    // console.log('selector - instancesOfChosenTemplate : ', instancesOfChosenTemplate)
    console.log(`run - selector - make_get_itemsCustomizedOfEachInstanceOfChosenTemplate - ${Math.random()}`)
    let temp_itemsCustomizedOfEachInstanceOfChosenTemplate = {}
    instancesOfChosenTemplate.map(value1 => {
      value1.items.map(value2 => {
        (temp_itemsCustomizedOfEachInstanceOfChosenTemplate.hasOwnProperty(value1.instanceId) ? null : temp_itemsCustomizedOfEachInstanceOfChosenTemplate[value1.instanceId] = [])
        temp_itemsCustomizedOfEachInstanceOfChosenTemplate[value1.instanceId] = temp_itemsCustomizedOfEachInstanceOfChosenTemplate[value1.instanceId].concat({
          ...itemsCustomized[value2]
        })
      })
    })
    // console.log('temp_itemsCustomizedOfEachInstanceOfChosenTemplate : ', temp_itemsCustomizedOfEachInstanceOfChosenTemplate)
    return temp_itemsCustomizedOfEachInstanceOfChosenTemplate
  }
)

const get_countsOfStatusCompleted = () => createSelector(
  data => data,
  itemsCustomizedOfChosenInstance => {
    // console.log('selector - itemsCustomizedOfChosenInstance', itemsCustomizedOfChosenInstance)
    return {
      total: itemsCustomizedOfChosenInstance.length,
      completed: itemsCustomizedOfChosenInstance.filter(value => value.status == true).length,
      uncompleted: itemsCustomizedOfChosenInstance.filter(value => value.status == false).length
    }
    // const temp_countsOfcompleted = {
    //   total: itemsCustomizedOfChosenInstance.length,
    //   completed: itemsCustomizedOfChosenInstance.filter(value => value.status == true).length,
    //   uncompleted: itemsCustomizedOfChosenInstance.filter(value => value.status == false).length
    // }
    // console.log('temp_countsOfcompleted : ', temp_countsOfcompleted)
    // return temp_countsOfcompleted
  }
)

const make_get_dataSourceForHome_SortByInstances = () => createSelector(
  instances,
  state => state,
  (instances, state) => {
    let temp_itemsCustomizedOfTotalInstances = {}
    Object.values(instances).map(value => {
      temp_itemsCustomizedOfTotalInstances[value.instanceId] = make_get_ItemsCustomizedOfChosenInstance()(state, value)
      // console.log('temp_itemsCustomizedOfTotalInstances[value.instanceId] : ', temp_itemsCustomizedOfTotalInstances[value.instanceId])
    })
    // console.log('temp_itemsCustomizedOfTotalInstances : ', temp_itemsCustomizedOfTotalInstances)
    const temp_dataSourceForHome_SortByInstances = ds.cloneWithRowsAndSections(temp_itemsCustomizedOfTotalInstances, Object.keys(temp_itemsCustomizedOfTotalInstances))
    // console.log('temp_dataSourceForHome_SortByInstances : ', temp_dataSourceForHome_SortByInstances)
    return temp_dataSourceForHome_SortByInstances
  }
)

const mySelectors = {
  // get_dataSourceTemplates,
  make_get_dataSourceTemplates,
  // get_dataSourceInstancesOfChosenTemplate,
  make_get_chosenTemplate_of_dataSourceInstancesOfChosenTemplate,
  // get_dataSourceItemsOnEachTemplate,
  // get_dataSourceTemplateCategoryList,
  make_get_badgeValueOfTemplates,
  make_get_badgeValueOfItemsOfEachInstanceOfChosenTemplate,
  make_get_dataSourceItemsOfChosenInstance,
  make_get_ItemsCustomizedOfChosenInstance,
  get_countsOfStatusCompleted,
  make_get_instancesOfChosenTemplate,
  make_get_itemsCustomizedOfEachInstanceOfChosenTemplate,
  make_get_dataSourceForHome_SortByInstances
}
export default mySelectors
