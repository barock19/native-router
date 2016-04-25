import {connect} from 'react-redux'
import RouteEl from "./RouterEl"

export {default as Route} from './Route'
export {default as Transition} from './Transition'
export default connect( (state) => { return { Navigation: state.Navigation } })(RouteEl)