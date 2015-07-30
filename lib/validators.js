'use strict';

var validator = require('validator');

exports.required = function(message){
  message = message || 'Required';

  return function(value){
    if (!value || !value.length) return message;
  };
};

exports.equals = function(str, message){
  message = message || 'The value does not equal to ' + str;

  return function(value){
    if (value !== str) return message;
  };
};

exports.startsWith = function(str, message){
  var length = str.length;
  message = message || 'The value does not start with ' + str;

  return function(value){
    if (value == null || value.substring(0, length) !== str) return message;
  };
};

exports.endsWith = function(str, message){
  var length = str.length;
  message = message || 'The value does not start with ' + str;

  return function(value){
    if (value == null || value.substring(value.length - length, value.length) !== str){
      return message;
    }
  };
};

exports.match = function(regex, message){
  message = message || 'The value does not match';

  return function(value){
    if (value == null || !regex.test(value)) return message;
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

exports.minLength = function(min, message){
  message = message || 'The minimum length is ' + min;

  return function(value){
    if (value != null && value.length < min){
      return message;
    }
  };
};

exports.maxLength = function(max, message){
  message = message || 'The maximum length is ' + max;

  return function(value){
    if (value != null && value.length > max){
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
