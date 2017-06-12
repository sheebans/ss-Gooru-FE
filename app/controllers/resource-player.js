import Ember from 'ember';

/**
 * Study Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default Ember.Controller.extend({

  queryParams: ['collectionUrl', 'unitId', 'lessonId', 'collectionId', 'pathId', 'source', 'collectionType'],

  actions: {
    /**
     * Action triggered when the performance information panel is expanded/collapsed
     */
    toggleHeader: function (toggleState) {
      this.set('toggleState', toggleState);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

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
      titles.push(`U${unit.get('sequence')}: ${unit.get('title')}`);
    }
    if (lesson) {
      titles.push(`L${lesson.get('sequence')}: ${lesson.get('title')}`);
    }
    if (collection) {
      titles.push(collection.get('title'));
    }
    return titles;
  }),

  /**
   * @property {boolean}
   */
  isDone: false,

  /**
   * Shows the performance information
   * @property {Boolean} toggleState
   */
  toggleState: true,

  /**
   * Show the next button and send events
   * @property {Boolean} sendEvents
   */
  sendEvents: Ember.computed.not('collectionUrl')

});
