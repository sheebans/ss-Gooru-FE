import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-user-teaser'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     *Action triggered when click the username
     */
    selectUser: function() {
      this.sendAction("onSelectUser", this.get('firstUser'));
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * List of users to show
   * @property {Array}
   */
  "users": null,

  /**
   * Get the first user from the users list
   * @property {Ember.Object}
   */
  firstUser: Ember.computed('users.[]', function(){
    const firstUser = this.get("users")[0];
    return firstUser;
  }),

  /**
   * Get the first user from the users list
   * @property {Ember.Object}
   */
  usersLeft: Ember.computed('users.[]', function(){
    return this.get('users.length') - 1;
  })


});
