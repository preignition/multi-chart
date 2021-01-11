import { d as creator, S as Selection, e as array, r as root } from './common/index-eb5ccfed.js';
export { d as creator, m as matcher, n as namespace, f as namespaces, b as selection, s as selector, a as selectorAll, c as style, g as window } from './common/index-eb5ccfed.js';
import { s as select } from './common/select-2cd9107d.js';
export { s as select } from './common/select-2cd9107d.js';
import { s as sourceEvent, p as pointer } from './common/pointer-8013620e.js';
export { p as pointer } from './common/pointer-8013620e.js';

function create(name) {
  return select(creator(name).call(document.documentElement));
}

var nextId = 0;

function local() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};

function pointers(events, node) {
  if (events.target) { // i.e., instanceof Event, not TouchList or iterable
    events = sourceEvent(events);
    if (node === undefined) node = events.currentTarget;
    events = events.touches || [events];
  }
  return Array.from(events, event => pointer(event, node));
}

function selectAll(selector) {
  return typeof selector === "string"
      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
      : new Selection([selector == null ? [] : array(selector)], root);
}

export { create, local, pointers, selectAll };
