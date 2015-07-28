'use strict';

var React = require('react');
var assign = require('object-assign');

function noop(){}

exports = module.exports = React.createClass({
  displayName: 'Input',

  propTypes: {
    validators: React.PropTypes.arrayOf(React.PropTypes.func),
    transformers: React.PropTypes.arrayOf(React.PropTypes.func),
    onChange: React.PropTypes.func,
    initialValue: React.PropTypes.any,
    value: React.PropTypes.any,
    type: React.PropTypes.string.isRequired,
    dirtyClass: React.PropTypes.string,
    pristineClass: React.PropTypes.string,
    validClass: React.PropTypes.string,
    invalidClass: React.PropTypes.string
  },

  getInitialState: function(){
    var initialValue = this.transform(
      this.props.hasOwnProperty('value') ? this.props.value : this.props.initialValue
    );

    return {
      value: initialValue,
      error: this.validate(initialValue),
      dirty: false
    };
  },

  getDefaultProps: function(){
    return {
      validators: [],
      transformers: [],
      onChange: noop,
      type: 'text',
      dirtyClass: 'dirty',
      pristineClass: 'pristine',
      validClass: 'valid',
      invalidClass: 'invalid'
    };
  },

  componentWillReceiveProps: function(nextProps){
    if (nextProps.hasOwnProperty('value') && nextProps.value !== this.props.value){
      var value = this.transform(nextProps.value);

      this.setState({
        value: value,
        error: this.validate(value)
      });
    }
  },

  render: function(){
    var classNames = [];
    var tagName = this.props.type === 'textarea' ? 'textarea' : 'input';

    if (this.isDirty()) classNames.push(this.props.dirtyClass);
    if (this.isPristine()) classNames.push(this.props.pristineClass);
    classNames.push(this.getError() ? this.props.invalidClass : this.props.validClass);

    return React.createElement(tagName, assign({}, this.props, {
      className: classNames.join(' '),
      value: this.getValue(),
      onChange: this.handleChange
    }));
  },

  handleChange: function(e){
    var value = this.transform(
      e.currentTarget ? e.currentTarget.value : e.target.value
    );
    var error = this.validate(value);
    var newState = {
      value: value,
      error: error
    };

    this.props.onChange(newState);
    this.setState(newState);
  },

  getValue: function(){
    return this.state.value;
  },

  getError: function(){
    return this.state.error;
  },

  reset: function(){
    this.setState(this.getInitialState());
  },

  isDirty: function(){
    return this.state.dirty;
  },

  isPristine: function(){
    return !this.state.dirty;
  },

  validate: function(value){
    var error = null;
    var validators = this.props.validators;

    for (var i = 0, len = validators.length; i < len; i++){
      error = validators[i](value);
      if (error) return error;
    }

    return error;
  },

  transform: function(value_){
    var value = value_;
    var transformers = this.props.transformers;

    for (var i = 0, len = transformers.length; i < len; i++){
      value = transformers[i](value);
    }

    return value;
  }
});

exports.validators = require('./validators');
exports.transformers = require('./transformers');
