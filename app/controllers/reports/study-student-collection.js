import Ember from 'ember';
import StudentCollection from 'gooru-web/controllers/reports/student-collection';
import { SUGGESTION_TYPE } from 'gooru-web/config/config';

/**
 *
 * Controls the access to the analytics data for a
 * student related to a collection of resources
 *
 */

export default StudentCollection.extend({

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the performance information panel is expanded/collapsed
     */
    toggleHeader: function (toggleState) {
      this.set('toggleState', toggleState);
    }
  },

  // -------------------------------------------------------------------------
  // Events

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
  backFillType: SUGGESTION_TYPE.backFill,

  /**
   *Post Test pre test suggestion
   * @property {String} typeSuggestion
   */
  postTestType: SUGGESTION_TYPE.postTest,

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
  })
});
