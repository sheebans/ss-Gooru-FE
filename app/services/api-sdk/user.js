import Ember from "ember";
import StoreMixin from "../../mixins/store";

export default Ember.Service.extend(StoreMixin, {

  /**
   * Creates a new user with the specified properties
   * @param user user properties
   * @returns {*|Ember.RSVP.Promise}
   */
  create: function(user) {
    var model = this.get("store").createRecord('sign-up', user);
    return model.save();
  },
  checkUsernameAvailabilty:function(username){
  	return this.get('store').queryRecord('user/availability', {
        keyword: username
        
      });
  }
});
