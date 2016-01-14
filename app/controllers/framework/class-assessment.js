import Ember from 'ember';

export default Ember.Controller.extend({

  // TODO: Get this objects dynamically from the route

  collection: Ember.Object.create({}),

  users: Ember.A([]),

  results: Ember.A([])

});
