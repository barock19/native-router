require('test-helper')

import {List, Map} from "immutable"
import mockery from 'mockery'
import sinon from 'sinon'
import * as NavConts from 'constants/Navigation'

describe("Actions/Navigation", () => {
  describe("#to", () => {
    let RouteMatcherStub, to
    beforeEach(() => {
      RouteMatcherStub = sinon.stub()
      mockery.registerMock('services/RouteMatcher', RouteMatcherStub)
      to = require('actions/Navigation').to
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
    let routeToSegmentStub, initialize, sampleDispatch, sampleGetState, dispatcher
    let samplePlainRoutes = [
      {path: '/users/:id'}
    ]

    beforeEach(() => {
      routeToSegmentStub = sinon.stub()
      mockery.registerMock('services/RouteMatcher', {routeToSegment: routeToSegmentStub})
      initialize = require('actions/Navigation').initialize
      sampleDispatch = sinon.stub()
      sampleGetState = sinon.stub().returns({})
      dispatcher = sinon.stub().yields(sampleDispatch, sampleGetState)
    });

    it('should parsed given plain object of routes', ()=>{
      dispatcher(initialize(samplePlainRoutes))
      expect(routeToSegmentStub).to.have.been.calledWith('/users/:id')
    })

    it("should dispatch INIT action including routes with `segments info`", () => {
      let double = sinon.spy()
      routeToSegmentStub.returns(double)
      dispatcher(initialize(samplePlainRoutes))
      expect(sampleDispatch).to
        .have.been.calledWith(sinon.match({type: NavConts.INIT, routes: [{
          path: '/users/:id',
          _segmentInfo: double
        }]}))
    });
  });
});

