import Reactotron, { trackGlobalErrors } from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

Reactotron
  .configure()
  .use(trackGlobalErrors({
    veto: frame => frame.fileName.indexOf('/node_modules/react-native') >= 0
  }))
  .use(reactotronRedux())
  .connect()
