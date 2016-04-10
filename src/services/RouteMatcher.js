import {Map} from "immutable";
import {RouteStack} from "reducers/Navigation";

function routeToSegment(route) {
  let segments = route.split('/').filter( seg => seg != '')
  let patterns = segments.filter(seg => seg.match(/^\:(\w+)/))
  let length = segments.length

  return {segments, patterns,length}
}

const stringPatternHandler = (routes, route)=>{
  let {segments, length} = routeToSegment(route)
  let patternToValueMap = {}

  let foundTarget = routes
    .map( route => { return {route, _segmentInfo: routeToSegment(route.path)} })
    .find( (item) => {
      if(item._segmentInfo.length != length)
        return false;

      if(item.route.path == route)
        return true;

      let ASegments = segments
      let BSegments =  item._segmentInfo.segments
      let BSegmentsPatterns = item._segmentInfo.patterns

      let possiblyFoundedPattern = []
      ASegments.forEach((ASegment, i)=>{
        let BSegment = BSegments[i]
        if(ASegment != BSegment){
          possiblyFoundedPattern.push(BSegment)
          patternToValueMap[BSegment] =  ASegment
        }
      })
      return BSegmentsPatterns.join('-') == possiblyFoundedPattern.join('-')
    })

  if(!foundTarget)
    return false;
  else {
    return Object.assign({}, foundTarget.route, {path: route, params: new Map(patternToValueMap)})
  }
}

const stringHandler = (routes, route)=>{
  let foundTarget = stringPatternHandler(routes, route)
  return foundTarget ?  new RouteStack(foundTarget) : false
}
const recordHandler = (routes, route)=>{
}

export default (routes, route)=> {
  if(typeof(route) == 'string')
    return stringHandler(routes, route);
  else if (route instanceof RouteStack)
    return recordHandler(routes, route);
  else
    return false;
}
