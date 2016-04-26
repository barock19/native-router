import {List, Map} from 'immutable'
import * as NavConst from "../../src/constants/Navigation"
import Reducer , {InitialState, RouteStack } from "../../src/reducers/Navigation"
import * as NavAction from "../../src/actions/Navigation"
import sinon from 'sinon'

describe("Reducer/Navigation", () => {
  let samplePlainRoute = {path: '/somewhere/in/stack'}
  let sampleRoute = new RouteStack(samplePlainRoute)

  describe("when INIT", () => {
    it("should set `initialized` as true, routes and initial stack", () => {
      const currentState = new InitialState({stateInitialized: false})
      const routes = List()
      const initialRoute = {path: '/'}
      const nextState = Reducer(currentState, NavAction.init(routes, initialRoute) )
      expect(nextState.get('stateInitialized')).to.be.true
      expect(nextState.get('routes')).to.be.eq(routes)
      expect(nextState.get('stack').get(0)).to.equal(new RouteStack(initialRoute))
    });
  });

  describe("when PUSH", () => {
    it("should adds route into stack", () => {
      const currentState = new InitialState()
      const nextState = Reducer(currentState, NavAction.push(samplePlainRoute))
      const stack = nextState.get('stack')
      expect(stack).to.have.size(1)
      expect(stack).to.include(sampleRoute)
      expect(nextState.get('navigationType')).to.be.eq(NavConst.PUSH)
    });
  });

  describe("when POP", () => {
    it("should slice the last route from stack", () => {
      let otherRoute = new RouteStack({path: '/session/1'})
      const currentState = new InitialState({stateInitialized: true, stack: List.of(sampleRoute, otherRoute)})
      const nextState = Reducer(currentState, NavAction.pop())
      const stack = nextState.get('stack')
      expect(stack).to.have.size(1)
      expect(stack).to.not.include(otherRoute)
      expect(nextState.get('navigationType')).to.be.eq(NavConst.POP)
    });
  });

  describe("when REPLACE", () => {
    it("should replace the last route with given route", () => {
      let otherRoutePlain = {path: '/session/1'}
      let otherRoute = new RouteStack(otherRoutePlain)
      const currentState = new InitialState({stateInitialized: true, stack: List.of(sampleRoute)})
      const nextState = Reducer(currentState, NavAction.replace(otherRoutePlain))
      const stack = nextState.get('stack')
      expect(stack).to.have.size(1)
      expect(stack.get(0)).to.equal(otherRoute)
      expect(nextState.get('navigationType')).to.be.eq(NavConst.REPLACE)
    });
  });

  describe("when RESET", () => {
    it("should add one route to stack", () => {
      const currentState = new InitialState({stateInitialized: true, stack: List.of(sampleRoute)})
      const routePlain = {path: '/otherRoute'}
      const route = new RouteStack(routePlain)
      const nextState = Reducer(currentState, NavAction.reset(routePlain))
      const stack = nextState.get('stack')
      expect(stack.count()).to.be.eq(1)
      expect(stack.first()).to.be.eq(route)
      expect(nextState.get('navigationType')).to.be.eq(NavConst.RESET)
    });
  });

  describe("when LOST", () => {
    it("should set navigationType as LOST", () => {
      const currentState = new InitialState({stateInitialized: true, stack: List.of(sampleRoute)})
      const nextState = Reducer(currentState, NavAction.lost())
      expect(nextState.get('navigationType')).to.be.eq(NavConst.LOST)
    });
  });
});