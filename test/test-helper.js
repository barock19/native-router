import mockery from 'mockery'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import chaiSinon from "sinon-chai"

chai.use(chaiImmutable)
chai.use(chaiSinon)

beforeEach(() => {
  mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false,
    useCleanCache: true
  });
});
afterEach(() => {
  mockery.disable()
});

global.expect = chai.expect;