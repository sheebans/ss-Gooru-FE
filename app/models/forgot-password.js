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
  }
});

/**
 * Profile model for the forgot password
 *
 * @typedef {Object} ProfileModel
 */
export default Ember.Object.extend(Validations,{

  /**
   * @property {string} username - The profile username
   */
  username: null

});
