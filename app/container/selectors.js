import { ListView } from 'react-native'
import { createSelector } from 'reselect'
import { isEqual, values } from 'lodash'
import Reactotron from 'reactotron-react-native'

const ds = new ListView.DataSource(
  {
    getSectionHeaderData: (dataBlob, sectionId) => dataBlob[sectionId],
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  }
)

const countTest = {
  make_get_dataSourceTemplates: 0,
  make_get_dataSourceInstances: 0,
  make_get_dataSourceInstancesOfChosenTemplate: 0,
  make_get_dataSourceOfItemsOfChosenTemplate: 0,
  make_get_dataSourceItemsOfChosenInstance: 0,
  make_get_dataSourceForAllInstances: 0,
  make_get_badgeValueOfInstancesOfChosenTemplates: 0,
  make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate: 0,
  make_get_badgeValueOfStatusOfChosenInstance: 0,
  make_get_badgeValueOfStatusOfAllInstances: 0,
  make_get_instancesOfChosenTemplate: 0,
  make_get_itemsOfChosenTemplate: 0,
  make_get_itemsCustomizedOfChosenInstance: 0,
  make_get_itemsCustomizedOfEachInstanceOfChosenTemplate: 0
}

const addCount = attr => ++countTest[attr]

const make_dataSource_cloneWithRows = (attr, data) => {
  const temp_dataSource = ds.cloneWithRows(data)
  addResultHistory(attr, temp_dataSource)
  return temp_dataSource
}

let dataInputHistory = {
  make_get_dataSourceTemplates: {
    past: [],
    // present: [], future: []
  },
  make_get_dataSourceInstances: {
    past: [],
    // present: [], future: []
  },
  make_get_dataSourceInstancesOfChosenTemplate: {
    past: [],
    // present: [], future: []
  },
  make_get_dataSourceOfItemsOfChosenTemplate: {
    past: [],
    // present: [], future: []
  },
  make_get_dataSourceItemsOfChosenInstance: {
    past: [],
    // present: [], future: []
  },
  make_get_dataSourceForAllInstances: {
    past: [],
    // present: [], future: []
  },
  make_get_badgeValueOfInstancesOfChosenTemplates: {
    past: [],
    // present: [], future: []
  },
  make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate: {
    past: [],
    // present: [], future: []
  },
  make_get_badgeValueOfStatusOfChosenInstance: {
    past: [],
    // present: [], future: []
  },
  make_get_badgeValueOfStatusOfAllInstances: {
    past: [],
    // present: [], future: []
  },
  make_get_instancesOfChosenTemplate: {
    past: [],
    // present: [], future: []
  },
  make_get_instancesOfChosenTemplate: {
    past: [],
    // present: [], future: []
  },
  make_get_itemsOfChosenTemplate: {
    past: [],
    // present: [], future: []
  },
  make_get_itemsCustomizedOfChosenInstance: {
    past: [],
    // present: [], future: []
  },
  make_get_itemsCustomizedOfEachInstanceOfChosenTemplate: {
    past: [],
    // present: [], future: []
  }
}

let dataResultHistory = {
  make_get_dataSourceTemplates: {
    past: [],
    // present: [], future: []
  },
  make_get_dataSourceInstances: {
    past: [],
    // present: [], future: []
  },
  make_get_dataSourceInstancesOfChosenTemplate: {
    past: [],
    // present: [], future: []
  },
  make_get_dataSourceOfItemsOfChosenTemplate: {
    past: [],
    // present: [], future: []
  },
  make_get_dataSourceItemsOfChosenInstance: {
    past: [],
    // present: [], future: []
  },
  make_get_dataSourceForAllInstances: {
    past: [],
    // present: [], future: []
  },
  make_get_badgeValueOfInstancesOfChosenTemplates: {
    past: [],
    // present: [], future: []
  },
  make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate: {
    past: [],
    // present: [], future: []
  },
  make_get_badgeValueOfStatusOfChosenInstance: {
    past: [],
    // present: [], future: []
  },
  make_get_badgeValueOfStatusOfAllInstances: {
    past: [],
    // present: [], future: []
  },
  make_get_instancesOfChosenTemplate: {
    past: [],
    // present: [], future: []
  },
  make_get_instancesOfChosenTemplate: {
    past: [],
    // present: [], future: []
  },
  make_get_itemsOfChosenTemplate: {
    past: [],
    // present: [], future: []
  },
  make_get_itemsCustomizedOfChosenInstance: {
    past: [],
    // present: [], future: []
  },
  make_get_itemsCustomizedOfEachInstanceOfChosenTemplate: {
    past: [],
    // present: [], future: []
  }
};
const compareInputHistory = (attr, ...args) => {
  const tempResult_compareInputHistory = isEqual(args, dataInputHistory[attr].past[dataInputHistory[attr].past.length - 1]);
  (tempResult_compareInputHistory ? null : addInputHistory(attr, args));
  // console.log(`isEqual - ${attr} : ${tempResult_compareInputHistory}`);
  const loadResultHistoryOrNot = (resultOfcompareInputHistory, currentAttr) => (resultOfcompareInputHistory ? () => loadResultHistory(attr) : console.log(`run - ${currentAttr} - ${addCount(currentAttr)}`))
  return loadResultHistoryOrNot(tempResult_compareInputHistory, attr)
}
const addInputHistory = (attr, args) => dataInputHistory[attr].past.push(args)
const addResultHistory = (attr, args) => dataResultHistory[attr].past.push(args)
const loadResultHistory = attr => dataResultHistory[attr].past[dataResultHistory[attr].past.length - 1]

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
    const currentAttr = 'make_get_dataSourceTemplates'
    compareInputHistory(currentAttr, values(arguments))
    return make_dataSource_cloneWithRows(currentAttr, Object.values(templates))
  }
)

const make_get_dataSourceOfItemsOfChosenTemplate = () => createSelector(
  data => data,
  itemsOfChosenTemplate => {
    const currentAttr = 'make_get_dataSourceOfItemsOfChosenTemplate'
    compareInputHistory(currentAttr, values(arguments))
    return make_dataSource_cloneWithRows(currentAttr, itemsOfChosenTemplate)
  }
)

const make_get_dataSourceInstances = () => createSelector(
  instances,
  itemsCustomized,
  (instances, itemsCustomized) => {
    const currentAttr = 'make_get_dataSourceInstances'
    compareInputHistory(currentAttr, values(arguments))
    return make_dataSource_cloneWithRows(currentAttr, Object.values(instances))
  }
)

const make_get_dataSourceInstancesOfChosenTemplate = () => createSelector(
  data => data,
  instancesOfChosenTemplate => {
    const currentAttr = 'make_get_dataSourceInstancesOfChosenTemplate'
    compareInputHistory(currentAttr, values(arguments))
    return make_dataSource_cloneWithRows(currentAttr, instancesOfChosenTemplate)
  }
)

const make_get_dataSourceItemsOfChosenInstance = () => createSelector(
  data => data,
  itemsCustomizedOfChosenInstance => {
    const currentAttr = 'make_get_dataSourceItemsOfChosenInstance';
    compareInputHistory(currentAttr, values(arguments))
    return make_dataSource_cloneWithRows(currentAttr, itemsCustomizedOfChosenInstance)
  }
)

const make_get_dataSourceForAllInstances = () => createSelector(
  instances,
  state => state,
  (instances, state) => {
    const currentAttr = 'make_get_dataSourceForAllInstances';
    compareInputHistory(currentAttr, values(arguments))
    let temp_itemsCustomizedOfTotalInstances = {}
    Object.values(instances).map(value => {
      temp_itemsCustomizedOfTotalInstances[value.instanceId] = make_get_itemsCustomizedOfChosenInstance()(state, value)
    })
    // console.log('temp_itemsCustomizedOfTotalInstances : ', temp_itemsCustomizedOfTotalInstances)
    const temp_dataSourceForAllInstances = ds.cloneWithRowsAndSections(temp_itemsCustomizedOfTotalInstances, Object.keys(temp_itemsCustomizedOfTotalInstances))
    addResultHistory(currentAttr, temp_dataSourceForAllInstances)
    // console.log('temp_dataSourceForAllInstances : ', temp_dataSourceForAllInstances)
    return temp_dataSourceForAllInstances
  }
)

const make_get_badgeValueOfInstancesOfChosenTemplates = () => createSelector(
  templates,
  instances,
  (templates, instances) => {
    const currentAttr = 'make_get_badgeValueOfInstancesOfChosenTemplates'
    compareInputHistory(currentAttr, values(arguments))
    let tempResult_badgeValueOfInstancesOfChosenTemplates = {}
    Object.values(instances).map(value => {
      (tempResult_badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(templates[value.template].templateId) ? tempResult_badgeValueOfInstancesOfChosenTemplates[templates[value.template].templateId] = tempResult_badgeValueOfInstancesOfChosenTemplates[templates[value.template].templateId] + 1 : tempResult_badgeValueOfInstancesOfChosenTemplates[templates[value.template].templateId] = 1)
    })
    addResultHistory(currentAttr, tempResult_badgeValueOfInstancesOfChosenTemplates)
    return tempResult_badgeValueOfInstancesOfChosenTemplates
  }
)

const make_get_instancesOfChosenTemplate = () => createSelector(
  instances,
  chosenTemplate,
  (instances, chosenTemplate) => {
    const currentAttr = 'make_get_instancesOfChosenTemplate'
    compareInputHistory(currentAttr, values(arguments))
    const temp_instancesOfChosenTemplate = Object.values(instances).filter(value => value.template == chosenTemplate.templateId)
    addResultHistory(currentAttr, temp_instancesOfChosenTemplate)
    return temp_instancesOfChosenTemplate
  }
)

const make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate = () => createSelector(
  data => data,
  (itemsCustomized, instancesOfChosenTemplate) => instancesOfChosenTemplate,
  (itemsCustomized, instancesOfChosenTemplate) => {
    const currentAttr = 'make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate'
    compareInputHistory(currentAttr, values(arguments))
    const tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate = make_get_itemsCustomizedOfEachInstanceOfChosenTemplate()(itemsCustomized, instancesOfChosenTemplate)
    let temp_itemsCustomizedOfEachInstanceOfChosenTemplate_for_badgeValueOfCompletedOrNot = {}

    for(let key in tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate) {
      temp_itemsCustomizedOfEachInstanceOfChosenTemplate_for_badgeValueOfCompletedOrNot[key] = {
        total: Object.values(tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate[key]).length,
        completed: Object.values(tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate[key]).filter(value => value.status == true).length,
        uncompleted: Object.values(tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate[key]).filter(value => value.status == false).length
      }
    }
    addResultHistory(currentAttr, temp_itemsCustomizedOfEachInstanceOfChosenTemplate_for_badgeValueOfCompletedOrNot)
    // console.log('temp_itemsCustomizedOfEachInstanceOfChosenTemplate_for_badgeValueOfCompletedOrNot : ', temp_itemsCustomizedOfEachInstanceOfChosenTemplate_for_badgeValueOfCompletedOrNot)
    return temp_itemsCustomizedOfEachInstanceOfChosenTemplate_for_badgeValueOfCompletedOrNot
  }
)

const make_get_badgeValueOfStatusOfChosenInstance = () => createSelector(
  data => data,
  itemsCustomizedOfChosenInstance => {
    const currentAttr = 'make_get_badgeValueOfStatusOfChosenInstance'
    compareInputHistory(currentAttr, values(arguments))
    const tempResult_badgeValueOfStatusOfChosenInstance = {
      total: itemsCustomizedOfChosenInstance.length,
      completed: itemsCustomizedOfChosenInstance.filter(value => value.status == true).length,
      uncompleted: itemsCustomizedOfChosenInstance.filter(value => value.status == false).length
    }
    addResultHistory(currentAttr, tempResult_badgeValueOfStatusOfChosenInstance)
    return tempResult_badgeValueOfStatusOfChosenInstance
  }
)

const make_get_badgeValueOfStatusOfAllInstances = () => createSelector(
  itemsCustomized,
  itemsCustomized => {
    const currentAttr = 'make_get_badgeValueOfStatusOfAllInstances'
    compareInputHistory(currentAttr, values(arguments))
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
    }
    // console.log(`temp_object_ListOfitemsCustomizedOfChosenInstance : ${JSON.stringify(temp_object_ListOfitemsCustomizedOfChosenInstance, null, 1)}`)
    addResultHistory(currentAttr, temp_object_ListOfitemsCustomizedOfChosenInstance)
    return temp_object_ListOfitemsCustomizedOfChosenInstance
  }
)


const make_get_itemsCustomizedOfChosenInstance = () => createSelector(
  itemsCustomized,
  chosenInstance,
  (itemsCustomized, chosenInstance) => {
    const currentAttr = 'make_get_itemsCustomizedOfChosenInstance'
    compareInputHistory(currentAttr, values(arguments))
    let temp_itemsCustomized = []
    chosenInstance.items.map(data => {
      temp_itemsCustomized = temp_itemsCustomized.concat({
        ...itemsCustomized[data]
      })
      temp_itemsCustomized.sort((data1, data2) => data1.orderNum - data2.orderNum);
    })
    addResultHistory(currentAttr, temp_itemsCustomized)
    return temp_itemsCustomized
  }
)

const make_get_itemsOfChosenTemplate = () => createSelector(
  items,
  chosenTemplate,
  (items, chosenTemplate) => {
    const currentAttr = 'make_get_itemsOfChosenTemplate'
    compareInputHistory(currentAttr, values(arguments))
    let testReult_itemsOfChosenTemplate = []
    chosenTemplate.items.map(value => {
      testReult_itemsOfChosenTemplate.push(items[value])
    })
    testReult_itemsOfChosenTemplate.sort((data1, data2) => data1.orderNum - data2.orderNum)
    addResultHistory(currentAttr, testReult_itemsOfChosenTemplate)
    return testReult_itemsOfChosenTemplate
  }
)

const make_get_itemsCustomizedOfEachInstanceOfChosenTemplate = () => createSelector(
  itemsCustomized => itemsCustomized,
  (itemsCustomized, instancesOfChosenTemplate) => instancesOfChosenTemplate,
  (itemsCustomized, instancesOfChosenTemplate) => {
    const currentAttr = 'make_get_itemsCustomizedOfEachInstanceOfChosenTemplate'
    compareInputHistory(currentAttr, values(arguments))
    let temp_itemsCustomizedOfEachInstanceOfChosenTemplate = {}
    instancesOfChosenTemplate.map(value1 => {
      let temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate = []
      value1.items.map(value2 => {
        temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate = temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate.concat({
          ...itemsCustomized[value2]
        })
      })
      temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate.sort((data1, data2) => data1.orderNum - data2.orderNum);
      (temp_itemsCustomizedOfEachInstanceOfChosenTemplate.hasOwnProperty(value1.instanceId) ? null : temp_itemsCustomizedOfEachInstanceOfChosenTemplate[value1.instanceId] = [])
      temp_itemsCustomizedOfEachInstanceOfChosenTemplate[value1.instanceId] = temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate
    })
    // console.log('temp_itemsCustomizedOfEachInstanceOfChosenTemplate : ', temp_itemsCustomizedOfEachInstanceOfChosenTemplate)
    addResultHistory(currentAttr, temp_itemsCustomizedOfEachInstanceOfChosenTemplate)
    return temp_itemsCustomizedOfEachInstanceOfChosenTemplate
  }
)

const mySelectors = {
  make_get_dataSourceTemplates,
  make_get_dataSourceInstances,
  make_get_dataSourceInstancesOfChosenTemplate,
  make_get_dataSourceOfItemsOfChosenTemplate,
  make_get_dataSourceItemsOfChosenInstance,
  make_get_dataSourceForAllInstances,
  make_get_badgeValueOfInstancesOfChosenTemplates,
  make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate,
  make_get_badgeValueOfStatusOfChosenInstance,
  make_get_badgeValueOfStatusOfAllInstances,
  make_get_instancesOfChosenTemplate,
  make_get_itemsOfChosenTemplate,
  make_get_itemsCustomizedOfChosenInstance,
  make_get_itemsCustomizedOfEachInstanceOfChosenTemplate,
}

export default mySelectors
