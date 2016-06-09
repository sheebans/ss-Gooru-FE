import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  password: [
    validator('presence', {
      presence: true,
      message: 'Please enter a password.'
    }),
    validator('format', {
      regex: /^\w+$/,
      message: "Please don't use special characters."
    }),
    validator('length', {
      min: 5,
      max: 14,
      message: "Password must be between 5 and 14 characters."
    })
  ],

  rePassword:[
    validator('presence', {
      presence: true,
      message: 'Please confirm your password.'
    }),
    validator('format', {
      regex: /^\w+$/,
      message: "Please don't use special characters."
    }),
    validator('confirmation', {
      on: 'password',
      message: 'Passwords do not match.'
    })
  ]
});
