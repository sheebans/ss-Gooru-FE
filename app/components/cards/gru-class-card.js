import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['cards gru-class-card col-xs-12 col-md-6'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * @property {Object} Object containing student count by class
   */
  countObject: null,

  /**
   * @property {Number} Count of collaborators in the class
   */
  collaboratorsCount: Ember.computed('class.collaborator', function() {
    const collaborators = this.get('class.collaborator');
    return (collaborators && collaborators.length > 1) ? collaborators.length - 1 : 0;
  }),

  /**
   * @property {Number} Count of students in the class
   */
  studentCount: Ember.computed('class.id', 'countObject', function() {
    let countObject = this.get('countObject');
    return (countObject && Ember.keys(countObject).length) ?
        (countObject[this.get('class.id')] ? countObject[this.get('class.id')] : 0) :
        0;
  })
});
