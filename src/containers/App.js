import React,{Component, DrawerLayoutAndroid, View, Text} from "react-native";
import {connect} from 'react-redux'
import {Toolbar as MaterialToolbar} from "react-native-material-design";
import Router,{Route} from '../components/Router'

class NavView extends Component {
  render(){
    return <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Text>Nav View</Text>
    </View>
  }
}
import styles from "../styles"
styles.welcome = {
  fontSize: 20,
  textAlign: 'center',
  color: '#5a6598'
}
styles.button = {
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: '#e83842',
}

class ToolbarComp extends Component {
  render(){
    const { onIconPress, navigator } = this.props;
    const currentRoute = navigator & navigator.get('stack').count > 0 ? navigator.get('stack').last() : false
    const title =  currentRoute && currentRoute.getIn(['meta', 'title']) ? currentRoute.getIn(['meta', 'title']) : 'Welcome'

    return <MaterialToolbar
      title={title}
      icon={'menu'}
      onIconPress={() => onIconPress() }
      rightIconStyle={{
          margin: 10
      }}
    />
  }
}
const Toolbar = connect(ToolbarComp)((state) => { return { navigator: state.Navigation } })
class PageOne extends Component {
  render(){
    let {navigator} = this.props
    return <View style={styles.PageContainer}>
      <Text style={styles.welcome}>Page One</Text>
    </View>
  }
}

class PageTwo extends Component {
  render(){
    return <View style={styles.PageContainer}>
      <Text>Page Two</Text>
    </View>
  }
}
export default class App extends Component {
  render(){
    let drawer = this.drawer
    return <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={()=> <NavView />}
      ref={ drawer => this.drawer = drawer }
      >
        <Router
          navigationBar={<Toolbar onIconPress={ ()=> drawer.openDrawer() } />}
          >
          <Route path='/' component={PageOne} />
          <Route path='/page_two' component={PageOne} />
        </Router>
      </DrawerLayoutAndroid>
  }
}
