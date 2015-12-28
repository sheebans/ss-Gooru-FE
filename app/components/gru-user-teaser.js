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
  "users":  Ember.A([Ember.Object.create({
    'email': 'user_1@test.com',
    'firstName': 'firstname-1',
    'fullName': 'lastname-1 firstname-1',
    'id': 'id-1',
    'lastName': 'lastname-1',
    'profileImageUrl': '/assets/gooru/profile.png',
    'username': 'username-1'
  }),Ember.Object.create({
    'email': 'user_2@test.com',
    'firstName': 'firstname-2',
    'fullName': 'lastname-2 firstname-2',
    'id': 'id-2',
    'lastName': 'lastname-2',
    'profileImageUrl': '/assets/gooru/profile.png',
    'username': 'username-2'
  }),Ember.Object.create({
    'email': 'user_1@test.com',
    'firstName': 'firstname-3',
    'fullName': 'lastname-3 firstname-3',
    'id': 'id-1',
    'lastName': 'lastname-3',
    'profileImageUrl': '/assets/gooru/profile.png',
    'username': 'username-3'
  })]),

  /**
   * Get the first user from the users list
   * @property {Ember.Object}
   */
  firstUser: Ember.computed('users', function(){
    const firstUser = this.get("users")[0];
    return firstUser;
  }),

  /**
   * Get the first user from the users list
   * @property {Ember.Object}
   */
  usersLeft: Ember.computed('users', function(){
    const users = this.get("users").length - 1;
    if (users === 0){
      return null;
    }else{
      return users;
    }
  })


});
