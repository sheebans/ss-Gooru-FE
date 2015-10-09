import Ember from 'ember';

/**
 * @typedef {object} IndexRoute
 */
export default Ember.Route.extend({

  subjectService: Ember.inject.service("api-sdk/subject"),

  model: function() {
    var subjects = this.get("subjectService").readAll();

    return Ember.RSVP.hash({
      subjects: subjects
    });
  }

});
