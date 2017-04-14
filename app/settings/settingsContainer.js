import SettingsComponent from './settingsComponent';
import { connect } from 'react-redux';
import {
  savelocal,
  loadlocal,
  deleteAll,
  deleteLocalStorage,
} from '../actions/dataActionCreators'

export default connect(undefined, dispatch => ({
  savelocal: () => dispatch(savelocal()),
  loadlocal: () => dispatch(loadlocal()),
  deleteAll: () => dispatch(deleteAll()),
  deleteLocalStorage: () => dispatch(deleteLocalStorage())
}))(SettingsComponent);
