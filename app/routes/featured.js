import Ember from 'ember';


export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {ProfileService} Search service object
   */
   searchService: Ember.inject.service('api-sdk/search'),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    let route = this;
    return route.get('searchService').searchFeaturedCourses("*").then(function(result){
      return Ember.RSVP.hash({
        courses:result
      })
    });
  },

  setupController: function (controller, model) {
    controller.set('courses', model.courses);
  }

});
