import Ember from 'ember';

export function initialize(app) {

  var historyCache = Ember.Object.extend({
    /**
     * @property {string} the last route
     */
    lastRoute: null,

    /**
     * @property {string} the current route
     */
    currentRoute: null,
    /**
     * @property {bool} indicates if there is history
     */
    empty: Ember.computed.not("currentRoute")
  });

  Ember.Route.reopen({

    /**
     * This event handlers sets an specific class to the body everytime a route is activated
     */
    addRouteSpecificClass: function() {
      var currentRoute = this.routeName;
      Ember.$('body').attr('class', currentRoute.replace(/\./g, '_'));
    }.on('activate'),

    /**
     * This event handlers saves the current route when it is activated
     */
    saveCurrentRoute: function() {
      var currentRoute = this.routeName;
      this.get('history').set('currentRoute', currentRoute);
    }.on('activate'),

    /**
     * When leaving a route this handler save the previous route so it can be accessed from history
     */
    saveLastRoute: function() {
      var savedRoute = this.get('history.lastRoute');
      var currentRoute = this.routeName;
      var parentRouteIdx = savedRoute && savedRoute.indexOf(currentRoute);

      if (!currentRoute.match(/\.loading/) &&
        (!savedRoute || parentRouteIdx === -1)) {
        // On deactivate, save the "child-most" route
        // For example: on deactive save the route "search.collection", but "search" (the parent route)
        // will not be saved
        this.get('history').set('lastRoute', currentRoute);
      }
    }.on('deactivate'),

    /**
     * Resetting the scroll to the top of the page when browsing to a new page
     */
    restoreScroll: function() {
      window.scrollTo(0,0);
    }.on('activate')

  });

  // History cache is available to all routes
  app.register('history:main', historyCache);
  app.inject('route', 'history', 'history:main');
}

export default {
  name: 'route',
  initialize: initialize
};
