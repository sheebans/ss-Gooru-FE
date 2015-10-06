import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import SessionMixin from '../mixins/session';

/**
 * @typedef {object} ApplicationRoute
 */
export default Ember.Route.extend(ApplicationRouteMixin, SessionMixin, {

  actions: {
    /**
     * Action triggered when submitting the login form
     * @see application.hbs
     * @see app-header.hbs
     */
    onAuthenticate: function() {
      this.transitionTo('/index');
    },

    /**
     * Action triggered when login out
     */
    invalidateSession: function() {
      this.get('session').invalidate();
    },


    /**
     * Action triggered when the user search for collections
     * @see application.hbs
     * @see app-header.js
     */
    onSearch: function (term){
      this.transitionTo('/search/collections?term=' + term);
    }
  }
});
