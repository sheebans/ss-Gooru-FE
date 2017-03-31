import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Methods
  model: function() {
    const route = this;
    const course = route.modelFor('student.class').course;
    return Ember.RSVP.hash({
      course: course
    });
  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller,model) {
    controller.set('course', model.course);
    controller.loadData();
  },

  deactivate: function () {
    this.get('controller').resetValues();
  }
});
