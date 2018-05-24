import Ember from 'ember';
import AccordionMixin from 'gooru-web/mixins/gru-accordion';
import { CONTENT_TYPES } from 'gooru-web/config/config';

import { getBarGradeColor } from 'gooru-web/utils/utils';

// Whenever the observer 'parsedLocationChanged' is running, this flag is set so
// clicking on the units should not update the location

/**
 * Accordion Unit
 *
 * Component responsible for behaving as an accordion and listing a set of lessons.
 * It is meant to be used inside of an {@link ./gru-accordion-course|Accordion Course}
 *
 * @module
 * @augments Ember/Component
 * @mixes mixins/gru-accordion
 */
export default Ember.Component.extend(AccordionMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:session
   */
  session: Ember.inject.service('session'),

  /**
   * @requires service:api-sdk/lesson
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  /**
   * @requires service:api-sdk/unit
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
   * @requires service:api-sdk/course-location
   */
  courseLocationService: Ember.inject.service('api-sdk/course-location'),

  /**
   * @requires service:api-sdk/performance
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @requires service:api-sdk/learner
   */
  learnerService: Ember.inject.service('api-sdk/learner'),

  /**
   * @requires service:api-sdk/analytics
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-learner-accordion-unit'],

  classNameBindings: ['isExpanded:expanded', 'curComponentId'],

  tagName: 'li',

  curComponentId: Ember.computed(function() {
    return `u-${this.get('model.id')}`;
  }),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Load the data for this unit (data should only be loaded once) and trigger
     * the 'onLocationUpdate' event handler with the unit information
     *
     * @function actions:selectUnit
     */
    selectUnit: function(unitId) {
      const courseId =
        this.get('currentClass.courseId') || this.get('currentCourse.id');
      this.loadData(courseId, unitId);
    },

    /**
     * Trigger the 'onLocationUpdate' event handler with the unit and lesson information
     *
     * @function actions:updateLesson
     */
    updateLesson: function(lessonId) {
      const newLocation = lessonId
        ? `${this.get('model.id')}+${lessonId}`
        : this.get('model.id');
      this.get('onLocationUpdate')(newLocation);
    },

    /**
     * Trigger the report actions with params (unitId, lessonId, collectionId, type)
     *
     * @function actions:collectionReport
     */
    collectionReport(params) {
      this.sendAction('collectionReport', params);
    },

    onSelectItem(contentType) {
      this.sendAction('onSelectItem', contentType);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  setupComponent: Ember.on('didInsertElement', function() {
    const component = this;

    this.$().on('hide.bs.collapse', function(e) {
      e.stopPropagation();
      component.set('isExpanded', false);
    });

    this.$().on('show.bs.collapse', function(e) {
      e.stopPropagation();
      component.set('isExpanded', true);
    });

    Ember.run.scheduleOnce('afterRender', this, this.parsedLocationChanged);
  }),

  removeSubscriptions: Ember.on('willDestroyElement', function() {
    this.$().off('hide.bs.collapse');
    this.$().off('show.bs.collapse');
  }),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {Function} onLocationUpdate - Event handler
   */
  onLocationUpdate: null,

  /**
   * @prop {String[]} parsedLocation - Location the user has navigated to
   * parsedLocation[0] - unitId
   * parsedLocation[1] - lessonId
   * parsedLocation[2] - resourceId
   */
  parsedLocation: [],

  /**
   * @property {string} go live action name
   */
  onGoLive: 'goLive',

  /**
   * Contains only visible units
   * @property {Unit[]} units
   */
  lessons: null,

  /**
   * Indicates the status of the spinner
   * @property {Boolean}
   */
  loading: false,

  /**
   * Indicates if the current user is a student
   * @property {Boolean}
   */
  isStudent: null,

  /**
   * Indicates if it is from daily class activities
   * @property {Boolean}
   */
  isFromDCA: null,

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Observe changes to 'parsedLocation' to update the accordion's status
   * (expanded/collapsed).
   */
  parsedLocationChanged: Ember.observer('parsedLocation.[]', function() {
    const parsedLocation = this.get('parsedLocation');

    if (parsedLocation.length) {
      let unitId = parsedLocation[0];
      this.updateAccordionById(unitId);
    }
  }),

  /**
   * @property {Text} score text
   * Computed property for the performance score text to be displayed
   */
  scoreText: Ember.computed('model.performance', function() {
    let performanceSummary = this.get('model.performance');
    let scorePercentage = performanceSummary
      ? performanceSummary.scoreInPercentage
      : null;
    return scorePercentage >= 0 && scorePercentage !== null
      ? `${scorePercentage}%`
      : '--';
  }),

  /**
   * @property {Text} score text
   * Computed property for the performance score text to be displayed
   */
  scoreVal: Ember.computed('model.performance', function() {
    let performanceSummary = this.get('model.performance');
    let scorePercentage = performanceSummary
      ? performanceSummary.scoreInPercentage
      : null;
    return scorePercentage >= 0 && scorePercentage !== null
      ? `${scorePercentage}`
      : '--';
  }),

  /**
   * @property {String} widthStyle
   * Computed property to know the width of the bar
   */
  widthStyle: Ember.computed('model.performance', function() {
    let score = this.get('model.performance');
    let percentage = score ? score.scoreInPercentage : 0;
    return Ember.String.htmlSafe(`width: ${percentage}%;`);
  }),

  /**
   * @property {String} barColor
   * Computed property to know the color of the small bar
   */
  colorStyle: Ember.computed('model.performance', function() {
    let score = this.get('model.performance');
    let scorePercentage = score ? score.scoreInPercentage : 0;
    return Ember.String.htmlSafe(
      `background-color: ${getBarGradeColor(scorePercentage)};`
    );
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Load data for the unit
   *
   * @function actions:loadData
   * @returns {undefined}
   */
  loadData: function(courseId, unitId) {
    // Load the lessons and users in the course when the component is instantiated
    let component = this;
    component.set('loading', true);
    component.getLessons(unitId).then(function(lessons) {
      if (!component.isDestroyed) {
        component.set('items', lessons);
        component.set('loading', false);
      }
    });
  },

  /**
   * Get all the lessons by unit
   *
   * @function
   * @requires api-sdk/lesson#findByClassAndCourseAndUnit
   * @returns {Lesson[]}
   */
  getLessons: function(unitIds) {
    const component = this;
    const userId = component.get('currentClass.userId');
    const classId = component.get('currentClass.classId');
    const courseId =
      component.get('currentClass.courseId') ||
      component.get('currentCourse.id');
    const unitId = unitIds;
    const classMembers = component.get('classMembers');
    const isTeacher = component.get('isTeacher');
    let lessons = Ember.A();
    let unitPeers = Ember.A();

    let peersPromise = classId
      ? component
        .get('analyticsService')
        .getUnitPeers(classId, courseId, unitId)
      : Ember.RSVP.resolve(unitPeers);
    return Ember.RSVP.hash({
      unit: component.get('unitService').fetchById(courseId, unitId),
      peers: peersPromise
    })
      .then(({ unit, peers }) => {
        lessons = unit.get('children');
        unitPeers = peers;
        return new Ember.RSVP.Promise(function(resolve, reject) {
          let performancePromise = Ember.RSVP.resolve();
          if (classId) {
            performancePromise = isTeacher
              ? component
                .get('performanceService')
                .findClassPerformanceByUnit(
                  classId,
                  courseId,
                  unitId,
                  classMembers
                )
              : component
                .get('performanceService')
                .findStudentPerformanceByUnit(
                  userId,
                  classId,
                  courseId,
                  unitId,
                  lessons
                );
            Ember.RSVP.resolve(performancePromise).then(resolve, reject);
          } else {
            Ember.RSVP.hash({
              assessmentPerformance: component
                .get('learnerService')
                .fetchPerformanceUnit(
                  courseId,
                  unitId,
                  CONTENT_TYPES.ASSESSMENT
                ),
              collectionPerformance: component
                .get('learnerService')
                .fetchPerformanceUnit(
                  courseId,
                  unitId,
                  CONTENT_TYPES.COLLECTION
                )
            }).then(({ assessmentPerformance, collectionPerformance }) => {
              performancePromise = assessmentPerformance.concat(
                collectionPerformance
              );
              Ember.RSVP.resolve(performancePromise).then(resolve, reject);
            });
          }
        });
      })
      .then(performance => {
        lessons.forEach(function(lesson) {
          const peer = unitPeers.findBy('id', lesson.get('id'));
          if (peer) {
            lesson.set('membersCount', peer.get('peerCount'));
          }
          if (performance) {
            if (isTeacher) {
              const averageScore = performance.calculateAverageScoreByItem(
                lesson.get('id')
              );
              lesson.set(
                'performance',
                Ember.Object.create({
                  score: averageScore,
                  hasStarted: averageScore >= 0
                })
              );
            } else {
              let lessonPerformance;
              if (classId) {
                lessonPerformance = performance.findBy('id', lesson.get('id'));
              } else {
                lessonPerformance = performance.findBy(
                  'lessonId',
                  lesson.get('id')
                );

                if (lessonPerformance) {
                  const score = lessonPerformance.get('scoreInPercentage');
                  const timeSpent = lessonPerformance.get('timeSpent');
                  const completionDone = lessonPerformance.get(
                    'completedCount'
                  );
                  const completionTotal = lessonPerformance.get('totalCount');
                  const hasStarted = score > 0 || timeSpent > 0;
                  const isCompleted =
                    completionDone > 0 && completionDone >= completionTotal;
                  lessonPerformance.set('hasStarted', hasStarted);
                  lessonPerformance.set('isCompleted', isCompleted);
                  lessonPerformance.set('completionDone', completionDone);
                  lessonPerformance.set('completionTotal', completionTotal);
                }
              }
              lesson.set('performance', lessonPerformance);
            }
          }
        });
        return lessons;
      });
  }
});
