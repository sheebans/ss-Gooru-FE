import Ember from 'ember';
import { ASSESSMENT_SUB_TYPES } from 'gooru-web/config/config';
import PlayerController from 'gooru-web/controllers/player';


/**
 * Study Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default PlayerController.extend({

  queryParams: ['resourceId', 'role', 'type', 'subtype', 'sourceId', 'classId', 'unitId', 'lessonId', 'collectionId', 'source', 'pathId'],

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
    playActualCollection: function() {
      const navigateMapService = this.get('navigateMapService');
      navigateMapService.getStoredNext()
        .then(mapLocation => navigateMapService.next(mapLocation.context))
        .then(() => this.set('showSuggestion', false));
    },

    /**
     * If the user want to continue playing the suggestion
     */
    playSuggestion:function(){
      const controller = this;
      const courseMapService = controller.get('courseMapService');
      const suggestion = controller.get('mapLocation.preTestSuggestion');
      const context = controller.get('mapLocation.context');
      courseMapService.createNewPath(context, suggestion).then(function(){
        Ember.run(() =>
          controller.setProperties({
            resourceId: null,
            unitId: null,
            lessonId: null,
            collectionId: null,
            type: null
          })
        );
        //sending action to route
        controller.send('loadPreTest');
      });
    },

    loadPreTest: () => { return true; }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {string}
   */
  classId: null,

  /**
   * @property {string}
   */
  unitId: null,

  /**
   * @property {string}
   */
  lessonId: null,

  /**
   * @property {string}
   */
  collectionId: null,

  /**
   * @property {string}
   */
  pathId: null,

  /**
   * Shows the performance information
   * @property {Boolean} toggleState
   */
  toggleState: true,

  /**
   * Indicates if it should show the back button
   * @property {boolean}
   */
  showBackButton: false,

  /**
   * Indicate if show pre test suggestion
   * @property {Boolean} showSuggestion
   */
  showSuggestion: true,

  /**
   * Current map location
   * @property {MapLocation}
   */
  mapLocation: null,

  /**
   * @property {boolean}
   */
  hasPreTestSuggestions: Ember.computed.alias('mapLocation.hasPreTestSuggestions'),

  /**
   * Pre test suggestion
   * @property {String} typeSuggestion
   */
  typeSuggestion: ASSESSMENT_SUB_TYPES.PRE_TEST,

  /**
   * Shows the breadcrumbs info of the collection
   * @property {Array[]}
   */
  breadcrumbs: Ember.computed('collection', 'lesson', 'unit', function() {
    let unit = this.get('unit');
    let lesson = this.get('lesson');
    let collection = this.get('collection');
    let lessonChildren = lesson.children;
    let titles = Ember.A([]);

    let isChild = lessonChildren.findBy("id", collection.id);

    if (unit) {
      titles.push(`U${unit.get('sequence')}: ${unit.get('title')}`);
    }
    if (lesson) {
      titles.push(`L${lesson.get('sequence')}: ${lesson.get('title')}`);
    }
    if (collection && isChild) {
      if (collection.isCollection) {
        let collections = lessonChildren.filter(collection => collection.format === 'collection');
        collections.forEach((child, index) => {
          if (child.id === collection.id) {
            let collectionSequence = index + 1;
            titles.push(`C${collectionSequence}: ${collection.get('title')}`);
          }
        });
      } else {
        let assessments = lessonChildren.filter(assessment => assessment.format === 'assessment');
        assessments.forEach((child, index) => {
          if (child.id === collection.id) {
            let assessmentSequence = index + 1;
            titles.push(`A${assessmentSequence}: ${collection.get('title')}`);
          }
        });
      }
    } else {
      titles.push(collection.get('title'));
    }
    return titles;
  }),

  /**
   * Resets to default values
   */
  resetValues: function() {
    //TODO: call the parent reset values method
    this.setProperties({
      showSuggestion: true,
      toggleState: true,
      unitId: null,
      lessonId: null,
      collectionId: null,
      resourceId: null,
      type: null
    });
  }
});
