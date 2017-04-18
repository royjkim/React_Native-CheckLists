import SettingsComponent from './settingsComponent';
import { connect } from 'react-redux';
import {
  savelocal,
  loadlocal,
  deleteAll,
  deleteLocalStorage,
} from '../actions/dataActionCreators'

export default connect(undefined, dispatch => ({
  savelocal: alertNeedBoolean => dispatch(savelocal(alertNeedBoolean)),
  loadlocal: alertNeedBoolean => dispatch(loadlocal(alertNeedBoolean)),
  deleteAll: () => dispatch(deleteAll()),
  deleteLocalStorage: () => dispatch(deleteLocalStorage())
}))(SettingsComponent);
