import Ember from 'ember';
import StudentCollection from 'gooru-web/controllers/reports/student-collection';
import { ASSESSMENT_SUB_TYPES, ROLES } from 'gooru-web/config/config';

/**
 *
 * Controls the access to the analytics data for a
 * student related to a collection of resources
 *
 */

export default StudentCollection.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {CourseMapService}
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered for the next button
     */
    next: function () {
      this.toPlayer();
    },

    /**
     * Action triggered when the performance information panel is expanded/collapsed
     */
    toggleHeader: function (toggleState) {
      this.set('toggleState', toggleState);
    },

    /**
     * If the user want to continue playing the post-test suggestion
     */
    playPostTestSuggestion: function() {
      this.playSuggestion(this.get('mapLocation.postTestSuggestion'));
    },

    /**
     * If the user want to continue playing the backfill suggestion
     */
    playBackFillSuggestion: function() {
      this.playSuggestion(this.get('mapLocation.backFillSuggestion'));
    },

    /**
     * If the user want to continue playing the resource suggestion
     */
    playResourceSuggestion: function() {
      this.playSuggestion(this.get('mapLocation.resourceSuggestion'));
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Course} course
   */
  course: null,

  /**
   * @property {Unit} unit
   */
  unit: null,

  /**
   * @property {Lesson} lesson
   */
  lesson: null,

  /**
   * @property {Collection} collection
   */
  collection: null,

  /**
   * Shows the performance information
   * @property {Boolean} toggleState
   */
  toggleState: true,

  /**
   *Back fill backfill suggestion
   * @property {String} typeSuggestion
   */
  backFillType: ASSESSMENT_SUB_TYPES.BACKFILL,

  /**
   *Post test suggestion
   * @property {String} typeSuggestion
   */
  postTestType: ASSESSMENT_SUB_TYPES.POST_TEST,

  /**
   *Post Test resource suggestion
   * @property {String} typeSuggestion
   */
  resourceType: ASSESSMENT_SUB_TYPES.RESOURCE,

  /**
   *Benchmark suggestion
   * @property {String} benchmarkType
   */
  benchmarkType: ASSESSMENT_SUB_TYPES.BENCHMARK,

  /**
   * Indicate if show pre test suggestion
   * @property {Boolean} showSuggestion
   */
  showSuggestion: true,

  /**
   * Current map location
   * @property {MapSuggestions}
   */
  mapLocation: null,

  /**
   * @property {boolean}
   */
  hasPostTestSuggestions: Ember.computed.alias('mapLocation.hasPostTestSuggestions'),

  /**
   * @property {boolean}
   */
  hasBackFillSuggestions: Ember.computed.alias('mapLocation.hasBackFillSuggestions'),

  /**
   * @property {boolean}
   */
  hasResourceSuggestions: Ember.computed.alias('mapLocation.hasResourceSuggestions'),

  /**
   * @property {boolean}
   */
  isDone: Ember.computed.equal('mapLocation.context.state','Done'),

  /**
   * @property {boolean}
   */
  hasAnySuggestion: Ember.computed('hasBackFillSuggestions', 'hasPostTestSuggestions', 'hasResourceSuggestions', 'hasBenchmarkSuggestions', 'showSuggestion', function() {
    return (this.get('hasBackFillSuggestions') || this.get('hasPostTestSuggestions') || this.get('hasResourceSuggestions') || this.get('hasBenchmarkSuggestions')) && this.get('showSuggestion');
  }),

  /**
   * @property {boolean}
   */
  hasBenchmarkSuggestions: Ember.computed.alias('mapLocation.hasBenchmarkSuggestions'),

  /**
   * Shows the breadcrumbs info of the collection
   * @property {Array[]}
   */
  breadcrumbs: Ember.computed('collection', 'lesson', 'unit', function() {
    let unit = this.get('unit');
    let lesson = this.get('lesson');
    let collection = this.get('collection');
    let titles = Ember.A([]);

    if (unit) {
      titles.push(`${unit.get('sequence')}. ${unit.get('title')}`);
    }
    if (lesson) {
      titles.push(`${lesson.get('sequence')}. ${lesson.get('title')}`);
    }
    if (collection) {
      titles.push(collection.get('title'));
    }
    return titles;
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @param suggestion
   */
  playSuggestion: function(suggestion) {
    const controller = this;
    const courseMapService = controller.get('courseMapService');
    const context = controller.get('mapLocation.context');
    courseMapService.createNewPath(context, suggestion)
      .then(() => controller.toPlayer(suggestion));
  },

  /**
   * Navigate to study player to play next collection/assessment
   */
  toPlayer: function(suggestion) {
    const controller = this;
    const context = controller.get('mapLocation.context');
    let queryParams = {
      role: ROLES.STUDENT,
      source: controller.get('source')
    };
    if (suggestion && suggestion.get('isResource')) {
      controller.transitionToRoute('resource-player',
        context.get('classId'),
        context.get('courseId'),
        suggestion.get('id'),
        { queryParams }
      );
    } else {
      controller.transitionToRoute('study-player',
        context.get('classId'),
        context.get('courseId'),
        { queryParams }
      );
    }
  }
});
