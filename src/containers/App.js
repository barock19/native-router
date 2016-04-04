import React, { Component, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  actions as routerActions,
  NavBar,
  Route,
  Router,
  Schema,
  TabBar,
  TabRoute
} from 'react-native-router-redux';

import {
  Dashboard, Course
} from "../components/pages"

const mapStateToProps = state => ({
  router: state.router,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...routerActions,
  }, dispatch),
  dispatch,
});

const defaultSchema = {
  navBar: NavBar,
  navLeftColor: '#FFFFFF',
  navTint: '#224655',
  navTitleColor: '#FFFFFF',
  navTitleStyle: {
    fontFamily: 'Avenir Next',
    fontSize: 18,
  },
  statusStyle: 'light-content',
  tabBar: TabBar,
};

class Application extends Component {
  render() {
    return (
      <Router {...this.props} initial="dashboard">
        <Route name="dashboard" component={Dashboard} />
        <Route name="course" component={Course} />
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);