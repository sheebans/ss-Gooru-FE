import Ember from 'ember';

/**
 * @typedef {object} Grading Player Controller
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {RubricService} Service to retrieve rubric information
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  queryParams: [
    'classId',
    'courseId',
    'unitId',
    'lessonId',
    'collectionId',
    'questionId'
  ],

  actions: {
    /**
     * Open student roster
     */
    openStudentRoster: function() {
      this.set('showRoster', true);
    },
    /**
     * Close student roster
     */
    closeRoster: function() {
      this.set('showRoster', false);
    },
    /**
     * Triggered when current user has been changed
     */
    changeUser: function() {
      Ember.run.bind(this, function() {
        this.get('changeAnswer')(this);
      });
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Rubric answers
   * @property {Map} answers
   */
  answers: null,

  /**
   * The class id
   * @property {String} classId
   */
  classId: null,

  /**
   * The course id
   * @property {String} courseId
   */
  courseId: null,

  /**
   * Current user
   * @property {User} currentUser
   */
  currentUser: null,

  /**
   * The unit id
   * @property {String} unitId
   */
  unitId: null,

  /**
   * The lesson id
   * @property {String} lessonId
   */
  lessonId: null,

  /**
   * The collection id
   * @property {String} collectionId
   */
  collectionId: null,

  /**
   * The question id
   * @property {String} questionId
   */
  questionId: null,

  /**
   * If the student roster should be hidden
   * @property {Boolean} showRoster
   */
  showRoster: false,

  /**

   * Current student id
   * @property {String} studentId
   */
  studentId: null,

  /**
   * If the response should be hidden
   * @property {Boolean} hideResponse
   */

  hideResponse: false,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Find answer to grade
   */
  getAnswerToGrade: function(
    studentId,
    classId,
    courseId,
    collectionId,
    questionId,
    unitId,
    lessonId
  ) {
    return this.get('rubricService').getAnswerToGrade(
      studentId,
      classId,
      courseId,
      collectionId,
      questionId,
      unitId,
      lessonId
    );
  },

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Change user answer
   */
  changeAnswer: function(controller) {
    const user = controller.get('currentUser');
    if (controller.get('answers').has(user.get('id'))) {
      controller.set('answer', controller.get('answers').get(user.get('id')));
    } else {
      controller
        .getAnswerToGrade(
          user.get('id'),
          controller.get('classId'),
          controller.get('courseId'),
          controller.get('collectionId'),
          controller.get('questionId'),
          controller.get('unitId'),
          controller.get('lessonId')
        )
        .then(function(answer) {
          let answers = controller.get('answers');
          answers.set(user.get('id'), answer);
          controller.set('answer', answer);
        });
    }
  }
});
