'use strict';

var validator = require('validator');

exports.required = function(message){
  message = message || 'Required';

  return function(value){
    if (!value || !value.length) return message;
  };
};

exports.length = function(min, max, message){
  if (!message){
    if (min && max){
      message = 'The length must be between ' + min + ' to ' + max;
    } else if (max){
      message = 'The maximum length is ' + max;
    } else if (min){
      message = 'The minimum length is ' + min;
    }
  }

  return function(value){
    if (value == null) return;

    if (value.length < min || (max && value.length > max)){
      return message;
    }
  };
};

exports.email = function(message){
  message = message || 'Email is invalid';

  return function(value){
    if (!validator.isEmail(value)) return message;
  };
};

exports.url = function(message){
  message = message || 'URL is invalid';

  return function(value){
    if (!validator.isURL(value)) return message;
  };
};
