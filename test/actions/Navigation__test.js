require('test-helper')

import {List, Map} from "immutable"
import sinon from 'sinon'
import * as NavConts from 'constants/Navigation'
import {to, initialize, __RewireAPI__ as NavigationRewire} from "actions/Navigation"

describe("Actions/Navigation", () => {

  describe("#to", () => {
    let RouteMatcherStub
    beforeEach(() => {
      RouteMatcherStub = sinon.stub()
      NavigationRewire.__Rewire__('RouteMatcher', RouteMatcherStub)
    });

    it("should matchs the route", () => {
      const sampleDispatch = sinon.spy()
      const sampleRoutes = List()
      const sampleRoute = '/home'
      const sampleGetState = sinon.stub().returns({Navigation: new Map({routes: List()})})
      const dispatcher = sinon.stub().yields(sampleDispatch, sampleGetState)

      dispatcher(to(sampleRoute))
      expect(RouteMatcherStub).to.be.calledWith(sampleRoutes, sampleRoute)
    });

    it("should dispatch `push` when route found", () => {
      const sampleFoundRoute = Map({path: '/users/10'})
      RouteMatcherStub.returns(sampleFoundRoute)
      const sampleDispatch = sinon.stub()
      const sampleRoutes = List()
      const sampleRoute = '/users/10'
      const sampleGetState = sinon.stub().returns({Navigation: new Map({routes: List()})})
      const dispatcher = sinon.stub().yields(sampleDispatch, sampleGetState)

      dispatcher(to(sampleRoute))
      expect(sampleDispatch).to.have.been.calledWith( sinon.match(
        { type: NavConts.PUSH}))
    });
  });
  describe("#initialize", () => {
    let routeToSegmentStub, sampleDispatch, sampleGetState, dispatcher
    let samplePlainRoutes = [
      {path: '/users/:id'}
    ]

    beforeEach(() => {
      routeToSegmentStub = sinon.stub()
      NavigationRewire.__Rewire__('routeToSegment', routeToSegmentStub)
      sampleDispatch = sinon.stub()
      sampleGetState = sinon.stub().returns({})
      dispatcher = sinon.stub().yields(sampleDispatch, sampleGetState)
    });

    it('should parsed given plain object of routes', ()=>{
      dispatcher(initialize(samplePlainRoutes))
      expect(routeToSegmentStub).to.have.been.calledWith('/users/:id')
    })

    it("should dispatch INIT action including routes with `segments info` and initialroute", () => {
      let segmentInfoDouble = sinon.spy()
      let initialrouteDouble = sinon.spy()
      routeToSegmentStub.returns(segmentInfoDouble)
      NavigationRewire.__Rewire__('createRouteStack', sinon.stub().returns(initialrouteDouble))

      dispatcher(initialize(samplePlainRoutes, '/'))
      expect(sampleDispatch).to
        .have.been.calledWith(sinon.match({type: NavConts.INIT, routes: [{
          path: '/users/:id',
          _segmentInfo: segmentInfoDouble
        }], initialRoute: initialrouteDouble}))
    });
  });
});

