import {Map} from "immutable";
import {OPEN, CLOSE} from '../constants/NavDrawer';

const InitialState = new Map({
  isOpen: false
})

export default (state=InitialState, action)=>{
  switch (action.type) {
    case OPEN:
      return state.set('isOpen', true)
    case CLOSE:
      return state.set('isOpen', false)
    default:
      return state
  }
}