import React, { Component, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Animated, TouchableNativeFeedback } from 'react-native';
import {
  Card,
  Button,
  TYPO,
  COLOR
} from 'react-native-material-design';

import Icon from 'react-native-vector-icons/FontAwesome'

import {Link} from "../../components/Router"
import HorizontalMenu,{MenuItem} from "../../components/HorizontalMenu"

import Style from "../../styles"
export default class Dashboard extends Component {
  render(){
    let {actions} = this.props
    return <View style={[ Style.PageContainer, {backgroundColor: '#d4d4cc'} ]}
      >
      <HorizontalMenu>
        <MenuItem>
          <View style={ {flexDirection: 'row', justifyContent: 'center', height: 40, alignItems: 'center'} }>
            <Icon name={'home'} color={'#0b630e'} size={20}/>
            <Text>  Hello</Text>
          </View>
        </MenuItem>
        <MenuItem title="Product" style={ {color: '#b80f0e'} } />
        <MenuItem title="Promo" />
        <MenuItem title="Sales" />
        <MenuItem title="Home" />
        <MenuItem title="Product" />
        <MenuItem title="Promo" />
        <MenuItem title="Sales" />
      </HorizontalMenu>
      <Text>Dashboard</Text>

      <Link
        to={'page_two'}
        meta={{title: 'Course'}}>
        <Text>Go to Course</Text>
      </Link>
    </View>
  }
}