import Reactotron, { trackGlobalErrors } from 'reactotron-react-native'

Reactotron
  .configure()
  .use(trackGlobalErrors({
    veto: frame => frame.fileName.indexOf('/node_modules/react-native') >= 0
  }))
  .connect()
