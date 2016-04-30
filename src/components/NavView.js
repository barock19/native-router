import React,{Component, View, Text, Image, StyleSheet} from "react-native";
import {
  Avatar,
  Drawer,
  Divider,
  COLOR,
  TYPO
} from 'react-native-material-design';

class NavView extends Component {
  render(){
    return <View>
      <Image style={styles.backgroundImage} source={require('../assets/images/el.jpg')} />
    </View>

    // <Drawer theme='light'>
    //   <Drawer.Header image={<Image style={styles.backgroundImage} source={require('../assets/images/el.jpg')} />}>
    //     <View style={styles.header}>
    //         <Avatar size={80} image={<Image source={{ uri: "http://facebook.github.io/react-native/img/opengraph.png?2" }}/>} />
    //         <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>React Native Material Design</Text>
    //     </View>
    //   </Drawer.Header>
    // </Drawer>
    //
    // return <View style={{flex: 1, backgroundColor: '#ffffff'}}>
    //   <Text>Nav View</Text>
    // </View>
  }
}


export default NavView
const styles = StyleSheet.create({
    header: {
        paddingTop: 16
    },
    text: {
        marginTop: 20
    },
    backgroundImage: {}
});