require('test-helper')
import React,{ Navigator, createClass} from "react-native"
import {mockComponent} from "react-addons-test-utils";
import mocker from "mockery"
import {Map} from "immutable"
import {shallow, mount} from 'enzyme'
import sinon from 'sinon'
import Router,{Route} from 'components/Router'

describe("Components/Router", () => {
  let wrapper, dispatcher, NavigationState, MockRouter
  beforeEach(() => {
    dispatcher = sinon.stub()
  });
  describe("initialize", () => {
    it("should return empty", () => {
      wrapper = shallow(<Router/>)
      expect(wrapper.text()).to.equal('<Text />')
    });

    describe("when child Route defined", () => {
      let comp1, NavActionsInitStub

      beforeEach(() => {
        NavActionsInitStub = sinon.stub().returns('INIT')
        Router.__Rewire__('initialize', NavActionsInitStub)

        NavigationState = new Map({
          stateInitialized: false
        })

        comp1 = class extends React.Component {render(){return null}}
        wrapper = mount(<Router Navigation={NavigationState} dispatch={dispatcher}>
            <Route path="/" component={comp1}/>
          </Router>, true)
      });

      it("should set `routes`", () => {
        let routes = wrapper.instance().routes
        expect(routes).to.not.be.empty
        expect(routes[0]).to.be.eql({path: '/', component: comp1})
      });

      it("should dispatch INIT", ()=>{
        expect(NavActionsInitStub).to.have.been.calledWith(sinon.match(wrapper.instance().routes))
        expect(dispatcher).to.have.been.calledWith('INIT').once
      })
    });
  });
});