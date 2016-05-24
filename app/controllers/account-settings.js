import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

  profileService: Ember.inject.service('api-sdk/profile'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Edit Account
     */
    editAccount: function () {
      console.log('edit');
      //this.set('isEditing', true);
    }

  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * The profile presented to the user
   * @property {Profile}
   */
  profile: null,

  /**
   * @property {String} profile gender
   */
  gender: Ember.computed('profile.gender', function() {
    var gender = this.get('profile.gender');
    var lowerGender = gender.toLowerCase();
    return (lowerGender === 'female' || lowerGender === 'male') ? gender : '';
  })

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
