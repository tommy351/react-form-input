# react-form-input

[![npm version](https://badge.fury.io/js/react-form-input.svg)](http://badge.fury.io/js/react-form-input)

An enhanced input component comes with validators and transformers.

## Installation

``` bash
$ npm install react-form-input --save
```

## Example

``` js
import Input, {validators, transformers} from 'react-form-input';

class Form extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      name: ''
    };
  }

  render(){
    return (
      <form>
        <Input
          value={this.state.name}
          validators={[
            validators.required('Please enter your name')
          ]}
          transformers={[
            transformers.trim
          ]}>
      </form>
    );
  }
}
```

## API

### Input

**Props:**

- `validators`: An array contains validator functions
- `transformers`: An array contains transformer functions
- `onChange`: Fired when the value changed
- `defaultValue`: The initial value of input
- `value`: The value of input
- `type`: The type of input (text, email, number, textarea, etc.)
- `dirtyClass`: The class name appended to the input when the value has been changed
- `pristineClass`: The class name appended to the input when the value has not been changed
- `validClass`: The class name appended to the input when the value is valid
- `invalidClass`: The class name appended to the input when the value is invalid

**getValue()**

Returns the value of the input.

**getError()**

Returns the error of the input.

**setValue()**

Sets the value of the input.

**setError()**

Sets the error of the input.

**reset()**

Reset the state of the input.

**isDirty()**

Returns true if the value has been changed.

**isPristine()**

Returns true if the value has not been changed.

### Validators

**required([message])**

Checks whether the value is empty.

**equals(str, [message])**

Checks whether the value equal to a string.

**startsWith(str, [message])**

Checks whether the value starts with a string.

**endsWith(str, [message])**

Checks whether the value ends with a string.

**match(regex, [message])**

Checks whether the value matches a regular expression.

**length(min, max, [message])**

Checks the length of the value.

**minLength(min, [message])**

Checks the minimum length of the value.

**maxLength(max, [message])**

Checks the maximum length of the value.

**email([message])**

Checks whether the value is a valid email.

**url([message])**

Checks whether the value is a valid URL.

### Transformers

**trim**

Trims the string.

**toNumber**

Transforms the value to a number.

**toLowerCase**

Transforms the value to lower case.

**toUpperCase**

Transforms the value to upper case.

## FAQ

### How to customize a validator?

A validator is a function that returns a error message when the value is invalid. For example:

``` js
function tweetValidator(value){
  return value.length <= 140;
}
```

### How to customize a transformer?

A transformer is a function that takes the value and returns a new transformed value, just like a reducer. For example:

``` js
function lowerCaseTransformer(value){
  return value.toLowerCase();
}
```

## License

MIT