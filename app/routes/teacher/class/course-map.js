import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service("session"),

  i18n: Ember.inject.service(),
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
      const currentClass = this.modelFor('teacher.class').class;
      const classId = currentClass.get("id");
      this.transitionTo('reports.collection', classId, collectionId);
    },

    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:playItem
     * @param {string} unitId - Identifier for a unit
     * @param {string} lessonId - Identifier for lesson
     * @param {string} collection - collection or assessment
     */
    playResource: function (unitId, lessonId, collection) {
      if (collection.get("isExternalAssessment")){
        window.open(collection.get("url"));
      }
      else{
        const currentClass = this.modelFor('teacher.class').class;
        const classId = currentClass.get("id");
        const courseId = currentClass.get("courseId");
        const role = "teacher";
        this.transitionTo('context-player', classId, courseId, unitId,
          lessonId, collection.get("id"), { queryParams: { role: role, type: collection.get("collectionType") }});
      }
    },

    /**
     * Edit content action, when clicking Edit content on Class Overview
     * @param {Content/Course}
     */
    editContent: function(id){
      this.transitionTo("content.courses.edit",id);
    }
  },

  // -------------------------------------------------------------------------
  // Methods
  model: function() {
    const route = this;
    const currentClass = route.modelFor('teacher.class').class;
    const course = route.modelFor('teacher.class').course;
    const units = course.get('children') || [];
    const classMembers = currentClass.get('members');
    return Ember.RSVP.hash({
      course: course,
      units: units,
      currentClass: currentClass,
      classMembers: classMembers
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function (controller, model) {
    controller.set('units', model.units);
    controller.set('course', model.course);
    controller.set('classMembers', model.classMembers);
    controller.get('classController').selectMenuItem('course-map');
  }

});
