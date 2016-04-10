import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import chaiSinon from "sinon-chai"
chai.use(chaiImmutable)
chai.use(chaiSinon)
global.expect = chai.expect;