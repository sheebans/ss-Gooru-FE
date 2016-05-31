import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  username: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please enter a username.'
      }),
      validator('length', {
        min: 4,
        max: 20,
        message: 'Username must be between 4 and 20 characters.'
      })
    ]
  },

  usernameAsync: {
    validators: [
      validator('username')
    ]
  },

  firstName: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please enter your first name.'
      }),
      validator('length', {
        min: 2,
        message: 'First name must have at least 2 letters.'
      }),
      validator('format', {
        regex: /^[a-zA-Z- ]+$/,
        message: "Please enter only letters."
      })
    ]
  },

  lastName: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please enter your last name.'
      }),
      validator('length', {
        min: 2,
        message: 'Last name must have at least 2 letters.'
      }),
      validator('format', {
        regex: /^[a-zA-Z- ]+$/,
        message: "Please enter only letters."
      })
    ]
  },

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
    }),
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
    validator(function(value,options,model/* ,attribute*/) {
      return value !== model.get('password') ? `Passwords do not match.` : true ;
    })
  ],

  email: [
    validator('format', {
      regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      message: 'Please enter a valid email address.'
    })
  ],

  emailAsync: {
    validators: [
      validator('email')
    ]
  }
});
