require('test-helper')
import sinon from "sinon";
import React,{Component} from "react";
import RouteMatcher from "services/RouteMatcher"

class Home              extends Component{render(){ return null }}
class UserCollection    extends Component{render(){ return null }}
class UserDetail        extends Component{render(){ return null }}
class UserContents      extends Component{render(){ return null }}
class UserContentDetail extends Component{render(){ return null }}

describe("Services/RouteMatcher",  () => {
  const sampleRoutes = [
    {
      path: '/',
      component: Home,
      _segmentInfo: {}
    },
    {
      path: '/users',
      component: UserCollection,
      _segmentInfo: {}
    },
    {
      path: '/users/:id',
      component: UserDetail,
      _segmentInfo: {
        segments: ['users', ':id'],
        patterns: [':id'],
        length: 2
      }
    },
    {
      path: '/users/:id/contents',
      component: UserContents,
      _segmentInfo: {
        segments: ['users', ':id', 'contents'],
        patterns: [':id'],
        length: 3
      }
    },
    {
      path: '/users/:id/contents/:content_id',
      component: UserContentDetail,
      _segmentInfo: {
        segments: ['users', ':id', 'contents', ':content_id'],
        patterns: [':id', ':content_id'],
        length: 4
      }
    }
  ]

  describe("when `route` given as string", () => {
    it("should find the correct route", () => {
      expect(RouteMatcher(sampleRoutes, '/')).to
        .be.eql( {path: '/', component: Home} )
      expect(RouteMatcher(sampleRoutes, '/users')).to
        .be.eql( {path: '/users', component: UserCollection})
    });

    it("should find the route with path pattern", () => {
      expect(RouteMatcher(sampleRoutes, '/users/1/contents/12')).to
        .be.eql({path: '/users/1/contents/12', component: UserContentDetail, params: {id: '1', content_id: '12'}})
    });
  });
});