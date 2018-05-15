import Ember from 'ember';
import AccordionMixin from '../../mixins/gru-accordion';
import { getBarGradeColor, toLocal } from 'gooru-web/utils/utils';

import Context from 'gooru-web/models/result/context';

export default Ember.Component.extend(AccordionMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Ember.Service} session management
   */
  session: Ember.inject.service('session'),

  /**
   * @property {Ember.Service} Service to retrieve an assessment result
   */
  userSessionService: Ember.inject.service('api-sdk/user-session'),

  /**
   * @property {AssessmentService} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @property {CollectionService} Service to retrieve a collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @property {LessonService} Service to retrieve a lesson
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

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

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['class', 'gru-learner-pathway'],

  classNameBindings: ['component-class'],

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
   * @property {Collection}
   */
  collection: null,

  /**
   * @property {AssessmentResult}
   */
  assessmentResult: null,

  /**
   * @property {UserSession[]}
   */
  completedSessions: [],

  /**
   * calculate  the class average score as a width
   * @property {string}
   */
  classAverage: Ember.computed('classPerformance', function() {
    let component = this;
    let score = component.get('classPerformance.score');
    return Ember.String.htmlSafe(`width: ${score}%;`);
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
   * @property {String} barColor
   * Computed property to know the color of the small bar
   */
  classColorStyle: Ember.computed('classPerformance', function() {
    let score = this.get('classPerformance.score');
    this.set('classColor', getBarGradeColor(score));
    return Ember.String.htmlSafe(
      `background-color: ${getBarGradeColor(score)};`
    );
  }),

  item: Ember.computed(function() {
    return this.get('model');
  }),

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super(...arguments);
    component.set('isLoading', true);
    component.set('courseView', true);
    let classId = component.get('model.classId');
    let courseId = component.get('model.courseId');
    let studentId = component.get('model.userId');
    component.set('currentClass', component.get('model'));
    const coursePromise = component
      .get('courseMapService')
      .getCourseInfo(classId, courseId);

    const classPerfomance = component
      .get('performanceService')
      .findClassPerformanceSummaryByClassIds([classId]);

    const studentProfile = component
      .get('profileService')
      .readUserProfile(studentId);

    const performanceSummaryPromise = component
      .get('performanceService')
      .findClassPerformanceSummaryByStudentAndClassIds(studentId, [classId]);

    const collectionType = {
      collectionType: 'assessment'
    };

    const studentUnitPerformance = component
      .get('courseMapService')
      .findClassPerformanceByStudentIdUnitLevel(
        classId,
        courseId,
        studentId,
        collectionType
      );

    return Ember.RSVP.hash({
      classPerfomance: classPerfomance,
      course: coursePromise,
      classPerformanceSummaryItems: performanceSummaryPromise,
      profile: studentProfile,
      studentUnitPerformance: studentUnitPerformance
    }).then(function(hash) {
      let unitsPerformance = hash.studentUnitPerformance[0];
      let unitUsageData = unitsPerformance.usageData;
      let course = hash.course;
      course.get('children').map(units => {
        let id = units.get('id');
        let data = unitUsageData.findBy('unitId', id);
        if (data) {
          units.set('performance', data);
        }
      });
      component.set('items', course.get('children'));
      component.set('classPerformance', hash.classPerfomance[0]);
      component.set('studentPerformance', hash.classPerformanceSummaryItems[0]);
      component.set('course', hash.course);
      component.set('profile', hash.profile);
      component.set('isLoading', false);
    });
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * @function actions:selectItem
     * @param {string} collection - collection or assessment
     * @see module:app/components/class/overview/gru-accordion-lesson
     */
    selectResource: function(unitId, lessonId, collection) {
      // Send the action so that it bubbles up to the component
      this.sendAction('onSelectResource', unitId, lessonId, collection);
    },

    collectionReport(params) {
      let component = this;
      component.set('isAssessment', params.type === 'assessment');
      component.set('isCollection', params.type === 'collection');
      component.set('areAnswersHidden', false);
      component.set('isAnswerKeyHidden', false);
      this.getStundentCollectionReport(params);
    },

    close() {
      let component = this;
      component.triggerAction({
        action: 'closeModal'
      });
    }
  },

  /**
   * @function  get collection summary report by student
   * @param {objects} collections - collection or assessment Ids..
   */
  getStundentCollectionReport(params) {
    let component = this;
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
    const totalAttempts = component.get('completedSessions.length'); //TODO this is coming wrong from BE
    assessmentResult.merge(collection);
    assessmentResult.set('totalAttempts', totalAttempts);
    if (session && session.eventTime) {
      assessmentResult.set('submittedAt', toLocal(session.eventTime));
    }
    component.set('assessmentResult', assessmentResult);
    component.set('courseView', false);
    component.set('isReportLoading', false);
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
  }
});
