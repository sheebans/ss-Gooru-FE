import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events
  model() {
    const route = this;
    const currentClass = route.modelFor('student.class').class;
    const course = route.modelFor('student.class').course;
    const userId = route.get('session.userId');
    return Ember.Object.create({
      currentClass,
      course,
      userId
    });
  },

  setupController(controller, model) {
    controller.set('currentClass', model.get('currentClass'));
    controller.set('course', model.get('course'));
    controller.set(
      'courseId',
      model.get('course') && model.get('course').id
        ? model.get('course').id
        : null
    );
    controller.set('userId', model.get('userId'));
    let activeCategory = controller.get('activeCategory');
    if (activeCategory) {
      controller.fetchSubjectsByCategory(activeCategory);
    }
  },

  resetController(controller) {
    controller.set('taxonomySubjects', Ember.A([]));
  }
});
