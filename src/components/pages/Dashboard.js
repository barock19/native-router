import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Style from "../../styles"
export default class Dashboard extends Component {
  render(){
    let {actions} = this.props
    return <View style={Style.PageContainer}>
      <Text>Dashboard</Text>
      <Text onPress={ ()=> actions.push({name: 'course'}) }>Go to Course</Text>
    </View>
  }
}