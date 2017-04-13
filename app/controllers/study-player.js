import Ember from 'ember';
import { SUGGESTION_TYPE } from 'gooru-web/config/config';
import PlayerController from 'gooru-web/controllers/player';


/**
 * Study Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default PlayerController.extend({

  queryParams: ['resourceId', 'role', 'type', 'sourceId', 'unitId', 'lessonId', 'collectionId'],

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
     * If the user want to continue playing the suggestion
     */
    playSuggestion:function(){
      const controller = this;
      controller.set('showSuggestion', false);
      const courseMapService = controller.get('courseMapService');
      const navigateMapService = controller.get('navigateMapService');
      const suggestion = controller.get('mapLocation.preTestSuggestion');
      const context = controller.get('mapLocation.context');
      courseMapService.createNewPath(context, suggestion).then(function(){
        navigateMapService.next(context).then(function(mapLocation){
          controller.setProperties({
            unitId: mapLocation.get('context.unitId'),
            lessonId: mapLocation.get('context.lessonId'),
            collectionId: mapLocation.get('context.itemId'),
            type: mapLocation.get('context.itemType')
          });
          //sending action to route
          controller.send('loadPreTest');
        });
      });
    },

    loadPreTest: () => { return true; }
  },

  // -------------------------------------------------------------------------
  // Properties

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
   * Shows the performance information
   * @property {Boolean} toggleState
   */
  toggleState: true,

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
  typeSuggestion: SUGGESTION_TYPE.preTest,

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
      type: null
    });
  }
});
