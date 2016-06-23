import BaseValidator from 'ember-cp-validations/validators/base';

export default BaseValidator.extend({
  validate(value, options) {
    if(value != null) {
      if(value.match("^(https?://)?(([\\w!~*'().&=+$%-]+: )?[\\w!~*'().&=+$%-]+@)?(([0-9]{1,3}\\.){3}[0-9]{1,3}|([\\w!~*'()-]+\\.)*([\\w^-][\\w-]{0,61})?[\\w]\\.[a-z]{2,6})(:[0-9]{1,4})?((/*)|(/+[\\w!~*'().;?:@&=+$,%#-]+)+/*)$")){
        return value.indexOf(options.location) !== -1 ? options.message : true;
      }
      return "Invalid URL";
    }
    return true;
    }
});
