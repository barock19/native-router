import {fromJS, List, Map} from "immutable";
import RouteMatcher, {routeToSegment} from "services/RouteMatcher"
import {RouteStack} from 'reducers/Navigation'
import {
  INIT,
  PUSH,
  REPLACE,
  JUMP,
  POP,
  RESET,
  LOST
} from 'constants/Navigation'

export function pop() {
  return {
    type: POP
  }
}
export function init(routes) {
  return {
    type: INIT,
    routes
  }
}

export function push(route) {
  return {
    type: PUSH,
    route
  }
}

export function replace(route) {
  return {
    type: REPLACE,
    route
  }
}
export function jump(route) {
  return {
    type: JUMP,
    route
  }
}

export function reset(route) {
  return {
    type: RESET,
    route
  }
}

export function lost(lostRoute) {
  return {
    type: LOST,
    lostRoute
  }
}

export function to(route) {
  return (dispatch, getState) => {
    const {Navigation} = getState()
    const routes = Navigation.get('routes')
    const targetRoute = RouteMatcher(routes, route)
    if(!targetRoute)
      return dispatch(lost(route));
    else{
      return dispatch( push(targetRoute) )
    }
  }
};

export function back(){
  return (dispatch, getState) => {
    const {Navigation} = getState()
    const stack = Navigation.get('stack')
    if(stack.count() == 1)
      return false;
    else {
      dispatch(pop())
    }
  }
}

export function initialize(routesList) {
  return (dispatch, getState)=>{
    const parsedRoutes = routesList
      .map((item)=>{
        item._segmentInfo = routeToSegment(item.path)
        return item
      })
      .map(item => new RouteStack(item))
    dispatch(init(parsedRoutes))
  }
}