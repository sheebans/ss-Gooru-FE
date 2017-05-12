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
     * Action triggered when the performance information panel is expanded/collapsed
     */
    toggleHeader: function (toggleState) {
      this.set('toggleState', toggleState);
    },

    /**
     * If the user want to continue playing the collection
     */
    playActualCollection:function(){
      this.set('showSuggestion', false);
    },

    /**
     * If the user want to continue playing the post-test suggestion
     */
    playPostTestSuggestion: function(){
      this.playSuggestion(this.get('mapLocation.postTestSuggestion'));
    },

    /**
     * If the user want to continue playing the backfill suggestion
     */
    playBackFillSuggestion: function(){
      this.playSuggestion(this.get('mapLocation.backFillSuggestion'));
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
   *Back fill pre test suggestion
   * @property {String} typeSuggestion
   */
  backFillType: ASSESSMENT_SUB_TYPES.BACKFILL,

  /**
   *Post Test pre test suggestion
   * @property {String} typeSuggestion
   */
  postTestType: ASSESSMENT_SUB_TYPES.POST_TEST,

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
  hasAnySuggestion: Ember.computed('hasBackFillSuggestions', 'hasPostTestSuggestions', 'showSuggestion', function() {

    return (this.get('hasBackFillSuggestions') || this.get('hasPostTestSuggestions')) && this.get('showSuggestion');

  }),

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
      titles.push(unit.get('title'));
    }
    if (lesson) {
      titles.push(lesson.get('title'));
    }
    if (collection) {
      titles.push(collection.get('title'));
    }
    return titles;
  }),

  // -------------------------------------------------------------------------
  // Methods

  playSuggestion: function(suggestion) {
    const controller = this;
    controller.set('showSuggestion', false);
    const courseMapService = controller.get('courseMapService');
    const context = controller.get('mapLocation.context');
    courseMapService.createNewPath(context, suggestion)
    .then(function() {
      const queryParams = {
        role: ROLES.STUDENT,
        source: controller.get('source')
      };
      controller.transitionToRoute('study-player',
        context.get('classId'),
        context.get('courseId'),
        { queryParams }
      );
    });
  }
});
