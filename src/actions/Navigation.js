import {fromJS, List, Map} from "immutable";
import RouteMatcher, {routeToSegment} from "../services/RouteMatcher"
import {RouteStack} from '../reducers/Navigation'
import {
  INIT,
  PUSH,
  REPLACE,
  JUMP,
  POP,
  RESET,
  LOST
} from '../constants/Navigation'

function createRouteStack(route) {
  return new RouteStack(route)
}

export function pop() {
  return {
    type: POP
  }
}
export function init(routes, initialRoute) {
  return {
    type: INIT,
    routes,
    initialRoute
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

export function to(route, options = {}) {
  return (dispatch, getState) => {
    const {Navigation} = getState()
    const routes = Navigation.get('routes')
    const targetRoute = RouteMatcher(routes, route)
    if(!targetRoute)
      return dispatch(lost(route));
    else{
      if(options.params)
        targetRoute.params =  fromJS(options.params)
      if(options.meta)
        targetRoute.meta = fromJS(options.meta)
      return dispatch( push(new RouteStack({...targetRoute}) ) )
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

export function initialize(routesList, initial) {
  return (dispatch, getState)=>{
    let parsedRoutes = routesList
      .map((item)=>{
        item._segmentInfo = routeToSegment(item.path)
        return item
      })
    let initialRouteaFound = RouteMatcher(parsedRoutes, initial)
    let initialRoute

    if(initialRouteaFound){
      initialRoute = createRouteStack(initialRouteaFound)
    }

    dispatch(init(parsedRoutes, initialRoute))
  }
}