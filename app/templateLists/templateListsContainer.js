import React from 'react'

import NavBar from '../components/navBar'
import TemplateListsComponent from './templateListsComponent'
import TemplateListAdd from './templateListAdd'

export default class TemplateListsContainer extends React.Component {
  render() {
    return(
      <NavBar
        // initialRoute={{ title: 'Template Lists', component: TemplateListsComponent }}
        initialRoute={{
          passProps: {
            firstPageTitleMakeBackDisabled: 'Template Lists',
            nextRightButtonPageTitle: 'Add',
            nextRightButtonPageComponent: TemplateListAdd
          },
          title: 'Template Lists',
          component: TemplateListsComponent,
        }}
        // firstPageTitleMakeBackDisabled='Template Lists'
        // nextRightButtonPageTitle='Add'
        // nextRightButtonPageComponent={TemplateListAdd}
      />
    )
  }
}
// import { connect } from 'react-redux'

// const templateLists = [
// ]

// templateLists schema = [
//   {
//     templateName: '',
//     templateCategory: '', - 'default' + 'user defined',
//     checklists = [
//       'open', 'close', 'exit'
//     ]
//     eachItemsStatus = [
//       { title: checklists.value, subtitle: 'optional', status: 'true or false(completed)' }
//     ]
//   }
// ]
// 이걸 클래스로 구현해야 겠네;


// const { initialRoute, firstPageTitleMakeBackDisabled, nextRightButtonPageComponent, nextRightButtonPageTitle } = this.props
