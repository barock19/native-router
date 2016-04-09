import {Record, Map, List} from "immutable"
import {
  INIT,
  PUSH,
  REPLACE,
  JUMP,
  POP,
  RESET
} from 'constants/Navigation'

export const RouteStack = Record({
  path: '/',
  component: null,
  params: Map(),
  meta: Map(),
})

export const InitialState = Record({
  stateInitialized: false,
  stack: List(),
  navigationType: null
})

export default (state = new InitialState(), action)=>{
  switch (action.type) {
    case INIT:
      return state.set('stateInitialized', true)
    case PUSH:
      return state
        .updateIn(['stack'], stack => stack.push(action.route))
        .set('navigationType', PUSH)
    case POP:
      return state
        .updateIn(['stack'], stack => stack.pop() )
        .set('navigationType', POP)
    case REPLACE:
      return state
        .updateIn(['stack'], stack => stack.pop().push(action.route))
        .set('navigationType', REPLACE)
    case RESET:
      return state
        .updateIn(['stack'], stack => List())
        .set('navigationType', RESET)
    default:
      return state
  }
}