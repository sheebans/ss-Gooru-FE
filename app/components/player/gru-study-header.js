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
   * @type {suggestService} Service to retrieve suggest resources
   */
  suggestService: Ember.inject.service('api-sdk/suggest'),

  /**
   * @property {Service} session
   */
  session: Ember.inject.service('session'),

  /**
   * @type {Learner} Service to retrieve course performance summary
   */
  learnerService: Ember.inject.service('api-sdk/learner'),

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
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
    const performancePercentage = component.get('performancePercentage');
    if (performancePercentage > 0) {
      component
        .$('.bar-charts')
        .popover({
          trigger: 'manual',
          html: true,
          placement: 'bottom'
        })
        .mouseover(function() {
          component.$(this).popover('show');
          let left =
            component
              .$('.bar-charts')
              .find('.segment')
              .width() - 50;
          component.$('.popover').css({ top: '84px', left: `${left}px` });
        })
        .mouseleave(function() {
          component.$(this).popover('hide');
        });
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
    'performanceSummary',
    'courseCompetencyCompletion',
    function() {
      const completed = this.get('performanceSummary.totalCompleted');
      const total= this.get('performanceSummary.total');
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
    return data.percentage.toFixed(0);
  }),

  /**
   * Course version name
   * @type {String}
   */
  courseVersion: null,

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
          classPerformanceSummaryItems: component
            .get('performanceService')
            .findClassPerformanceSummaryByStudentAndClassIds(myId, [classId])
        })
        .then(({ classPerformanceSummaryItems }) => {
          component.set(
            'performanceSummary',
            classPerformanceSummaryItems.findBy('classId', classId)
          );
        });
    } else {
      Ember.RSVP
        .hash({
          coursePerformanceSummaryItems: component
            .get('learnerService')
            .fetchCoursesPerformance(myId, [courseId])
        })
        .then(({ coursePerformanceSummaryItems }) => {
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
