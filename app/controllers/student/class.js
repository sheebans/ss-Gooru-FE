import Ember from 'ember';
import { COMPLETION_CLASS_BAR_COLOR } from 'gooru-web/config/config';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
    * Collapses the header section
    * @param {boolean} state
    */
    toggleHeader: function(state) {
      var $panels = $('.header .panel');
      if (state) {
        $panels.slideUp();
      } else {
        $panels.slideDown();
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var item = this.get('menuItem');
    this.selectMenuItem(item);
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * The class presented to the user
   * @property {Class}
   */
  class: null,

  /**
   * The course presented to the user
   * @property {Course}
   */
  course: null,

  /**
   * @property {String} color - Hex color value for the default bgd color of the bar chart
   */
  defaultBarColor: COMPLETION_CLASS_BAR_COLOR,

  /**
   * The units presented to the user
   * @property {Unit}
   */
  units: null,

  /**
   * The menuItem selected
   * @property {String}
   */
  menuItem: null,

  /**
   * @property {ClassContentVisibility}
   */
  contentVisibility: null,

  /**
   * Check it's nu course version or not
   * @property {Boolean}
   */
  isNUCourse: null,

  /**
   * @property {Number} score percentage
   * Computed property for performance score percentage
   */
  scorePercentage: Ember.computed('class.performanceSummary', function() {
    const scorePercentage = this.get('class.performanceSummary.score');
    return scorePercentage >= 0 && scorePercentage !== null
      ? `${scorePercentage}%`
      : '--';
  }),

  /**
   * @property {[Number]} barChartData
   */
  barChartData: Ember.computed('class.performanceSummary', function() {
    const completed = this.get('class.performanceSummary.totalCompleted');
    const total = this.get('class.performanceSummary.total');
    const percentage = completed ? completed / total * 100 : 0;
    return [
      {
        color: this.get('defaultBarColor'),
        percentage
      }
    ];
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Selected the menu item
   * @param {string} item
   */
  selectMenuItem: function(item) {
    this.set('menuItem', item);
  }
});
