import React,{Component, DrawerLayoutAndroid, View, Text, TouchableOpacity} from "react-native";
import {connect} from 'react-redux'
import {Toolbar as MaterialToolbar} from "react-native-material-design";
import Router,{Route, Link} from '../components/Router'
import NavView from "../components/NavView"
import Toolbar from "../components/Toolbar"
import * as NavActions from '../actions/Navigation'
import {updateToggleState as updateDrawerOpenState } from "../actions/NavDrawer"

import {
  Dashboard,
  Course
} from '../components/pages'


class App extends Component {
  render(){
    let {dispatch} = this.props
    return <DrawerLayoutAndroid
      drawerWidth={300}
      onDrawerClose={ ()=> dispatch( updateDrawerOpenState({onClose: true}) ) }
      onDrawerOpen={ ()=> dispatch( updateDrawerOpenState({onOpen: true}) )}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={()=> <NavView />}
      ref={ drawer => this.drawer = drawer } >
        <Router navigationBar={<Toolbar defaultTitle='Elvan Emrick'/>}>
          <Route path='/' component={Dashboard} />
          <Route path='/page_two' component={Course} />
        </Router>
      </DrawerLayoutAndroid>
  }
  componentDidMount(){
    if(this.props.openDrawer){
      this.drawer.open()
    }
  }
  componentWillReceiveProps(nextProps){
    this.handleDrawer(nextProps)
  }

  handleDrawer(nextProps){
    let {openDrawer} = nextProps
    if(openDrawer == this.props.openDrawer)
      return true;

    if(openDrawer == false){
      this.drawer.closeDrawer()
    }else{
      this.drawer.openDrawer()
    }
  }
}

const mapStateToProp = (state)=>{
  return {
    openDrawer: state.NavDrawer.get('isOpen')
  }
}

export default connect(mapStateToProp)(App)
