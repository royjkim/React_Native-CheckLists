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

const make_dataSource_cloneWithRows = data => {
  const temp_dataSource = ds.cloneWithRows(data)
  return temp_dataSource
}

const templates = state => state.templates
const instances = state => state.instances
const chosenTemplate = (state, chosenTemplate) => chosenTemplate

const chosenInstance = (state, chosenInstance) => chosenInstance
const items = state => state.items
const itemsCustomized = state => state.itemsCustomized
// const sideMenuVisible = state => state.sideMenuVisible
const templateCategories = state => state.templateCategories

const make_get_dataSourceTemplates = () => createSelector(
  templates,
  templates => {
    console.log(`run - make_get_dataSourceTemplates - ${Math.random()}`)
    // const temp_convertToArray = Object.values(templates)
    // const temp_dataSource_templates = ds.cloneWithRows(temp_convertToArray)
    // return temp_dataSource_templates
    return make_dataSource_cloneWithRows(Object.values(templates))
  }
)

const make_get_dataSourceInstancesOfChosenTemplate = () => createSelector(
  data => data,
  instancesOfChosenTemplate => {
    console.log(`run - make_get_dataSourceInstancesOfChosenTemplate - ${Math.random()}`)
    // const temp_dataSource_instances = ds.cloneWithRows(instancesOfChosenTemplate)
    // return temp_dataSource_instances
    return make_dataSource_cloneWithRows(instancesOfChosenTemplate)
  }
)

const make_get_dataSourceItemsOfChosenInstance = () => createSelector(
  data => data,
  itemsCustomizedOfChosenInstance => {
    console.log(`run - make_get_dataSourceItemsOfChosenInstance - ${Math.random()}`)
    // const temp_dataSource_itemsCustomized_of_chosenInstance = ds.cloneWithRows(itemsCustomizedOfChosenInstance)
    // return temp_dataSource_itemsCustomized_of_chosenInstance
    return make_dataSource_cloneWithRows(itemsCustomizedOfChosenInstance)
  }
)

const make_get_dataSourceForAllInstances = () => createSelector(
  instances,
  state => state,
  (instances, state) => {
    console.log(`run - make_get_dataSourceForAllInstances - ${Math.random()}`)
    let temp_itemsCustomizedOfTotalInstances = {}
    Object.values(instances).map(value => {
      temp_itemsCustomizedOfTotalInstances[value.instanceId] = make_get_ItemsCustomizedOfChosenInstance()(state, value)
      // console.log('temp_itemsCustomizedOfTotalInstances[value.instanceId] : ', temp_itemsCustomizedOfTotalInstances[value.instanceId])
    })
    // console.log('temp_itemsCustomizedOfTotalInstances : ', temp_itemsCustomizedOfTotalInstances)
    const temp_dataSourceForAllInstances = ds.cloneWithRowsAndSections(temp_itemsCustomizedOfTotalInstances, Object.keys(temp_itemsCustomizedOfTotalInstances))
    // console.log('temp_dataSourceForAllInstances : ', temp_dataSourceForAllInstances)
    return temp_dataSourceForAllInstances
  }
)

const make_get_badgeValueOfTemplates = () => createSelector(
  templates,
  instances,
  (templates = [], instances = []) => {
    let tempResult = {}
    console.log(`run - make_get_badgeValueOfTemplates - ${Math.random()}`)
    Object.values(instances).map(value => {
      // console.log(`value.template ${value.template}`);
      (tempResult.hasOwnProperty(templates[value.template].templateId) ? tempResult[templates[value.template].templateId] = tempResult[templates[value.template].templateId] + 1 : tempResult[templates[value.template].templateId] = 1)
    })
    // console.log(`selector - get_Badge - tempResult : ${JSON.stringify(tempResult, null, 2)}`)
    return tempResult
  }
)


const make_get_instancesOfChosenTemplate = () => createSelector(
  instances,
  chosenTemplate,
  (instances, chosenTemplate) => {
    // console.log(`chosenTemplate : ${JSON.stringify(chosenTemplate, null, 1)}`)
    console.log(`run - make_get_dataSourceInstancesOfChosenTemplate - ${Math.random()}`)
    return Object.values(instances).filter(value => value.template == chosenTemplate.templateId)
  }
)

const make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate = () => createSelector(
  data => data,
  (itemsCustomized, instancesOfChosenTemplate) => instancesOfChosenTemplate,
  (itemsCustomized, instancesOfChosenTemplate) => {
  const tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate = make_get_itemsCustomizedOfEachInstanceOfChosenTemplate()(itemsCustomized, instancesOfChosenTemplate)
  console.log(`run - make_get_itemsCustomizedOfEachInstanceOfChosenTemplate - ${Math.random()}`)
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

const make_get_badgeValueOfStatusOfChosenInstance = () => createSelector(
  data => data,
  itemsCustomizedOfChosenInstance => {
    // console.log('selector - itemsCustomizedOfChosenInstance', itemsCustomizedOfChosenInstance)
    return {
      total: itemsCustomizedOfChosenInstance.length,
      completed: itemsCustomizedOfChosenInstance.filter(value => value.status == true).length,
      uncompleted: itemsCustomizedOfChosenInstance.filter(value => value.status == false).length
    }
  }
)

const make_get_badgeValueOfStatusOfAllInstances = () => createSelector(
  itemsCustomized,
  itemsCustomized => {
    let temp_object_ListOfitemsCustomizedOfChosenInstance = {}

    const addFn = (targetData, attr, statusValue) => {
      const tempMapper = {
        true: 'completed',
        false: 'uncompleted'
      }
      const statusType = tempMapper[statusValue]
      targetData[attr].total++
      targetData[attr][statusType]++
      return targetData
    }

    for(let key in itemsCustomized) {
      // key is itemsCustomizedId.
      const targetItemsCustomized = itemsCustomized[key];
      (temp_object_ListOfitemsCustomizedOfChosenInstance.hasOwnProperty(targetItemsCustomized.instanceId) ? null : temp_object_ListOfitemsCustomizedOfChosenInstance[targetItemsCustomized.instanceId] = {
        total: 0,
        completed: 0,
        uncompleted: 0
      })
      addFn(temp_object_ListOfitemsCustomizedOfChosenInstance, targetItemsCustomized.instanceId, targetItemsCustomized.status)

      // console.log('temp_object_ListOfitemsCustomizedOfChosenInstance : ', temp_object_ListOfitemsCustomizedOfChosenInstance)
      // console.log(`temp_object_ListOfitemsCustomizedOfChosenInstance : ${JSON.stringify(temp_object_ListOfitemsCustomizedOfChosenInstance, null, 1)}`)

      // temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId] = {
      //   total: (itemsCustomized[key].status !== null ? temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId].total + 1 : temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId].total),
      //   completed: (itemsCustomized[key].status == true ? temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId].completed + 1 : temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId].completed),
      //   uncompleted: (itemsCustomized[key].status == false ? temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId].uncompleted + 1 : temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId].uncompleted)
      // }

      // switch(itemsCustomized[key].status) {
      //   case true:
      //     temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId] = {
      //       ...temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId],
      //       completed: temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId].completed + 1
      //     }
      //     break
      //   case false:
      //     temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId] = {
      //       ...temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId],
      //       uncompleted: temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId].uncompleted + 1
      //     }
      //     break
      //   default:
      //     return null
      // }
      // temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId] = {
      //   ...temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId],
      //   total: (itemsCustomized[key].status !== null ? temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId].total + 1 : temp_object_ListOfitemsCustomizedOfChosenInstance[itemsCustomized[key].instanceId].total)
      // }
    }

    // console.log('temp_object_ListOfitemsCustomizedOfChosenInstance : ', temp_object_ListOfitemsCustomizedOfChosenInstance)
    console.log(`temp_object_ListOfitemsCustomizedOfChosenInstance : ${JSON.stringify(temp_object_ListOfitemsCustomizedOfChosenInstance, null, 1)}`)
    return temp_object_ListOfitemsCustomizedOfChosenInstance
  }
)


const make_get_ItemsCustomizedOfChosenInstance = () => createSelector(
  itemsCustomized,
  chosenInstance,
  (itemsCustomized, chosenInstance) => {
    console.log(`run - make_get_ItemsCustomizedOfChosenInstance - ${Math.random()}`)
    // console.log('itemsCustomized : ', itemsCustomized)
    // console.log('chosenInstance : ', chosenInstance)
    let temp_itemsCustomized = []
    chosenInstance.items.map(data => {
      temp_itemsCustomized = temp_itemsCustomized.concat({
        ...itemsCustomized[data]
      })
      temp_itemsCustomized.sort((data1, data2) => data1.orderNum - data2.orderNum);
    })
    return temp_itemsCustomized
  }
)

const make_get_itemsCustomizedOfEachInstanceOfChosenTemplate = () => createSelector(
  itemsCustomized => itemsCustomized,
  (itemsCustomized, instancesOfChosenTemplate) => instancesOfChosenTemplate,
  (itemsCustomized, instancesOfChosenTemplate) => {
    // console.log('selector - itemsCustomized : ', itemsCustomized)
    // console.log('selector - instancesOfChosenTemplate : ', instancesOfChosenTemplate)
    console.log(`run - make_get_itemsCustomizedOfEachInstanceOfChosenTemplate - ${Math.random()}`)
    let temp_itemsCustomizedOfEachInstanceOfChosenTemplate = {}
    instancesOfChosenTemplate.map(value1 => {
      let temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate = []
      value1.items.map(value2 => {
        // (temp_itemsCustomizedOfEachInstanceOfChosenTemplate.hasOwnProperty(value1.instanceId) ? null : temp_itemsCustomizedOfEachInstanceOfChosenTemplate[value1.instanceId] = [])
        // temp_itemsCustomizedOfEachInstanceOfChosenTemplate[value1.instanceId] = temp_itemsCustomizedOfEachInstanceOfChosenTemplate[value1.instanceId].concat({
        //   ...itemsCustomized[value2]
        // })
        temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate = temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate.concat({
          ...itemsCustomized[value2]
        })
      })
      // console.log(`before - sort - temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate : ${JSON.stringify(temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate, null, 1)}`)
      temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate.sort((data1, data2) => data1.orderNum - data2.orderNum);
      // console.log(`after - sort - temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate : ${JSON.stringify(temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate, null, 1)}`);
      (temp_itemsCustomizedOfEachInstanceOfChosenTemplate.hasOwnProperty(value1.instanceId) ? null : temp_itemsCustomizedOfEachInstanceOfChosenTemplate[value1.instanceId] = [])
      temp_itemsCustomizedOfEachInstanceOfChosenTemplate[value1.instanceId] = temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate
    })
    // console.log('temp_itemsCustomizedOfEachInstanceOfChosenTemplate : ', temp_itemsCustomizedOfEachInstanceOfChosenTemplate)
    return temp_itemsCustomizedOfEachInstanceOfChosenTemplate
  }
)

const mySelectors = {
  make_get_dataSourceTemplates,
  make_get_dataSourceInstancesOfChosenTemplate,
  make_get_dataSourceItemsOfChosenInstance,
  make_get_dataSourceForAllInstances,
  make_get_badgeValueOfTemplates,
  make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate,
  make_get_badgeValueOfStatusOfChosenInstance,
  make_get_badgeValueOfStatusOfAllInstances,
  make_get_instancesOfChosenTemplate,
  make_get_ItemsCustomizedOfChosenInstance,
  make_get_itemsCustomizedOfEachInstanceOfChosenTemplate,
}

export default mySelectors
