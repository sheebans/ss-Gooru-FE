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
   * Current answer
   * @property {RubricAnswer} currentAnswer
   */
  currentAnswer: Ember.computed('currentUserId', 'userMappings', function() {
    return this.get('userMappings')[this.get('currentUserId')].answer;
  }),

  /**
   * Current grade
   * @property {RubricGrade} currentGrade
   */
  currentGrade: Ember.computed('currentUserId', 'userMappings', function() {
    return this.get('userMappings')[this.get('currentUserId')].grade;
  }),

  /**
   * Current user
   * @property {User} currentUser
   */
  currentUser: Ember.computed('currentUserId', 'userMappings', function() {
    return this.get('userMappings')[this.get('currentUserId')].user;
  }),

  /**
   * Current user
   * @property {String} currentUserId
   */
  currentUserId: null,

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

  /**
   * Mappings for users, answers and grades
   * @property {Map} userMappings
   */
  userMappings: null,

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
    const userId = user.get('id');
    let { answer } = controller.get('userMappings')[userId];
    if (!answer) {
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
        .then(newAnswer => {
          let mappings = controller.get('userMappings');
          mappings[userId].answer = newAnswer;
        });
    }
  }
});
