import {Record, Map, List} from "immutable"
import {
  INIT,
  PUSH,
  REPLACE,
  JUMP,
  POP,
  RESET,
  LOST
} from 'constants/Navigation'

export const RouteStack = Record({
  path: '/',
  component: null,
  params: Map(),
  meta: Map(),
})

export const InitialState = Record({
  routes: null,
  stateInitialized: false,
  stack: List(),
  lostRoute: null,
  navigationType: null
})

export default (state = new InitialState(), action)=>{
  switch (action.type) {
    case INIT:
      return state
        .set('stateInitialized', true)
        .set('routes', action.routes)
    case PUSH:
      return state
        .set('lostRoute', null)
        .updateIn(['stack'], stack => stack.push(action.route))
        .set('navigationType', PUSH)
    case POP:
      return state
        .set('lostRoute', null)
        .updateIn(['stack'], stack => stack.pop() )
        .set('navigationType', POP)
    case REPLACE:
      return state
        .set('lostRoute', null)
        .updateIn(['stack'], stack => stack.pop().push(action.route))
        .set('navigationType', REPLACE)
    case RESET:
      return state
        .set('lostRoute', null)
        .updateIn(['stack'], stack => List())
        .set('navigationType', RESET)
    case LOST:
      return state
        .set('navigationType', LOST)
        .set('lostRoute', action.lostRoute)
    default:
      return state
  }
}

