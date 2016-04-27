import React,{Component, Navigator, PropTypes, StyleSheet, Text, View, BackAndroid} from "react-native";
import {connect} from 'react-redux'
import * as NavConst from "../../constants/Navigation"
import {initialize, back} from "../../actions/Navigation"
import styles from "./Style"
import Transition from "./Transition"

export default class RouterEl extends Component {
    constructor(props){
      super(props)
      this.routes = []
      this.stateInitialized = false
      let { Navigation, dispatch, children } = this.props
      if(Navigation && !Navigation.get('stateInitialized'))
        this.parseRoutes(children, dispatch);
    }

    componentWillReceiveProps(nextProps){
      let CurrentNav     = this.props.Navigation
      let NextNav        = nextProps.Navigation
      let currentInit    = CurrentNav.get('stateInitialized')
      let nextInit       = NextNav.get('stateInitialized')
      let currentRoute   = CurrentNav.get('stack').last()
      let nextRoute      = NextNav.get('stack').last()
      let currentNavType = CurrentNav.get('navigationType')
      let nextNavType    = NextNav.get('navigationType')
      let lostRoute      = NextNav.get('lostRoute')

      // Navigation Initialize
      if(!currentInit && nextInit){
        this.stateInitialized = true
        this.initialRoute = nextRoute
      // Navigation updated stack
      }else if (currentNavType != NavConst.LOST && (nextRoute && (currentRoute != nextRoute) ) ){
        this.transitionHandler(nextRoute, nextNavType)
      // Navigation recieves LostRoute
      }else if(nextNavType == NavConst.LOST){
        this.transitionHandler(lostRoute, NavConst.PUSH)
      // Navigation recover from LostRoute
      }else if(currentNavType == NavConst.LOST && nextNavType != NavConst.LOST){
        this.transitionHandler(nextRoute, NavConst.REPLACE)
      }
    }

    transitionHandler(routeStack, navType){
      let route = routeStack.toJS()
      switch (navType) {
        case NavConst.PUSH:
          return this.navigator.push(route)
        case NavConst.RESET:
          return this.navigator.resetTo(route)
        case NavConst.POP:
          return this.navigator.pop()
        case NavConst.REPLACE:
          return this.navigator.replace(route)
        default:
          return false
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
        navigationBar={this.props.navigationBar}
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
        dispatch(initialize(this.routes, '/'));

      BackAndroid.addEventListener('hardwareBackPress', ()=>{
        dispatch(back())
        return true
      })
    }

    renderSceneHandler(route, navigator ){
      let {component, params} = route
      let Comp = component
      return <View style={styles.transparent}>
        <Comp routes={params} />
      </View>
    }

    configureSceneHandler(route, routeStack){
      return Transition.NONE
    }



}