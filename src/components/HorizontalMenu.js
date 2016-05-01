import React,{Component, View, Text, Animated, ScrollView, StyleSheet, TouchableOpacity, TouchableNativeFeedback} from 'react-native'

const style = StyleSheet.create({
  menuWrapper: {
    height: 45,
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF'
  },
  menuIndicator: {
    backgroundColor: '#2eb836',
    width: 10,
    height: 5,
    position: 'absolute',
    left: 0,
    bottom: -1
  },
  menuUl: {
    flex: 1,
    flexDirection: 'row',
  },
  menuItem: {
    justifyContent: 'center',
    marginRight: 10,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15
  },
  lastMenuItem: {
    marginRight: 0
  },
  menuTitle: {
    color: '#105b63',
  }
})

class MenuItem extends Component {
  className(){
    return 'HorizontalMenuItem'
  }
  handlePress(){
    this.props.onMenuSelected(this.layoutInfo)
  }
  buildChild(){
    if(this.props.children){
      return this.props.children
    }else{
      return <Text
        style={ [style.menuTitle, this.props.style ] }
        >{this.props.title || 'NO TITLE'}</Text>
    }
  }

  render(){



    let child = this.buildChild()
    return <TouchableOpacity
      onLayout={(event) => {
        this.layoutInfo = event.nativeEvent.layout;
      }}
      style={style.menuItem}
      onPress={this.handlePress.bind(this)}
      >
      {child}
    </TouchableOpacity>
  }
}

class MenuIndicator extends Component {
  constructor(props){
    super(props)
    this.state = {
      width: new Animated.Value(0),
      x: new Animated.Value(0)
    }
  }
  componentWillReceiveProps(nextProps){
    let {timing, spring} = Animated
    let xDistance = Math.abs(nextProps.x - this.state.x._value)
    let velocity = 0.9
    let duration = velocity * xDistance
    let speed = 100
    let bounciness = 10


    // const width = {pts: 14, ast:...}
    // const indicators = ['pts', 'ast', 'reb']
    Animated.parallel(
      [
        spring(this.state.width, {toValue: nextProps.width, velocity, speed}),
        spring(this.state.x, {toValue: nextProps.x, velocity, speed })
      ]
    ).start()
  }

  render(){
      return <Animated.View
        style={this.buildStyle()} />
  }
  buildStyle(){
    let updateStyle = {
      width: this.state.width,
      left: this.state.x,
    }
    return [style.menuIndicator, updateStyle]
  }
}

class HorizontalMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      menuLayout: {
        width: 0,
        x: 0
      }
    }
  }
  updateMenuIndicator(menuLayout){
    this.setState({menuLayout: menuLayout})
  this.scrollView.scrollTo({x: menuLayout.x - 150, y: 0, animated: true })
  }
  render(){
    let children = this.buildMenuItems()
    return <View style={style.menuWrapper}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.menuUl}
        ref={(ref => this.scrollView = ref)}
        >
        {children}
        <MenuIndicator {...this.state.menuLayout}/>
      </ScrollView>
    </View>
  }

  buildMenuItems(){
    let {children} = this.props
    let menuItems = children.filter((item) => item.type.prototype.className() == 'HorizontalMenuItem')

    return menuItems.map((item, index) => {
      let overrideProps = {
        onMenuSelected: this.updateMenuIndicator.bind(this),
        key: item.props.key || `HorizontalMenuItem-${index}`
      }

      if( (index+1) == menuItems.length ){
        overrideProps.style = [item.props.style || {}, style.lastMenuItem]
      }
      return React.cloneElement(item,overrideProps)
    })
  }
}
export {MenuItem}
export default HorizontalMenu