import { connect } from 'react-redux'
import ItemsInputedListModalComponent from './itemsInputedListModalComponent'
import mySelectors from '../container/selectors'
const mapStateToProps = (state, ownProps) => ({
  itemsOfChosenTemplate: mySelectors.make_get_itemsOfChosenTemplate(state.normalizeReducer, ownProps.chosenTemplate)
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  state: {
    ...stateProps.state,
    dataSourceItemsOfChosenTemplate: mySelectors.make_get_itemsOfChosenTemplate()(stateProps.state.itemsOfChosenTemplate)
  },
  ...dispatchProps,
  ...ownProps
})

export default connect(mapStateToProps, null, mergeProps)(ItemsInputedListModalComponent)
