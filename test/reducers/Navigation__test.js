import {List, Map} from 'immutable'
import * as NavConst from "constants/Navigation"
import Reducer , {InitialState, RouteStack } from "reducers/Navigation"
import * as NavAction from "actions/Navigation"
import sinon from 'sinon'

describe("Reducer/Navigation", () => {
  let sampleRoute = new RouteStack({path: '/'})

  describe("when INIT", () => {
    it("should set `initialized` as true", () => {
      const currentState = new InitialState({stateInitialized: false})
      const nextState = Reducer(currentState, NavAction.init())
      expect(nextState.get('stateInitialized')).to.be.true
    });
  });

  describe("when PUSH", () => {
    it("should adds route into stack", () => {
      const currentState = new InitialState()
      const nextState = Reducer(currentState, NavAction.push(sampleRoute))
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
      let otherRoute = new RouteStack({path: '/session/1'})
      const currentState = new InitialState({stateInitialized: true, stack: List.of(sampleRoute)})
      const nextState = Reducer(currentState, NavAction.replace(otherRoute))
      const stack = nextState.get('stack')
      expect(stack).to.have.size(1)
      expect(stack.get(0)).to.equal(otherRoute)
      expect(nextState.get('navigationType')).to.be.eq(NavConst.REPLACE)
    });
  });

  describe("when RESET", () => {
    it("should make the stack empty", () => {
      const currentState = new InitialState({stateInitialized: true, stack: List.of(sampleRoute)})
      const nextState = Reducer(currentState, NavAction.reset())
      const stack = nextState.get('stack')
      expect(stack).to.be.empty
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