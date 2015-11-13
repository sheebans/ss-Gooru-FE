import Ember from 'ember';

export function initialize() {

  Ember.Route.reopen({

    addRouteSpecificClass: function() {
      Ember.$('body').attr('class', this.routeName.replace(/\./g, '_'));
    }.on('activate')

  });
}

export default {
  name: 'route',
  initialize: initialize
};
