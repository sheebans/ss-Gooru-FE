import Ember from 'ember';
const { service } = Ember.inject;

/**
 * @typedef {Object} SessionMixin
 */
export default Ember.Mixin.create({

  /**
   * @property {CustomizeSession} custom user session
   */
  session: service('session'),

  /**
   * @property {SessionMixin} user
   */
  me: Ember.computed.alias('session.currentUser'),

  /**
   * Indicates if the user is authenticated
   * @property {boolean}
   */
  isAuthenticated: Ember.computed.bool('session.isAuthenticated'),


});
