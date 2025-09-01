"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewDiaryEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('date' in object &&
        'weather' in object &&
        'visibility' in object &&
        'comment' in object) {
        const newEntry = {
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            comment: parseComment(object.comment),
        };
        return newEntry;
    }
    throw new Error('Incorrect data: a field missing');
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
const isWeather = (param) => {
    return Object.values(types_1.weather)
        .map((v) => v.toString())
        .includes(param);
};
const parseWeather = (weather) => {
    if (!isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather');
    }
    return weather;
};
const isVisibility = (param) => {
    return Object.values(types_1.visibility)
        .map((v) => v.toString())
        .includes(param);
};
const parseVisibility = (visibility) => {
    if (!isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility');
    }
    return visibility;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseComment = (comment) => {
    if (!isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }
    return comment;
};
exports.default = toNewDiaryEntry;
