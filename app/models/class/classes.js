import DS from 'ember-data';

/**
 * Model that contains a list of classes
 */
export default DS.Model.extend({

  /**
   *  @property {number} Total number of classes
   */
  totalHitCount: DS.attr('number'),

  /**
   *  @property {class} List of classes
   */
  classes: DS.hasMany("class/class")

});
