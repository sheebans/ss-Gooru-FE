import Ember from 'ember';
import StoreMixin from '../../mixins/store';

export default Ember.Service.extend(StoreMixin, {

  /**
   * Creates a new empty user model
   * @returns {User}
   */
  newUser: function() {
    return this.get('store').createRecord('user');
  },

  /**
   * Save the user model remotely (using gooru endpoint)
   * @param userModel
   * @returns {Promise}
   */
  save: function(userModel) {
    return userModel.save();
  },

  checkUsernameAvailability:function(username){
      return this.get('store').queryRecord('user/availability', {
        keyword: username
      });
  },

  checkEmailAvailability:function(email){
    console.log('checkEmailAvailability', email);
    return new Promise(function(resolve, reject) {});;
    /*return this.get('store').queryRecord('user/availability', {
      keyword: email
    });*/
  }

});
