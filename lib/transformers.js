'use strict';

exports.trim = function(value){
  return value.trim();
};

exports.toNumber = function(value){
  var num = Number(value);
  return isNaN(num) ? 0 : num;
};

exports.toLowerCase = function(value){
  return value.toLowerCase();
};

exports.toUpperCase = function(value){
  return value.toUpperCase();
};
