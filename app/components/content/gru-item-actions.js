import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'gru-item-actions'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Indicates the route to transition edit
   * @property {string}
   */
  transitionTo: null,

  /**
   * Model id
   * @property {int}
   */
  model: null,

});
