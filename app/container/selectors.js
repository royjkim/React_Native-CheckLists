import { ListView } from 'react-native'
import { createSelector } from 'reselect'
import { isEqual, flatten } from 'lodash'

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
  make_get_dataSourceItems: 0,
  make_get_dataSourceInstancesOfChosenTemplate: 0,
  make_get_dataSourceOfItemsOfChosenTemplate: 0,
  make_get_dataSourceItemsOfChosenInstance: 0,
  make_get_dataSourceForAllInstances: 0,
  make_get_dataSourceTemplateCategories: 0,
  make_get_badgeValueOfInstancesOfChosenTemplates: 0,
  make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate: 0,
  make_get_badgeValueOfStatusOfChosenInstance: 0,
  make_get_badgeValueOfStatusOfAllInstances: 0,
  make_get_instancesOfChosenTemplate: 0,
  make_get_itemsOfChosenTemplate: 0,
  make_get_itemsCustomizedOfChosenInstance: 0,
  make_get_itemsCustomizedOfAllItems: 0,
  make_get_itemsCustomizedOfEachInstanceOfChosenTemplate: 0
}

const addCount = attr => ++countTest[attr]

const make_dataSource_cloneWithRows = (attr, data) => {
  const tempResult = ds.cloneWithRows(data)
  addResultHistory(attr, tempResult)
  return tempResult
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
  make_get_dataSourceItems: {
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
  make_get_dataSourceTemplateCategories: {
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
  make_get_itemsCustomizedOfAllItems: {
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
  make_get_dataSourceItems: {
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
  make_get_dataSourceTemplateCategories: {
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
  make_get_itemsCustomizedOfAllItems: {
    past: [],
    // present: [], future: []
  },
  make_get_itemsCustomizedOfEachInstanceOfChosenTemplate: {
    past: [],
    // present: [], future: []
  }
};

const compareInputHistory = (attr, args) => {
  const lastIndex = (dataInputHistory[attr].past.length < 1 ? 0 : dataInputHistory[attr].past.length - 1 )
  const prevData = dataInputHistory[attr].past[lastIndex]
  const tempResult_compareInputHistory = isEqual(args, prevData);
  tempResult_compareInputHistory || addInputHistory(attr, args)
  // console.log(`isEqual - ${attr} : ${tempResult_compareInputHistory}`);
  const loadResultHistoryOrNot = (resultOfcompareInputHistory, currentAttr) => (resultOfcompareInputHistory ? () => loadResultHistory(attr) : console.log(`run - ${currentAttr} - ${addCount(currentAttr)}`))
  return loadResultHistoryOrNot(tempResult_compareInputHistory, attr)
}
const addInputHistory = (attr, args) => dataInputHistory[attr].past.push(args)
const addResultHistory = (attr, args) => dataResultHistory[attr].past.push(args)
const loadResultHistory = attr => (dataResultHistory[attr].past.length < 1 ? dataResultHistory[attr].past[0] : dataResultHistory[attr].past[dataResultHistory[attr].past.length - 1])

const templates = state => state.entities.templates
const instances = state => state.entities.instances
const chosenTemplate = (state, chosenTemplate) => chosenTemplate

const chosenInstance = (state, chosenInstance) => chosenInstance
const items = state => state.entities.items
const itemsCustomized = state => state.entities.itemsCustomized
// const sideMenuVisible = state => state.sideMenuVisible
const templateCategories = state => state.entities.templateCategories

const searchBarTextInstanceList = state => state.searchBarText.searchBarTextInstanceList.toLowerCase()
const searchBarTextItemsOfChosenTemplate = state => state.searchBarText.searchBarTextItemsOfChosenTemplate.toLowerCase()
const searchBarTextInstancesOfChosenTemplate = state => state.searchBarText.searchBarTextInstancesOfChosenTemplate.toLowerCase()
const searchBarTextItemsCustomizedAllInstances = state => state.searchBarText.searchBarTextItemsCustomizedAllInstances.toLowerCase()
const searchBarTextTemplateList = state => state.searchBarText.searchBarTextTemplateList.toLowerCase()
const searchBarTextItemList = state => state.searchBarText.searchBarTextItemList.toLowerCase()

const statusPicker = state => state.configValue.picker

const make_get_dataSourceTemplates = () => createSelector(
  templates,
  searchBarTextTemplateList,
  (templates, searchBarText) => {
    const currentAttr = 'make_get_dataSourceTemplates'
    compareInputHistory(currentAttr, templates, searchBarText)
    return make_dataSource_cloneWithRows(currentAttr, Object.values(templates).filter(value => value.title.toLowerCase().includes(searchBarText)))
  }
)

const make_get_dataSourceInstances = () => createSelector(
  instances,
  itemsCustomized,
  searchBarTextInstanceList,
  (instances, itemsCustomized, searchBarText) => {
    const currentAttr = 'make_get_dataSourceInstances'
    compareInputHistory(currentAttr, instances, itemsCustomized, searchBarText)
    // return make_dataSource_cloneWithRows(currentAttr, Object.values(instances))
    if(searchBarText) {
      return make_dataSource_cloneWithRows(currentAttr, Object.values(instances).filter(value => value.name.toLowerCase().includes(searchBarText)))
    } else {
      return make_dataSource_cloneWithRows(currentAttr, Object.values(instances))
    }
  }
)

const make_get_dataSourceItems = () => createSelector(
  items,
  searchBarTextItemList,
  (items, searchBarText) => {
    const currentAttr = 'make_get_dataSourceItems'
    compareInputHistory(currentAttr, items, searchBarText)
    let tempResult_itemsSortByTemplates = {}
    Object.values(items).map(value => {
      if(value.desc.toLowerCase().includes(searchBarText)) {
        tempResult_itemsSortByTemplates.hasOwnProperty(value.templateId) ? null : tempResult_itemsSortByTemplates[value.templateId] = []
        tempResult_itemsSortByTemplates[value.templateId].push(value)
      }
    })
    for(let key in tempResult_itemsSortByTemplates) {
      tempResult_itemsSortByTemplates[key].sort((data1, data2) => data1.orderNum - data2.orderNum)
    }
    // console.log(`tempResult_itemsSortByTemplates : ${JSON.stringify(tempResult_itemsSortByTemplates, null, 1)}`)
    const tempResult_dataSourceItems = ds.cloneWithRowsAndSections(tempResult_itemsSortByTemplates, Object.keys(tempResult_itemsSortByTemplates))
    addResultHistory(currentAttr, tempResult_dataSourceItems)
    return tempResult_dataSourceItems
  }
)

const make_get_dataSourceOfItemsOfChosenTemplate = () => createSelector(
  data => data,
  itemsOfChosenTemplate => {
    const currentAttr = 'make_get_dataSourceOfItemsOfChosenTemplate'
    compareInputHistory(currentAttr, itemsOfChosenTemplate)
    return make_dataSource_cloneWithRows(currentAttr, itemsOfChosenTemplate)
  }
)

const make_get_dataSourceInstancesOfChosenTemplate = () => createSelector(
  data => data,
  instancesOfChosenTemplate => {
    const currentAttr = 'make_get_dataSourceInstancesOfChosenTemplate'
    compareInputHistory(currentAttr, instancesOfChosenTemplate)
    return make_dataSource_cloneWithRows(currentAttr, instancesOfChosenTemplate)
  }
)

const make_get_dataSourceItemsOfChosenInstance = () => createSelector(
  data => data,
  (data, statusPicker) => statusPicker,
  (itemsCustomizedOfChosenInstance, statusPicker) => {
    const currentAttr = 'make_get_dataSourceItemsOfChosenInstance';
    compareInputHistory(currentAttr, itemsCustomizedOfChosenInstance, statusPicker,)

    const statusPickerMapper = {
      'all': () => Object.values(itemsCustomizedOfChosenInstance),
      'completed': () => Object.values(itemsCustomizedOfChosenInstance).filter(value => value.status == true),
      'uncompleted': () => Object.values(itemsCustomizedOfChosenInstance).filter(value => value.status == false)
    }
    const tempResult = statusPickerMapper[statusPicker]()
    return make_dataSource_cloneWithRows(currentAttr, tempResult)
  }
)

const make_get_dataSourceForAllInstances = () => createSelector(
  data => data,
  itemsCustomizedOfAllItems => {
    const currentAttr = 'make_get_dataSourceForAllInstances'
    compareInputHistory(currentAttr, itemsCustomizedOfAllItems)
    const temp_dataSourceForAllInstances = ds.cloneWithRowsAndSections(itemsCustomizedOfAllItems, Object.keys(itemsCustomizedOfAllItems))
    addResultHistory(currentAttr, temp_dataSourceForAllInstances)
    return temp_dataSourceForAllInstances
  }
)

const make_get_dataSourceTemplateCategories = () => createSelector(
  templateCategories,
  templateCategories => {
    const currentAttr = 'make_get_dataSourceTemplateCategories'
    compareInputHistory(currentAttr, templateCategories)
    return make_dataSource_cloneWithRows(currentAttr, templateCategories)
  }
)


const make_get_badgeValueOfInstancesOfChosenTemplates = () => createSelector(
  templates,
  instances,
  (templates, instances) => {
    const currentAttr = 'make_get_badgeValueOfInstancesOfChosenTemplates'
    compareInputHistory(currentAttr, templates, instances)
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
  searchBarTextInstancesOfChosenTemplate,
  (instances, chosenTemplate, searchBarText) => {
    const currentAttr = 'make_get_instancesOfChosenTemplate'
    compareInputHistory(currentAttr, instances, chosenTemplate, searchBarText)
    const tempResult = Object.values(instances).filter(value => value.template == chosenTemplate.templateId && value.name.toLowerCase().includes(searchBarText))
    addResultHistory(currentAttr, tempResult)
    return tempResult
  }
)

const make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate = () => createSelector(
  data => data,
  (itemsCustomized, instancesOfChosenTemplate) => instancesOfChosenTemplate,
  (itemsCustomized, instancesOfChosenTemplate) => {
    const currentAttr = 'make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate'
    compareInputHistory(currentAttr, itemsCustomized, instancesOfChosenTemplate)
    const tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate = make_get_itemsCustomizedOfEachInstanceOfChosenTemplate()(itemsCustomized, instancesOfChosenTemplate)
    let tempResult_for_badgeValueOfCompletedOrNot = {}

    for(let key in tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate) {
      tempResult_for_badgeValueOfCompletedOrNot[key] = {
        total: Object.values(tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate[key]).length,
        completed: Object.values(tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate[key]).filter(value => value.status == true).length,
        uncompleted: Object.values(tempResult_from_make_get_itemsCustomizedOfEachInstanceOfChosenTemplate[key]).filter(value => value.status == false).length
      }
    }
    addResultHistory(currentAttr, tempResult_for_badgeValueOfCompletedOrNot)
    // console.log('tempResult_for_badgeValueOfCompletedOrNot : ', tempResult_for_badgeValueOfCompletedOrNot)
    return tempResult_for_badgeValueOfCompletedOrNot
  }
)

const make_get_badgeValueOfStatusOfChosenInstance = () => createSelector(
  data => data,
  itemsCustomizedOfChosenInstance => {
    const currentAttr = 'make_get_badgeValueOfStatusOfChosenInstance'
    compareInputHistory(currentAttr, itemsCustomizedOfChosenInstance)
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
    compareInputHistory(currentAttr, itemsCustomized)
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
    compareInputHistory(currentAttr, itemsCustomized, chosenInstance)
    let tempResult = []
    chosenInstance.items.map(data => {
      tempResult.push({
        ...itemsCustomized[data]
      })
      tempResult.sort((data1, data2) => data1.orderNum - data2.orderNum);
    })
    addResultHistory(currentAttr, tempResult)
    return tempResult
  }
)

const make_get_itemsOfChosenTemplate = () => createSelector(
  items,
  chosenTemplate,
  searchBarTextItemsOfChosenTemplate,
  (items, chosenTemplate, searchBarText) => {
    const currentAttr = 'make_get_itemsOfChosenTemplate'
    compareInputHistory(currentAttr, items, chosenTemplate, searchBarText)
    let tempResult = []
    chosenTemplate.items.map(value => items[value].desc.toLowerCase().includes(searchBarText) ? tempResult.push(items[value]) : null)
    tempResult.sort((data1, data2) => data1.orderNum - data2.orderNum)
    addResultHistory(currentAttr, tempResult)
    return tempResult
  }
)

const make_get_itemsCustomizedOfAllItems = () => createSelector(
  itemsCustomized,
  searchBarTextItemsCustomizedAllInstances,
  (itemsCustomized, searchBarText) => {
    const currentAttr = 'make_get_itemsCustomizedOfAllItems'
    compareInputHistory(currentAttr, itemsCustomized, searchBarText)
    let tempResult = {}
    for(let key in itemsCustomized) {
      if(itemsCustomized[key].desc.toLowerCase().includes(searchBarText)) {
        tempResult.hasOwnProperty(itemsCustomized[key].instanceId) ? null : tempResult[itemsCustomized[key].instanceId] = []
        tempResult[itemsCustomized[key].instanceId].push(itemsCustomized[key])
      }
    }
    addResultHistory(currentAttr, tempResult)
    return tempResult
  }
)

const make_get_itemsCustomizedOfEachInstanceOfChosenTemplate = () => createSelector(
  itemsCustomized => itemsCustomized,
  (itemsCustomized, instancesOfChosenTemplate) => instancesOfChosenTemplate,
  (itemsCustomized, instancesOfChosenTemplate) => {
    const currentAttr = 'make_get_itemsCustomizedOfEachInstanceOfChosenTemplate'
    compareInputHistory(currentAttr, itemsCustomized, instancesOfChosenTemplate)
    let tempResult = {}
    instancesOfChosenTemplate.map(value1 => {
      let temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate = []
      value1.items.map(value2 => {
        temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate = temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate.concat({
          ...itemsCustomized[value2]
        })
      })
      temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate.sort((data1, data2) => data1.orderNum - data2.orderNum);
      (tempResult.hasOwnProperty(value1.instanceId) ? null : tempResult[value1.instanceId] = [])
      tempResult[value1.instanceId] = temp_array_itemsCustomizedOfEachInstanceOfChosenTemplate
    })
    // console.log('tempResult : ', tempResult)
    addResultHistory(currentAttr, tempResult)
    return tempResult
  }
)

const mySelectors = {
  make_get_dataSourceTemplates,
  make_get_dataSourceInstances,
  make_get_dataSourceItems,
  make_get_dataSourceInstancesOfChosenTemplate,
  make_get_dataSourceOfItemsOfChosenTemplate,
  make_get_dataSourceItemsOfChosenInstance,
  make_get_dataSourceForAllInstances,
  make_get_dataSourceTemplateCategories,
  make_get_badgeValueOfInstancesOfChosenTemplates,
  make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate,
  make_get_badgeValueOfStatusOfChosenInstance,
  make_get_badgeValueOfStatusOfAllInstances,
  make_get_instancesOfChosenTemplate,
  make_get_itemsOfChosenTemplate,
  make_get_itemsCustomizedOfChosenInstance,
  make_get_itemsCustomizedOfAllItems,
  make_get_itemsCustomizedOfEachInstanceOfChosenTemplate,
}

export default mySelectors
