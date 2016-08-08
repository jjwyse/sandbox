import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window)
  .filter(key => !(key in global))
  .forEach(key => global[key] = window[key]);

chai.use(chaiImmutable);
