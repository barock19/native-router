import mockery from 'mockery'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import chaiSinon from "sinon-chai"
import sinon from 'sinon'
var jsdom = require('jsdom')

var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')

var win = doc.defaultView

global.document = doc
global.window = win

chai.use(chaiImmutable)
chai.use(chaiSinon)


global.expect = chai.expect;
global.sinon = sinon