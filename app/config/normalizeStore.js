import { schema, normalize } from 'normalizr'

const addOriginalTemplate = (prevData, ...newData) => ({
  ...prevData,
  templates: [
    ...prevData.templates,
    ...newData
  ]
})

const addOriginalInstance = (prevData, ...newData) => ({
  ...prevData,
  instances: [
    ...prevData.instances,
    ...newData
  ]
})

const addItem = (prevData, ...newData) => ({
  ...prevData,
  items: [
    ...prevData.items,
    ...newData
  ]
})

const addCategory = (prevData, ...newData) => ({
  ...prevData,
  templateCategories: [
    ...prevData.templateCategories,
    ...newData
  ]
})

const addItemsCustomized = (prevData, ...newData) => ({
  ...prevData,
  itemsCustomized: [
    ...prevData.itemsCustomized,
    ...newData
  ]
})

const my_normalize = prevData => {
  const itemsEntity = new schema.Entity('items', {}, { idAttribute: 'itemId' })
  const itemsCustomizedEntity = new schema.Entity('itemsCustomized', {}, { idAttribute: 'itemCustomizedId' })
  const templatesEntity = new schema.Entity('templates', {
    items: [ itemsEntity ],
  }, { idAttribute: 'templateId' })
  const instancesEntity = new schema.Entity('instances', {
    template: templatesEntity,
    items: [ itemsCustomizedEntity ],
  }, { idAttribute: 'instanceId' })
  const templateCategoriesEntity = new schema.Entity('templateCategories')
  const mySchema = new schema.Object({
    templates: [ templatesEntity ],
    items: [ itemsEntity ],
    instances: [ instancesEntity ],
    itemsCustomized: [ itemsCustomizedEntity ],
    templateCategories: [ templateCategoriesEntity ]
  })
  const normalizedData = normalize(prevData, mySchema)
  return normalizedData
}

const normalizeStore = {
  addOriginalTemplate,
  addOriginalInstance,
  addItem,
  addCategory,
  addItemsCustomized,
  my_normalize
}

export default normalizeStore
