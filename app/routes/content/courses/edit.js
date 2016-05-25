import Ember from 'ember';
import BuilderItem from 'gooru-web/models/content/builder/item';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service("api-sdk/course"),

  /**
   * @requires service:session
   */
  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Remix collection action, when clicking remix/edit at the collection level
     * @param {Content/Collection}
     */
    remixCollection: function(colection){
      var remixModel = {
        content: collection
      };
      this.send('showModal', 'content.modals.gru-collection-remix', remixModel);
    }

  },
  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    var course = this.get('courseService').fetchById(params.courseId);

    return Ember.RSVP.hash({
      course: course
    });
  },

  setupController(controller, model) {
    model.course.children = model.course.children.map(function (unit) {
      // Wrap every unit inside of a builder item
      return BuilderItem.create({
        data: unit
      });
    });

    controller.set('course', model.course);
  }

});
