import React,{Component, DrawerLayoutAndroid, View, Text, TouchableOpacity} from "react-native";
import {connect} from 'react-redux'
import {Toolbar as MaterialToolbar} from "react-native-material-design";
import Router,{Route, Link} from '../components/Router'
import * as NavActions from '../actions/Navigation'

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
    console.log(navigator, navigator.get('stack'))
    const currentRoute = navigator && navigator.get('stack').count() > 0 ? navigator.get('stack').last() : false
    console.log('currentRoute', currentRoute)
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
const Toolbar = connect((state) => { return { navigator: state.Navigation } })(ToolbarComp)
const navFromState = (state)=>{return {Navigation: state.Navigation}}

class PageOneEl extends Component {
  render(){
    let {navigator, dispatch} = this.props
    return <View style={styles.PageContainer}>
      <Text style={styles.welcome}>Page One</Text>
      <Link to="/page_two" meta={{title: 'Hello'}}>
        <Text>Go to Page2</Text>
      </Link>
    </View>
  }
}
const PageOne = connect(navFromState)(PageOneEl)

class PageTwoEl extends Component {
  render(){
    let {dispatch} = this.props
    return <View style={styles.PageContainer}>
      <Text>Page Two</Text>
      <Link to="/">
        <Text>push to Page1</Text>
      </Link>
      <Link back={true}>
        <Text>Back to Page1</Text>
      </Link>
    </View>
  }
}
const PageTwo = connect(navFromState)(PageTwoEl)

export default class App extends Component {
  render(){
    let drawer = this.drawer
    return <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={()=> <NavView />}
      ref={ drawer => this.drawer = drawer }
      >
        <Router>
          <Route path='/' component={PageOne} />
          <Route path='/page_two' component={PageTwo} />
        </Router>
      </DrawerLayoutAndroid>
  }
}
