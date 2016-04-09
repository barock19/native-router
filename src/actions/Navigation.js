import {
  INIT,
  PUSH,
  REPLACE,
  JUMP,
  POP,
  RESET
} from 'constants/Navigation'

export function pop() {
  return {
    type: POP
  }
}
export function init(navigation) {
  return {
    type: INIT,
    navigation
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