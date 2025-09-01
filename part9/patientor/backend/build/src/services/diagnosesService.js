"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = void 0;
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
const getEntries = () => {
    return diagnoses_1.default;
};
const findById = (id) => {
    return diagnoses_1.default.find((d) => d.code === id);
};
exports.findById = findById;
const addEntry = (entry) => {
    diagnoses_1.default.push(entry);
    return entry;
};
exports.default = { getEntries, addEntry, findById: exports.findById };
