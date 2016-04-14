import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import chaiSinon from "sinon-chai"
import sinon from 'sinon'
var jsdom = require('jsdom')

var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
var win = doc.defaultView
var nav = win.navigator = {};
nav.userAgent = 'NodeJs JsDom';
nav.appVersion = '';

global.document = doc
global.window = win
global.navigator = nav

chai.use(chaiImmutable)
chai.use(chaiSinon)


global.expect = chai.expect;
global.sinon = sinon

require('react-native-mock/mock')