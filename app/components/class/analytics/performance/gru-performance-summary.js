import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  /**
   * Attribute that computes the element to the specified string.
   *
   * @attribute {String}
   */
  tagName: 'ul',
  /**
   * Array that computes the elements class names to the specified strings in the array.
   *
   * @attribute {Array}
   */
  classNames:['gru-performance-summary'],
  /**
   * Selected option to show when on extra small
   *
   * @property {String}
   */
  selectedOption: null,

  isSelected:false,

  click() {
    let component = this;
    component.set("isSelected", !component.get("isSelected"));
    return true;
  },
  /**
   *  Performance model
   *
   * @property {performance/performance}
   */
  performance:null,
  /**
   * Number of the index
   *
   * @property {Number}
   */
  index:null,
  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
     * @function actions:selectResource
     * @param {string} collection -  (collection/assessment)
     */
    selectResource: function (collection) {
      this.get('onSelectResource')(collection);
    },

    /**
     * @function actions:viewReport
     * @param {string} collection - (collection/assessment)
     */
    viewReport: function (collection) {
      this.get('onViewReport')(collection);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Indicates if score is selected
   * @property {boolean} scoreSelected
   */
  scoreSelected: Ember.computed.equal('selectedOption', 'score'),

  /**
   * Indicates if completion is selected
   * @property {boolean} completionSelected
   */
  completionSelected: Ember.computed.equal('selectedOption', 'completion'),

  /**
   * Indicates if timeSpent is selected
   * @property {boolean} timeSpentSelected
   */
  timeSpentSelected: Ember.computed.equal('selectedOption', 'timeSpent'),

  /**
   * Indicates if reaction is selected
   * @property {boolean} reactionSelected
   */
  reactionSelected: Ember.computed.equal('selectedOption', 'reaction'),

  /**
   * Indicates if attemps is selected
   * @property {boolean} attempsSelected
   */
  attemptsSelected: Ember.computed.equal('selectedOption', 'attempts'),

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods



});
