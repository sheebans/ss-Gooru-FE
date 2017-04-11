import Ember from 'ember';
import PlayerController from 'gooru-web/controllers/player';

/**
 * Study Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default PlayerController.extend({

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
   * Shows the performance information
   * @property {Boolean} toggleState
   */
  toggleState: true,

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
