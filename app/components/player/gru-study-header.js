import Ember from 'ember';
import {
  ANONYMOUS_COLOR,
  STUDY_PLAYER_BAR_COLOR,
  NU_COURSE_VERSION
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
   * @type {suggestService} Service to retrieve suggest resources
   */
  suggestService: Ember.inject.service('api-sdk/suggest'),

  /**
   * @property {Service} session
   */
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-study-header'],
  classNameBindings: ['showConfirmation:hidden'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when a suggested resource is clicked
     */
    playSuggested(resource) {
      let collectionUrl = window.location.href;
      if (!this.get('collectionUrl')) {
        this.set('collectionUrl', collectionUrl);
      }
      let queryParams = { collectionUrl: this.get('collectionUrl') };
      let classId = this.get('classId');
      if (classId) {
        queryParams.classId = classId;
      }
      this.get('router').transitionTo(
        'resource-player',
        this.get('courseId'),
        resource.id,
        { queryParams }
      );
    },

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
          this.get('course.id'),
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

    //tooltip active event
    component.$('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });

    component.$('[data-toggle=popover]').on('shown.bs.popover', function() {
      component
        .$('.bar-charts .completion-chart .popover')
        .css('left', `${component.get('performancePercentage') - 1  }%`);
    });

    component.$('.multi-item-carousel').carousel({ interval: false });
    // for every slide in carousel, copy the next slide's item in the slide.
    // Do the same for the next, next item.
    component.$('.multi-item-carousel .item').each(function(index, element) {
      var next = component.$(element).next();
      if (!next.length) {
        next = component.$(this).siblings(':first');
      }
      next
        .children(':first-child')
        .clone()
        .appendTo(component.$(this));

      if (next.next().length > 0) {
        next
          .next()
          .children(':first-child')
          .clone()
          .appendTo(component.$(this));
      } else {
        component
          .$(this)
          .siblings(':first')
          .children(':first-child')
          .clone()
          .appendTo(component.$(this));
      }
    });
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
   * @property {Array} list of suggested resources of a collection
   */
  suggestedResources: null,

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
    'class.performanceSummary',
    'class.courseCompetencyCompletion',
    function() {
      const isNUCourse = this.get('isNUCourse');
      const completed = isNUCourse
        ? this.get('class.courseCompetencyCompletion.completedCount')
        : this.get('class.performanceSummary.totalCompleted');
      const total = isNUCourse
        ? this.get('class.courseCompetencyCompletion.totalCount')
        : this.get('class.performanceSummary.total');
      const percentage = completed ? completed / total * 100 : 0;
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
    return data.percentage.toFixed(2);
  }),

  /**
   * Course version name
   * @type {String}
   */
  courseVersion: null,

  /**
   * Check it's nu course version or not
   * @type {Boolean}
   */
  isNUCourse: Ember.computed.equal('courseVersion', NU_COURSE_VERSION),

  /**
   * This property will decide to show the suggested resoure or not.
   * @property {Boolean}
   */
  hasSuggestedResources: false,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Load Header Content
   */

  loadContent: function() {
    const component = this;
    const myId = component.get('session.userId');
    const classId = component.get('classId');
    const collectionId = component.get('collection.id');
    const totalResources = component.get('collection.resources')
      ? component.get('collection.resources').length
      : null;
    component.set('totalResources', totalResources);
    const courseId = component.get('courseId');
    if (classId) {
      Ember.RSVP
        .hash({
          aClass: component.get('classService').readClassInfo(classId),
          classPerformanceSummaryItems: component
            .get('performanceService')
            .findClassPerformanceSummaryByStudentAndClassIds(myId, [classId])
        })
        .then(({ aClass, classPerformanceSummaryItems }) => {
          aClass.set(
            'performanceSummary',
            classPerformanceSummaryItems.findBy('classId', classId)
          );
          const isNUCourse = this.get('isNUCourse');
          if (isNUCourse) {
            Ember.RSVP
              .hash({
                courseCompetencyCompletion: component
                  .get('performanceService')
                  .findCourseCompetencyCompletionByCourseIds(myId, [courseId])
              })
              .then(({ courseCompetencyCompletion }) => {
                aClass.set(
                  'courseCompetencyCompletion',
                  courseCompetencyCompletion.findBy('courseId', courseId)
                );
              });
          }
          component.set('class', aClass);
        });
    }
    if (collectionId) {
      component
        .get('suggestService')
        .suggestResourcesForCollection(
          component.get('session.userId'),
          collectionId
        )
        .then(suggestedResources => {
          component.set('suggestedResources', suggestedResources);
          if (suggestedResources && suggestedResources.length > 0) {
            component.set('hasSuggestedResources', true);
          }
        });
    }
  }
});
