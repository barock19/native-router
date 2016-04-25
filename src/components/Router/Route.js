import React,{PropTypes, Component} from "react-native";

export default class Route extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired
  }

  className() {
    return 'Route';
  }

  render() {
    return null;
  }
}