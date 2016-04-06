import BaseValidator from 'ember-cp-validations/validators/base';

export default BaseValidator.extend({
  validate(value, options, model, attribute) {
    if(value!=null){
          return value.trim().length === 0 ? 'Please enter a valid url.' : true;
        }
    return true;
  }
});
