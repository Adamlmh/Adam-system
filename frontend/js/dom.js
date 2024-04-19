//构造函数将document.querySelector=>$.get

function Dom() {}

Dom.prototype = {
  constructor: Dom,
  get: function (selector) {
    var dom = document.querySelector(selector);
    return dom;
  },
};
window.$ = new Dom();
