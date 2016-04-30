import {OPEN, CLOSE} from '../constants/NavDrawer'

export const openDrawer = ()=>{
  return {
    type: OPEN
  }
}

export const closeDrawer = ()=>{
  return {
    type: CLOSE
  }
}

export const toggleDrawer = ()=>{
  return (dispatch, getState)=>{
    let {NavDrawer} = getState()
    if(NavDrawer.get('isOpen'))
      dispatch(closeDrawer());
    else
      dispatch(openDrawer());
  }
}
export const updateToggleState = (options)=>{
  return (dispatch, getState)=> {
    let { NavDrawer } = getState()
    let isOpen = NavDrawer.get('isOpen')

    if( isOpen && options.onClose ){
      dispatch(closeDrawer());
    }else if(!isOpen && options.onOpen) {
      dispatch(openDrawer());
    }
  }
}