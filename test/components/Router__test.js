import React,{ Navigator, createClass} from "react-native"
var {shallow, mount} = require('enzyme')
import {Map, List} from "immutable"
import {RouteStack} from "reducers/Navigation";
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
          stateInitialized: false,
          routes: [],
          stack: List()
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

      describe("when Navigation props updated", () => {
        let RouteMatcherStub
        beforeEach(()=>{
          NavigationState = new Map({
            stateInitialized: true,
            routes: [],
            stack: List.of( new RouteStack({path: '/'}) )
          })
          wrapper.setProps({Navigation: NavigationState})
        })
        it("should set `stateInitialized` && `initialRoute`", () => {
          let inst = wrapper.instance()
          expect(inst.stateInitialized).to.be.true
          expect(inst.initialRoute).to.eql(new RouteStack({path: '/'}))
        });
      });
    });


  });
});