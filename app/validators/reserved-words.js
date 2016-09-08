import BaseValidator from 'ember-cp-validations/validators/base';
import {RESERVED_WORDS} from 'gooru-web/config/config';

export default BaseValidator.extend({
  i18n: Ember.inject.service(),

  validate(value, options) {
    if(value) {
      let reservedWord = RESERVED_WORDS.find(function(item, index, enumerable){
          return item === value;
      });
      return reservedWord ? this.get('i18n').t("sign-up.error-username-taken").string : true;
    } else {
      return true;
    }
  }
});
