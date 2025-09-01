"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visibility = exports.weather = void 0;
var weather;
(function (weather) {
    weather["Sunny"] = "sunny";
    weather["Rainy"] = "rainy";
    weather["Cloudy"] = "cloudy";
    weather["Windy"] = "windy";
    weather["Stormy"] = "stormy";
})(weather || (exports.weather = weather = {}));
var visibility;
(function (visibility) {
    visibility["Great"] = "great";
    visibility["Good"] = "good";
    visibility["Ok"] = "ok";
    visibility["Poor"] = "poor";
})(visibility || (exports.visibility = visibility = {}));
