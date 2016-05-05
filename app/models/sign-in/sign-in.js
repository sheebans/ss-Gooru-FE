import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  username: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please enter a username.'
      })
    ]
  },

  usernameAsync: {
    validators: [
      validator('google-username'),
      validator('google-email')
    ]
  },

  password: [
    validator('presence', {
      presence: true,
      message: 'Please enter a password.'
    })
  ]

});

/**
 * Profile model with the user account information
 *
 * @typedef {Object} ProfileModel
 */
export default Ember.Object.extend(Validations,{

  /**
   * @property {string} username - The profile username
   */
  username: null,

  /**
   * @property {string} usernameAsync - used to validate on submit
   */
  usernameAsync: null,

  /**
   * @property {string} password  - The profile password
   */
  password: null

});
