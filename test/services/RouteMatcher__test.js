import React,{Component} from "react";
import {Map} from "immutable";
import RouteMatcher from "services/RouteMatcher"
import {RouteStack} from "reducers/Navigation"

class Home              extends Component{render(){ return null }}
class UserCollection    extends Component{render(){ return null }}
class UserDetail        extends Component{render(){ return null }}
class UserContents      extends Component{render(){ return null }}
class UserContentDetail extends Component{render(){ return null }}

describe.only("Services/RouteMatcher",  () => {
  const sampleRoutes = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/users',
      component: UserCollection
    },
    {
      path: '/users/:id',
      component: UserDetail
    },
    {
      path: '/users/:id/contents',
      component: UserContents,
    },
    {
      path: '/users/:id/contents/:content_id',
      component: UserContentDetail
    }
  ]

  describe("when `route` given as string", () => {
    it("should find the correct route", () => {
      expect(RouteMatcher(sampleRoutes, '/')).to
        .be.eq(new RouteStack({path: '/', component: Home}) )
      expect(RouteMatcher(sampleRoutes, '/users')).to
        .be.eq(new RouteStack({path: '/users', component: UserCollection}) )
    });

    it("should find the route with path pattern", () => {
      expect(RouteMatcher(sampleRoutes, '/users/1/contents/12')).to
        .be.eq(new RouteStack({path: '/users/1/contents/12', component: UserContentDetail, params: new Map({id: '1', content_id: '12'})}) )
    });
  });
});