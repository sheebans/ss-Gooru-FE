import Ember from 'ember';
import { getBarGradeColor, toLocal } from 'gooru-web/utils/utils';
import Context from 'gooru-web/models/result/context';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['class', 'gru-report-panel'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @type {PerformanceService} Service to retrieve class performance summary
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @requires service:api-sdk/course-map
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  /**
   * @requires {Ember.Service} session management
   */
  session: Ember.inject.service('session'),

  /**
   * @requires {Ember.Service} Service to retrieve an assessment result
   */
  userSessionService: Ember.inject.service('api-sdk/user-session'),

  /**
   * @requires {AssessmentService} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires {CollectionService} Service to retrieve a collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @requires {LessonService} Service to retrieve a lesson
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  /**
   * @property {Ember.Service} Service to update analytics report.
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates the status of the spinner
   * @property {Boolean}
   */
  isLoading: false,

  /**
   * Indicates the status of the spinner for until report API is Load
   * @property {Boolean}
   */
  isReportLoading: false,

  /**
   * switch between the course  and report page
   * @property {Boolean}
   */
  courseView: true,

  /**
   * own report or  teacher report page  diffrentiate
   * @property {Boolean}
   */
  ownReport: false,

  /**
   * @property {AssessmentResult}
   */
  assessmentResult: null,

  /**
   * @property {UserSession[]}
   */
  completedSessions: [],

  /**
   * @property {collections[]}
   */
  collections: Ember.computed('assessmentResult', function() {
    let component = this;
    if (component.get('assessmentResult')) {
      return component.get('assessmentResult.collection');
    }
  }),

  /**
   * @property {boolean}showAttempts
   */
  showAttempts: false,

  /**
   * @type {JSON}
   * Property to store list of skipped rescope content
   */
  skippedContents: null,

  /**
   * @type {Boolean}
   * Property to toggle checkbox visibility
   */
  isChecked: false,

  /**
   * @property {[]}
   */
  attempts: Ember.computed('assessmentResult.totalAttempts', function() {
    return this.getAttemptList();
  }),

  /**
   * calculate  the class average by student performance score as a width
   * @property {string}
   */
  studentAverage: Ember.computed('studentPerformance', function() {
    let component = this;
    let score = component.get('studentPerformance.score');
    return Ember.String.htmlSafe(`width: ${score}%;`);
  }),

  /**
   * @property {String} barColor
   * Computed property to know the color of the small bar
   */
  studentColorStyle: Ember.computed('studentPerformance', function() {
    let score = this.get('studentPerformance.score');
    this.set('studentColor', getBarGradeColor(score));
    return Ember.String.htmlSafe(
      `background-color: ${getBarGradeColor(score)};`
    );
  }),

  /**
   * calculate  the class average score as a width
   * @property {string}
   */
  collectionAverage: Ember.computed('assessmentResult', function() {
    let component = this;
    let score = component.get('assessmentResult.score');
    return Ember.String.htmlSafe(`width: ${score}%;`);
  }),

  /**
   * @property {String} barColor
   * Computed property to know the color of the small bar
   */
  collectionColorStyle: Ember.computed('assessmentResult', function() {
    let score = this.get('assessmentResult.score');
    this.set('classColor', getBarGradeColor(score));
    return Ember.String.htmlSafe(
      `background-color: ${getBarGradeColor(score)};`
    );
  }),

  showPullUp: false,

  showChangeScore: true,

  /**
   * Indicates the visibility of change score button
   * @property {Boolean}
   */
  isChangeScoreEnabled: false,

  /**
   * @property {Boolean}
   * Is teacher accessing the report or not
   */
  isTeacher: Ember.computed('isStudent', function() {
    return !this.get('isStudent');
  }),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    closeAll: function() {
      this.sendAction('onClosePullUp');
    },
    /**
     * Action triggered when the user close the pull up.
     **/
    onPullUpClose() {
      this.set('showPullUp', false);
      this.pullUpAnimation();
    },

    onUpdateQuestionScore: function(data) {
      this.updateQuestionScore(data);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Functionto triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.pullUpAnimation();
    this.showStudentReport();
  },

  /**
   * Function to animate the pathway pullup from bottom to top
   */
  pullUpAnimation() {
    let component = this;
    if (this.get('showPullUp')) {
      component.$().animate(
        {
          top: '10%'
        },
        850
      );
    } else {
      component.$().animate(
        {
          top: '100%'
        },
        850
      );
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Function to show the student report
   */
  showStudentReport() {
    let component = this;
    let reportData = component.get('reportData');
    component.set('isAssessment', reportData.type === 'assessment');
    component.set('isCollection', reportData.type === 'collection');
    component.set('areAnswersHidden', false);
    component.set('isAnswerKeyHidden', false);
    component.set('isLoading', true);
    this.getStundentCollectionReport(reportData);
  },

  /**
   * @function  get collection summary report by student
   */
  getStundentCollectionReport(params) {
    let component = this;
    component.set('currentClass', component.get('model'));
    component.set('courseView', false);
    component.set('isReportLoading', true);
    const context = component.getContext(params);
    const type = params.type || 'collection';
    const lessonPromise = context.get('courseId')
      ? component
        .get('lessonService')
        .fetchById(
          context.get('courseId'),
          context.get('unitId'),
          context.get('lessonId')
        )
      : null;
    const isCollection = type === 'collection';
    const collectionPromise = isCollection
      ? component.get('collectionService').readCollection(params.collectionId)
      : component.get('assessmentService').readAssessment(params.collectionId);
    const completedSessionsPromise = isCollection
      ? []
      : context.get('classId')
        ? component.get('userSessionService').getCompletedSessions(context)
        : component.get('learnerService').fetchLearnerSessions(context);

    return Ember.RSVP.hash({
      collection: collectionPromise,
      completedSessions: completedSessionsPromise,
      lesson: lessonPromise,
      profile:
        context.userId !== 'anonymous'
          ? component.get('profileService').readUserProfile(context.userId)
          : {}
    }).then(function(hash) {
      component.set('profile', hash.profile);
      component.set('collection', hash.collection);
      component.set('completedSessions', hash.completedSessions);
      var completedSessions = hash.completedSessions;
      const totalSessions = completedSessions.length;
      const session = totalSessions
        ? completedSessions[totalSessions - 1]
        : null;
      const loadStandards = session;
      if (session) {
        //collections has no session
        context.set('sessionId', session.sessionId);
      }

      if (context.get('classId')) {
        const performanceService = component.get('performanceService');
        return performanceService
          .findAssessmentResultByCollectionAndStudent(context, loadStandards)
          .then(function(assessmentResult) {
            component.setAssessmentResult(assessmentResult);
          });
      } else {
        const learnerService = component.get('learnerService');
        return learnerService
          .fetchCollectionPerformance(context, loadStandards)
          .then(function(assessmentResult) {
            component.setAssessmentResult(assessmentResult);
          });
      }
    });
  },

  setAssessmentResult: function(assessmentResult, session) {
    const component = this;
    const collection = component.get('collection');
    const totalAttempts = component.get('completedSessions.length');
    assessmentResult.merge(collection);
    assessmentResult.set('totalAttempts', totalAttempts);
    if (session && session.eventTime) {
      assessmentResult.set('submittedAt', toLocal(session.eventTime));
    }
    component.set('assessmentResult', assessmentResult);
    component.set('isReportLoading', false);
    component.set('isLoading', false);
  },

  /**
   * Get the attempts list
   * @param params
   * @returns {Context}
   */
  getAttemptList: function() {
    var attempts = [];
    var totalAttempts = this.get('assessmentResult.totalAttempts');

    for (; totalAttempts > 0; totalAttempts--) {
      attempts.push({
        label: totalAttempts,
        value: totalAttempts
      });
    }
    return attempts;
  },

  /**
   * Get the player context
   * @param params
   * @returns {Context}
   */
  getContext: function(params) {
    let userId = params.userId;
    const collectionId = params.collectionId;
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;

    return Context.create({
      collectionType: params.type,
      userId: userId,
      collectionId: collectionId,
      courseId: courseId,
      classId: params.classId,
      unitId: unitId,
      lessonId: lessonId
    });
  },

  /**
   * @function updateQuestionScore
   * Method to update the question score
   */

  updateQuestionScore: function(questionScoreUpdateData) {
    let component = this;
    const context = component.getContext(component.get('reportData'));
    let data = component.buildQuestionScoreUpdatePayLoad(
      questionScoreUpdateData
    );
    let completedSessions = component.get('completedSessions');
    const totalSessions = completedSessions.length;
    const session = totalSessions ? completedSessions[totalSessions - 1] : null;
    if (session) {
      //collections has no session
      context.set('sessionId', session.sessionId);
      data.session_id = session.sessionId;
    }
    component
      .get('analyticsService')
      .updateQuestionScore(data)
      .then(() => {

        component
          .loadSession(session)
          .then(() => component.set('isChangeScoreEnabled', false));
      });
  },

  /**
   * @function loadSession
   * Method to load session from the reportData
   */
  loadSession: function(session) {
    const component = this;
    const context = component.getContext(component.get('reportData'));
    if (session) {
      //collections has no session
      context.set('sessionId', session.sessionId);
    }
    const performanceService = component.get('performanceService');
    const loadStandards = session && context.get('isInContext');
    return performanceService
      .findAssessmentResultByCollectionAndStudent(context, loadStandards)
      .then(function(assessmentResult) {
        component.setAssessmentResult(assessmentResult, session);
      });
  },

  /**
   * @function buildQuestionScoreUpdatePayLoad
   * Method to build question score updated layout from current version
   */
  buildQuestionScoreUpdatePayLoad: function(questionScoreUpdateData) {
    let component = this;
    let context = component.getContext(component.get('reportData'));
    let updateData = Ember.Object.create({
      student_id: context.get('userId'),
      session_id: context.get('sessionId'),
      unit_id: context.get('unitId'),
      collection_id: context.get('collectionId'),
      class_id: context.get('classId'),
      collection_type: context.get('collectionType'),
      lesson_id: context.get('lessonId'),
      course_id: context.get('courseId'),
      resources: questionScoreUpdateData,
      content_source: 'coursemap' // TO-DO Have to replace actual content source, right now default set as coursemap
    });
    return updateData;
  }
});
