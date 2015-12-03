import BaseValidator from 'ember-cp-validations/validators/base';
import Ember from 'ember';

export default BaseValidator.extend({

  userService: Ember.inject.service('api-sdk/user'),

  validate(value) {
    if (value) {
      return this.get('userService').checkEmailAvailability(value)
        .then(function (availability) {
          if (availability.get('availability')) {
            return 'This Email id is already registered.';
          } else {
            return true;
          }
        });
    } else {
      return true;
    }
  }

});
