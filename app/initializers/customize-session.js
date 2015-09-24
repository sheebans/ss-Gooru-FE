import Ember from 'ember';
import Session from 'ember-simple-auth/session';

var SessionWithCurrentUser = Session.extend({
  currentUser: function() {
    var userId = this.get('user_id');
    if (!Ember.isEmpty(userId)) {
      return this.container.lookup('store:main').find('user', userId);
    }
  }.property('user_id')
});

export default {
  name: 'customize-session',
  initialize: function(container) {
    container.register('session:withCurrentUser', SessionWithCurrentUser);
  }
};
