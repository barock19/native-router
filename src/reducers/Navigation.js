import Immutable,{Record, Map, List, fromJS} from "immutable"
import {
  INIT,
  PUSH,
  REPLACE,
  JUMP,
  POP,
  RESET,
  LOST
} from '../constants/Navigation'

// hacky way to static checking parsing nested Record
// http://stackoverflow.com/questions/29763280/parsing-nested-records-in-immutable-js
Immutable.Record.constructor.prototype.fromJS = function(values) {
  var that = this;
  var nested = Immutable.fromJS(values, function(key, value){
    if(that.prototype[key] && that.prototype[key].constructor.prototype instanceof Immutable.Record){return that.prototype[key].constructor.fromJS(value)}
    else { return value }
  });
  return this(nested);
}
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
        .updateIn(['stack'], stack => stack.push( new RouteStack( action.initialRoute) ))
    case PUSH:
      return state
        .set('lostRoute', null)
        .updateIn(['stack'], stack => stack.push( RouteStack.fromJS(action.route) ))
        .set('navigationType', PUSH)
    case POP:
      return state
        .set('lostRoute', null)
        .updateIn(['stack'], stack => stack.pop() )
        .set('navigationType', POP)
    case REPLACE:
      return state
        .set('lostRoute', null)
        .updateIn(['stack'], stack => stack.pop().push( new RouteStack(action.route)))
        .set('navigationType', REPLACE)
    case RESET:
      return state
        .set('lostRoute', null)
        .updateIn(['stack'], stack => List([new RouteStack(action.route)]))
        .set('navigationType', RESET)
    case LOST:
      return state
        .set('navigationType', LOST)
        .set('lostRoute', action.lostRoute)
    default:
      return state
  }
}

