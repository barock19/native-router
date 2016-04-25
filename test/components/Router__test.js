import React,{ Navigator, createClass} from "react-native"
var {shallow, mount} = require('enzyme')
import {Map, List} from "immutable"
import {RouteStack} from "../../src/reducers/Navigation";
import sinon from 'sinon'
import {Route} from '../../src/components/Router'
import Router from '../../src/components/Router/RouterEl'
import * as NavConst from "../../src/constants/Navigation";

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

      describe("when Navigation props updated (by Initialize)", () => {
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

        describe("when Navigation props updated (by modifiying Navigation#stack)", () => {
          let transitionHandlerStub
          beforeEach(()=>{
            NavigationState = new Map({
              stateInitialized: true,
              routes: [],
              stack: List.of( new RouteStack({path: '/'}), new RouteStack({path: '/users/1'}) ),
              navigationType: 'PUSH'

            })
            let instance = wrapper.instance()
            transitionHandlerStub = sinon.stub(instance, 'transitionHandler')
            wrapper.setProps({Navigation: NavigationState})
          })

          it("should trigger `transitionHandler`", () => {
            expect(transitionHandlerStub).to.be.calledWith(sinon.match({path: '/users/1', component: null, meta: {}, params: {}}), 'PUSH').once
          });

          describe("when navType is LOST", () => {
            let lostRoute
            beforeEach(() => {
              lostRoute = new Map({isLost: true})
              wrapper.setProps({
                Navigation: NavigationState
                  .set('lostRoute', lostRoute)
                  .set('navigationType', NavConst.LOST)
              })
            });

            it("should 'Push' `lost route` to transitionHandler", () => {
              expect(transitionHandlerStub).to
                .be.calledWith(sinon.match(lostRoute), NavConst.PUSH).once
            });


            describe("when NavType change from LOST", () => {
              let newRouteAfterLost
              beforeEach(() => {
                newRouteAfterLost = new Map({path: '/'})
                wrapper.setProps({
                  Navigation: NavigationState
                    .set('lostRoute', null)
                    .set('navigationType', NavConst.PUSH)
                    .updateIn(['stack'], stack => stack.push(newRouteAfterLost))
                })
              });

              it("should 'Repalce' the lostRoute", () => {
                expect(transitionHandlerStub).to
                  .be.calledWith(newRouteAfterLost, NavConst.REPLACE).once
              });
            });
          });

          describe("transitionHandler", () => {
            let wrapperInstance, sampleRoute, navigatorStub
            beforeEach(()=>{
              transitionHandlerStub.restore()

              navigatorStub = {push : sinon.stub(), resetTo: sinon.stub(), pop: sinon.stub(),
                replace: sinon.stub()}
              sampleRoute = {}
              wrapperInstance = wrapper.instance()
              wrapperInstance.navigator = navigatorStub
            })
            it("should 'Push' Navigator", () => {
              wrapperInstance.transitionHandler(sampleRoute, NavConst.PUSH)
              expect(navigatorStub.push).to
                .have.been.calledWith(sampleRoute)
            });

            it("should 'Reset' Navigator", () => {
              wrapperInstance.transitionHandler(sampleRoute, NavConst.RESET)
              expect(navigatorStub.resetTo).to
                .have.been.calledWith(sampleRoute)
            });

            it("should 'Pop' Navigator", ()=>{
              wrapperInstance.transitionHandler(sampleRoute, NavConst.POP)
              expect(navigatorStub.pop).to
                .have.been.called.once
            })

            it("should 'Replace' Navigator", () => {
              wrapperInstance.transitionHandler(sampleRoute, NavConst.REPLACE)
              expect(navigatorStub.replace).to
                .have.been.calledWith(sampleRoute).once
            });
          });
        });
      });
    });


  });
});