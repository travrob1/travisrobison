'use strict';
/*global require, __dirname, console, process */
var express = require('express');
var logger = require('morgan');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.use(logger('dev'));

console.log('[%s] Listening on http://localhost:%d', app.settings.env, process.env.PORT || 5000);
app.listen(process.env.PORT || 5000);
