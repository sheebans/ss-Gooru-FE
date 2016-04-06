import BaseValidator from 'ember-cp-validations/validators/base';

export default BaseValidator.extend({
  validate(value, options, model, attribute) {
    console.log("VALUE"+value);
    if(value!=null){
     // if(value.match("^(https?://)?(([\\w!~*'().&=+$%-]+: )?[\\w!~*'().&=+$%-]+@)?(([0-9]{1,3}\\.){3}[0-9]{1,3}|([\\w!~*'()-]+\\.)*([\\w^-][\\w-]{0,61})?[\\w]\\.[a-z]{2,6})(:[0-9]{1,4})?((/*)|(/+[\\w!~*'().;?:@&=+$,%#-]+)+/*)$")){
      if(value.match(/localhost/)){
      let url =new URL(value);
        console.log("URL Object:"+URL);
        console.log("result type: "+typeof url);
        console.log("url host"+ url.host);
        return url.host === window.location.host ? 'You can not add a Gooru url as a resource.' : true;
      }
    }
    return true;
    }
});
