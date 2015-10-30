import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['component-class'],

  /**
   * @type {?String} specific class
   */
  'component-class':null,
});
