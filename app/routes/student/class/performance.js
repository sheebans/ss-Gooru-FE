import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Methods
  model: function() {
    const route = this;
    const course = route.modelFor('student.class').course;
    let classId = route.modelFor('student.class').class.id;
    return Ember.RSVP.hash({
      course: course,
      classId: classId
    });
  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller,model) {
    controller.set('course', model.course);
    controller.set('classId', model.classId);
    controller.loadData();
  },

  deactivate: function () {
    this.get('controller').resetValues();
  }
});
