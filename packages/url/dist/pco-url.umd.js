(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.pcoUrl = factory());
}(this, (function () { 'use strict';

var index = (function (env) {
  return function (appName) {
    if (!(env && appName)) return;

    switch (env) {
      case "production":
        return "https://" + appName + ".planningcenteronline.com";
      case "staging":
        return "https://" + appName + "-staging.planningcenteronline.com";
      case "development":
        return "http://" + appName + ".pco.test";
      case "test":
        return "http://" + appName + ".pco.test";
      default:
        return "http://" + appName + ".planningcenteronline.com";
    }
  };
});

return index;

})));
