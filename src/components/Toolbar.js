import React,{View, Component, StyleSheet, Text, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {toggleDrawer} from "../actions/NavDrawer";

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#387bdf',
    elevation: 5
  },
  leftButton: {
    width: 60,
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightButton: {
    width: 60,
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },

  centerBox: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 18
  }
})
class Toolbar extends Component {
  render(){
    let {Navigation, dispatch} = this.props
    let currentRoute = Navigation && Navigation.get('stack') ? Navigation.get('stack').last() : false
    let title = currentRoute.getIn(['meta', 'title']) || this.props.defaultTitle || 'Welcome'

    return <View style={styles.wrapper}>
      <View style={styles.leftButton}>
        <TouchableOpacity onPress={ () => dispatch(toggleDrawer()) }>
          <Icon name="bars" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={styles.centerBox}>
        <Text style={styles.pageTitle}>{title}</Text>
      </View>
      <View style={styles.rightButton}></View>
    </View>
  }
}
const mapStateToProp = (state)=>{
   return {
     Navigation: state.Navigation
   }
}
export default connect(mapStateToProp)(Toolbar)