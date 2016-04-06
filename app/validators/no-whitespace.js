import BaseValidator from 'ember-cp-validations/validators/base';

export default BaseValidator.extend({
  validate(value, options) {
    if(value!=null){
          return value.trim().length === 0 ? options.message : true;
        }
    return true;
  }
});
