import React, { Component, StyleSheet, Text, View, Image } from 'react-native';
import {
  Card,
  Button,
  TYPO,
  COLOR
} from 'react-native-material-design';

import {Link} from "../../components/Router"

import Style from "../../styles"
export default class Dashboard extends Component {
  render(){
    let {actions} = this.props
    return <View style={Style.PageContainer}>
      <Text>Dashboard</Text>
      <Link
        to={'page_two'}
        meta={{title: 'Course'}}>
        <Text>Go to Course</Text>
      </Link>
    </View>
  }
}