import { schema, normalize } from 'normalizr'

// const initialData = {
//   templates: [],
//   instances: [],
//   items: [],
//   templateCategories: []
// }

// const initialState = {
//   templates: [
//     { id: 1,
//       title: 'GoingFishing',
//       category: 'Hobby',
//       items: [
//         // { id: 1, desc: 'Wear life vest', orderNum: 5 },
//         { id: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
//         { id: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 }
//       ]
//     },
//     { id: 2,
//       title: 'BeforeGoOutHome',
//       category: 'NormalDay',
//       items: [
//         { id: 2, desc: 'Wathing TV', template: 'StayHome', orderNum: 1  },
//         { id: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 }
//       ]
//     },
//     { id: 3,
//       title: 'StayHome',
//       category: 'Relax',
//       items: [
//         { id: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 },
//         { id: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
//       ]
//     }
//   ],
//   instances: [
//     { id: 1,
//       name: 'Jack',
//       template: 'GoingFishing',
//       items: [
//         { id: 1, desc: 'Wear life vest', orderNum: 5, status: false },
//         { id: 2, desc: 'Wathing TV', orderNum: 1, status: true  },
//         { id: 3, desc: 'Get on the boat', orderNum: 1, status: true },
//       ]
//     },
//   ],
//   items: [
//     { id: 1, desc: 'Wear life vest', template: 'GoingFishing', orderNum: 5 },
//     { id: 2, desc: 'Wathing TV', template: 'StayHome', orderNum: 1  },
//     { id: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
//     { id: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 },
//     { id: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 },
//   ],
//   templateCategories: [
//     { id: 1, title: 'Hobby' },
//     { id: 2, title: 'NormalDay' },
//     { id: 3, title: 'Relax' }
//   ]
// }

const addOriginalTemplate = (prevData, newData) => ({
  ...prevData,
  templates: [
    ...prevData.templates,
    newData
  ]
})

const addOriginalInstance = (prevData, newData) => ({
  ...prevData,
  instances: [
    ...prevData.instances,
    newData
  ]
})

const addItem = (prevData, newData) => ({
  ...prevData,
  items: [
    ...prevData.items,
    newData
  ]
})

const addCategory = (prevData, newData) => ({
  ...prevData,
  templateCategories: [
    ...prevData.templateCategories,
    newData
  ]
})

const my_normalize = (prevData) => {
  const itemsEntity = new schema.Entity('items')
  const templatesEntity = new schema.Entity('templates', {
    items: [ itemsEntity ]
  })
  const instancesEntity = new schema.Entity('instances', {
    items: [ itemsEntity ]
  })
  const templateCategoriesEntity = new schema.Entity('templateCategories')
  const mySchema = new schema.Object({
    templates: [ templatesEntity ],
    instances: [ instancesEntity ],
    items: [ itemsEntity ],
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
  my_normalize
}

export default normalizeStore
