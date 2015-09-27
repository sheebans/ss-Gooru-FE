import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Mixin.create({

  /**
   * @property {CustomizeSession} user session
   */
  session: service('session'),

  /**
   * @property {User}
   */
  me: Ember.computed.alias('session.currentUser'),

  /**
   * Indicates if the user is authenticated
   * @property {boolean}
   */
  isAuthenticated: Ember.computed.bool('session.isAuthenticated'),


});
