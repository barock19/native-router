import React,{Component, Navigator, PropTypes, StyleSheet, Text} from "react-native";
import * as NavConst from "constants/Navigation"
import {initialize} from "actions/Navigation"
import RouteMatcher from "services/RouteMatcher"

export class Route extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired
  }

  className() {
    return 'Route';
  }

  render() {
    return null;
  }
}
export default class Router extends Component {
    constructor(props){
      super(props)
      this.routes = []
      this.stateInitialized = false
      let { Navigation, dispatch, initial, children } = this.props

      if(Navigation && !Navigation.get('stateInitialized'))
        this.parseRoutes(children, dispatch);
    }

    componentWillReceiveProps(nextProps){
      let {Navigation} = this.props
      let currentLastRoute = Navigation.get('routes').last()
      let nextRoute = nextProps.Navigation.get('routes').last()
      let navType = nextProps.Navigation.get('navigationType')

      if(!Navigation.get('stateInitialized') && nextProps.Navigation.get('stateInitialized')){
        this.stateInitialized = true
        this.initialRoute = RouteMatcher(nextProps.Navigation.get('routes'), this.props.initial)
      }else if (this.stateInitialized && (nextRoute && (currentLastRoute != nextRoute) ) ){
        transitionHandler(nextRoute.toJS(), navType)
      }
    }

    transitionHandler(route, navType){
      switch (navType) {
        case NavConst.PUSH: this.navigator.push(route)
        case NavConst.RESET: this.navigator.reset()
        default:

      }
    }

    render(){
      if(!this.stateInitialized)
        return <Text>Loading</Text>;
      // TODO: if Navigation not initializes yet, should render loading page
      return <Navigator
        renderScene={this.renderSceneHandler}
        configureScene={this.configureSceneHandler}
        initialRoute={this.initialRoute}
        ref={ref => this.navigator = ref}
        />
    }

    parseRoutes(children, dispatch){
      React.Children.forEach(children, (child, index)=>{
        let {path, component} = child.props
        this.routes.push({path, component})
      })

    }
    componentDidMount(){
      let {dispatch} = this.props
      if(this.routes.length > 0)
        dispatch(initialize(this.routes));
    }

    renderSceneHandler(route, navigator ){
      let {component, params} = route.toJS()
      let Comp = component
      return <View style={styles.transparent}>
        <Comp routes={params} />
      </View>
    }

    configureSceneHandler(route, routeStack){
      return Navigator.SceneConfigs.FloatFromRight
    }



}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  transparent: {
    backgroundColor: 'transparent',
    flex: 1,
  },
});
