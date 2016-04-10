import {List, Map} from "immutable"
import mockery from 'mockery'
import sinon from 'sinon'
import * as NavConts from 'constants/Navigation'

describe("actions/Navigation", () => {
  describe("#to", () => {
    let RouteMatcherStub, to
    before(() => {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
      });

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
});

