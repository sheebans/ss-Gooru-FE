import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-student-class-card col-xs-12 col-md-6'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * @property {string} class performance score
   */
  score: Ember.computed('class.performanceSummary.score', function(){
    const score = this.get('class.performanceSummary.score');
    return Ember.typeOf(score) === 'number' ? score : 0;
  }),

  /**
   * @property {Number} class performance total completed
   */
  totalCompleted: Ember.computed('class.performanceSummary.totalCompleted', function(){
    const totalCompleted = this.get('class.performanceSummary.totalCompleted');
    return Ember.typeOf(totalCompleted) === 'number'? totalCompleted : 0;
  }),

  /**
   * @property {Number} class performance total (1 is default value to avoid divition by 0 in utils/d3/radial-progress)
   */
  total: Ember.computed('class.performanceSummary.total', function(){
    const total = this.get('class.performanceSummary.total');
    return Ember.typeOf(total) === 'number'? total : 1;
  })
});
