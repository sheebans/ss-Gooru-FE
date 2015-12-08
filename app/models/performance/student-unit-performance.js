import DS from 'ember-data';

/**
 * Model that contains the student performance information by unit
 * @typedef {Object} Class
 */
export default DS.Model.extend({

  unit: DS.attr('string'),
  performance: DS.belongsTo('student-performance')

});
