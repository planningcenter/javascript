import { Component, createElement } from 'react';
import { get } from 'superagent';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

// typescript implementation of shared lib https://github.com/planningcenter/pco-url
var pcoUrl = function (env) { return function (appName) {
    if (!(env && appName))
        return;
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
}; };

var getJSON = function (url, cb, handleError) {
    if (handleError === void 0) { handleError = function (err) {
        console.warn(err);
    }; }
    return get(url)
        .withCredentials()
        .end(function (err, res) {
        if (err || !res.ok) {
            return handleError(err);
        }
        return cb(res.body);
    });
};

var AppsProvider = /** @class */ (function (_super) {
    __extends(AppsProvider, _super);
    function AppsProvider() {
        var _this = _super.call(this) || this;
        _this.state = {
            apps: []
        };
        return _this;
    }
    AppsProvider.prototype.fetchApps = function () {
        var _this = this;
        getJSON(pcoUrl(this.props.env)("api") + "/people/v2/me/apps", function (res) {
            var apps = res.data;
            return _this.setState({ apps: apps }, function () {
                return window.localStorage.setItem("Topbar:Apps", JSON.stringify(apps));
            });
        });
    };
    AppsProvider.prototype.componentDidMount = function () {
        var apps = JSON.parse(window.localStorage.getItem("Topbar:Apps"));
        if (apps)
            return this.setState({ apps: apps });
        return this.fetchApps();
    };
    AppsProvider.prototype.render = function () {
        return this.props.render(this.state.apps || [], this.fetchApps.bind(this));
    };
    return AppsProvider;
}(Component));

var ConnectedPeopleProvider = /** @class */ (function (_super) {
    __extends(ConnectedPeopleProvider, _super);
    function ConnectedPeopleProvider() {
        var _this = _super.call(this) || this;
        _this.state = {
            connectedPeople: []
        };
        return _this;
    }
    ConnectedPeopleProvider.prototype.fetchConnectedPeople = function () {
        var _this = this;
        getJSON(pcoUrl(this.props.env)("api") + "/people/v2/me/connected_people", function (res) {
            var connectedPeople = res.data;
            return _this.setState({
                connectedPeople: connectedPeople
            }, function () {
                return window.localStorage.setItem("Topbar:ConnectedPeople", JSON.stringify(connectedPeople));
            });
        });
    };
    ConnectedPeopleProvider.prototype.componentDidMount = function () {
        var connectedPeople = JSON.parse(window.localStorage.getItem("Topbar:ConnectedPeople"));
        if (connectedPeople)
            return this.setState({ connectedPeople: connectedPeople });
        return this.fetchConnectedPeople();
    };
    ConnectedPeopleProvider.prototype.render = function () {
        return this.props.render(this.state.connectedPeople || [], this.fetchConnectedPeople.bind(this));
    };
    return ConnectedPeopleProvider;
}(Component));

var debounce = function (func, wait) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (!timeout) {
            func.apply(context, args);
        }
    };
};
var PointBreak = /** @class */ (function (_super) {
    __extends(PointBreak, _super);
    function PointBreak() {
        var _this = _super.call(this) || this;
        _this.state = {
            width: window.innerWidth
        };
        _this.setWindowWidth = _this.setWindowWidth.bind(_this);
        return _this;
    }
    PointBreak.prototype.setWindowWidth = function () {
        this.setState({ width: window.innerWidth });
    };
    PointBreak.prototype.componentDidMount = function () {
        window.addEventListener("resize", debounce(this.setWindowWidth, 100), false);
    };
    PointBreak.prototype.componentDidUnMount = function () {
        window.removeEventListener("resize", debounce(this.setWindowWidth, 100), false);
    };
    PointBreak.prototype.breakpointString = function (width) {
        if (width < 480)
            return "xs";
        if (width < 600)
            return "sm";
        if (width < 720)
            return "md";
        if (width < 960)
            return "lg";
        return "xl";
    };
    PointBreak.prototype.render = function () {
        return this.props.render(this.breakpointString(this.state.width));
    };
    return PointBreak;
}(Component));
var DisplaySwitch = /** @class */ (function (_super) {
    __extends(DisplaySwitch, _super);
    function DisplaySwitch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DisplaySwitch.prototype.render = function () {
        var _this = this;
        return (createElement(PointBreak, { render: function (breakpoint) {
                if (["xs", "sm"].indexOf(breakpoint) !== -1) {
                    return _this.props.smallTopbar(breakpoint);
                }
                return _this.props.notSmallTopbar(breakpoint);
            } }));
    };
    return DisplaySwitch;
}(Component));

var StyledRoot = function (_a) {
    var children = _a.children, style = _a.style, nativeProps = __rest(_a, ["children", "style"]);
    return (createElement("div", __assign({ className: "simple", style: __assign({ height: "48px", display: "flex", position: "relative", alignItems: "center", color: "white", fontFamily: "Lato", WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }, style) }, nativeProps),
        createElement("style", null, "\n      @media only print {\n        .simple {\n          display: none !important;\n        }\n      }\n    "),
        children));
};

var slightBackgroundTransition = {
    transition: "background-color 120ms ease-in"
};
var fontFamily = {
    fontFamily: "\"Lato\", sans-serif"
};
var IEFlex1 = {
    flex: "1 1 auto"
};

var Unbutton = function (_a) {
    var style = _a.style, nativeProps = __rest(_a, ["style"]);
    return (createElement("button", __assign({ style: __assign({ display: "inline-block", cursor: "pointer", backgroundColor: "transparent", border: "none", padding: 0, appearance: "none", WebkitAppearance: "none", outline: 0 }, fontFamily, style) }, nativeProps)));
};

var Avatar = function (_a) {
    var env = _a.env, _b = _a.url, incomingUrl = _b === void 0 ? "" : _b, style = _a.style, nativeProps = __rest(_a, ["env", "url", "style"]);
    var url = incomingUrl || pcoUrl(env)("people") + "/static/no_photo_thumbnail_gray.svg";
    return (createElement("div", __assign({ style: __assign({ backgroundColor: "white", height: "26px", width: "26px", marginLeft: "4px", borderRadius: "50%", backgroundPosition: "center", backgroundSize: "cover", backgroundImage: "url(" + url + ")" }, style) }, nativeProps)));
};

var sortByAttribute = function (attr) { return function (arr) {
    return arr
        .slice()
        .sort(function (a, b) { return a.attributes[attr].localeCompare(b.attributes[attr]); });
}; };
var withoutItemContainingAttributeValue = function (attr) { return function (value) { return function (arr) {
    return arr.reduce(function (acc, item) {
        return (item.attributes[attr] || "") === value ? acc : acc.concat([item]);
    }, []);
}; }; };
var appsMenuFormatter = function (apps, excludedAppName) {
    return withoutItemContainingAttributeValue("name")(excludedAppName)(sortByAttribute("name")(apps));
};
var connectedPeopleMenuFormatter = function (connectedPeople, excludedOrgName) {
    return withoutItemContainingAttributeValue("name")(excludedOrgName)(sortByAttribute("organization_name")(connectedPeople));
};

var MONO_APP_BADGES = {
    accounts: function () { return (createElement("svg", { id: "5a2d2d2c-5acc-417d-bfbe-6345494fb745", "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", width: "122.477", height: "21", viewBox: "0 0 122.477 21", color: "white", style: { display: "block" } },
        createElement("title", null, "accounts--topbar"),
        createElement("path", { d: "M38.3,17.662l-1.408-3.454H30.373l-1.408,3.454H25.511l6.6-15.512h3.125l6.6,15.512ZM33.63,6.22l-2.046,5h4.092ZM47.924,17.927a6.022,6.022,0,0,1-6.138-6.1v-.044a6.055,6.055,0,0,1,6.182-6.139,5.8,5.8,0,0,1,4.709,1.981l-2.046,2.2a3.448,3.448,0,0,0-2.685-1.3,3.013,3.013,0,0,0-2.86,3.212v.044a3.022,3.022,0,0,0,2.992,3.257,3.741,3.741,0,0,0,2.707-1.254l1.958,1.98A5.941,5.941,0,0,1,47.924,17.927Zm11.46,0a6.021,6.021,0,0,1-6.138-6.1v-.044a6.055,6.055,0,0,1,6.182-6.139,5.8,5.8,0,0,1,4.709,1.981l-2.047,2.2a3.445,3.445,0,0,0-2.684-1.3,3.013,3.013,0,0,0-2.86,3.212v.044a3.022,3.022,0,0,0,2.992,3.257,3.741,3.741,0,0,0,2.707-1.254L64.2,15.77A5.941,5.941,0,0,1,59.384,17.927Zm11.68,0a6.13,6.13,0,0,1-6.359-6.1v-.044a6.386,6.386,0,0,1,12.761-.044v.044A6.19,6.19,0,0,1,71.064,17.927Zm3.1-6.14a3.133,3.133,0,0,0-3.1-3.256,3.02,3.02,0,0,0-3.058,3.212v.044a3.133,3.133,0,0,0,3.1,3.257,3.022,3.022,0,0,0,3.058-3.213Zm12.4,5.875V15.99a4.175,4.175,0,0,1-3.455,1.893c-2.53,0-4-1.673-4-4.379V5.869H82.45v6.578c0,1.585.749,2.4,2.024,2.4s2.091-.813,2.091-2.4V5.869H89.91V17.662Zm13.206,0V11.083c0-1.584-.748-2.4-2.024-2.4s-2.09.814-2.09,2.4v6.579H92.312V5.869h3.345V7.541a4.171,4.171,0,0,1,3.454-1.893c2.53,0,4.005,1.673,4.005,4.379v7.635Zm9.53.2c-2.046,0-3.432-.814-3.432-3.542V8.729h-1.408V5.869h1.408V2.854h3.344V5.869h2.772v2.86h-2.772v5.038c0,.771.33,1.145,1.078,1.145a3.4,3.4,0,0,0,1.65-.418v2.684A4.927,4.927,0,0,1,109.3,17.86Zm8.665.023a8.262,8.262,0,0,1-5.06-1.783l1.431-2.2a6.657,6.657,0,0,0,3.717,1.408c.969,0,1.409-.351,1.409-.879v-.044c0-.726-1.144-.968-2.443-1.365-1.649-.484-3.52-1.254-3.52-3.542V9.433c0-2.4,1.936-3.741,4.313-3.741a8.167,8.167,0,0,1,4.4,1.364l-1.277,2.311a6.989,6.989,0,0,0-3.19-1.1c-.815,0-1.233.353-1.233.815v.044c0,.66,1.122.969,2.4,1.408,1.65.55,3.564,1.343,3.564,3.5v.044C122.477,16.694,120.519,17.883,117.966,17.883Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M15,9.888V9.881a.208.208,0,0,0-.146-.178L14.819,9.7h-.008l-.679-.075a1.043,1.043,0,0,1-.662-1.6l.428-.534.01-.015.006-.008.011-.023a.113.113,0,0,0,.01-.023l0-.009a.208.208,0,0,0-.037-.185l-.006-.009-.009-.01L13.2,6.522l-.011-.008-.006-.006a.209.209,0,0,0-.229-.022.161.161,0,0,0-.029.019l-.007,0-.533.427a1.042,1.042,0,0,1-1.6-.661L10.712,5.6a.06.06,0,0,0,0-.019V5.569L10.7,5.545l-.01-.023,0-.008a.207.207,0,0,0-.158-.1H9.512a.208.208,0,0,0-.178.146.141.141,0,0,0-.007.033l0,.008c-.025.226-.049.453-.075.679a1.042,1.042,0,0,1-1.6.661L7.12,6.51A.076.076,0,0,0,7.1,6.5L7.1,6.495l-.022-.012a.086.086,0,0,0-.024-.008l-.009,0a.208.208,0,0,0-.185.037l-.008.007-.011.008-.685.686-.009.011-.005.006a.211.211,0,0,0-.022.23.154.154,0,0,0,.019.029l0,.006c.142.178.284.357.426.534a1.04,1.04,0,0,1-.661,1.6l-.679.075-.018,0-.01,0-.024.008a.2.2,0,0,0-.023.01l-.008,0a.207.207,0,0,0-.1.157v1.015a.208.208,0,0,0,.146.177.112.112,0,0,0,.033.008l.008,0,.679.075a1.04,1.04,0,0,1,.662,1.6l-.428.534-.01.014-.006.008-.011.023a.193.193,0,0,0-.01.023l0,.009a.21.21,0,0,0,.037.186l.006.008.009.011.685.685a.037.037,0,0,0,.011.009l.007,0a.207.207,0,0,0,.229.023l.029-.019.007,0,.533-.427a1.044,1.044,0,0,1,1.6.661q.038.338.076.678a.1.1,0,0,0,0,.019l0,.01a.158.158,0,0,0,.008.023.179.179,0,0,0,.01.024l0,.008a.206.206,0,0,0,.158.1h.009l.014,0H10.5l.015,0h.007a.208.208,0,0,0,.178-.145.186.186,0,0,0,.007-.034l0-.009c.025-.226.05-.453.075-.678a1.04,1.04,0,0,1,1.6-.662c.178.143.356.286.534.427a.073.073,0,0,0,.015.011l.008,0,.022.012a.158.158,0,0,0,.024.01l.009,0a.206.206,0,0,0,.185-.038l.008-.006.011-.009.685-.685.009-.011.005-.007a.209.209,0,0,0,.022-.229.156.156,0,0,0-.019-.029l0-.007c-.142-.178-.285-.355-.426-.534a1.04,1.04,0,0,1,.661-1.6l.679-.075a.085.085,0,0,0,.018,0l.01,0,.024-.008.023-.011.008,0a.207.207,0,0,0,.1-.158V9.888Zm-4.98,2.481A1.981,1.981,0,1,1,12,10.388,1.98,1.98,0,0,1,10.019,12.369Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M17.719,0H2.281A2.281,2.281,0,0,0,0,2.281V17.719A2.281,2.281,0,0,0,2.281,20H17.719A2.281,2.281,0,0,0,20,17.719V2.281A2.281,2.281,0,0,0,17.719,0ZM17,16.6a.4.4,0,0,1-.4.4H3.4a.4.4,0,0,1-.4-.4V3.4A.4.4,0,0,1,3.4,3H6v.539A.461.461,0,0,0,6.461,4h7.078A.461.461,0,0,0,14,3.539V3h2.6a.4.4,0,0,1,.4.4Z", fill: "currentColor", fillRule: "evenodd" }))); },
    "check-ins": function () { return (createElement("svg", { id: "2702695f-673e-4580-9d1b-7c468270c4cc", "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", width: "127.72", height: "21", viewBox: "0 0 127.72 21", color: "white", style: { display: "block" } },
        createElement("title", null, "check-ins--topbar"),
        createElement("path", { d: "M17.719,0H2.281A2.281,2.281,0,0,0,0,2.281V17.719A2.281,2.281,0,0,0,2.281,20H17.719A2.281,2.281,0,0,0,20,17.719V2.281A2.281,2.281,0,0,0,17.719,0ZM17,16.6a.4.4,0,0,1-.4.4H3.4a.4.4,0,0,1-.4-.4V3.4A.4.4,0,0,1,3.4,3H6v.539A.461.461,0,0,0,6.461,4h7.078A.461.461,0,0,0,14,3.539V3h2.6a.4.4,0,0,1,.4.4Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M9.578,13.9a1.2,1.2,0,0,1-1.691,0L5.35,11.369a1.2,1.2,0,0,1,1.691-1.69l1.691,1.69,4.227-4.226a1.2,1.2,0,1,1,1.691,1.69Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M33.676,18.153a7.766,7.766,0,0,1-7.89-7.912V10.2a7.819,7.819,0,0,1,8.021-7.956,7.939,7.939,0,0,1,6.066,2.374L37.72,7.1a5.678,5.678,0,0,0-3.934-1.736,4.558,4.558,0,0,0-4.461,4.791V10.2a4.569,4.569,0,0,0,4.461,4.835,5.555,5.555,0,0,0,4.044-1.8l2.154,2.176A7.865,7.865,0,0,1,33.676,18.153Z", fill: "currentColor" }),
        createElement("path", { d: "M48.888,17.889V11.318c0-1.582-.747-2.4-2.022-2.4s-2.087.813-2.087,2.4v6.571H41.438V1.847h3.341V7.78a4.165,4.165,0,0,1,3.45-1.89c2.527,0,4,1.67,4,4.373v7.626Z", fill: "currentColor" }),
        createElement("path", { d: "M65.455,13.165h-8.2a2.732,2.732,0,0,0,2.879,2.307,3.86,3.86,0,0,0,2.857-1.208l1.912,1.692a6.222,6.222,0,0,1-10.966-3.89v-.044a5.865,5.865,0,0,1,5.824-6.131c3.934,0,5.735,3.055,5.735,6.395v.044C65.5,12.659,65.478,12.857,65.455,13.165ZM59.764,8.571a2.626,2.626,0,0,0-2.55,2.506h5.033A2.526,2.526,0,0,0,59.764,8.571Z", fill: "currentColor" }),
        createElement("path", { d: "M72.814,18.153a6.014,6.014,0,0,1-6.131-6.088v-.044a6.047,6.047,0,0,1,6.175-6.131,5.794,5.794,0,0,1,4.7,1.978l-2.044,2.2a3.44,3.44,0,0,0-2.681-1.3,3.01,3.01,0,0,0-2.857,3.208v.044a3.018,3.018,0,0,0,2.989,3.253,3.732,3.732,0,0,0,2.7-1.253L77.626,16A5.932,5.932,0,0,1,72.814,18.153Z", fill: "currentColor" }),
        createElement("path", { d: "M86.617,17.889l-3.076-4.813-1.165,1.231v3.582H79.035V1.847h3.341V10.4L86.287,6.11h4L85.8,10.747l4.638,7.142Z", fill: "currentColor" }),
        createElement("path", { d: "M90.2,12.681V9.473h6.769v3.208Z", fill: "currentColor" }),
        createElement("path", { d: "M99.8,17.889V2.506h3.385V17.889Z", fill: "currentColor" }),
        createElement("path", { d: "M113.459,17.889V11.318c0-1.582-.747-2.4-2.022-2.4s-2.087.813-2.087,2.4v6.571h-3.341V6.11h3.341V7.78a4.165,4.165,0,0,1,3.45-1.89c2.527,0,4,1.67,4,4.373v7.626Z", fill: "currentColor" }),
        createElement("path", { d: "M123.215,18.109a8.251,8.251,0,0,1-5.054-1.78l1.428-2.2a6.659,6.659,0,0,0,3.714,1.406c.967,0,1.406-.352,1.406-.879v-.044c0-.725-1.143-.967-2.439-1.363-1.648-.484-3.516-1.253-3.516-3.538V9.671c0-2.4,1.934-3.736,4.307-3.736A8.15,8.15,0,0,1,127.455,7.3L126.181,9.6a6.982,6.982,0,0,0-3.187-1.1c-.812,0-1.23.352-1.23.813v.044c0,.659,1.121.967,2.4,1.406,1.647.549,3.56,1.341,3.56,3.494v.044C127.72,16.922,125.763,18.109,123.215,18.109Z", fill: "currentColor" }))); },
    giving: function () { return (createElement("svg", { id: "e8491d87-6e53-49ae-b776-81fc46c63476", "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", width: "91.649", height: "21", viewBox: "0 0 91.649 21", color: "white", style: { display: "block" } },
        createElement("title", null, "giving--topbar"),
        createElement("path", { d: "M17.719,0H2.281A2.281,2.281,0,0,0,0,2.281V17.719A2.281,2.281,0,0,0,2.281,20H17.719A2.281,2.281,0,0,0,20,17.719V2.281A2.281,2.281,0,0,0,17.719,0ZM17,16.6a.4.4,0,0,1-.4.4H3.4a.4.4,0,0,1-.4-.4V3.4A.4.4,0,0,1,3.4,3H6v.539A.461.461,0,0,0,6.461,4h7.078A.461.461,0,0,0,14,3.539V3h2.6a.4.4,0,0,1,.4.4Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M10.241,7.734l-.3.3-.3-.3a2.369,2.369,0,0,0-3.141-.25,2.28,2.28,0,0,0-.175,3.382l.4.4,2.968,2.968a.362.362,0,0,0,.511,0l3.365-3.365a2.28,2.28,0,0,0-.175-3.382A2.369,2.369,0,0,0,10.241,7.734Z", fill: "currentColor" }),
        createElement("path", { d: "M33.874,17.7a7.7,7.7,0,0,1-8.088-7.912V9.748a7.9,7.9,0,0,1,8.065-7.956A8.447,8.447,0,0,1,39.895,3.9L37.764,6.474a5.664,5.664,0,0,0-4.021-1.561A4.621,4.621,0,0,0,29.325,9.7v.044a4.609,4.609,0,0,0,4.659,4.879,5.4,5.4,0,0,0,3.187-.923v-2.2H33.764V8.584h6.681v6.681A9.986,9.986,0,0,1,33.874,17.7Z", fill: "currentColor" }),
        createElement("path", { d: "M42.871,4.364V1.4h3.516V4.364Zm.088,13.076V5.661H46.3V17.44Z", fill: "currentColor" }),
        createElement("path", { d: "M55.148,17.528H52.114L47.477,5.661h3.539l2.637,7.889,2.659-7.889h3.472Z", fill: "currentColor" }),
        createElement("path", { d: "M60.907,4.364V1.4h3.516V4.364ZM61,17.44V5.661h3.34V17.44Z", fill: "currentColor" }),
        createElement("path", { d: "M74.246,17.44V10.869c0-1.582-.747-2.4-2.022-2.4s-2.087.813-2.087,2.4V17.44H66.8V5.661h3.341v1.67a4.165,4.165,0,0,1,3.45-1.89c2.527,0,4,1.67,4,4.373V17.44Z", fill: "currentColor" }),
        createElement("path", { d: "M85.078,21a11.182,11.182,0,0,1-5.208-1.23l1.143-2.506a7.688,7.688,0,0,0,3.978,1.077c2.285,0,3.363-1.1,3.363-3.209v-.571a4.608,4.608,0,0,1-3.846,1.912,5.173,5.173,0,0,1-5.231-5.494v-.044a5.185,5.185,0,0,1,5.231-5.494,4.766,4.766,0,0,1,3.8,1.758V5.661h3.341v9.12C91.649,19.22,89.451,21,85.078,21Zm3.275-10.065a2.872,2.872,0,0,0-5.736,0v.044A2.691,2.691,0,0,0,85.474,13.7a2.722,2.722,0,0,0,2.879-2.725Z", fill: "currentColor" }))); },
    groups: function () { return (createElement("svg", { id: "b2b97e47-a434-4fc5-838c-569572982c1f", "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", width: "101.055", height: "21", viewBox: "0 0 101.055 21", color: "white", style: { display: "block" } },
        createElement("title", null, "groups--topbar"),
        createElement("path", { d: "M33.874,17.911A7.7,7.7,0,0,1,25.786,10V9.956A7.9,7.9,0,0,1,33.852,2a8.447,8.447,0,0,1,6.043,2.11L37.764,6.681a5.664,5.664,0,0,0-4.021-1.561,4.621,4.621,0,0,0-4.417,4.791v.044a4.609,4.609,0,0,0,4.659,4.879,5.4,5.4,0,0,0,3.187-.923v-2.2H33.764V8.791h6.681v6.681A9.986,9.986,0,0,1,33.874,17.911Z", fill: "currentColor" }),
        createElement("path", { d: "M49.859,9.143c-2.22,0-3.583,1.341-3.583,4.154v4.351H42.936V5.868h3.341V8.241a3.639,3.639,0,0,1,3.758-2.593V9.143Z", fill: "currentColor" }),
        createElement("path", { d: "M57.082,17.911a6.122,6.122,0,0,1-6.352-6.088v-.044a6.379,6.379,0,0,1,12.746-.044v.044A6.183,6.183,0,0,1,57.082,17.911Zm3.1-6.132a3.129,3.129,0,0,0-3.1-3.252,3.017,3.017,0,0,0-3.055,3.208v.044a3.13,3.13,0,0,0,3.1,3.253,3.018,3.018,0,0,0,3.054-3.209Z", fill: "currentColor" }),
        createElement("path", { d: "M72.564,17.647v-1.67a4.169,4.169,0,0,1-3.451,1.89c-2.527,0-4-1.67-4-4.374V5.868h3.34v6.571c0,1.583.748,2.4,2.022,2.4s2.088-.813,2.088-2.4V5.868H75.9V17.647Z", fill: "currentColor" }),
        createElement("path", { d: "M85.314,17.867a4.523,4.523,0,0,1-3.669-1.758v5.054H78.3V5.868h3.341V7.56a4.324,4.324,0,0,1,3.669-1.912c2.748,0,5.363,2.154,5.363,6.087v.044C90.676,15.714,88.105,17.867,85.314,17.867Zm2.022-6.132a2.89,2.89,0,1,0-5.735,0v.044a2.89,2.89,0,1,0,5.735,0Z", fill: "currentColor" }),
        createElement("path", { d: "M96.55,17.867a8.253,8.253,0,0,1-5.054-1.78l1.429-2.2A6.656,6.656,0,0,0,96.638,15.3c.968,0,1.406-.352,1.406-.879v-.044c0-.725-1.142-.967-2.439-1.363-1.647-.484-3.516-1.253-3.516-3.538V9.428c0-2.4,1.934-3.736,4.308-3.736a8.15,8.15,0,0,1,4.395,1.363L99.517,9.362a6.982,6.982,0,0,0-3.187-1.1c-.813,0-1.231.352-1.231.813v.044c0,.659,1.121.967,2.4,1.406,1.648.549,3.56,1.341,3.56,3.494v.044C101.055,16.68,99.1,17.867,96.55,17.867Z", fill: "currentColor" }),
        createElement("path", { d: "M17.719,0H2.281A2.281,2.281,0,0,0,0,2.281V17.719A2.281,2.281,0,0,0,2.281,20H17.719A2.281,2.281,0,0,0,20,17.719V2.281A2.281,2.281,0,0,0,17.719,0ZM17,16.6a.4.4,0,0,1-.4.4H3.4a.4.4,0,0,1-.4-.4V3.4A.4.4,0,0,1,3.4,3H6v.539A.461.461,0,0,0,6.461,4h7.078A.461.461,0,0,0,14,3.539V3h2.6a.4.4,0,0,1,.4.4Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M13.4,11.2V9.3a1.7,1.7,0,1,0-2.163-2.163H8.763A1.7,1.7,0,1,0,6.6,9.3V11.2a1.7,1.7,0,1,0,2.163,2.163h2.475A1.7,1.7,0,1,0,13.4,11.2Zm-2.163,1.029H8.763A1.694,1.694,0,0,0,7.733,11.2V9.3A1.694,1.694,0,0,0,8.763,8.267h2.475A1.694,1.694,0,0,0,12.267,9.3V11.2A1.694,1.694,0,0,0,11.237,12.233Z", fill: "currentColor", fillRule: "evenodd" }))); },
    people: function () { return (createElement("svg", { id: "0ebf6372-22ef-488d-b994-0eaae8fe044c", "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", width: "97.078", height: "21", viewBox: "0 0 97.078 21", color: "white", style: { display: "block" } },
        createElement("title", null, "people--topbar"),
        createElement("path", { d: "M17.719,0H2.281A2.281,2.281,0,0,0,0,2.281V17.719A2.281,2.281,0,0,0,2.281,20H17.719A2.281,2.281,0,0,0,20,17.719V2.281A2.281,2.281,0,0,0,17.719,0ZM17,16.6a.4.4,0,0,1-.4.4H3.4a.4.4,0,0,1-.4-.4V3.4A.4.4,0,0,1,3.4,3H6v.539A.461.461,0,0,0,6.461,4h7.078A.461.461,0,0,0,14,3.539V3h2.6a.4.4,0,0,1,.4.4Z", fill: "currentcolor", fillRule: "evenodd" }),
        createElement("circle", { cx: "12.749", cy: "8.733", r: "1.52", fill: "currentColor" }),
        createElement("circle", { cx: "8.091", cy: "8.027", r: "2.027", fill: "currentColor" }),
        createElement("path", { d: "M6.849,10.872H9.314a1.849,1.849,0,0,1,1.849,1.849V14.57a0,0,0,0,1,0,0H5a0,0,0,0,1,0,0V12.721A1.849,1.849,0,0,1,6.849,10.872Z", fill: "currentColor" }),
        createElement("path", { d: "M13.752,10.872H12.273a1.107,1.107,0,0,0-.911.478,2.45,2.45,0,0,1,.418,1.371v.616h3.082V11.981A1.109,1.109,0,0,0,13.752,10.872Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M31.742,12.869H29.171v4.615H25.786V2.1h6.285c3.67,0,5.889,2.176,5.889,5.318v.044C37.961,11.023,35.192,12.869,31.742,12.869Zm2.791-5.384c0-1.517-1.054-2.33-2.747-2.33H29.171v4.7h2.68a2.382,2.382,0,0,0,2.681-2.329Z", fill: "currentColor" }),
        createElement("path", { d: "M50.286,12.759h-8.2a2.731,2.731,0,0,0,2.878,2.307,3.86,3.86,0,0,0,2.857-1.208l1.913,1.692a5.894,5.894,0,0,1-4.813,2.2A5.891,5.891,0,0,1,38.77,11.66v-.044a5.864,5.864,0,0,1,5.823-6.131c3.934,0,5.736,3.055,5.736,6.395v.044C50.329,12.253,50.307,12.451,50.286,12.759ZM44.593,8.166a2.625,2.625,0,0,0-2.549,2.506h5.032A2.526,2.526,0,0,0,44.593,8.166Z", fill: "currentColor" }),
        createElement("path", { d: "M57.806,17.748a6.122,6.122,0,0,1-6.351-6.088v-.044A6.379,6.379,0,0,1,64.2,11.572v.044A6.183,6.183,0,0,1,57.806,17.748Zm3.1-6.132a3.129,3.129,0,0,0-3.1-3.252,3.018,3.018,0,0,0-3.055,3.208v.044a3.13,3.13,0,0,0,3.1,3.253A3.018,3.018,0,0,0,60.9,11.66Z", fill: "currentColor" }),
        createElement("path", { d: "M72.978,17.7a4.525,4.525,0,0,1-3.67-1.758V21H65.967V5.7h3.341V7.4a4.327,4.327,0,0,1,3.67-1.912c2.747,0,5.362,2.154,5.362,6.087v.044C78.34,15.55,75.769,17.7,72.978,17.7ZM75,11.572a2.891,2.891,0,1,0-5.736,0v.044a2.891,2.891,0,1,0,5.736,0Z", fill: "currentColor" }),
        createElement("path", { d: "M80.305,17.484V1.441h3.34V17.484Z", fill: "currentColor" }),
        createElement("path", { d: "M97.034,12.759h-8.2a2.732,2.732,0,0,0,2.879,2.307,3.86,3.86,0,0,0,2.857-1.208l1.912,1.692a6.222,6.222,0,0,1-10.966-3.89v-.044a5.865,5.865,0,0,1,5.824-6.131c3.934,0,5.735,3.055,5.735,6.395v.044C97.078,12.253,97.056,12.451,97.034,12.759ZM91.343,8.166a2.626,2.626,0,0,0-2.55,2.506h5.033A2.526,2.526,0,0,0,91.343,8.166Z", fill: "currentColor" }))); },
    registrations: function () { return (createElement("svg", { id: "0d492916-4234-426c-b1fd-efdbdeb6fdfc", "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", width: "162", height: "21", viewBox: "0 0 162 21", color: "white", style: { display: "block" } },
        createElement("title", null, "registrations--topbar"),
        createElement("path", { d: "M17.719,0H2.281A2.281,2.281,0,0,0,0,2.281V17.719A2.281,2.281,0,0,0,2.281,20H17.719A2.281,2.281,0,0,0,20,17.719V2.281A2.281,2.281,0,0,0,17.719,0ZM17,16.6a.4.4,0,0,1-.4.4H3.4a.4.4,0,0,1-.4-.4V3.4A.4.4,0,0,1,3.4,3H6v.539A.461.461,0,0,0,6.461,4h7.078A.461.461,0,0,0,14,3.539V3h2.6a.4.4,0,0,1,.4.4Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("polygon", { points: "14.101 7.306 11.929 5.339 10.484 6.917 12.64 8.911 14.101 7.306", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M10.035,7.407l-4.2,4.584a1.645,1.645,0,0,0-.326.7l-.292,2.162,2.126-.468A1.62,1.62,0,0,0,8.008,14l4.184-4.6Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("polygon", { points: "9.216 14.986 15 14.986 15 12.87 10.333 12.87 9.216 14.986", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M35.1,17.44l-3.3-4.923H29.146V17.44H25.761V2.056h7.032c3.626,0,5.8,1.912,5.8,5.077v.044a4.776,4.776,0,0,1-3.3,4.769l3.758,5.494Zm.065-10.131c0-1.45-1.01-2.2-2.659-2.2H29.146V9.528h3.428c1.647,0,2.593-.878,2.593-2.175Z", fill: "currentColor" }),
        createElement("path", { d: "M50.821,12.715h-8.2A2.732,2.732,0,0,0,45.5,15.023a3.859,3.859,0,0,0,2.857-1.209l1.913,1.693a5.894,5.894,0,0,1-4.813,2.2,5.891,5.891,0,0,1-6.153-6.087v-.044a5.864,5.864,0,0,1,5.823-6.131c3.934,0,5.736,3.055,5.736,6.394v.045C50.865,12.21,50.843,12.407,50.821,12.715ZM45.129,8.121a2.626,2.626,0,0,0-2.549,2.507h5.032A2.526,2.526,0,0,0,45.129,8.121Z", fill: "currentColor" }),
        createElement("path", { d: "M57.871,21a11.17,11.17,0,0,1-5.208-1.231l1.143-2.5a7.692,7.692,0,0,0,3.978,1.077c2.285,0,3.363-1.1,3.363-3.209v-.572A4.607,4.607,0,0,1,57.3,16.472a5.173,5.173,0,0,1-5.231-5.493v-.045A5.185,5.185,0,0,1,57.3,5.441,4.765,4.765,0,0,1,61.1,7.2V5.661h3.341v9.12C64.442,19.22,62.245,21,57.871,21Zm3.275-10.066a2.872,2.872,0,0,0-5.736,0v.045A2.691,2.691,0,0,0,58.267,13.7a2.723,2.723,0,0,0,2.879-2.725Z", fill: "currentColor" }),
        createElement("path", { d: "M66.829,4.364V1.4h3.516V4.364Zm.088,13.076V5.661h3.341V17.44Z", fill: "currentColor" }),
        createElement("path", { d: "M76.816,17.66a8.251,8.251,0,0,1-5.054-1.781l1.429-2.2A6.653,6.653,0,0,0,76.9,15.088c.968,0,1.406-.352,1.406-.879v-.044c0-.725-1.142-.967-2.439-1.363-1.647-.484-3.516-1.252-3.516-3.539V9.221c0-2.4,1.934-3.737,4.308-3.737a8.15,8.15,0,0,1,4.395,1.363L79.783,9.155a6.984,6.984,0,0,0-3.187-1.1c-.813,0-1.231.352-1.231.813v.044c0,.659,1.121.968,2.4,1.406,1.648.549,3.56,1.34,3.56,3.494v.045C81.321,16.472,79.365,17.66,76.816,17.66Z", fill: "currentColor" }),
        createElement("path", { d: "M86.965,17.638c-2.043,0-3.428-.813-3.428-3.538V8.517H82.13V5.661h1.406V2.649h3.341V5.661h2.769V8.517H86.877V13.55c0,.769.33,1.143,1.077,1.143a3.4,3.4,0,0,0,1.648-.417v2.68A4.927,4.927,0,0,1,86.965,17.638Z", fill: "currentColor" }),
        createElement("path", { d: "M98.536,8.935c-2.219,0-3.582,1.341-3.582,4.154V17.44H91.614V5.661h3.341V8.033a3.638,3.638,0,0,1,3.757-2.593V8.935Z", fill: "currentColor" }),
        createElement("path", { d: "M106.647,17.44V16.165a4.53,4.53,0,0,1-3.56,1.5c-2.22,0-4.044-1.276-4.044-3.6v-.044c0-2.571,1.956-3.758,4.747-3.758a8.366,8.366,0,0,1,2.878.484v-.2c0-1.384-.857-2.154-2.527-2.154a8.68,8.68,0,0,0-3.253.637l-.835-2.549a10.392,10.392,0,0,1,4.572-.945c3.648,0,5.252,1.89,5.252,5.077V17.44Zm.065-4.746a5.17,5.17,0,0,0-2.131-.441c-1.429,0-2.308.572-2.308,1.627v.044c0,.9.747,1.429,1.824,1.429,1.561,0,2.615-.857,2.615-2.066Z", fill: "currentColor" }),
        createElement("path", { d: "M115.991,17.638c-2.043,0-3.428-.813-3.428-3.538V8.517h-1.406V5.661h1.406V2.649H115.9V5.661h2.769V8.517H115.9V13.55c0,.769.33,1.143,1.077,1.143a3.4,3.4,0,0,0,1.648-.417v2.68A4.927,4.927,0,0,1,115.991,17.638Z", fill: "currentColor" }),
        createElement("path", { d: "M120.58,4.364V1.4H124.1V4.364Zm.089,13.076V5.661h3.34V17.44Z", fill: "currentColor" }),
        createElement("path", { d: "M132.128,17.7a6.122,6.122,0,0,1-6.352-6.087v-.044a6.379,6.379,0,0,1,12.746-.044v.044A6.182,6.182,0,0,1,132.128,17.7Zm3.1-6.131a3.129,3.129,0,0,0-3.1-3.252,3.017,3.017,0,0,0-3.055,3.208v.044a3.13,3.13,0,0,0,3.1,3.253,3.018,3.018,0,0,0,3.054-3.209Z", fill: "currentColor" }),
        createElement("path", { d: "M147.739,17.44V10.869c0-1.582-.747-2.395-2.021-2.395s-2.088.812-2.088,2.395V17.44h-3.341V5.661h3.341v1.67a4.169,4.169,0,0,1,3.451-1.89c2.527,0,4,1.67,4,4.374V17.44Z", fill: "currentColor" }),
        createElement("path", { d: "M157.495,17.66a8.251,8.251,0,0,1-5.054-1.781l1.429-2.2a6.653,6.653,0,0,0,3.713,1.406c.968,0,1.406-.352,1.406-.879v-.044c0-.725-1.142-.967-2.439-1.363-1.647-.484-3.516-1.252-3.516-3.539V9.221c0-2.4,1.934-3.737,4.308-3.737a8.15,8.15,0,0,1,4.395,1.363l-1.275,2.308a6.984,6.984,0,0,0-3.187-1.1c-.813,0-1.231.352-1.231.813v.044c0,.659,1.121.968,2.4,1.406,1.648.549,3.56,1.34,3.56,3.494v.045C162,16.472,160.044,17.66,157.495,17.66Z", fill: "currentColor" }))); },
    resources: function () { return (createElement("svg", { id: "3b69fc0b-0df5-4f8c-bd59-5d94701ab9ac", "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", width: "131.586", height: "21", viewBox: "0 0 131.586 21", color: "white", style: { display: "block" } },
        createElement("title", null, "resources--topbar"),
        createElement("path", { d: "M17.719,0H2.281A2.281,2.281,0,0,0,0,2.281V17.719A2.281,2.281,0,0,0,2.281,20H17.719A2.281,2.281,0,0,0,20,17.719V2.281A2.281,2.281,0,0,0,17.719,0ZM17,16.6a.4.4,0,0,1-.4.4H3.4a.4.4,0,0,1-.4-.4V3.4A.4.4,0,0,1,3.4,3H6v.539A.461.461,0,0,0,6.461,4h7.078A.461.461,0,0,0,14,3.539V3h2.6a.4.4,0,0,1,.4.4Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M9.313,6.319A.316.316,0,0,0,9,6H5.209a.316.316,0,0,0-.313.319V9.681A.316.316,0,0,0,5.209,10H9a.316.316,0,0,0,.313-.319Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M15,6.319A.316.316,0,0,0,14.687,6H10.893a.316.316,0,0,0-.313.319V9.681a.316.316,0,0,0,.313.319h3.794A.316.316,0,0,0,15,9.681Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M9.313,11.319A.316.316,0,0,0,9,11H5.209a.316.316,0,0,0-.313.319v3.363A.316.316,0,0,0,5.209,15H9a.316.316,0,0,0,.313-.319Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M15,11.319A.316.316,0,0,0,14.687,11H10.893a.316.316,0,0,0-.313.319v3.363a.316.316,0,0,0,.313.319h3.794A.316.316,0,0,0,15,14.681Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M35.126,17.383l-3.3-4.923H29.171v4.923H25.786V2h7.032c3.626,0,5.8,1.912,5.8,5.077v.044a4.776,4.776,0,0,1-3.3,4.769l3.758,5.494Zm.065-10.131c0-1.45-1.01-2.2-2.659-2.2H29.171V9.471H32.6c1.647,0,2.593-.878,2.593-2.175Z", fill: "currentColor" }),
        createElement("path", { d: "M51.419,12.659h-8.2A2.732,2.732,0,0,0,46.1,14.967a3.859,3.859,0,0,0,2.857-1.209L50.87,15.45a5.894,5.894,0,0,1-4.813,2.2A5.891,5.891,0,0,1,39.9,11.56v-.044a5.864,5.864,0,0,1,5.823-6.131c3.934,0,5.736,3.055,5.736,6.394v.045C51.463,12.154,51.44,12.351,51.419,12.659ZM45.727,8.065a2.626,2.626,0,0,0-2.549,2.507H48.21A2.526,2.526,0,0,0,45.727,8.065Z", fill: "currentColor" }),
        createElement("path", { d: "M57.285,17.6a8.249,8.249,0,0,1-5.054-1.781l1.428-2.2a6.655,6.655,0,0,0,3.714,1.406c.967,0,1.406-.352,1.406-.879v-.044c0-.725-1.143-.967-2.439-1.363-1.648-.484-3.516-1.252-3.516-3.539V9.165c0-2.4,1.934-3.737,4.307-3.737a8.15,8.15,0,0,1,4.395,1.363L60.251,9.1A6.984,6.984,0,0,0,57.064,8c-.812,0-1.23.352-1.23.813v.044c0,.659,1.121.968,2.4,1.406,1.647.549,3.56,1.34,3.56,3.494V13.8C61.79,16.416,59.833,17.6,57.285,17.6Z", fill: "currentColor" }),
        createElement("path", { d: "M69.153,17.647A6.122,6.122,0,0,1,62.8,11.56v-.044a6.379,6.379,0,0,1,12.746-.044v.044A6.182,6.182,0,0,1,69.153,17.647Zm3.1-6.131a3.129,3.129,0,0,0-3.1-3.252A3.017,3.017,0,0,0,66.1,11.472v.044a3.13,3.13,0,0,0,3.1,3.253,3.018,3.018,0,0,0,3.054-3.209Z", fill: "currentColor" }),
        createElement("path", { d: "M84.635,17.383v-1.67a4.169,4.169,0,0,1-3.451,1.89c-2.527,0-4-1.671-4-4.374V5.6h3.34v6.57c0,1.582.748,2.4,2.022,2.4s2.088-.813,2.088-2.4V5.6h3.341V17.383Z", fill: "currentColor" }),
        createElement("path", { d: "M97.3,8.878c-2.219,0-3.582,1.341-3.582,4.154v4.351H90.375V5.6h3.341V7.977a3.638,3.638,0,0,1,3.757-2.593V8.878Z", fill: "currentColor" }),
        createElement("path", { d: "M104.313,17.647a6.015,6.015,0,0,1-6.131-6.087v-.044a6.047,6.047,0,0,1,6.175-6.131,5.791,5.791,0,0,1,4.7,1.978l-2.043,2.2a3.442,3.442,0,0,0-2.681-1.3,3.009,3.009,0,0,0-2.857,3.208v.044a3.018,3.018,0,0,0,2.989,3.253,3.729,3.729,0,0,0,2.7-1.253l1.957,1.978A5.934,5.934,0,0,1,104.313,17.647Z", fill: "currentColor" }),
        createElement("path", { d: "M121.215,12.659h-8.2a2.733,2.733,0,0,0,2.879,2.308,3.859,3.859,0,0,0,2.857-1.209l1.912,1.693A6.223,6.223,0,0,1,109.7,11.56v-.044a5.865,5.865,0,0,1,5.824-6.131c3.934,0,5.735,3.055,5.735,6.394v.045C121.259,12.154,121.237,12.351,121.215,12.659Zm-5.691-4.594a2.626,2.626,0,0,0-2.55,2.507h5.033A2.527,2.527,0,0,0,115.524,8.065Z", fill: "currentColor" }),
        createElement("path", { d: "M127.081,17.6a8.251,8.251,0,0,1-5.054-1.781l1.429-2.2a6.653,6.653,0,0,0,3.713,1.406c.968,0,1.406-.352,1.406-.879v-.044c0-.725-1.142-.967-2.439-1.363-1.647-.484-3.516-1.252-3.516-3.539V9.165c0-2.4,1.934-3.737,4.308-3.737a8.15,8.15,0,0,1,4.395,1.363L130.048,9.1A6.984,6.984,0,0,0,126.861,8c-.813,0-1.231.352-1.231.813v.044c0,.659,1.121.968,2.4,1.406,1.648.549,3.56,1.34,3.56,3.494V13.8C131.586,16.416,129.63,17.6,127.081,17.6Z", fill: "currentColor" }))); },
    services: function () { return (createElement("svg", { id: "a41b0b57-85cd-4dd0-9642-6a728297fe41", "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", width: "113.692", height: "21", viewBox: "0 0 113.692 21", color: "white", style: { display: "block" } },
        createElement("title", null, "services--topbar"),
        createElement("path", { d: "M17.719,0H2.281A2.281,2.281,0,0,0,0,2.281V17.719A2.281,2.281,0,0,0,2.281,20H17.719A2.281,2.281,0,0,0,20,17.719V2.281A2.281,2.281,0,0,0,17.719,0ZM17,16.6a.4.4,0,0,1-.4.4H3.4a.4.4,0,0,1-.4-.4V3.4A.4.4,0,0,1,3.4,3H6v.539A.461.461,0,0,0,6.461,4h7.078A.461.461,0,0,0,14,3.539V3h2.6a.4.4,0,0,1,.4.4Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M15,6.311A.3.3,0,0,0,14.724,6H5.276A.3.3,0,0,0,5,6.311V7.939a.3.3,0,0,0,.276.311h9.448A.3.3,0,0,0,15,7.939Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M15,9.686a.3.3,0,0,0-.276-.311H5.276A.3.3,0,0,0,5,9.686v1.629a.3.3,0,0,0,.276.311h9.448A.3.3,0,0,0,15,11.314Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M15,13.061a.3.3,0,0,0-.276-.311H5.276A.3.3,0,0,0,5,13.061v1.629A.3.3,0,0,0,5.276,15h9.448A.3.3,0,0,0,15,14.689Z", fill: "currentColor", fillRule: "evenodd" }),
        createElement("path", { d: "M56.071,8.6V5.983H52.623V18.146h3.449V13.815c0-2.807,1.322-4.181,3.479-4.271V5.929A3.764,3.764,0,0,0,56.071,8.6Zm10.39,5.534L63.739,5.983H60.086l4.788,12.253H68L72.792,5.983H69.207ZM45.07,5.757a6.055,6.055,0,0,0-6.013,6.33v.046a6.083,6.083,0,0,0,6.353,6.285,6.083,6.083,0,0,0,4.969-2.27L48.405,14.4a3.986,3.986,0,0,1-2.95,1.248,2.821,2.821,0,0,1-2.973-2.382h8.463c.023-.318.045-.522.045-.862v-.046C50.992,8.911,49.132,5.757,45.07,5.757Zm-2.632,5.354c.272-1.565,1.2-2.586,2.632-2.586a2.607,2.607,0,0,1,2.564,2.586ZM33.319,8.639c-2.745-.7-3.426-1.044-3.426-2.088V6.506c0-.771.7-1.385,2.042-1.385a7.454,7.454,0,0,1,4.129,1.566L37.88,4.055a9.2,9.2,0,0,0-5.9-2.019c-3.245,0-5.559,1.905-5.559,4.787v.046c0,3.153,2.065,4.038,5.264,4.855,2.655.681,3.2,1.134,3.2,2.02v.045c0,.931-.862,1.5-2.292,1.5a7.285,7.285,0,0,1-4.742-1.928l-2.065,2.473a10.1,10.1,0,0,0,6.739,2.541c3.426,0,5.832-1.77,5.832-4.924V13.4C38.357,10.635,36.541,9.478,33.319,8.639Zm40.7,9.507h3.449V5.983H74.014Zm36-7.352c-1.316-.454-2.473-.771-2.473-1.452V9.3c0-.477.431-.84,1.271-.84a7.2,7.2,0,0,1,3.29,1.135l1.316-2.383A8.417,8.417,0,0,0,108.882,5.8c-2.451,0-4.447,1.385-4.447,3.857v.046c0,2.359,1.929,3.153,3.63,3.653,1.338.408,2.519.657,2.519,1.406v.046c0,.544-.454.907-1.452.907a6.874,6.874,0,0,1-3.834-1.452l-1.475,2.269a8.52,8.52,0,0,0,5.219,1.838c2.632,0,4.651-1.225,4.651-3.925V14.4C113.692,12.178,111.717,11.361,110.016,10.794ZM97.222,5.757a6.055,6.055,0,0,0-6.013,6.33v.046a6.424,6.424,0,0,0,11.322,4.016L100.557,14.4a3.986,3.986,0,0,1-2.95,1.248,2.821,2.821,0,0,1-2.973-2.382H103.1c.023-.318.045-.522.045-.862v-.046C103.144,8.911,101.283,5.757,97.222,5.757ZM94.59,11.111c.272-1.565,1.2-2.586,2.632-2.586a2.607,2.607,0,0,1,2.564,2.586ZM73.924,4.646h3.63V1.582h-3.63Zm11.752,10.8a3.116,3.116,0,0,1-3.086-3.358v-.045a3.107,3.107,0,0,1,2.95-3.313,3.551,3.551,0,0,1,2.768,1.339l2.11-2.27a5.98,5.98,0,0,0-4.856-2.042,6.244,6.244,0,0,0-6.375,6.33v.046a6.21,6.21,0,0,0,6.33,6.285,6.125,6.125,0,0,0,4.969-2.224l-2.02-2.042A3.852,3.852,0,0,1,85.675,15.445Z", fill: "currentColor" }))); }
};

// TODO: #refactor-all-icons-to-32px-base
// These should be at a 32px base, like the icons.
// I don't have time right now to correct that.
var MONO_APP_NAME = {
    accounts: function (_a) {
        var _b = _a.color, color = _b === void 0 ? "#000" : _b;
        return (createElement("svg", { width: "96.966", height: "21", viewBox: "0 0 96.966 21", style: { display: "block" } },
            createElement("title", null, "accounts--text"),
            createElement("path", { d: "M36.734,13.79l1.958,1.98a5.941,5.941,0,0,1-4.819,2.157,6.021,6.021,0,0,1-6.138-6.1v-.044a6.055,6.055,0,0,1,6.182-6.139,5.8,5.8,0,0,1,4.709,1.981l-2.047,2.2a3.445,3.445,0,0,0-2.684-1.3,3.013,3.013,0,0,0-2.86,3.212v.044a3.022,3.022,0,0,0,2.992,3.257A3.741,3.741,0,0,0,36.734,13.79ZM9.725,2.15l6.6,15.512H12.784l-1.408-3.454H4.862L3.454,17.662H0L6.6,2.15Zm.44,9.066-2.046-5-2.046,5Zm12.4,3.828a3.022,3.022,0,0,1-2.992-3.257v-.044a3.013,3.013,0,0,1,2.86-3.212,3.448,3.448,0,0,1,2.685,1.3l2.046-2.2a5.8,5.8,0,0,0-4.709-1.981,6.055,6.055,0,0,0-6.182,6.139v.044a6.022,6.022,0,0,0,6.138,6.1,5.941,5.941,0,0,0,4.819-2.157l-1.958-1.98A3.741,3.741,0,0,1,22.567,15.044ZM93.4,10.533c-1.277-.439-2.4-.748-2.4-1.408V9.081c0-.462.418-.815,1.233-.815a6.99,6.99,0,0,1,3.19,1.1L96.7,7.056a8.167,8.167,0,0,0-4.4-1.364c-2.377,0-4.313,1.343-4.313,3.741v.044c0,2.288,1.871,3.058,3.52,3.542,1.3.4,2.443.639,2.443,1.365v.044c0,.528-.44.879-1.409.879A6.657,6.657,0,0,1,88.826,13.9L87.4,16.1a8.262,8.262,0,0,0,5.06,1.783c2.553,0,4.511-1.189,4.511-3.807v-.044C96.966,11.876,95.052,11.083,93.4,10.533Zm-41.447,1.21v.044a6.386,6.386,0,0,1-12.761.044v-.044a6.386,6.386,0,0,1,12.761-.044Zm-3.3.044a3.133,3.133,0,0,0-3.1-3.256,3.02,3.02,0,0,0-3.058,3.212v.044a3.133,3.133,0,0,0,3.1,3.257,3.022,3.022,0,0,0,3.058-3.213ZM73.6,5.648a4.171,4.171,0,0,0-3.454,1.893V5.869H66.8V17.662h3.345V11.083c0-1.584.813-2.4,2.09-2.4s2.024.814,2.024,2.4v6.579h3.345V10.027C77.605,7.321,76.13,5.648,73.6,5.648ZM83.7,2.854H80.358V5.869H78.95v2.86h1.408v5.589c0,2.728,1.386,3.542,3.432,3.542a4.927,4.927,0,0,0,2.64-.682V14.494a3.4,3.4,0,0,1-1.65.418c-.748,0-1.078-.374-1.078-1.145V8.729h2.772V5.869H83.7ZM61.054,12.447c0,1.585-.814,2.4-2.091,2.4s-2.024-.813-2.024-2.4V5.869H53.6V13.5c0,2.706,1.474,4.379,4,4.379a4.175,4.175,0,0,0,3.455-1.893v1.672H64.4V5.869H61.054Z", fill: color })));
    },
    "check-ins": function (_a) {
        var _b = _a.color, color = _b === void 0 ? "#000" : _b;
        return (createElement("svg", { width: "101.933", height: "21", viewBox: "0 0 101.933 21", style: { display: "block" } },
            createElement("title", null, "check-ins--text"),
            createElement("path", { d: "M12.044,13.231,14.2,15.406A7.865,7.865,0,0,1,7.89,18.153,7.766,7.766,0,0,1,0,10.242V10.2A7.819,7.819,0,0,1,8.021,2.242a7.939,7.939,0,0,1,6.066,2.374L11.934,7.1A5.678,5.678,0,0,0,8,5.363a4.558,4.558,0,0,0-4.461,4.791V10.2A4.569,4.569,0,0,0,8,15.033,5.555,5.555,0,0,0,12.044,13.231Zm10.4-7.34a4.165,4.165,0,0,0-3.45,1.89V1.847H15.652V17.889h3.341V11.318c0-1.582.813-2.4,2.087-2.4s2.022.813,2.022,2.4v6.571h3.341V10.264C26.442,7.561,24.969,5.891,22.442,5.891Zm17.271,6.4v.044c0,.33-.021.528-.044.835h-8.2a2.732,2.732,0,0,0,2.879,2.307,3.86,3.86,0,0,0,2.857-1.208l1.912,1.692a5.892,5.892,0,0,1-4.812,2.2,5.892,5.892,0,0,1-6.154-6.088v-.044a5.865,5.865,0,0,1,5.824-6.131C37.911,5.891,39.713,8.945,39.713,12.286Zm-3.252-1.208a2.526,2.526,0,0,0-2.483-2.506,2.626,2.626,0,0,0-2.55,2.506Zm10.719,4.2a3.018,3.018,0,0,1-2.989-3.253v-.044a3.01,3.01,0,0,1,2.857-3.208,3.44,3.44,0,0,1,2.681,1.3l2.044-2.2a5.794,5.794,0,0,0-4.7-1.978A6.047,6.047,0,0,0,40.9,12.022v.044a6.014,6.014,0,0,0,6.131,6.088A5.932,5.932,0,0,0,51.84,16l-1.956-1.978A3.732,3.732,0,0,1,47.18,15.275ZM64.5,6.11h-4L56.59,10.4V1.847H53.249V17.889H56.59V14.307l1.165-1.231,3.076,4.813h3.824l-4.638-7.142Zm-.088,6.571h6.769V9.473H64.413Zm9.6,5.208H77.4V2.506H74.016Zm13-12a4.165,4.165,0,0,0-3.45,1.89V6.11H80.223V17.889h3.341V11.318c0-1.582.813-2.4,2.087-2.4s2.022.813,2.022,2.4v6.571h3.341V10.264C91.013,7.561,89.54,5.891,87.013,5.891Zm11.36,4.879c-1.275-.439-2.4-.747-2.4-1.406V9.319c0-.462.417-.813,1.23-.813a6.982,6.982,0,0,1,3.187,1.1L101.669,7.3a8.15,8.15,0,0,0-4.4-1.363c-2.373,0-4.307,1.341-4.307,3.736v.044c0,2.285,1.868,3.054,3.516,3.538,1.3.4,2.439.637,2.439,1.363v.044c0,.527-.44.879-1.406.879A6.659,6.659,0,0,1,93.8,14.131l-1.428,2.2a8.25,8.25,0,0,0,5.054,1.78c2.549,0,4.505-1.187,4.505-3.8v-.044C101.933,12.11,100.021,11.318,98.373,10.769Z", fill: color })));
    },
    giving: function (_a) {
        var _b = _a.color, color = _b === void 0 ? "#000" : _b;
        return (createElement("svg", { width: "65.862", height: "21", viewBox: "0 0 65.862 21", style: { display: "block" } },
            createElement("title", null, "giving--text"),
            createElement("path", { d: "M7.978,8.584h6.681v6.681A9.986,9.986,0,0,1,8.088,17.7,7.7,7.7,0,0,1,0,9.792V9.748A7.9,7.9,0,0,1,8.065,1.793,8.447,8.447,0,0,1,14.109,3.9L11.977,6.474A5.664,5.664,0,0,0,7.956,4.913,4.621,4.621,0,0,0,3.539,9.7v.044A4.609,4.609,0,0,0,8.2,14.627a5.4,5.4,0,0,0,3.187-.923v-2.2H7.978Zm9.195,8.856h3.341V5.661H17.172ZM17.085,4.364H20.6V1.4H17.085ZM27.867,13.55,25.23,5.661H21.691l4.637,11.867h3.033L34,5.661H30.526Zm7.254-9.186h3.516V1.4H35.121ZM35.21,17.44h3.34V5.661H35.21Zm12.591-12a4.165,4.165,0,0,0-3.45,1.89V5.661H41.01V17.44h3.341V10.869c0-1.582.813-2.4,2.087-2.4s2.022.813,2.022,2.4V17.44H51.8V9.814C51.8,7.111,50.328,5.441,47.8,5.441Zm18.062.22v9.12c0,4.439-2.2,6.219-6.571,6.219a11.182,11.182,0,0,1-5.208-1.23l1.143-2.506A7.688,7.688,0,0,0,59.2,18.341c2.285,0,3.363-1.1,3.363-3.209v-.571a4.608,4.608,0,0,1-3.846,1.912,5.173,5.173,0,0,1-5.231-5.494v-.044a5.185,5.185,0,0,1,5.231-5.494,4.766,4.766,0,0,1,3.8,1.758V5.661Zm-3.3,5.274a2.872,2.872,0,0,0-5.736,0v.044A2.691,2.691,0,0,0,59.687,13.7a2.722,2.722,0,0,0,2.879-2.725Z", fill: color })));
    },
    groups: function (_a) {
        var _b = _a.color, color = _b === void 0 ? "#000" : _b;
        return (createElement("svg", { width: "75.269", height: "21", viewBox: "0 0 75.269 21", style: { display: "block" } },
            createElement("title", null, "groups--text"),
            createElement("path", { d: "M7.978,8.791h6.681v6.681a9.986,9.986,0,0,1-6.571,2.439A7.7,7.7,0,0,1,0,10V9.956A7.9,7.9,0,0,1,8.065,2a8.446,8.446,0,0,1,6.043,2.11L11.977,6.681A5.664,5.664,0,0,0,7.956,5.121,4.621,4.621,0,0,0,3.539,9.912v.044A4.609,4.609,0,0,0,8.2,14.834a5.4,5.4,0,0,0,3.187-.923v-2.2H7.978Zm12.513-.55V5.868H17.15V17.647H20.49V13.3c0-2.813,1.363-4.154,3.583-4.154h.176V5.648A3.639,3.639,0,0,0,20.49,8.241Zm17.2,3.494v.044A6.183,6.183,0,0,1,31.3,17.911a6.123,6.123,0,0,1-6.352-6.088v-.044a6.183,6.183,0,0,1,6.4-6.131A6.122,6.122,0,0,1,37.69,11.736Zm-3.3.044a3.129,3.129,0,0,0-3.1-3.252,3.017,3.017,0,0,0-3.055,3.208v.044a3.13,3.13,0,0,0,3.1,3.253,3.018,3.018,0,0,0,3.054-3.209Zm12.384.659c0,1.583-.813,2.4-2.088,2.4s-2.022-.813-2.022-2.4V5.868h-3.34v7.625c0,2.7,1.472,4.374,4,4.374a4.169,4.169,0,0,0,3.451-1.89v1.67h3.341V5.868H46.778Zm18.113-.7v.044c0,3.934-2.571,6.088-5.363,6.088a4.523,4.523,0,0,1-3.669-1.758v5.054H52.518V5.868h3.341V7.56a4.324,4.324,0,0,1,3.669-1.912C62.275,5.648,64.89,7.8,64.89,11.736Zm-3.341,0a2.89,2.89,0,1,0-5.735,0v.044a2.89,2.89,0,1,0,5.735,0Zm10.159-1.208c-1.275-.439-2.4-.747-2.4-1.406V9.077c0-.462.417-.813,1.231-.813a6.982,6.982,0,0,1,3.187,1.1l1.275-2.307a8.15,8.15,0,0,0-4.395-1.363c-2.374,0-4.308,1.341-4.308,3.736v.044c0,2.285,1.869,3.054,3.516,3.538,1.3.4,2.439.637,2.439,1.363v.044c0,.527-.439.879-1.406.879a6.656,6.656,0,0,1-3.713-1.406l-1.429,2.2a8.252,8.252,0,0,0,5.054,1.78c2.55,0,4.505-1.187,4.505-3.8v-.044C75.269,11.868,73.357,11.076,71.709,10.527Z", fill: color })));
    },
    people: function (_a) {
        var _b = _a.color, color = _b === void 0 ? "#000" : _b;
        return (createElement("svg", { width: "71.291", height: "21", viewBox: "0 0 71.291 21", style: { display: "block" } },
            createElement("title", null, "people--text"),
            createElement("path", { d: "M6.285,2.1H0V17.484H3.385V12.869H5.956c3.45,0,6.219-1.846,6.219-5.406V7.418C12.174,4.276,9.956,2.1,6.285,2.1ZM8.746,7.529A2.382,2.382,0,0,1,6.065,9.858H3.385v-4.7H6c1.692,0,2.747.813,2.747,2.33ZM18.807,5.485a5.864,5.864,0,0,0-5.823,6.131v.044a5.891,5.891,0,0,0,6.153,6.088,5.894,5.894,0,0,0,4.813-2.2l-1.913-1.692a3.86,3.86,0,0,1-2.857,1.208A2.731,2.731,0,0,1,16.3,12.759h8.2c.021-.308.044-.506.044-.835V11.88C24.543,8.54,22.741,5.485,18.807,5.485Zm-2.549,5.187a2.625,2.625,0,0,1,2.549-2.506,2.526,2.526,0,0,1,2.483,2.506Zm15.8-5.187a6.182,6.182,0,0,0-6.394,6.131v.044a6.122,6.122,0,0,0,6.351,6.088,6.183,6.183,0,0,0,6.4-6.132v-.044A6.123,6.123,0,0,0,32.063,5.485Zm3.055,6.175a3.018,3.018,0,0,1-3.055,3.209,3.13,3.13,0,0,1-3.1-3.253v-.044a3.018,3.018,0,0,1,3.055-3.208,3.129,3.129,0,0,1,3.1,3.252ZM47.192,5.485A4.327,4.327,0,0,0,43.522,7.4V5.7H40.181V21h3.341V15.946a4.525,4.525,0,0,0,3.67,1.758c2.791,0,5.362-2.154,5.362-6.088v-.044C52.554,7.638,49.939,5.485,47.192,5.485Zm2.022,6.131a2.891,2.891,0,1,1-5.736,0v-.044a2.891,2.891,0,1,1,5.736,0Zm5.3-10.175h3.34V17.484h-3.34ZM65.556,5.485a5.865,5.865,0,0,0-5.824,6.131v.044A6.222,6.222,0,0,0,70.7,15.55l-1.912-1.692a3.86,3.86,0,0,1-2.857,1.208,2.732,2.732,0,0,1-2.879-2.307h8.2c.022-.308.044-.506.044-.835V11.88C71.291,8.54,69.49,5.485,65.556,5.485Zm-2.55,5.187a2.626,2.626,0,0,1,2.55-2.506,2.526,2.526,0,0,1,2.483,2.506Z", fill: color })));
    },
    registrations: function (_a) {
        var _b = _a.color, color = _b === void 0 ? "#000" : _b;
        return (createElement("svg", { width: "136.239", height: "21", viewBox: "0 0 136.239 21", style: { display: "block" } },
            createElement("title", null, "registrations--text"),
            createElement("path", { d: "M12.834,7.177V7.133c0-3.165-2.175-5.077-5.8-5.077H0V17.44H3.385V12.517H6.043l3.3,4.923H13.3L9.537,11.946A4.776,4.776,0,0,0,12.834,7.177Zm-3.428.176c0,1.3-.945,2.175-2.593,2.175H3.385V5.111H6.747c1.648,0,2.659.747,2.659,2.2Zm9.962-1.912a5.864,5.864,0,0,0-5.823,6.131v.044A5.891,5.891,0,0,0,19.7,17.7a5.894,5.894,0,0,0,4.813-2.2L22.6,13.814a3.86,3.86,0,0,1-2.857,1.209,2.732,2.732,0,0,1-2.878-2.308h8.2c.021-.308.044-.505.044-.835v-.045C25.1,8.5,23.3,5.441,19.368,5.441Zm-2.549,5.187a2.625,2.625,0,0,1,2.549-2.507,2.526,2.526,0,0,1,2.483,2.507ZM35.34,7.2a4.765,4.765,0,0,0-3.8-1.758,5.185,5.185,0,0,0-5.231,5.493v.045a5.173,5.173,0,0,0,5.231,5.493,4.607,4.607,0,0,0,3.846-1.912v.572c0,2.11-1.078,3.209-3.363,3.209a7.692,7.692,0,0,1-3.978-1.077l-1.143,2.5A11.17,11.17,0,0,0,32.11,21c4.374,0,6.571-1.78,6.571-6.219V5.661H35.34Zm.045,3.781A2.723,2.723,0,0,1,32.506,13.7a2.691,2.691,0,0,1-2.857-2.725v-.045a2.872,2.872,0,0,1,5.736,0ZM41.068,1.4h3.516V4.364H41.068Zm.088,4.264H44.5V17.44H41.155Zm14.4,8.152v.045c0,2.614-1.956,3.8-4.505,3.8A8.251,8.251,0,0,1,46,15.879l1.429-2.2a6.652,6.652,0,0,0,3.713,1.406c.968,0,1.406-.352,1.406-.879v-.044c0-.725-1.142-.967-2.439-1.363-1.647-.484-3.516-1.252-3.516-3.539V9.221c0-2.4,1.934-3.737,4.308-3.737a8.15,8.15,0,0,1,4.4,1.363L54.021,9.155a6.984,6.984,0,0,0-3.187-1.1c-.813,0-1.231.352-1.231.813v.044c0,.659,1.121.968,2.4,1.406C53.648,10.869,55.56,11.66,55.56,13.814Zm5.557-8.152h2.769V8.517H61.116V13.55c0,.769.33,1.143,1.077,1.143a3.4,3.4,0,0,0,1.648-.417v2.68a4.926,4.926,0,0,1-2.637.682c-2.043,0-3.428-.813-3.428-3.538V8.517H56.369V5.661h1.406V2.649h3.341Zm11.834-.22V8.935h-.176c-2.219,0-3.582,1.341-3.582,4.154V17.44H65.853V5.661h3.341V8.033A3.638,3.638,0,0,1,72.95,5.441Zm5.914.088a10.393,10.393,0,0,0-4.572.945l.835,2.549a8.68,8.68,0,0,1,3.253-.637c1.67,0,2.527.77,2.527,2.154v.2a8.365,8.365,0,0,0-2.878-.484c-2.791,0-4.747,1.187-4.747,3.758v.044c0,2.329,1.824,3.6,4.044,3.6a4.53,4.53,0,0,0,3.56-1.5V17.44h3.23V10.606C84.116,7.419,82.512,5.529,78.864,5.529Zm2.087,7.758c0,1.208-1.054,2.066-2.615,2.066-1.077,0-1.824-.528-1.824-1.429V13.88c0-1.055.879-1.627,2.308-1.627a5.171,5.171,0,0,1,2.131.441Zm9.191-7.625h2.769V8.517H90.142V13.55c0,.769.33,1.143,1.077,1.143a3.4,3.4,0,0,0,1.648-.417v2.68a4.926,4.926,0,0,1-2.637.682c-2.043,0-3.428-.813-3.428-3.538V8.517H85.4V5.661H86.8V2.649h3.341ZM94.819,1.4h3.516V4.364H94.819Zm.089,4.264h3.34V17.44h-3.34Zm11.5-.22a6.182,6.182,0,0,0-6.4,6.131v.044a6.379,6.379,0,0,0,12.746-.044v-.044A6.122,6.122,0,0,0,106.411,5.441Zm3.054,6.175a3.018,3.018,0,0,1-3.054,3.209,3.13,3.13,0,0,1-3.1-3.253v-.044a3.017,3.017,0,0,1,3.055-3.208,3.129,3.129,0,0,1,3.1,3.252Zm15.854-1.8V17.44h-3.341V10.869c0-1.582-.747-2.395-2.021-2.395s-2.088.813-2.088,2.395V17.44h-3.341V5.661h3.341v1.67a4.169,4.169,0,0,1,3.451-1.89C123.847,5.441,125.319,7.111,125.319,9.814Zm10.92,4v.045c0,2.614-1.956,3.8-4.505,3.8a8.251,8.251,0,0,1-5.054-1.781l1.429-2.2a6.652,6.652,0,0,0,3.713,1.406c.968,0,1.406-.352,1.406-.879v-.044c0-.725-1.142-.967-2.439-1.363-1.647-.484-3.516-1.252-3.516-3.539V9.221c0-2.4,1.934-3.737,4.308-3.737a8.15,8.15,0,0,1,4.4,1.363L134.7,9.155a6.984,6.984,0,0,0-3.187-1.1c-.813,0-1.231.352-1.231.813v.044c0,.659,1.121.968,2.4,1.406C134.327,10.869,136.239,11.66,136.239,13.814Z", fill: color })));
    },
    resources: function (_a) {
        var _b = _a.color, color = _b === void 0 ? "#000" : _b;
        return (createElement("svg", { width: "105.8", height: "21", viewBox: "0 0 105.8 21", style: { display: "block" } },
            createElement("title", null, "resources--text"),
            createElement("path", { d: "M12.834,7.121V7.077C12.834,3.912,10.659,2,7.032,2H0V17.383H3.384V12.461H6.043l3.3,4.923H13.3L9.537,11.889A4.776,4.776,0,0,0,12.834,7.121ZM9.405,7.3c0,1.3-.945,2.175-2.593,2.175H3.384V5.055H6.747c1.648,0,2.659.747,2.659,2.2ZM19.94,5.384a5.864,5.864,0,0,0-5.823,6.131v.044a5.891,5.891,0,0,0,6.153,6.087,5.894,5.894,0,0,0,4.813-2.2l-1.913-1.693a3.86,3.86,0,0,1-2.857,1.209,2.732,2.732,0,0,1-2.878-2.308h8.2c.021-.308.044-.505.044-.835v-.045C25.676,8.439,23.874,5.384,19.94,5.384Zm-2.549,5.187A2.625,2.625,0,0,1,19.94,8.065a2.526,2.526,0,0,1,2.483,2.507ZM36,13.757V13.8c0,2.614-1.957,3.8-4.505,3.8a8.249,8.249,0,0,1-5.054-1.781l1.428-2.2a6.655,6.655,0,0,0,3.714,1.406c.967,0,1.406-.352,1.406-.879v-.044c0-.725-1.143-.967-2.439-1.363-1.648-.484-3.516-1.252-3.516-3.539V9.165c0-2.4,1.934-3.737,4.307-3.737a8.15,8.15,0,0,1,4.4,1.363L34.465,9.1A6.984,6.984,0,0,0,31.278,8c-.812,0-1.23.352-1.23.813v.044c0,.659,1.121.968,2.4,1.406C34.091,10.812,36,11.6,36,13.757Zm7.407-8.373a6.182,6.182,0,0,0-6.4,6.131v.044a6.122,6.122,0,0,0,6.352,6.087,6.182,6.182,0,0,0,6.394-6.131v-.044A6.122,6.122,0,0,0,43.411,5.384Zm3.054,6.175a3.018,3.018,0,0,1-3.054,3.209,3.13,3.13,0,0,1-3.1-3.253v-.044a3.017,3.017,0,0,1,3.055-3.208,3.129,3.129,0,0,1,3.1,3.252ZM58.849,5.6h3.341V17.383H58.849v-1.67A4.169,4.169,0,0,1,55.4,17.6c-2.527,0-4-1.671-4-4.374V5.6h3.34v6.57c0,1.582.748,2.4,2.022,2.4s2.088-.813,2.088-2.4Zm12.838-.22V8.878h-.176c-2.219,0-3.582,1.341-3.582,4.154v4.351H64.589V5.6h3.341V7.977A3.638,3.638,0,0,1,71.686,5.384Zm9.7,8.131,1.957,1.978a5.934,5.934,0,0,1-4.813,2.154A6.015,6.015,0,0,1,72.4,11.56v-.044a6.047,6.047,0,0,1,6.175-6.131,5.791,5.791,0,0,1,4.7,1.978L81.23,9.56a3.442,3.442,0,0,0-2.681-1.3,3.009,3.009,0,0,0-2.857,3.208v.044a3.018,3.018,0,0,0,2.989,3.253A3.729,3.729,0,0,0,81.383,13.515Zm8.354-8.131a5.865,5.865,0,0,0-5.824,6.131v.044A6.223,6.223,0,0,0,94.88,15.45l-1.912-1.693a3.86,3.86,0,0,1-2.857,1.209,2.733,2.733,0,0,1-2.879-2.308h8.2c.022-.308.044-.505.044-.835v-.045C95.473,8.439,93.671,5.384,89.737,5.384Zm-2.55,5.187a2.626,2.626,0,0,1,2.55-2.507,2.527,2.527,0,0,1,2.483,2.507ZM105.8,13.757V13.8c0,2.614-1.956,3.8-4.505,3.8a8.251,8.251,0,0,1-5.054-1.781l1.429-2.2a6.652,6.652,0,0,0,3.713,1.406c.968,0,1.406-.352,1.406-.879v-.044c0-.725-1.142-.967-2.439-1.363-1.647-.484-3.516-1.252-3.516-3.539V9.165c0-2.4,1.934-3.737,4.308-3.737a8.15,8.15,0,0,1,4.395,1.363L104.262,9.1A6.984,6.984,0,0,0,101.075,8c-.813,0-1.231.352-1.231.813v.044c0,.659,1.121.968,2.4,1.406C103.888,10.812,105.8,11.6,105.8,13.757Z", fill: color })));
    },
    services: function (_a) {
        var _b = _a.color, color = _b === void 0 ? "#000" : _b;
        return (createElement("svg", { width: "87.905", height: "21", viewBox: "0 0 87.905 21", style: { display: "block" } },
            createElement("title", null, "services--text"),
            createElement("path", { d: "M43.421,5.983h3.585L42.218,18.236H39.087L34.3,5.983h3.653l2.723,8.146ZM30.285,8.6V5.983H26.836V18.145h3.449V13.815c0-2.807,1.322-4.181,3.479-4.271V5.929A3.764,3.764,0,0,0,30.285,8.6ZM7.533,8.639c-2.745-.7-3.426-1.044-3.426-2.088V6.506c0-.771.7-1.385,2.042-1.385a7.454,7.454,0,0,1,4.129,1.566l1.815-2.633a9.2,9.2,0,0,0-5.9-2.019C2.95,2.036.635,3.941.635,6.823v.046c0,3.153,2.065,4.038,5.264,4.855,2.655.681,3.2,1.134,3.2,2.02v.045c0,.931-.862,1.5-2.292,1.5a7.285,7.285,0,0,1-4.742-1.928L0,15.831a10.1,10.1,0,0,0,6.739,2.541c3.426,0,5.832-1.77,5.832-4.924V13.4C12.57,10.635,10.755,9.478,7.533,8.639Zm17.673,3.721v.046c0,.34-.022.544-.045.862H16.7a2.821,2.821,0,0,0,2.973,2.382,3.986,3.986,0,0,0,2.95-1.248l1.974,1.747a6.083,6.083,0,0,1-4.969,2.27,6.083,6.083,0,0,1-6.353-6.285v-.046a6.055,6.055,0,0,1,6.013-6.33C23.345,5.757,25.206,8.911,25.206,12.359Zm-3.358-1.248a2.607,2.607,0,0,0-2.564-2.586c-1.43,0-2.36,1.021-2.632,2.586Zm26.38,7.034h3.449V5.983H48.228Zm36-7.352c-1.316-.454-2.473-.771-2.473-1.452V9.3c0-.477.431-.84,1.271-.84a7.2,7.2,0,0,1,3.29,1.135l1.316-2.383A8.417,8.417,0,0,0,83.1,5.8c-2.451,0-4.447,1.385-4.447,3.857v.046c0,2.359,1.929,3.153,3.63,3.653,1.338.408,2.519.657,2.519,1.406v.046c0,.544-.454.907-1.452.907a6.874,6.874,0,0,1-3.834-1.452l-1.475,2.269a8.52,8.52,0,0,0,5.219,1.838c2.632,0,4.651-1.225,4.651-3.925V14.4C87.905,12.178,85.931,11.361,84.229,10.794Zm-6.872,1.565v.046c0,.34-.022.544-.045.862H68.849a2.821,2.821,0,0,0,2.973,2.382,3.986,3.986,0,0,0,2.95-1.248l1.974,1.747a6.424,6.424,0,0,1-11.322-4.016v-.046a6.055,6.055,0,0,1,6.013-6.33C75.5,5.757,77.357,8.911,77.357,12.359ZM74,11.111a2.607,2.607,0,0,0-2.564-2.586c-1.43,0-2.36,1.021-2.632,2.586Zm-14.11,4.334A3.116,3.116,0,0,1,56.8,12.087v-.045a3.107,3.107,0,0,1,2.95-3.312,3.551,3.551,0,0,1,2.768,1.339l2.11-2.27a5.98,5.98,0,0,0-4.856-2.042,6.244,6.244,0,0,0-6.375,6.33v.046a6.21,6.21,0,0,0,6.33,6.285A6.125,6.125,0,0,0,64.7,16.194l-2.02-2.042A3.852,3.852,0,0,1,59.889,15.445ZM48.137,4.645h3.63V1.582h-3.63Z", fill: color })));
    }
};

var Accounts = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "#000" : _b, props = __rest(_a, ["color"]);
    return (createElement("g", __assign({}, props),
        createElement("path", { d: "M23.866,15.815V15.8a.317.317,0,0,0-.222-.27.313.313,0,0,0-.051-.011l-.012,0-1.034-.114a1.587,1.587,0,0,1-1.006-2.429l.65-.811c.006-.008.01-.016.015-.024l.007-.012a.334.334,0,0,0,.018-.034.31.31,0,0,0,.014-.036l0-.013a.317.317,0,0,0-.057-.282l-.01-.012-.014-.017-1.042-1.042-.017-.014-.009-.007a.317.317,0,0,0-.348-.034.321.321,0,0,0-.044.028l-.01.007-.812.65a1.586,1.586,0,0,1-2.429-1.006l-.114-1.033c0-.01,0-.019-.006-.028l0-.013a.33.33,0,0,0-.027-.072L17.3,9.16A.317.317,0,0,0,17.062,9h-.015l-.021,0H15.551L15.53,9h-.011a.317.317,0,0,0-.27.222.321.321,0,0,0-.011.051l0,.012-.114,1.034a1.585,1.585,0,0,1-2.429,1.006l-.812-.65c-.008-.006-.016-.01-.024-.015l-.012-.007a.317.317,0,0,0-.034-.018l-.036-.014-.013,0a.317.317,0,0,0-.282.057l-.012.01-.017.014-1.042,1.042-.014.017-.007.009a.317.317,0,0,0-.006.392l.007.01.65.812a1.583,1.583,0,0,1-1.006,2.429L9,15.521l-.028.006-.014,0-.037.011-.035.016-.012.006a.317.317,0,0,0-.159.24l0,.015,0,.021v1.474l0,.022v.011a.317.317,0,0,0,.222.27.306.306,0,0,0,.051.011l.012,0,1.034.114a1.583,1.583,0,0,1,1.006,2.429l-.65.811c-.006.008-.01.016-.015.024l-.007.012a.317.317,0,0,0-.018.034.326.326,0,0,0-.014.036l0,.013a.317.317,0,0,0,.057.282l.01.012.014.017,1.042,1.042.017.014.009.007a.317.317,0,0,0,.348.034.3.3,0,0,0,.044-.028l.01-.006.812-.65a1.589,1.589,0,0,1,2.429,1.006l.114,1.033c0,.01,0,.019.006.028l0,.013a.333.333,0,0,0,.027.072l.006.012a.317.317,0,0,0,.24.159l.015,0,.021,0h1.474l.022,0h.011a.317.317,0,0,0,.27-.222.321.321,0,0,0,.011-.051l0-.012.114-1.033a1.582,1.582,0,0,1,2.429-1.006l.811.65c.008.006.016.01.024.015l.012.007.034.018.036.014.013,0a.317.317,0,0,0,.282-.057l.012-.01.017-.014,1.042-1.042.014-.017.007-.009a.317.317,0,0,0,.006-.392l-.006-.01-.65-.812a1.583,1.583,0,0,1,1.006-2.429l1.033-.114.028-.006.013,0,.037-.012.035-.015.012-.006a.317.317,0,0,0,.159-.24l0-.015,0-.021V15.837ZM16.29,19.16a2.585,2.585,0,1,1,2.585-2.585A2.585,2.585,0,0,1,16.29,19.16Z", fill: color, role: "presentation" })));
};
var CheckIns = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "#000" : _b, props = __rest(_a, ["color"]);
    return (createElement("g", __assign({}, props),
        createElement("path", { d: "M15.251,21.059a1.789,1.789,0,0,1-2.53,0l-3.8-3.794a1.789,1.789,0,1,1,2.53-2.53l2.531,2.53,6.325-6.324a1.789,1.789,0,1,1,2.53,2.53Z", fill: color, role: "presentation" })));
};
var Giving = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "#000" : _b, props = __rest(_a, ["color"]);
    return (createElement("g", __assign({}, props),
        createElement("path", { d: "M16.543,12.465l-.485.486-.485-.486a3.777,3.777,0,0,0-5.008-.4,3.635,3.635,0,0,0-.279,5.391l.633.632,4.731,4.732a.577.577,0,0,0,.815,0l5.364-5.365a3.635,3.635,0,0,0-.279-5.391A3.777,3.777,0,0,0,16.543,12.465Z", fill: color, role: "presentation" })));
};
var Groups = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "#000" : _b, props = __rest(_a, ["color"]);
    return (createElement("g", __assign({}, props),
        createElement("path", { d: "M22,18.265V14.9a2.993,2.993,0,1,0-3.816-3.816H13.816A2.993,2.993,0,1,0,10,14.9v3.367a2.993,2.993,0,1,0,3.816,3.816h4.367A2.993,2.993,0,1,0,22,18.265Zm-3.816,1.816H13.816A2.989,2.989,0,0,0,12,18.265V14.9a2.989,2.989,0,0,0,1.816-1.816h4.367A2.989,2.989,0,0,0,20,14.9v3.367A2.989,2.989,0,0,0,18.184,20.081Z", fill: color, role: "presentation" })));
};
var People = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "#000" : _b, props = __rest(_a, ["color"]);
    return (createElement("g", __assign({}, props),
        createElement("path", { d: "M18.107,13.531A2.466,2.466,0,1,1,20.574,16,2.466,2.466,0,0,1,18.107,13.531Zm-5.092,2.143a3.289,3.289,0,1,0-3.289-3.289A3.289,3.289,0,0,0,13.015,15.674ZM18,20.2c0-1.6-.989-3.2-2.589-3.2H10.763A3.065,3.065,0,0,0,8,20.2v1.89c0,.24.06.907.3.907h9.575c.24,0,.125-.667.125-.907Zm6,.149V19.237C24,18.17,23.536,17,22.469,17h-3.1c-.438,0-.427.3-.752.55A4.6,4.6,0,0,1,20,20.2V21h3.967C24.206,21,24,20.592,24,20.353Z", fill: color, role: "presentation" })));
};
var Registrations = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "#000" : _b, props = __rest(_a, ["color"]);
    return (createElement("g", __assign({}, props),
        createElement("path", { d: "M19.654,13.387,16.6,10.56l2.049-2.237,3.079,2.789ZM15.96,11.255l-5.954,6.5a2.332,2.332,0,0,0-.462.988L9.13,21.808l3.015-.664a2.3,2.3,0,0,0,.942-.544l5.933-6.516ZM16.384,19,14.8,22H23V19Z", fill: color }),
        createElement("polygon", { points: "14.799 22 23 22 23 19 16.384 19 14.799 22", fill: color })));
};
var Resources = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "#000" : _b, props = __rest(_a, ["color"]);
    return (createElement("g", __assign({}, props),
        createElement("rect", { x: "8", y: "9", width: "7", height: "6", rx: "0.496", ry: "0.496", fill: color, role: "presentation" }),
        createElement("rect", { x: "17", y: "9", width: "7", height: "6", rx: "0.496", ry: "0.496", fill: color, role: "presentation" }),
        createElement("rect", { x: "8", y: "17", width: "7", height: "6", rx: "0.496", ry: "0.496", fill: color, role: "presentation" }),
        createElement("rect", { x: "17", y: "17", width: "7", height: "6", rx: "0.496", ry: "0.496", fill: color, role: "presentation" })));
};
var Services = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "#000" : _b, props = __rest(_a, ["color"]);
    return (createElement("g", __assign({}, props),
        createElement("rect", { x: "8", y: "8.669", width: "16", height: "3.534", rx: "0.534", ry: "0.534", fill: color, role: "presentation" }),
        createElement("rect", { x: "8", y: "14.149", width: "16", height: "3.534", rx: "0.534", ry: "0.534", fill: color, role: "presentation" }),
        createElement("rect", { x: "8", y: "19.629", width: "16", height: "3.534", rx: "0.534", ry: "0.534", fill: color, role: "presentation" })));
};

var Clipboard = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "32px" : _b, _c = _a.color, color = _c === void 0 ? "#000" : _c, _d = _a.name, name = _d === void 0 ? "Generic" : _d, children = _a.children;
    return (createElement("svg", { width: size, height: size, viewBox: "0 0 32 32", role: "img", "aria-labelledby": "title desc" },
        createElement("title", { id: "title" },
            "Planning Center ",
            name,
            " App Icon"),
        createElement("desc", { id: "desc" },
            "An image of a clipboard with icon, symbolizing the Planning Center ",
            name,
            " ",
            "app."),
        createElement("rect", { fill: color, x: "0", y: "0", width: "32", height: "32", rx: "3.5", role: "presentation" }),
        createElement("rect", { fill: "#FFFFFF", x: "4.75", y: "4.25", width: "22.5", height: "23", rx: ".85", role: "presentation" }),
        createElement("path", { d: "M9.11999989,-3.66385795e-16 L22.8800001,-3.66385795e-16 L22.8800001,4.19999981 L22.8800001,4.19999981 C22.8800001,4.75228456 22.4322849,5.19999981 21.8800001,5.19999981 L10.1199999,5.19999981 L10.1199999,5.19999981 C9.56771514,5.19999981 9.11999989,4.75228456 9.11999989,4.19999981 L9.11999989,-3.66385795e-16 Z", fill: "#FEC123", role: "presentation" }),
        children));
};
var COLOR_APP_BADGES = {
    accounts: function (props) { return (createElement(Clipboard, { color: "#4984C4", size: props.size || "20px", name: "Accounts" },
        createElement(Accounts, { color: "#4a4a4d" }))); },
    "check-ins": function (props) { return (createElement(Clipboard, { color: "#8C6999", size: props.size || "20px", name: "Check-Ins" },
        createElement(CheckIns, { color: "#4a4a4d" }))); },
    giving: function (props) { return (createElement(Clipboard, { color: "#fcc846", size: props.size || "20px", name: "Check-Ins" },
        createElement(Giving, { color: "#4a4a4d" }))); },
    groups: function (props) { return (createElement(Clipboard, { color: "#fb7642", size: props.size || "20px", name: "Check-Ins" },
        createElement(Groups, { color: "#4a4a4d" }))); },
    people: function (props) { return (createElement(Clipboard, { color: "#5677b5", size: props.size || "20px", name: "Check-Ins" },
        createElement(People, { color: "#4a4a4d" }))); },
    registrations: function (props) { return (createElement(Clipboard, { color: "#46948d", size: props.size || "20px", name: "Check-Ins" },
        createElement(Registrations, { color: "#4a4a4d" }))); },
    resources: function (props) { return (createElement(Clipboard, { color: "#cc4f3e", size: props.size || "20px", name: "Resources" },
        createElement(Resources, { color: "#4a4a4d" }))); },
    services: function (props) { return (createElement(Clipboard, { color: "#6e9541", size: props.size || "20px", name: "Services" },
        createElement(Services, { color: "#4a4a4d" }))); }
};

var AppsButton = /** @class */ (function (_super) {
    __extends(AppsButton, _super);
    function AppsButton() {
        var _this = _super.call(this) || this;
        _this.state = {
            entered: false,
            down: false
        };
        return _this;
    }
    AppsButton.prototype.render = function () {
        var _this = this;
        var _a = this.props, appName = _a.appName, colors = _a.colors, expanded = _a.expanded, _b = _a.style, style = _b === void 0 ? null : _b, onClick = _a.onClick, nativeProps = __rest(_a, ["appName", "colors", "expanded", "style", "onClick"]);
        var getBackgroundColor = function () {
            if (expanded && !_this.state.down)
                return colors.base1;
            if (_this.state.entered && _this.state.down)
                return colors.base2;
            if (_this.state.entered)
                return colors.base1;
            return "transparent";
        };
        return (createElement(Unbutton, __assign({ style: __assign({ outline: 0, paddingLeft: "16px", paddingRight: "16px", whiteSpace: "nowrap", height: "100%", display: "flex", alignItems: "center", backgroundColor: getBackgroundColor() }, slightBackgroundTransition, style), onClick: onClick, onMouseEnter: function () { return _this.setState({ entered: true }); }, onMouseLeave: function () { return _this.setState({ entered: false }); }, onMouseDown: function () { return _this.setState({ down: true }); }, onMouseUp: function () { return _this.setState({ down: false }); } }, nativeProps),
            createElement("div", null, createElement(MONO_APP_BADGES[appName.toLowerCase()])),
            createElement("div", { style: { marginLeft: "8px" } },
                createElement(DisclosureChevronIcon, { colors: colors }))));
    };
    return AppsButton;
}(Component));
var HoverableListItem = /** @class */ (function (_super) {
    __extends(HoverableListItem, _super);
    function HoverableListItem() {
        var _this = _super.call(this) || this;
        _this.state = {
            entered: false
        };
        return _this;
    }
    HoverableListItem.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.component, C = _b === void 0 ? "span" : _b, _c = _a.style, style = _c === void 0 ? null : _c, nativeProps = __rest(_a, ["component", "style"]);
        var getBackgroundColor = function () {
            if (_this.state.entered)
                return "#f7f7f7";
            return "transparent";
        };
        return (createElement(C, __assign({ style: __assign({}, style, { backgroundColor: getBackgroundColor() }), onMouseEnter: function () { return _this.setState({ entered: true }); }, onMouseLeave: function () { return _this.setState({ entered: false }); } }, nativeProps)));
    };
    return HoverableListItem;
}(Component));
var Hoverable = /** @class */ (function (_super) {
    __extends(Hoverable, _super);
    function Hoverable() {
        var _this = _super.call(this) || this;
        _this.state = {
            entered: false,
            down: false
        };
        return _this;
    }
    Hoverable.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.component, C = _b === void 0 ? "div" : _b, _c = _a.hover, hover = _c === void 0 ? null : _c, _d = _a.active, active = _d === void 0 ? null : _d, _e = _a.style, style = _e === void 0 ? null : _e, nativeProps = __rest(_a, ["component", "hover", "active", "style"]);
        return (createElement(C, __assign({ style: __assign({}, fontFamily, style, (this.state.entered && hover), (this.state.down && active)), onMouseEnter: function () { return _this.setState({ entered: true }); }, onMouseLeave: function () { return _this.setState({ entered: false }); }, onMouseDown: function () { return _this.setState({ down: true }); }, onMouseUp: function () { return _this.setState({ down: false }); } }, nativeProps)));
    };
    return Hoverable;
}(Component));
var AppsMenu = function (props) { return (createElement(PopupRoot, null,
    createElement(Popup, { style: __assign({ marginTop: "8px" }, props.visible
            ? {
                visibility: "visible",
                opacity: 1,
                transition: "none"
            }
            : {
                visibility: "hidden",
                opacity: 0,
                transition: "all 120ms ease-in"
            }), component: Outsider, onOutsideClick: props.toggle, cleanup: !props.visible },
        createElement("menu", { style: { margin: 0, padding: 0 } }, props.apps.map(function (_a, i) {
            var name = _a.attributes.name;
            return (createElement(HoverableListItem, { component: "a", style: __assign({ paddingLeft: "16px", paddingRight: "16px", lineHeight: "48px", overflow: "hidden", verticalAlign: "middle", display: "flex", height: "48px", alignItems: "center" }, fontFamily, (i && { borderTop: "1px solid #ddd" })), key: name, href: pcoUrl(props.env)("accounts") + "/apps/" + name.toLowerCase(), "data-turbolinks": false },
                createElement(COLOR_APP_BADGES[name.toLowerCase()]),
                createElement("span", { style: { marginLeft: "8px" } }),
                createElement(MONO_APP_NAME[name.toLowerCase()], {
                    color: "#444"
                })));
        }))))); };
var DisclosureChevronIcon = function (_a) {
    var colors = _a.colors;
    return (createElement("svg", { style: {
            margin: "-3px"
        }, width: "16", height: "16", viewBox: "0 0 16 16", color: colors.base3 },
        createElement("title", null, "chevron"),
        createElement("polygon", { fill: "currentColor", points: "11.931 4.892 8 8.824 4.069 4.892 2.927 6.034 8 11.108 9.142 9.966 13.073 6.034 11.931 4.892" })));
};
var HelpIcon = function (_a) {
    var colors = _a.colors;
    return (createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", color: colors.base3, style: { display: "block" } },
        createElement("title", null, "help"),
        createElement("path", { d: "M12,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22ZM12,4a8,8,0,1,0,8,8A8.009,8.009,0,0,0,12,4Zm-.342,11.067a1.41,1.41,0,1,0,1.41,1.41A1.41,1.41,0,0,0,11.658,15.067Zm1.914-2.488c1.938-1.885,2.232-3.607.872-5.118A3.37,3.37,0,0,0,11.9,6.307h-.017A5.121,5.121,0,0,0,8.343,7.959L9.817,9.311a3.153,3.153,0,0,1,2.067-1h.008a1.366,1.366,0,0,1,1.065.493c.494.549.517,1.085-.78,2.345A4.612,4.612,0,0,0,10.632,14.2h2A2.733,2.733,0,0,1,13.572,12.579Z", fill: "currentColor" })));
};
var Outsider = /** @class */ (function (_super) {
    __extends(Outsider, _super);
    function Outsider() {
        var _this = _super.call(this) || this;
        _this.handleOutsideClick = _this.handleOutsideClick.bind(_this);
        return _this;
    }
    Outsider.prototype.handleOutsideClick = function (e) {
        if (this.container.contains(e.target))
            return;
        e.stopPropagation();
        e.preventDefault();
        return this.props.onOutsideClick();
    };
    Outsider.prototype.render = function () {
        var _this = this;
        var _a = this.props, cleanup = _a.cleanup, onOutsideClick = _a.onOutsideClick, visible = _a.visible, props = __rest(_a, ["cleanup", "onOutsideClick", "visible"]);
        if (cleanup) {
            document.removeEventListener("click", this.handleOutsideClick, true);
        }
        else {
            document.addEventListener("click", this.handleOutsideClick, true);
        }
        return createElement("div", __assign({ ref: function (c) { return (_this.container = c); } }, props));
    };
    return Outsider;
}(Component));
var PopupRoot = /** @class */ (function (_super) {
    __extends(PopupRoot, _super);
    function PopupRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopupRoot.prototype.render = function () {
        var _a = this.props, _b = _a.style, style = _b === void 0 ? null : _b, nativeProps = __rest(_a, ["style"]);
        return (createElement("div", __assign({ style: __assign({ position: "relative", alignSelf: "flex-end", display: "flex" }, style) }, nativeProps)));
    };
    return PopupRoot;
}(Component));
var Popup = function (_a) {
    var _b = _a.component, C = _b === void 0 ? "div" : _b, _c = _a.style, style = _c === void 0 ? null : _c, nativeProps = __rest(_a, ["component", "style"]);
    return (createElement(C, __assign({ style: __assign({ overflow: "hidden", background: "#FFFFFF", boxShadow: "0 0 0 1px #D4D9E2, 0 8px 32px rgba(0,0,0,.3)", borderRadius: "3px", position: "absolute" }, style) }, nativeProps)));
};
var NotSmallTopbar = /** @class */ (function (_super) {
    __extends(NotSmallTopbar, _super);
    function NotSmallTopbar() {
        var _this = _super.call(this) || this;
        _this.state = {
            routesVisible: true,
            appsMenuVisible: false,
            userMenuVisible: false
        };
        _this.hideRoutes = _this.hideRoutes.bind(_this);
        _this.showRoutes = _this.showRoutes.bind(_this);
        return _this;
    }
    NotSmallTopbar.prototype.hideRoutes = function () {
        return this.setState({ routesVisible: false });
    };
    NotSmallTopbar.prototype.showRoutes = function () {
        return this.setState({ routesVisible: true });
    };
    NotSmallTopbar.prototype.render = function () {
        var _this = this;
        var ProfileContainer = function (_a) {
            var component = _a.component, href = _a.href, nativeProps = __rest(_a, ["component", "href"]);
            return _this.props.linkToProfile ? (createElement(HoverableListItem, __assign({ component: component, href: href }, nativeProps))) : (createElement("div", __assign({}, nativeProps)));
        };
        return (createElement(StyledRoot, { style: __assign({ paddingLeft: "8px", paddingRight: "16px" }, this.props.style) },
            createElement(AppsMenu, { env: this.props.env, apps: appsMenuFormatter(this.props.apps, this.props.appName), visible: this.state.appsMenuVisible, toggle: function () {
                    return _this.setState(function (_a) {
                        var appsMenuVisible = _a.appsMenuVisible;
                        return ({
                            appsMenuVisible: !appsMenuVisible
                        });
                    });
                } }),
            createElement(AppsButton, { colors: this.props.colors, expanded: this.state.appsMenuVisible, onClick: function () {
                    return _this.setState(function (_a) {
                        var appsMenuVisible = _a.appsMenuVisible;
                        return ({
                            appsMenuVisible: !appsMenuVisible
                        });
                    }, _this.props.requestAppsFetch());
                }, appName: this.props.appName }),
            createElement("div", { style: { margin: "12px" } }),
            this.state.routesVisible && this.props.routes,
            createElement("div", { style: { margin: "auto" } }),
            this.props.notifications(),
            this.props.search({
                hideRoutes: this.hideRoutes,
                showRoutes: this.showRoutes
            }),
            createElement("div", { style: {
                    marginLeft: "1rem",
                    position: "relative",
                    whiteSpace: "nowrap",
                    cursor: "pointer"
                } },
                createElement(Hoverable, { component: "button", type: "button", style: __assign({ outline: 0, cursor: "pointer", border: "none", padding: 0, appearance: "none", WebkitAppearance: "none", alignItems: "center", lineHeight: "32px", fontSize: "13px", borderRadius: "9999px", color: "white", backgroundColor: this.props.colors.base1, display: "flex" }, slightBackgroundTransition), active: { backgroundColor: this.props.colors.base3 }, hover: { backgroundColor: this.props.colors.base2 }, onClick: function () {
                        return _this.setState(function (_a) {
                            var userMenuVisible = _a.userMenuVisible;
                            return ({
                                userMenuVisible: !userMenuVisible
                            });
                        }, _this.props.requestConnectedPeopleFetch());
                    } },
                    createElement(Avatar, { env: this.props.env, url: this.props.userAvatarPath }),
                    this.props.showOrgName && this.props.connectedPeople.length ? (createElement("div", { style: {
                            margin: "0 8px 0 8px",
                            fontSize: "13px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "15em"
                        } }, this.props.orgName)) : (createElement("div", { style: {
                            margin: "0 4px 0 4px"
                        } })),
                    createElement("div", { style: { paddingRight: "8px" } },
                        createElement(DisclosureChevronIcon, { colors: this.props.colors })))),
            createElement(PopupRoot, null,
                createElement(Popup, { component: Outsider, onOutsideClick: function () {
                        return _this.setState(function (_a) {
                            var userMenuVisible = _a.userMenuVisible;
                            return ({
                                userMenuVisible: !userMenuVisible
                            });
                        });
                    }, cleanup: !this.state.userMenuVisible, style: __assign({ color: "#525252", right: 0, marginTop: "8px", maxWidth: "20em" }, this.state.userMenuVisible
                        ? {
                            visibility: "visible",
                            opacity: 1,
                            transition: "none"
                        }
                        : {
                            visibility: "hidden",
                            opacity: 0,
                            transition: "all 120ms ease-in"
                        }, { cursor: "default" }) },
                    createElement("div", null,
                        createElement(ProfileContainer, { component: "a", href: "/people/AC" + this.props.userId, "data-turbolinks": false, style: {
                                display: "block",
                                padding: "16px",
                                textDecoration: "none"
                            } },
                            createElement("div", { style: {
                                    fontSize: "18px",
                                    lineHeight: "24px",
                                    display: "flex"
                                } },
                                createElement("div", { style: __assign({}, IEFlex1, fontFamily, { color: "#444", whiteSpace: "nowrap" }) }, this.props.userName),
                                this.props.linkToProfile && (createElement("small", { style: __assign({ marginLeft: "64px", fontSize: "12px", color: "#666" }, fontFamily) }, "profile"))),
                            createElement("div", { style: __assign({ fontSize: "14px", lineHeight: "24px", color: "#666", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, fontFamily) }, this.props.orgName)),
                        this.props.connectedPeople.length ? (createElement("div", { style: {
                                display: "flex",
                                backgroundColor: "#eee",
                                alignItems: "center",
                                borderTop: "1px solid #ddd",
                                lineHeight: "32px",
                                padding: "0 16px"
                            } },
                            createElement("div", { style: __assign({}, IEFlex1, { textTransform: "uppercase", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }, fontFamily) }, "Linked Accounts"),
                            createElement("div", { style: __assign({}, IEFlex1, { textAlign: "right", alignItems: "center", fontSize: "12px" }) },
                                createElement("a", { href: pcoUrl(this.props.env)("accounts") + "/unlink", "data-turbolinks": false, style: __assign({ color: "#666", textDecoration: "none", marginLeft: "64px" }, fontFamily) }, "unlink")))) : (createElement("noscript", null)),
                        createElement("style", null, "\n                .NotSmallTopbar__connected-people-list > *:first-child > * { border-top-width: 0 !important }\n              "),
                        createElement("ul", { className: "NotSmallTopbar__connected-people-list", style: { margin: 0, padding: 0, listStyleType: "none" } }, connectedPeopleMenuFormatter(this.props.connectedPeople, this.props.orgName).map(function (_a) {
                            var id = _a.id, person = _a.attributes;
                            return (createElement(HoverableListItem, { component: "li", key: id },
                                createElement("a", { href: pcoUrl(_this.props.env)("accounts") + "/link/new?to=" + id + "&return=" + _this.props.appName + "%2f", "data-turbolinks": false, style: __assign({ marginLeft: "16px", paddingRight: "16px", lineHeight: "48px", display: "block", color: "#444", whiteSpace: "nowrap", borderTop: "1px solid #ddd", textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis" }, fontFamily) }, person.organization_name)));
                        }))),
                    createElement(HoverableListItem, { component: "a", href: pcoUrl(this.props.env)("accounts") + "/logout", "data-turbolinks": false, style: __assign({ textAlign: "center", borderTop: "1px solid #ddd", lineHeight: "48px", display: "block", color: "#444", textDecoration: "none" }, fontFamily) },
                        createElement("svg", { style: { marginRight: ".75em" }, width: "12px", height: "10px", viewBox: "0 0 12 10" },
                            createElement("g", { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
                                createElement("g", { id: "Results-Copy", transform: "translate(-113.000000, -252.000000)", fill: "#444" },
                                    createElement("path", { d: "M124.327628,256.578333 L122.013462,254.285 C121.870962,254.143333 121.683462,254.061667 121.486795,254.053333 C121.282628,254.045 121.092628,254.118333 120.950962,254.258333 C120.666795,254.54 120.666795,255.004167 120.950962,255.285833 L121.974295,256.255 L117.971795,256.255 C117.926795,256.255 117.884295,256.26 117.841795,256.268333 C117.489295,256.33 117.220962,256.633333 117.220962,257 C117.220962,257.410833 117.557628,257.745 117.971795,257.745 L121.990128,257.745 L120.950962,258.820833 C120.815128,258.955833 120.731795,259.1675 120.731795,259.374167 C120.731795,259.575833 120.813462,259.7775 120.950962,259.914167 C121.092628,260.055 121.281795,260.133333 121.480962,260.135833 C121.682628,260.1375 121.871795,260.061667 122.013462,259.920833 L124.327628,257.63 C124.610962,257.348333 124.610962,256.859167 124.327628,256.578333 M116.804167,260.523333 C116.7625,260.515 116.719167,260.510833 116.674167,260.510833 L114.5025,260.510833 L114.5025,253.489167 L116.6475,253.489167 C117.061667,253.489167 117.399167,253.155833 117.399167,252.745 C117.399167,252.378333 117.13,252.074167 116.7775,252.0125 C116.735,252.004167 116.6925,252 116.6475,252 L113.965,252 C113.540833,252 113,252.5075 113,252.904167 L113,261.308333 C113,261.736667 113.5625,262 113.965,262 L116.674167,262 C117.088333,262 117.425,261.665833 117.425,261.255 C117.425,260.889167 117.156667,260.585 116.804167,260.523333", id: "Fill-1" })))),
                        "Log out"))),
            createElement(Unbutton, { style: { marginLeft: "1rem" }, id: "jsLaunchHelpdesk" },
                createElement(HelpIcon, { colors: this.props.colors }))));
    };
    NotSmallTopbar.defaultProps = {
        notifications: function () { return null; },
        search: function () { return null; },
        linkToProfile: true,
        showOrgName: true
    };
    return NotSmallTopbar;
}(Component));

var NotSmallRoute = /** @class */ (function (_super) {
    __extends(NotSmallRoute, _super);
    function NotSmallRoute() {
        var _this = _super.call(this) || this;
        _this.state = {
            entered: false,
            down: false
        };
        return _this;
    }
    NotSmallRoute.prototype.render = function () {
        var _this = this;
        var _a = this.props, active = _a.active, colors = _a.colors, _b = _a.style, style = _b === void 0 ? null : _b, nativeProps = __rest(_a, ["active", "colors", "style"]);
        var getBackgroundColor = function () {
            if (_this.state.entered && _this.state.down)
                return colors.base2;
            if (_this.state.entered || active)
                return colors.base1;
            return "transparent";
        };
        return (createElement("a", __assign({ style: __assign({ lineHeight: "32px", marginRight: "4px", verticalAlign: "middle", borderRadius: "9999px", paddingLeft: "12px", paddingRight: "12px", fontSize: "14px", color: "white", fontWeight: "bold", textDecoration: "none", textTransform: "capitalize", backgroundColor: getBackgroundColor() }, fontFamily, slightBackgroundTransition, style), onMouseEnter: function () { return _this.setState({ entered: true }); }, onMouseLeave: function () { return _this.setState({ entered: false }); }, onMouseDown: function () { return _this.setState({ down: true }); }, onMouseUp: function () { return _this.setState({ down: false }); } }, nativeProps)));
    };
    return NotSmallRoute;
}(Component));

var Clipboard$1 = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "32px" : _b, _c = _a.color, color = _c === void 0 ? "#000" : _c, _d = _a.name, name = _d === void 0 ? "Generic" : _d, children = _a.children;
    return (createElement("svg", { width: size, height: size, viewBox: "0 0 32 32", role: "img", "aria-labelledby": "title desc", style: { display: "block" } },
        createElement("title", { id: "title" },
            "Planning Center ",
            name,
            " App Icon"),
        createElement("desc", { id: "desc" },
            "An image of a clipboard with icon, symbolizing the Planning Center ",
            name,
            " ",
            "app."),
        createElement("path", { d: "M28.4,0H3.7C1.6,0,0,1.6,0,3.7v24.7c0,2,1.6,3.6,3.7,3.6h24.7c2,0,3.6-1.6,3.6-3.6V3.7C32,1.6,30.4,0,28.4,0z M27.2,26.6c0,0.4-0.3,0.6-0.6,0.6H5.4c-0.4,0-0.6-0.3-0.6-0.6V5.4c0-0.4,0.3-0.6,0.6-0.6h4.2v0.9c0,0.4,0.3,0.7,0.7,0.7h11.3 c0.4,0,0.7-0.3,0.7-0.7V4.8h4.2c0.4,0,0.6,0.3,0.6,0.6V26.6z", fill: color }),
        children));
};
var MONO_APP_ICONS = {
    accounts: function (props) { return (createElement(Clipboard$1, { color: "#fff", size: props.size || "20px", name: "Accounts" },
        createElement(Accounts, { color: "#fff", transform: "translate(0, 1)" }))); },
    "check-ins": function (props) { return (createElement(Clipboard$1, { color: "#fff", size: props.size || "20px", name: "CheckIns" },
        createElement(CheckIns, { color: "#fff", transform: "translate(0, 1)" }))); },
    giving: function (props) { return (createElement(Clipboard$1, { color: "#fff", size: props.size || "20px", name: "Giving" },
        createElement(Giving, { color: "#fff", transform: "translate(0, 1)" }))); },
    groups: function (props) { return (createElement(Clipboard$1, { color: "#fff", size: props.size || "20px", name: "Groups" },
        createElement(Groups, { color: "#fff", transform: "translate(0, 1)" }))); },
    people: function (props) { return (createElement(Clipboard$1, { color: "#fff", size: props.size || "20px", name: "People" },
        createElement(People, { color: "#fff", transform: "translate(0, 1)" }))); },
    registrations: function (props) { return (createElement(Clipboard$1, { color: "#fff", size: props.size || "20px", name: "Registrations" },
        createElement(Registrations, { color: "#fff", transform: "translate(0, 1)" }))); },
    resources: function (props) { return (createElement(Clipboard$1, { color: "#fff", size: props.size || "20px", name: "Resources" },
        createElement(Resources, { color: "#fff", transform: "translate(0, 1)" }))); },
    services: function (props) { return (createElement(Clipboard$1, { color: "#fff", size: props.size || "20px", name: "Services" },
        createElement(Services, { color: "#fff", transform: "translate(0, 1)" }))); }
};

var ClientStorage = /** @class */ (function (_super) {
    __extends(ClientStorage, _super);
    function ClientStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClientStorage.prototype.update = function (value) {
        window[this.props.method].setItem(this.props.item, JSON.stringify(value));
        return this.forceUpdate();
    };
    ClientStorage.prototype.render = function () {
        return this.props.render(JSON.parse(window[this.props.method].getItem(this.props.item)) ||
            undefined, this.update.bind(this));
    };
    ClientStorage.defaultProps = {
        method: "localStorage"
    };
    return ClientStorage;
}(Component));

var MENU_GUTTER = 57;
var capitalize = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
var DisclosureChevronIcon$1 = function (props) { return (createElement("svg", __assign({ style: {
        marginLeft: "4px",
        verticalAlign: "middle"
    }, width: "16", height: "16", viewBox: "0 0 16 16" }, props),
    createElement("title", null, "chevron"),
    createElement("polygon", { fill: "currentColor", points: "11.931 4.892 8 8.824 4.069 4.892 2.927 6.034 8 11.108 9.142 9.966 13.073 6.034 11.931 4.892" }))); };
var SmallTopbar = /** @class */ (function (_super) {
    __extends(SmallTopbar, _super);
    function SmallTopbar() {
        var _this = _super.call(this) || this;
        _this.state = {
            routesMenuVisible: false,
            userMenuVisible: false
        };
        return _this;
    }
    SmallTopbar.prototype.componentDidUpdate = function () {
        return this.state.userMenuVisible
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "");
    };
    SmallTopbar.prototype.render = function () {
        var _this = this;
        var activeRoute = this.props.routes.filter(function (_a) {
            var props = _a.props;
            return props.active;
        }) || [];
        var CurrentRouteComponent = this.props.currentRouteComponent;
        var currentRouteText = (activeRoute &&
            activeRoute[0] &&
            activeRoute[0].props &&
            activeRoute[0].props.children) ||
            this.props.appName;
        return (createElement(StyledRoot, { style: __assign({}, this.props.style) },
            createElement("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    height: "48px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    justifyContent: "center"
                }, onClick: function () {
                    _this.props.requestAppsFetch();
                    _this.props.requestConnectedPeopleFetch();
                    return _this.setState(function (_a) {
                        var userMenuVisible = _a.userMenuVisible;
                        return userMenuVisible
                            ? {
                                routesMenuVisible: false,
                                userMenuVisible: false
                            }
                            : {
                                routesMenuVisible: false,
                                userMenuVisible: true
                            };
                    });
                } }, createElement(MONO_APP_ICONS[this.props.appName.toLowerCase()], {
                size: "24px"
            })),
            createElement("div", { style: {
                    position: "absolute",
                    left: 0,
                    top: "48px",
                    width: "100%"
                } }, this.state.routesMenuVisible && this.props.routes),
            createElement(ClientStorage, { item: "Topbar:Small:Menus:User:visibility", render: function (userSwitchState, lsUpdate) {
                    if (userSwitchState === void 0) { userSwitchState = false; }
                    return (createElement("div", { style: {
                            display: _this.state.userMenuVisible ? "block" : "none",
                            position: "fixed",
                            color: "black",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            backgroundColor: "rgba(0,0,0,.25)",
                            msUserSelect: "none",
                            MozUserSelect: "none",
                            WebkitUserSelect: "none",
                            userSelect: "none",
                            WebkitTapHighlightColor: "transparent"
                        }, onClick: function () {
                            return _this.setState(function (_a) {
                                var userMenuVisible = _a.userMenuVisible;
                                return ({
                                    userMenuVisible: !userMenuVisible
                                });
                            });
                        } },
                        createElement("div", { style: {
                                position: "absolute",
                                top: "11px",
                                right: "17px",
                                color: "white"
                            } },
                            createElement("svg", { x: "0px", y: "0px", width: "23.4px", height: "23.3px", viewBox: "0 0 23.4 23.3" },
                                createElement("polygon", { fill: "#fff", points: "11.7,9.5 7.2,5 5.1,7.1 9.6,11.6 5,16.2 7.1,18.3 11.7,13.7 16.2,18.3 18.4,16.2 13.8,11.6 18.3,7.1 16.2,5 " }))),
                        createElement("div", { onClick: function (e) { return e.stopPropagation(); }, style: {
                                display: "flex",
                                flexDirection: "column",
                                position: "relative",
                                height: "100%",
                                width: "calc(100% - " + MENU_GUTTER + "px)",
                                backgroundColor: "#424242" // "white"
                            } },
                            createElement("div", { style: {
                                    backgroundColor: "#363636",
                                    height: "48px",
                                    paddingLeft: "16px",
                                    paddingRight: "16px",
                                    borderBottom: "1px solid #363636",
                                    display: "flex",
                                    alignItems: "center"
                                } },
                                createElement("div", { style: __assign({}, IEFlex1) },
                                    createElement("div", { style: { display: "flex", alignItems: "center" } },
                                        createElement(COLOR_APP_BADGES[_this.props.appName.toLowerCase()], { size: "24px" }),
                                        createElement("span", { style: { marginLeft: "16px" } }),
                                        createElement(MONO_APP_NAME[_this.props.appName.toLowerCase()], {
                                            color: "#fff"
                                        }))),
                                createElement("div", { onClick: function () { return lsUpdate(!userSwitchState); } },
                                    createElement("div", { style: {
                                            lineHeight: "32px",
                                            fontSize: "13px",
                                            borderRadius: "9999px",
                                            backgroundColor: userSwitchState
                                                ? "transparent"
                                                : "#292929",
                                            boxShadow: "0 0 0 1px " + (userSwitchState
                                                ? _this.props.colors.base1
                                                : "#292929"),
                                            display: "flex",
                                            alignItems: "center"
                                        } },
                                        createElement(Avatar, { env: _this.props.env, url: _this.props.userAvatarPath }),
                                        createElement("div", { style: { paddingRight: "8px" } },
                                            createElement(DisclosureChevronIcon$1, { color: userSwitchState
                                                    ? _this.props.colors.base1
                                                    : "#575757" }))))),
                            createElement("div", { style: __assign({}, IEFlex1, { overflowY: "scroll", WebkitOverflowScrolling: "touch" }) },
                                createElement("ul", { style: { padding: 0, margin: 0 } }, appsMenuFormatter(_this.props.apps, _this.props.appName).map(function (_a) {
                                    var name = _a.attributes.name;
                                    return (createElement("li", { key: name, style: {
                                            listStyleType: "none",
                                            borderTop: "1px solid #363636"
                                        } },
                                        createElement("a", { style: {
                                                display: "flex",
                                                alignItems: "center",
                                                height: "48px",
                                                paddingLeft: "16px",
                                                paddingRight: "16px"
                                            }, "data-turbolinks": false, href: pcoUrl(_this.props.env)("accounts") + "/apps/" + name.toLowerCase() },
                                            createElement(COLOR_APP_BADGES[name.toLowerCase()], {
                                                size: "24px"
                                            }),
                                            createElement("span", { style: { marginLeft: "16px" } }),
                                            createElement(MONO_APP_NAME[name.toLowerCase()], {
                                                color: "#fff"
                                            }))));
                                })),
                                createElement("div", { style: {
                                        display: userSwitchState ? "block" : "none",
                                        background: "#FFFFFF",
                                        boxShadow: "0 4px 7px 0 rgba(0,0,0,0.40)",
                                        borderRadius: "3px",
                                        position: "absolute",
                                        right: "12px",
                                        top: "60px",
                                        width: "calc(100% - 68px)",
                                        height: "calc(100% - 124px)"
                                    } },
                                    createElement("div", { style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "100%",
                                            overflowY: "scroll",
                                            WebkitOverflowScrolling: "touch"
                                        } },
                                        createElement("div", { style: {
                                                maxWidth: "100%",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                padding: "16px"
                                            } },
                                            createElement("div", { style: {
                                                    fontSize: "15px",
                                                    lineHeight: "1em",
                                                    marginBottom: "8px"
                                                } },
                                                createElement("strong", null, _this.props.userName)),
                                            createElement("div", { style: { lineHeight: "1em", color: "#444" } }, _this.props.orgName)),
                                        createElement("div", { style: __assign({}, IEFlex1) },
                                            createElement("style", null, ".SmallTopbar__connected-people-list > *:first-child > * { border-top-width: 0 !important }"),
                                            createElement("ul", { className: "SmallTopbar__connected-people-list", style: {
                                                    margin: 0,
                                                    padding: 0,
                                                    listStyleType: "none",
                                                    borderTop: "1px solid #F2F2F2",
                                                    fontSize: "15px"
                                                } }, connectedPeopleMenuFormatter(_this.props.connectedPeople, _this.props.orgName).map(function (_a) {
                                                var id = _a.id, person = _a.attributes;
                                                return (createElement("li", { key: id },
                                                    createElement("a", { href: pcoUrl(_this.props.env)("accounts") + "/link/new?to=" + id + "&return=" + _this.props
                                                            .appName + "%2f", "data-turbolinks": false, style: {
                                                            maxWidth: "100%",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                            marginLeft: "16px",
                                                            paddingRight: "16px",
                                                            lineHeight: "48px",
                                                            display: "block",
                                                            color: "#444",
                                                            borderTop: "1px solid #ddd"
                                                        } }, person.organization_name)));
                                            }))),
                                        createElement("div", null, _this.props.connectedPeople.length && (createElement("a", { href: pcoUrl(_this.props.env)("accounts") + "/unlink", style: {
                                                display: "block",
                                                fontSize: "15px",
                                                textAlign: "center",
                                                borderTop: "1px solid #F2F2F2",
                                                lineHeight: "48px",
                                                color: "#ef5433"
                                            } }, "Unlink My Accounts")))))),
                            createElement("div", { style: {
                                    borderTop: "1px solid #363636",
                                    display: "flex",
                                    flexDirection: "row",
                                    textAlign: "center",
                                    lineHeight: "48px"
                                } },
                                createElement("div", { style: __assign({}, IEFlex1, { borderRight: "1px solid #363636" }) },
                                    createElement(Unbutton, { style: {
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: "15px",
                                            letterSpacing: "-.05em"
                                        }, id: "jsLaunchHelpdesk" }, "Help")),
                                createElement("div", { style: __assign({}, IEFlex1) },
                                    createElement("a", { href: pcoUrl(_this.props.env)("accounts") + "/logout", "data-turbolinks": false, style: {
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: "15px",
                                            letterSpacing: "-.05em",
                                            textDecoration: "none"
                                        } }, "Log out"))))));
                } }),
            createElement("div", { style: __assign({}, IEFlex1, { textAlign: "center", fontWeight: "bold", lineHeight: "48px" }), onClick: function () {
                    return _this.setState(function (_a) {
                        var routesMenuVisible = _a.routesMenuVisible;
                        return routesMenuVisible
                            ? {
                                routesMenuVisible: false,
                                userMenuVisible: false
                            }
                            : {
                                routesMenuVisible: true,
                                userMenuVisible: false
                            };
                    });
                } },
                createElement(CurrentRouteComponent, null, capitalize(currentRouteText)),
                createElement(DisclosureChevronIcon$1, { color: this.props.colors.base3 })),
            createElement("div", null, this.props.notifications ? (this.props.notifications()) : (createElement("div", { style: { width: "48px" } })))));
    };
    SmallTopbar.defaultProps = {
        currentRouteComponent: function (props) { return createElement("span", __assign({}, props)); }
    };
    return SmallTopbar;
}(Component));

var Route = function (_a) {
    var active = _a.active, props = __rest(_a, ["active"]);
    return (createElement("a", __assign({ style: __assign({ display: "block", backgroundColor: "#444", borderBottom: "1px solid #333", color: "#fff", fontWeight: "bold", textTransform: "capitalize", textDecoration: "none", lineHeight: "47px", textAlign: "center" }, fontFamily, (active && { backgroundColor: "#333" })) }, props)));
};

var BellIcon = function (_a) {
    var _b = _a.dot, dot = _b === void 0 ? false : _b, _c = _a.fill, fill = _c === void 0 ? "#fff" : _c, _d = _a.dotFill, dotFill = _d === void 0 ? "#FFDC51" : _d, _e = _a.stroke, stroke = _e === void 0 ? "#000" : _e, style = _a.style, props = __rest(_a, ["dot", "fill", "dotFill", "stroke", "style"]);
    return (createElement("svg", __assign({ width: "24", height: "24", viewBox: "0 0 24 24", style: __assign({ display: "block" }, style) }, props),
        createElement("title", null, "bell"),
        createElement("path", { d: "M21.482,16.626,19.1,13.649V9a7,7,0,0,0-14,0v4.649L2.478,16.929A1.89,1.89,0,0,0,3.952,20H9.285a2.983,2.983,0,0,0,5.633,0H19.86a2.077,2.077,0,0,0,1.622-3.374ZM19.86,18H4.182l2.7-3.375A1,1,0,0,0,7.1,14V9a5,5,0,0,1,10,0v5a1,1,0,0,0,.219.625l2.6,3.25Z", fill: fill }),
        dot && (createElement("circle", { cx: "18", cy: "6", r: "5.5", fill: dotFill, stroke: stroke, strokeWidth: "3" }))));
};

var XIcon = function (_a) {
    var _b = _a.fill, fill = _b === void 0 ? "#A0A0A0" : _b, style = _a.style, nativeProps = __rest(_a, ["fill", "style"]);
    return (createElement("svg", __assign({ width: "16", height: "16", viewBox: "0 0 16 16", style: __assign({ display: "block" }, style) }, nativeProps),
        createElement("title", null, "close-x"),
        createElement("path", { d: "M9.142,8l3.814,3.814-1.142,1.142L8,9.142,4.186,12.956,3.044,11.814,6.858,8,3.044,4.186,4.186,3.044,8,6.858l3.814-3.814,1.142,1.142Z", fill: fill })));
};

var SpyglassIcon = function (_a) {
    var _b = _a.fill, fill = _b === void 0 ? "#000" : _b, style = _a.style, nativeProps = __rest(_a, ["fill", "style"]);
    return (createElement("svg", __assign({ width: "24", height: "24", viewBox: "0 0 24 24", style: __assign({ display: "block" }, style) }, nativeProps),
        createElement("title", null, "search spyglass icon"),
        createElement("path", { d: "M17.352,15.481a8.517,8.517,0,1,0-2.209,2.033l4.642,4.642,2.121-2.121Zm-6.757,1.364a6.5,6.5,0,1,1,6.5-6.5A6.508,6.508,0,0,1,10.595,16.845Z", fill: fill })));
};

/* providers */
/* display components */
/* icons */

export { AppsProvider, BellIcon, ConnectedPeopleProvider, DisplaySwitch, NotSmallTopbar, NotSmallRoute, SmallTopbar, Route as SmallRoute, SpyglassIcon, XIcon };
