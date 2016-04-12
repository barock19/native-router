import {omit, isEmpty} from 'underscore'

const routeToSegment = (route)=>{
  let segments = route.split('/').filter( seg => seg != '')
  let patterns = segments.filter(seg => seg.match(/^\:(\w+)/))
  let length = segments.length

  return {segments, patterns,length}
}

const stringPatternHandler = (routes, route)=>{
  let {segments, length} = routeToSegment(route)
  let patternToValueMap = {}

  let foundTarget = routes
    .find( (item) => {
      if(item.path == route)
        return true;

      if(item._segmentInfo.length != length)
        return false;
      let ASegments = segments
      let BSegments =  item._segmentInfo.segments
      let BSegmentsPatterns = item._segmentInfo.patterns

      let possiblyFoundedPattern = []
      ASegments.forEach((ASegment, i)=>{
        let BSegment = BSegments[i]
        if(ASegment != BSegment){
          possiblyFoundedPattern.push(BSegment)
          patternToValueMap[BSegment.replace(':', '')] =  ASegment
        }
      })
      return BSegmentsPatterns.join('-') == possiblyFoundedPattern.join('-')
    })

  if(!foundTarget)
    return false;
  else {
    let finalObject = isEmpty(patternToValueMap) ? {path: route} : {path: route , params: patternToValueMap}
    return Object.assign({}, omit(foundTarget, '_segmentInfo'), finalObject)
  }
}

const stringHandler = (routes, route)=>{
  let foundTarget = stringPatternHandler(routes, route)
  return foundTarget ?  foundTarget : false
}
const recordHandler = (routes, route)=>{
}

const RouteMatcher= (routes, route)=> {
  if(typeof(route) == 'string')
    return stringHandler(routes, route);
  else if (route instanceof Object)
    return recordHandler(routes, route);
  else
    return false;
}

export{ RouteMatcher as default, routeToSegment}