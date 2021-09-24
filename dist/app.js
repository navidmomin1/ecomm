"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 4800;

app.get("/", function (app, res) {
    res.send("API is Es6 1 working");
});

app.listen(port, function (err) {
    if (err) {
        throw err;
    } else {
        console.log("Server is listening");
    }
});