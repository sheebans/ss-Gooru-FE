import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
export default Ember.Route.extend(PrivateRouteMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {RubricService} Service to retrieve rubric information
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @type {Session} Session information
   */
  session: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function(params) {
    const studentId = params.studentId;
    const classId = params.classId;
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;
    const collectionId = params.collectionId;
    const questionId = params.questionId;
    return Ember.RSVP.hash({
      answer: this.get('rubricService').getAnswerToGrade(
        studentId,
        classId,
        courseId,
        collectionId,
        questionId,
        unitId,
        lessonId
      ),
      users: this.get('rubricService')
        .getStudentsForQuestion(questionId, classId, courseId, collectionId)
        .then(users =>
          this.get('profileService').readMultipleProfiles(users.students)
        ),
      currentUserId: studentId
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('answer', model.answer);
    controller.set('users', model.users);
    controller.set(
      'currentUser',
      model.users.findBy('id', model.currentUserId)
    );
  }
});
