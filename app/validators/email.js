import BaseValidator from 'ember-cp-validations/validators/base';
import Ember from 'ember';

export default BaseValidator.extend({

  profileService: Ember.inject.service('api-sdk/profile'),

  validate(value) {
    if (value) {
      return this.get('profileService').checkEmailAvailability(value)
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
