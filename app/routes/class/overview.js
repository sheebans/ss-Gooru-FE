import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service("session"),

  /**
   * @requires service:api-sdk/course-location
   */
  courseLocationService: Ember.inject.service("api-sdk/course-location"),

  // -------------------------------------------------------------------------
  // Attributes


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Launch an assessment on-air
     *
     * @function actions:launchOnAir
     */
    launchOnAir: function (collectionId) {
      const currentClass = this.modelFor('class').class;
      const classId = currentClass.get("id");
      this.transitionTo('reports.collection', classId, collectionId);
    },

    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:playItem
     * @param {string} unitId - Identifier for a unit
     * @param {string} lessonId - Identifier for lesson
     * @param {string} collectionId - Identifier for a collection or assessment
     */
    playResource: function (unitId, lessonId, collectionId) {
      const currentClass = this.modelFor('class').class;
      const classId = currentClass.get("id");
      const courseId = currentClass.get("course");
      this.transitionTo('context-player', classId, courseId, unitId, lessonId, collectionId);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },
  afterModel(model, transition) {
    if (true) {
      this.transitionTo('quick-start', this.modelFor('class').class);
    }
  },
  model: function () {
    const currentClass = this.modelFor('class').class;
    const units = this.modelFor('class').units;
    var userId = this.get('session.userId');
    var userLocation = Ember.RSVP.resolve('');
    if (currentClass.isStudent(userId)) {

      // Get the user location in a course only if the user is enrolled
      // as a student for the course
      userLocation = this.get("courseLocationService").findOneByUser(userId);
    }

    return Ember.RSVP.hash({
      userLocation: userLocation,
      units: units
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function (controller, model) {
    var userLocation = (Ember.typeOf(model.userLocation) === 'instance') ?
    model.userLocation.get('unit') + '+' +
    model.userLocation.get('lesson') + '+' +
    model.userLocation.get('collection') : model.userLocation;

    controller.set('userLocation', userLocation);
    controller.set('units', model.units);

    controller.get('classController').selectMenuItem('overview');
  }
});
