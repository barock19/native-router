import React,{TouchableOpacity, Component} from "react-native";
import {connect} from "react-redux";
import {to, back} from '../../actions/Navigation'
class Link extends Component {
  render(){
    return <TouchableOpacity onPress={ e => this.pressHandler()}>
      {this.props.children}
    </TouchableOpacity>
  }

  pressHandler(){
    let {dispatch, meta, params} = this.props
    let path = this.props.to
    let isBack = this.props.back

    if(isBack)
      dispatch(back());
    else {
      dispatch(to(path, {params, meta}));
    }
  }
}
export default connect(()=>{return {}})(Link)