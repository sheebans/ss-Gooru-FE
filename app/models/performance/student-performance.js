import DS from 'ember-data';

/**
 * Model that contains the student performance information
 * @typedef {Object} Class
 */
export default DS.Model.extend({

  performanceType: DS.attr('string'),
  title: DS.attr('string'),
  score: DS.attr('number'),
  completionDone:  DS.attr('number'),
  completionTotal: DS.attr('number'),
  timeSpent: DS.attr('number'),
  ratingScore: DS.attr('number'),
  attempts: DS.attr('number'),


  /**
   * @property {boolean} Returns true if it is a Unit Performance
   */
  isUnit: Ember.computed.equal('performanceType', 'unit')

});
