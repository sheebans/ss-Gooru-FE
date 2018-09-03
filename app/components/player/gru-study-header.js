import Ember from 'ember';
import {
  ANONYMOUS_COLOR,
  STUDY_PLAYER_BAR_COLOR
} from 'gooru-web/config/config';

/**
 * Study Player header
 *
 * Component responsible for showing an informative header for the study player.
 * It may embed other components for interacting with the player.
 *
 * @module
 * @see controllers/study-player.js
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {PerformanceService} Service to retrieve class performance summary
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @property {Service} session
   */
  session: Ember.inject.service('session'),

  /**
   * @type {Learner} Service to retrieve course performance summary
   */
  learnerService: Ember.inject.service('api-sdk/learner'),

  menuItem: null,

  sourceType: null,
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-study-header'],

  classNameBindings: ['showConfirmation:non-clickable'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Redirect to course map
     */
    redirectCourseMap() {
      if (this.get('classId')) {
        this.get('router').transitionTo(
          'student.class.course-map',
          this.get('classId'),
          {
            queryParams: {
              refresh: true
            }
          }
        );
      } else {
        this.get('router').transitionTo(
          'student.independent.course-map',
          this.get('courseId'),
          {
            queryParams: {
              refresh: true
            }
          }
        );
      }
    },

    /**
     * Go back to collection
     */
    backToCollection() {
      window.location.href = this.get('collectionUrl');
    },

    selectMenuItem: function(item) {
      const route = this.get('router');
      const classId = this.get('classId') || null;
      const component = this;
      const currentItem = component.get('menuItem');
      if (item !== currentItem) {
        component.setMenuItem(item);
        const queryParams = {
          queryParams: {
            filterBy: 'assessment'
          }
        };

        if (item === 'performance') {
          if (classId == null) {
            route.transitionTo(
              'student.independent.performance',
              this.get('courseId'),
              queryParams
            );
          } else {
            route.transitionTo(
              'student.class.performance',
              classId,
              queryParams
            );
          }
        } else if (item === 'course-map') {
          if (classId == null) {
            this.get('router').transitionTo(
              'student.independent.course-map',
              this.get('courseId'),
              {
                queryParams: {
                  refresh: true
                }
              }
            );
          } else {
            route.transitionTo('student.class.course-map', classId);
          }
        } else if (item === 'class-activities') {
          route.transitionTo('student.class.class-activities', classId);
        } else if (item === 'profile') {
          route.transitionTo('student.class.profile', classId);
        } else {
          route.transitionTo('student.class');
        }
      } // end of if block
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    this.loadContent();
  },

  didRender() {
    this._super(...arguments);
    let component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
    const performancePercentage = component.get('performancePercentage');
    if (performancePercentage > 0) {
      component
        .$('.bar-charts')
        .popover({
          trigger: 'manual',
          html: false,
          placement: 'bottom'
        })
        .mouseover(function() {
          component.$(this).popover('show');
          let left =
            component
              .$('.bar-charts')
              .find('.segment')
              .width() - 20;
          let screenWidth = component.$('.bar-charts').width();
          if (left < 30) {
            left += 10;
          } else if (left + 70 >= screenWidth) {
            left -= 30;
          }

          component.$('.popover').css({
            left: `${left}px`
          });
        })
        .mouseleave(function() {
          component.$(this).popover('hide');
        });
    }
    if (
      component.$('.gru-study-navbar').length > 0 &&
      Ember.$('.qz-player').length > 0
    ) {
      Ember.$('.qz-player').css({ 'padding-top': '164px' });
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Resource} actualResource
   */
  actualResource: null,
  /**
   * @property {String} collectionUrl
   */
  collectionUrl: null,

  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * @property {String} classId - Class unique Id associated for the collection / assessment.
   */
  classId: null,

  /**
   * @property {String} courseId - course unique Id associated for the collection / assessment.
   */
  courseId: null,

  /**
   * @property {collection} collection - The current Collection
   */
  collection: null,

  /**
   * @property {Number} resourceSequence - The resource sequence in the collection / assessment
   */
  resourceSequence: null,

  /**
   * @property {Number} totalResources - The collection / assessment total resources
   */
  totalResources: null,

  /**
   * @property {String} color - Hex color value for the bar in the bar chart
   */
  color: ANONYMOUS_COLOR,

  /**
   * @property {String} color - Hex color value for the default bgd color of the bar chart
   */
  defaultBarColor: STUDY_PLAYER_BAR_COLOR,

  /**
   * Shows if the component is called from collection report
   * @property {Boolean} fromReport
   */
  fromReport: false,

  /**
   * Indicates if PreTest is showing
   * @property {Boolean} isPreTest
   */
  isPreTest: false,

  /**
   * Indicates if an external assessment is showing
   * @property {Boolean} isExternalAssessment
   */
  isExternalAssessment: false,

  /**
   * @property {Number} barChartData
   */
  barChartData: Ember.computed(
    'performanceSummary',
    'courseCompetencyCompletion',
    function() {
      const completed = this.get('performanceSummary.totalCompleted');
      const total = this.get('performanceSummary.total');
      const percentage = completed ? (completed / total) * 100 : 0;
      return [
        {
          color: this.get('color'),
          percentage
        }
      ];
    }
  ),

  performancePercentage: Ember.computed('barChartData', function() {
    let data = this.get('barChartData').objectAt(0);
    return data.percentage.toFixed(0);
  }),

  /**
   * Course version name
   * @type {String}
   */
  courseVersion: null,

  /**
   * @property {Boolean} isStudyPlayer
   * Property to find out whether the study player is loaded or not
   */
  isStudyPlayer: false,
  // -------------------------------------------------------------------------
  // Methods

  /**
   * Load Header Content
   */

  loadContent: function() {
    const component = this;
    const myId = component.get('session.userId');
    const classId = component.get('classId');
    const totalResources = component.get('collection.resources')
      ? component.get('collection.resources').length
      : null;
    component.set('totalResources', totalResources);
    const courseId = component.get('courseId');
    if (classId) {
      let classCourseId = Ember.A([{ classId, courseId }]);
      Ember.RSVP.hash({
        classPerformanceSummaryItems: component
          .get('performanceService')
          .findClassPerformanceSummaryByStudentAndClassIds(myId, classCourseId)
      }).then(({ classPerformanceSummaryItems }) => {
        component.set(
          'performanceSummary',
          classPerformanceSummaryItems.findBy('classId', classId)
        );
      });
    } else {
      Ember.RSVP.hash({
        coursePerformanceSummaryItems: component
          .get('learnerService')
          .fetchCoursesPerformance(myId, [courseId])
      }).then(({ coursePerformanceSummaryItems }) => {
        let coursePerformanceSummaryItem = coursePerformanceSummaryItems.findBy(
          'courseId',
          courseId
        );
        if (coursePerformanceSummaryItem) {
          component.set(
            'performanceSummary',
            Ember.create({
              totalCompleted: coursePerformanceSummaryItem.completedCount,
              total: coursePerformanceSummaryItem.totalCount,
              score: coursePerformanceSummaryItem.scoreInPercentage
            })
          );
        }
      });
    }

    if (!this.menuItem) {
      this.setMenuItem('study-player');
    }
  },
  setMenuItem: function(item) {
    this.set('menuItem', item);
  }
});
